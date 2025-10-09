# Auth State Management and Offline Strategy

## Overview

This document clarifies how authentication state is managed (server vs client) and how the application behaves when users go offline.

## Authentication State Management

### Question: Server Middleware vs Client Hooks?

**Answer: Client-side auth state management with client-side route protection**

#### Why Client-Side?

Next.js App Router in our implementation uses:

- **Client components** for dashboard (requires hooks like `useAuth`, `useAppStore`)
- **Supabase client library** which runs in browser (not server-compatible for auth state)
- **Real-time subscriptions** which require browser WebSocket connections

#### Implementation Pattern

```typescript
// src/app/(app)/dashboard/page.tsx
'use client'; // Required for hooks

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Client-side auth check
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show loading state during auth check
  if (loading) return <DashboardSkeleton />;

  // Prevent flash of content before redirect
  if (!user) return null;

  // Render dashboard only when authenticated
  return <DashboardContent />;
}
```

#### Trade-offs

**Client-Side Pros:**

- ✅ Simple implementation with hooks
- ✅ Works with Supabase client library
- ✅ Real-time auth state updates
- ✅ No server-side complexity

**Client-Side Cons:**

- ❌ Brief flash of loading state on page load
- ❌ Auth check happens after page loads (not before)
- ❌ Slightly less secure (can't block HTML delivery)

**Server-Side Alternative (Not Used):**
If we needed server-side auth (we don't), we would:

```typescript
// middleware.ts (Next.js middleware - not implemented)
export async function middleware(request: NextRequest) {
  const supabase = createServerClient(); // Server-compatible client
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

**Why We Don't Use Middleware:**

- Dashboard requires client hooks (`useAppStore`, realtime subscriptions)
- Supabase realtime only works in browser
- Client-side protection is sufficient for our use case
- Custom cards are not highly sensitive data

#### Auth State Flow

```
Page Load
  ↓
AuthProvider initializes
  ↓
supabase.auth.getSession() (from localStorage)
  ↓
Set user state in AuthProvider
  ↓
Dashboard useEffect checks user
  ↓
IF user === null → Redirect to /login
IF user !== null → Fetch custom cards
```

#### How Fast Failures Surface

**Timeline:**

1. **0ms**: Page HTML loads, shows loading skeleton
2. **~50ms**: AuthProvider reads session from localStorage
3. **~100ms**: User state set (either user object or null)
4. **~150ms**: Dashboard useEffect triggers
5. **~200ms**: Redirect to /login OR render dashboard

**Result:** Auth failures surface in ~200ms (very fast, acceptable UX)

### Token Management

#### How Tokens Work

```typescript
// Automatic token management by Supabase SDK
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    // SDK automatically refreshed access token
    console.log('New access token:', session.access_token);
  }

  if (event === 'SIGNED_OUT') {
    // Refresh failed or user signed out
    setUser(null);
    // Dashboard useEffect will redirect to /login
  }
});
```

#### Token Lifecycle

1. **Sign In**: User gets access token (1hr TTL) + refresh token (30 days TTL)
2. **Token Storage**: Stored in localStorage by Supabase SDK
3. **Auto Refresh**: SDK refreshes access token ~5 min before expiry
4. **API Calls**: SDK attaches access token to all Supabase requests
5. **Session Expired**: If refresh fails, `SIGNED_OUT` event fires

#### Handling Expired Sessions

```typescript
// src/lib/auth-context.tsx
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Could be manual sign-out OR expired refresh token
    setUser(null);

    // Clear custom cards from state
    useAppStore.setState({ customCards: [] });

    // Dashboard useEffect will auto-redirect to /login
  }
});
```

**User Experience:**

- Active users: Seamless (token refreshes automatically)
- Inactive 30+ days: Redirect to login with message "Session expired"
- No manual token management needed

## Offline Strategy

### Question: Queue Mutations or Block Actions?

**Answer: Block actions with clear explanation (no mutation queue for MVP)**

### Why Block Instead of Queue?

**Reasons:**

1. **Auth Requirement**: Custom cards require active auth session
2. **Conflict Risk**: Queued offline mutations could conflict with server state
3. **Complexity**: Mutation queue adds significant implementation complexity
4. **Use Case**: Dashboard is primarily online tool (not offline-first app)

### Offline Behavior

#### Detection

```typescript
// Detect offline state
if (!navigator.onLine) {
  throw new Error(
    'You are offline. Custom cards require an internet connection.'
  );
}

// Listen for online/offline events
window.addEventListener('offline', () => {
  toast.warning('You are offline. Some features may not work.');
});

window.addEventListener('online', () => {
  toast.success('Back online!');
  // Optionally: Retry failed operations
});
```

#### User Experience

**When User Goes Offline:**

```typescript
// src/stores/use-app-store.ts
export const useAppStore = create<AppStore>()((set, get) => ({
  addCustomCard: async (card) => {
    // Check online status first
    if (!navigator.onLine) {
      set({
        cardsError:
          'You are offline. Custom cards require an internet connection.',
      });
      throw new Error('Offline');
    }

    // Proceed with Supabase operation...
  },
}));
```

**UI Feedback:**

```tsx
// src/app/(app)/dashboard/page.tsx
export default function Dashboard() {
  const { cardsError } = useAppStore();

  return (
    <>
      {cardsError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            {cardsError}
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Disable actions when offline */}
      <Button onClick={handleAddCard} disabled={!navigator.onLine}>
        {navigator.onLine ? 'Add Card' : 'Offline - Cannot Add'}
      </Button>
    </>
  );
}
```

#### What Gets Blocked

**CRUD Operations:**

- ❌ Create card → Blocked, show error
- ❌ Update card → Blocked, show error
- ❌ Delete card → Blocked, show error
- ✅ View existing cards → Allowed (already in state)

**Auth Operations:**

- ❌ Sign in → Blocked by network (Supabase SDK)
- ❌ Sign up → Blocked by network
- ❌ Sign out → Allowed (clears local state)

### Retry Logic

When back online, users can manually retry failed operations:

```typescript
// src/components/error-banner.tsx
export function ErrorBanner({ error, onRetry }: Props) {
  const isOnline = useOnlineStatus();

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Operation Failed</AlertTitle>
      <AlertDescription>
        {error}

        {isOnline && (
          <Button onClick={onRetry} size="sm">
            Retry
          </Button>
        )}

        {!isOnline && (
          <p className="text-sm text-muted-foreground">
            You are offline. Please check your connection.
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
}

// Custom hook to detect online status
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

### Future Enhancement: Mutation Queue (Optional)

If offline support becomes critical, implement mutation queue:

```typescript
// src/lib/offline-queue.ts
interface QueuedMutation {
  id: string;
  type: 'create' | 'update' | 'delete';
  payload: any;
  timestamp: number;
}

class MutationQueue {
  private queue: QueuedMutation[] = [];

  enqueue(mutation: QueuedMutation) {
    this.queue.push(mutation);
    localStorage.setItem('mutation_queue', JSON.stringify(this.queue));
  }

  async processQueue() {
    if (!navigator.onLine) return;

    const mutations = [...this.queue];
    this.queue = [];

    for (const mutation of mutations) {
      try {
        await this.executeMutation(mutation);
      } catch (error) {
        // Re-queue on failure
        this.queue.push(mutation);
      }
    }

    localStorage.setItem('mutation_queue', JSON.stringify(this.queue));
  }

  private async executeMutation(mutation: QueuedMutation) {
    switch (mutation.type) {
      case 'create':
        await createCustomCardInSupabase(mutation.payload);
        break;
      case 'update':
        await updateCustomCardInSupabase(
          mutation.payload.id,
          mutation.payload.updates
        );
        break;
      case 'delete':
        await deleteCustomCardFromSupabase(mutation.payload.id);
        break;
    }
  }
}

// Usage
window.addEventListener('online', () => {
  mutationQueue.processQueue();
});
```

**When to Implement:**

- Users report frequent offline usage
- Dashboard becomes PWA
- Mobile app version launched

## Summary

### Auth State Management

| Aspect              | Implementation                               |
| ------------------- | -------------------------------------------- |
| **Where**           | Client-side (hooks + context)                |
| **When Checked**    | On page load (~200ms) + on auth state change |
| **Failure Speed**   | Very fast (~200ms to redirect)               |
| **Token Refresh**   | Automatic via Supabase SDK                   |
| **Expired Session** | SIGNED_OUT event → redirect to /login        |

### Offline Strategy

| Scenario                               | Behavior                                       |
| -------------------------------------- | ---------------------------------------------- |
| **User goes offline**                  | Block CRUD, show error, disable buttons        |
| **User tries to create/update/delete** | Blocked with message: "You are offline"        |
| **User can view existing cards**       | Yes (already in Zustand state)                 |
| **User comes back online**             | Show "Back online", enable retry buttons       |
| **Mutation queue**                     | Not implemented (future enhancement if needed) |

### Decision Rationale

**Client-side auth:**

- Dashboard requires client hooks and real-time
- Auth check is fast enough (~200ms)
- Sufficient security for custom cards use case

**Block offline actions:**

- Simpler than mutation queue
- Avoids conflict resolution complexity
- Clearer UX (explicit error vs silent queue)
- Can add queue later if needed

## Implementation Checklist

- [ ] Client-side route protection in dashboard
- [ ] Loading skeleton during auth check
- [ ] Redirect to /login if not authenticated
- [ ] Display session expired message on token refresh failure
- [ ] Detect offline state with `navigator.onLine`
- [ ] Block CRUD operations when offline
- [ ] Show clear error messages with retry option
- [ ] Disable action buttons when offline
- [ ] Listen for online/offline events
- [ ] Optional: Implement mutation queue (future)

## See Also

- `docs/auth-integration.md` - useAuth hook API reference
- `docs/retry-logic-patterns.md` - Network retry patterns
- `supabase-custom-cards-plan.json` - Auth token handling section
