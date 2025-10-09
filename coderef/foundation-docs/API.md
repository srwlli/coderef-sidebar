# API

**Date:** 2025-10-08
**Version:** 0.1.0

---

## Overview

sidebar-app currently uses a **direct client-to-service architecture** with no custom API routes. All backend communication happens through:

1. **Supabase Client SDK** - Authentication and future database operations
2. **External Service APIs** - Direct browser calls to third-party services (Google APIs, etc.)

This document covers the integration patterns, authentication flow, and future API endpoint planning.

## Architecture Pattern

### Current: Direct Client Integration

```
┌─────────────┐
│   Browser   │
│   (Client)  │
└──────┬──────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌──────────────┐   ┌────────────────┐
│   Supabase   │   │ External APIs  │
│   (Auth +    │   │ (Future)       │
│   Database)  │   │                │
└──────────────┘   └────────────────┘
```

**No Next.js API Routes Currently**

The application leverages:

- Supabase client SDK for authentication
- localStorage for custom card storage
- Future: Supabase for database operations

### Future: API Route Layer (Planned)

```
┌─────────────┐
│   Browser   │
│   (Client)  │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│   Next.js API    │
│     Routes       │
│  /api/*          │
└─────────┬────────┘
          │
          ├─────────────────┐
          │                 │
          ▼                 ▼
    ┌──────────────┐   ┌────────────────┐
    │   Supabase   │   │ External APIs  │
    │              │   │ (Google, etc.) │
    └──────────────┘   └────────────────┘
```

## Authentication & Authorization

### Supabase Authentication

**Client Configuration:** `src/lib/supabase.ts`

```typescript
// Environment Variables Required
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
```

**Client Options:**

```typescript
{
  auth: {
    autoRefreshToken: true,      // Auto-refresh before expiry
    persistSession: true,         // Store in localStorage
    detectSessionInUrl: true,     // Handle OAuth redirects
  },
  realtime: {
    params: {
      eventsPerSecond: 10,        // Throttle realtime events
    },
  },
}
```

### Authentication Methods

#### 1. Email/Password Sign In

**Location:** `src/lib/auth-context.tsx`

```typescript
// Sign In
const signIn = async (email: string, password: string): Promise<void>

// Usage
await signIn('user@example.com', 'password123')
```

**Flow:**

1. Call `supabase.auth.signInWithPassword()`
2. Supabase validates credentials
3. Returns session + user object
4. AuthContext updates state
5. Session stored in localStorage
6. User redirected to dashboard

**Error Handling:**

- Invalid credentials → `AuthApiError`
- Network error → `FetchError`
- All errors thrown to caller

#### 2. Email/Password Sign Up

```typescript
// Sign Up
const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<void>

// Usage
await signUp('user@example.com', 'password123', 'John Doe')
```

**User Metadata:**

```typescript
{
  data: {
    display_name: username,
    full_name: username,
  }
}
```

**Flow:**

1. Call `supabase.auth.signUp()`
2. Supabase creates user account
3. Email verification sent (if configured)
4. Session created immediately
5. User metadata stored
6. AuthContext updates

#### 3. Password Reset

```typescript
// Request Password Reset
const resetPassword = async (email: string): Promise<void>

// Usage
await resetPassword('user@example.com')
```

**Flow:**

1. Call `supabase.auth.resetPasswordForEmail()`
2. Supabase sends reset email
3. User clicks link in email
4. Redirected to app with token
5. Update password in UI
6. Token validated by Supabase

#### 4. Sign Out

```typescript
// Sign Out
const signOut = async (): Promise<void>

// Usage
await signOut()
```

**Flow:**

1. Check active session exists
2. Call `supabase.auth.signOut()`
3. Clear local session
4. AuthContext sets user to null
5. Redirect to /auth page

**Error Handling:**

- No session → Clear local state only
- Network error → Clear local state + throw

### Session Management

**Location:** `src/lib/auth-context.tsx`

```typescript
// Initial session check
useEffect(() => {
  if (!isSupabaseConfigured() || !supabase) {
    setLoading(false);
    return;
  }

  // Get current session
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null);
    setLoading(false);
  });

  // Listen for auth state changes
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
    setLoading(false);
  });

  return () => subscription.unsubscribe();
}, []);
```

**Session Events:**

- `SIGNED_IN` - User logged in
- `SIGNED_OUT` - User logged out
- `TOKEN_REFRESHED` - Access token refreshed
- `USER_UPDATED` - User metadata changed

### Protected Routes

**Location:** `src/app/(app)/layout.tsx`

```typescript
// Client-side route protection
useEffect(() => {
  if (!loading && !user) {
    router.push('/auth');
  }
}, [user, loading, router]);

// Loading state
if (loading) {
  return <LoadingSpinner />;
}

// Unauthenticated redirect
if (!user) {
  return null; // Will redirect via useEffect
}

// Render protected content
return <AppLayout>{children}</AppLayout>;
```

**Route Groups:**

- `/auth` - Public (login/signup)
- `/(app)/*` - Protected (requires authentication)

### Middleware (Currently Disabled)

**Location:** `src/middleware.ts`

```typescript
// Middleware disabled to prevent conflicts
export async function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
```

**Rationale:**

- Client-side protection sufficient for single-user app
- Avoids double-redirect issues
- Simpler to debug
- Can enable later if needed

## Data Endpoints

### Local Storage (Current)

**Custom Cards Storage**

**Location:** `src/stores/use-app-store.ts`

```typescript
// Storage Key
localStorage.setItem('app-storage', JSON.stringify(state));

// State Shape
interface AppStorage {
  view: 'grid' | 'list';
  sidebarOpen: boolean;
  customCards: CustomCard[];
  // lastCopiedId NOT persisted
}
```

**Operations:**

#### Create Custom Card

```typescript
const addCustomCard = (card: Omit<CustomCard, 'id' | 'createdAt'>) => {
  const newCard: CustomCard = {
    ...card,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  set({ customCards: [...get().customCards, newCard] });
};
```

#### Update Custom Card

```typescript
const updateCustomCard = (
  id: string,
  updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
) => {
  set({
    customCards: get().customCards.map((card) =>
      card.id === id ? { ...card, ...updates } : card
    ),
  });
};
```

#### Delete Custom Card

```typescript
const deleteCustomCard = (id: string) => {
  set({
    customCards: get().customCards.filter((card) => card.id !== id),
  });
};
```

#### Get All Custom Cards

```typescript
const customCards = useAppStore((state) => state.customCards);
```

**Data Migration:**

Version 0 → Version 1 (Single href → Multiple links)

```typescript
migrate: (persistedState: unknown, version: number) => {
  if (version === 0) {
    // Convert old format
    return {
      ...state,
      customCards: cards.map((card) => {
        if ('href' in card && !('links' in card)) {
          return {
            ...card,
            links: [{ id: uuidv4(), label: 'Open', href: card.href }],
          };
        }
        return card;
      }),
    };
  }
  return persistedState;
};
```

### Supabase Database (Future)

**Planned Tables:**

#### `custom_cards`

```sql
CREATE TABLE custom_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  links JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row-level security
ALTER TABLE custom_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cards"
  ON custom_cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cards"
  ON custom_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cards"
  ON custom_cards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cards"
  ON custom_cards FOR DELETE
  USING (auth.uid() = user_id);
```

**Planned API Methods:**

```typescript
// Fetch all cards
const { data, error } = await supabase
  .from('custom_cards')
  .select('*')
  .order('created_at', { ascending: false });

// Create card
const { data, error } = await supabase
  .from('custom_cards')
  .insert({
    title: 'My Card',
    icon_name: 'Rocket',
    links: [{ id: uuidv4(), label: 'Open', href: 'https://example.com' }],
  })
  .select()
  .single();

// Update card
const { data, error } = await supabase
  .from('custom_cards')
  .update({ title: 'Updated Title' })
  .eq('id', cardId)
  .select()
  .single();

// Delete card
const { error } = await supabase.from('custom_cards').delete().eq('id', cardId);
```

## External Service Integration

### Google APIs (Planned)

**Environment Variables:**

```
GOOGLE_CLIENT_ID=[client-id]
GOOGLE_CLIENT_SECRET=[client-secret]
```

**Planned Integrations:**

- Google Calendar API
- Google Drive API
- Gmail API (read-only)

**Future API Route:** `/api/google/*`

### Other Services (Planned)

- GitHub API (repos, PRs, issues)
- Vercel API (deployments)
- Anthropic API (Claude integration)

## Error Handling

### Supabase Errors

```typescript
try {
  await signIn(email, password);
} catch (error) {
  if (error instanceof AuthApiError) {
    // Invalid credentials, user not found, etc.
    toast.error(error.message);
  } else if (error instanceof FetchError) {
    // Network issues
    toast.error('Network error. Please try again.');
  } else {
    // Unknown error
    toast.error('An unexpected error occurred.');
  }
}
```

**Common Error Codes:**

- `invalid_credentials` - Wrong email/password
- `email_not_confirmed` - Email verification pending
- `user_not_found` - User doesn't exist
- `weak_password` - Password doesn't meet requirements

### Local Storage Errors

```typescript
try {
  localStorage.setItem('app-storage', JSON.stringify(state));
} catch (error) {
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    toast.error('Storage limit exceeded. Please delete some cards.');
  } else {
    console.error('Failed to save to localStorage:', error);
  }
}
```

**Quota Limits:**

- ~5-10MB per domain
- Varies by browser
- Private browsing may have lower limits

## Rate Limiting

### Supabase

- Authentication: 30 requests/hour per IP (default)
- Realtime: 10 events/second (configured)
- Database: No hard limits (generous free tier)

### Future API Routes

- No rate limiting currently
- Planned: Express-rate-limit middleware
- Per-user limits based on session

## Pagination (Future)

**Planned for Supabase queries:**

```typescript
// Paginated card fetch
const { data, error } = await supabase
  .from('custom_cards')
  .select('*', { count: 'exact' })
  .range(start, end)
  .order('created_at', { ascending: false });

// Example: Load more cards
const [page, setPage] = useState(0);
const PAGE_SIZE = 20;

const { data, error } = await supabase
  .from('custom_cards')
  .select('*')
  .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
```

**Response Format:**

```typescript
{
  data: CustomCard[],
  count: number,      // Total count
  error: null
}
```

## Caching Strategy

### TanStack Query

**Location:** `src/providers/QueryProvider.tsx`

```typescript
{
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 minutes
      retry: 3,                   // Retry failed queries 3 times
    },
  },
}
```

**Cache Keys:**

```typescript
// Future query keys
['custom-cards'][('custom-cards', cardId)]['user-profile'][ // All cards // Single card // User data
  ('external-service', 'google')
]; // External API data
```

### PWA Service Worker

**Location:** `next.config.ts`

```typescript
runtimeCaching: [
  {
    urlPattern: /^https:\/\/.*\.supabase\.co\/.*$/,
    handler: 'NetworkFirst', // Try network, fallback to cache
    options: {
      cacheName: 'supabase-cache',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
];
```

**Cache Strategy:**

- Static assets: CacheFirst (PWA default)
- API calls: NetworkFirst
- Images: CacheFirst with expiration

## Request/Response Examples

### Authentication

#### Sign In Request

```typescript
// Client-side call
await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword123',
});
```

**Supabase Internal Request:**

```http
POST https://[project].supabase.co/auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Success Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "4d4a5e8f-1234-5678-9abc-def012345678",
  "user": {
    "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    "email": "user@example.com",
    "user_metadata": {
      "full_name": "John Doe",
      "display_name": "John Doe"
    },
    "created_at": "2025-10-08T12:00:00Z"
  }
}
```

**Error Response:**

```json
{
  "error": "invalid_grant",
  "error_description": "Invalid login credentials"
}
```

#### Sign Up Request

```typescript
await supabase.auth.signUp({
  email: 'newuser@example.com',
  password: 'securepassword123',
  options: {
    data: {
      display_name: 'Jane Doe',
      full_name: 'Jane Doe',
    },
  },
});
```

**Success Response:**

```json
{
  "user": {
    "id": "new-user-uuid",
    "email": "newuser@example.com",
    "email_confirmed_at": null,
    "user_metadata": {
      "display_name": "Jane Doe",
      "full_name": "Jane Doe"
    }
  },
  "session": {
    "access_token": "...",
    "refresh_token": "..."
  }
}
```

### Custom Cards (Future Supabase)

#### Fetch All Cards

```typescript
const { data, error } = await supabase
  .from('custom_cards')
  .select('*')
  .order('created_at', { ascending: false });
```

**Success Response:**

```json
[
  {
    "id": "card-uuid-1",
    "user_id": "user-uuid",
    "title": "My Project",
    "icon_name": "Rocket",
    "links": [
      {
        "id": "link-uuid-1",
        "label": "Open App",
        "href": "https://myproject.com"
      },
      {
        "id": "link-uuid-2",
        "label": "Docs",
        "href": "https://docs.myproject.com"
      }
    ],
    "created_at": "2025-10-08T10:00:00Z",
    "updated_at": "2025-10-08T10:00:00Z"
  }
]
```

#### Create Card

```typescript
const { data, error } = await supabase
  .from('custom_cards')
  .insert({
    title: 'New Project',
    icon_name: 'Code',
    links: [{ id: uuidv4(), label: 'View', href: 'https://example.com' }],
  })
  .select()
  .single();
```

**Success Response:**

```json
{
  "id": "new-card-uuid",
  "user_id": "user-uuid",
  "title": "New Project",
  "icon_name": "Code",
  "links": [
    {
      "id": "link-uuid",
      "label": "View",
      "href": "https://example.com"
    }
  ],
  "created_at": "2025-10-08T12:00:00Z",
  "updated_at": "2025-10-08T12:00:00Z"
}
```

## Future API Routes (Planned)

### `/api/auth/*`

- POST `/api/auth/login` - Custom login handler
- POST `/api/auth/register` - Custom registration
- POST `/api/auth/logout` - Session cleanup
- GET `/api/auth/session` - Get current session

### `/api/cards/*`

- GET `/api/cards` - Fetch all cards (paginated)
- POST `/api/cards` - Create new card
- GET `/api/cards/:id` - Get single card
- PATCH `/api/cards/:id` - Update card
- DELETE `/api/cards/:id` - Delete card

### `/api/google/*`

- GET `/api/google/calendar` - Fetch calendar events
- GET `/api/google/drive` - List files
- POST `/api/google/auth` - OAuth callback

---

## AI Development Context

### Current Integration Pattern

```
Client → Supabase Client SDK → Supabase Cloud
```

**Benefits:**

- Simple to understand and maintain
- No API route boilerplate
- Direct TypeScript types from Supabase
- Automatic retry and error handling

**When to Add API Routes:**

- Need server-side secrets (API keys)
- Complex business logic
- Data transformation
- Rate limiting per user
- Webhook handling

### Authentication Pattern

```typescript
// 1. Check if authenticated (AuthContext)
const { user, loading } = useAuth();

// 2. Protect routes (useEffect in layout)
useEffect(() => {
  if (!loading && !user) {
    router.push('/auth');
  }
}, [user, loading, router]);

// 3. Call authenticated endpoints
const { data, error } = await supabase.from('table').select('*');
```

### Error Handling Pattern

```typescript
try {
  // Supabase call
  const { data, error } = await supabase.from('table').select('*');

  if (error) throw error;

  // Success
  toast.success('Operation successful');
} catch (error) {
  // Handle error
  toast.error(error.message || 'An error occurred');
  console.error('Operation failed:', error);
}
```

---

**🤖 Generated with AI assistance using the docs-mcp POWER framework template**

**Last Updated:** 2025-10-08
**API Version:** 0.1.0
**Next Review:** When implementing Supabase database integration or API routes
