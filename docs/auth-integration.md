# Authentication Integration - useAuth Hook Documentation

## Overview

The `useAuth` hook provides authentication state and methods for the application. It's built on top of Supabase Auth and provides a clean React API for managing user sessions.

## Files

- `src/lib/auth-context.tsx` - AuthProvider and useAuth implementation
- `src/types/auth.d.ts` - TypeScript types for auth
- `src/lib/supabase.ts` - Supabase client configuration

## Type Definitions

### User

```typescript
export interface User {
  id: string; // Supabase user UUID
  email: string; // User email address
  full_name?: string; // Display name from user_metadata
  avatar_url?: string; // Avatar URL from user_metadata
}
```

### AuthState

```typescript
export interface AuthState {
  user: User | null; // Current user or null
  loading: boolean; // Initial auth check loading state
  signIn: (email: string, password: string) => Promise<void>; // Sign in method
  signUp: (email: string, password: string, fullName: string) => Promise<void>; // Sign up method
  signOut: () => Promise<void>; // Sign out method
  resetPassword: (email: string) => Promise<void>; // Password reset method
}
```

## useAuth Hook API

### Signature

```typescript
const { user, loading, signIn, signUp, signOut, resetPassword } = useAuth();
```

### Properties

#### `user: User | null`

- Current authenticated user
- `null` when signed out
- Populated after initial auth check

**Usage:**

```typescript
const { user } = useAuth();

if (user) {
  console.log('Signed in as:', user.email);
  console.log('User ID:', user.id); // Use for Supabase queries
}
```

#### `loading: boolean`

- `true` during initial auth check
- `false` after auth state determined
- Only set during mount, not during sign-in/sign-out

**Usage:**

```typescript
const { loading, user } = useAuth();

if (loading) {
  return <Spinner />;
}

return user ? <Dashboard /> : <LoginPage />;
```

### Methods

#### `signIn(email, password)`

Sign in with email and password.

**Parameters:**

- `email: string` - User email
- `password: string` - User password

**Returns:** `Promise<void>`

**Throws:** Supabase auth error if credentials invalid

**Usage:**

```typescript
const { signIn } = useAuth();

const handleSignIn = async (email: string, password: string) => {
  try {
    await signIn(email, password);
    // User state will update automatically via onAuthStateChange
    router.push('/dashboard');
  } catch (error) {
    toast.error('Invalid credentials');
  }
};
```

#### `signUp(email, password, fullName)`

Create new user account.

**Parameters:**

- `email: string` - User email
- `password: string` - User password (min 6 chars)
- `fullName: string` - Display name stored in user_metadata

**Returns:** `Promise<void>`

**Throws:** Supabase auth error if email already exists

**Usage:**

```typescript
const { signUp } = useAuth();

const handleSignUp = async (data: SignUpForm) => {
  try {
    await signUp(data.email, data.password, data.fullName);
    toast.success('Check your email to confirm');
  } catch (error) {
    toast.error('Sign up failed');
  }
};
```

#### `signOut()`

Sign out current user.

**Returns:** `Promise<void>`

**Throws:** Supabase auth error (gracefully handled internally)

**Usage:**

```typescript
const { signOut } = useAuth();

const handleSignOut = async () => {
  try {
    await signOut();
    // User state will update automatically
    router.push('/');
  } catch (error) {
    // Error already handled, user state cleared
    toast.error('Sign out failed');
  }
};
```

#### `resetPassword(email)`

Send password reset email.

**Parameters:**

- `email: string` - User email

**Returns:** `Promise<void>`

**Throws:** Supabase auth error if email not found

**Usage:**

```typescript
const { resetPassword } = useAuth();

const handleResetPassword = async (email: string) => {
  try {
    await resetPassword(email);
    toast.success('Check your email for reset link');
  } catch (error) {
    toast.error('Failed to send reset email');
  }
};
```

## Provider Setup

### App-Wide Setup

```typescript
// app/layout.tsx
import { AuthProvider } from '@/lib/auth-context';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Route Protection

```typescript
// app/(app)/dashboard/page.tsx
'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <Spinner />;
  if (!user) return null; // Redirecting

  return <DashboardContent />;
}
```

## Integration with Custom Cards

### Automatic Card Fetching

```typescript
import { useAuth } from '@/lib/auth-context';
import { useAppStore } from '@/stores/use-app-store';

export function Dashboard() {
  const { user } = useAuth();
  const { fetchCustomCards } = useAppStore();

  useEffect(() => {
    if (user) {
      fetchCustomCards();
    }
  }, [user?.id]); // Re-fetch on user change

  // ...
}
```

### Auth State-Based Rendering

```typescript
import { useAuth } from '@/lib/auth-context';
import { useCustomCards } from '@/hooks/use-custom-cards';

export function CardsSection() {
  const { user } = useAuth();
  const { cards, addCard } = useCustomCards();

  return (
    <div>
      <h2>My Cards {user && <Badge>Synced</Badge>}</h2>
      {user ? (
        <p>Saved to your account</p>
      ) : (
        <p>Saved locally (sign in to sync)</p>
      )}
      <CardsList cards={cards} onAdd={addCard} />
    </div>
  );
}
```

### Migration on Sign-In

```typescript
// src/lib/auth-context.tsx (enhancement)
import { migrateLocalStorageCardsToSupabase } from '@/lib/migrate-cards-to-supabase';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ... existing code ...

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Trigger migration on sign-in
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          await migrateLocalStorageCardsToSupabase(session.user.id);
        } catch (error) {
          console.error('Card migration failed:', error);
          // Non-blocking - user can continue
        }
      }

      // Clear cards on sign-out
      if (event === 'SIGNED_OUT') {
        useAppStore.setState({ customCards: [] });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ... rest of implementation
}
```

## Auth Events

The `onAuthStateChange` listener fires for these events:

| Event               | When                        | Use Case                         |
| ------------------- | --------------------------- | -------------------------------- |
| `SIGNED_IN`         | User signs in               | Trigger migration, fetch cards   |
| `SIGNED_OUT`        | User signs out              | Clear Supabase cards from state  |
| `TOKEN_REFRESHED`   | Token refreshed             | No action needed (automatic)     |
| `USER_UPDATED`      | User metadata changed       | Refresh user display name/avatar |
| `PASSWORD_RECOVERY` | Password reset link clicked | Show reset password form         |

### Handling Auth Events

```typescript
supabase.auth.onAuthStateChange((event, session) => {
  switch (event) {
    case 'SIGNED_IN':
      // Migrate localStorage cards to Supabase
      migrateLocalStorageCardsToSupabase(session.user.id);
      // Fetch cards from Supabase
      useAppStore.getState().fetchCustomCards();
      break;

    case 'SIGNED_OUT':
      // Clear Supabase cards from state
      useAppStore.setState({ customCards: [] });
      break;

    case 'USER_UPDATED':
      // Refresh user info (already handled by setUser)
      break;

    case 'TOKEN_REFRESHED':
      // No action needed (session updated automatically)
      break;

    case 'PASSWORD_RECOVERY':
      // Redirect to password reset page
      router.push('/reset-password');
      break;
  }
});
```

## Error Handling

### Auth Errors

```typescript
const { signIn } = useAuth();

try {
  await signIn(email, password);
} catch (error) {
  if (error.message.includes('Invalid login credentials')) {
    toast.error('Incorrect email or password');
  } else if (error.message.includes('Email not confirmed')) {
    toast.error('Please confirm your email first');
  } else if (error.message.includes('Too many requests')) {
    toast.error('Too many attempts. Try again later.');
  } else {
    toast.error('Sign in failed. Please try again.');
  }
}
```

### Network Errors

```typescript
const { signIn } = useAuth();

try {
  await signIn(email, password);
} catch (error) {
  if (!navigator.onLine) {
    toast.error('No internet connection');
  } else if (error.message.includes('fetch')) {
    toast.error('Network error. Check your connection.');
  } else {
    toast.error('Sign in failed');
  }
}
```

### Session Expiry

```typescript
// Handled automatically by Supabase
// Token refresh happens in background
// If refresh fails, user is signed out automatically
```

## Testing

### Mock useAuth for Tests

```typescript
// __mocks__/auth-context.tsx
import { vi } from 'vitest';

export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  full_name: 'Test User',
};

export const useAuth = vi.fn(() => ({
  user: mockUser,
  loading: false,
  signIn: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
  resetPassword: vi.fn(),
}));
```

### Test Usage

```typescript
import { useAuth, mockUser } from '@/__mocks__/auth-context';

describe('Dashboard', () => {
  it('shows user email', () => {
    render(<Dashboard />);
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('calls fetchCustomCards on mount', () => {
    const mockFetch = vi.fn();
    useAppStore.setState({ fetchCustomCards: mockFetch });

    render(<Dashboard />);
    expect(mockFetch).toHaveBeenCalled();
  });
});
```

## Security Considerations

### RLS (Row Level Security)

- All Supabase queries automatically filtered by `auth.uid()`
- Users can only access their own data
- No need to manually pass user_id in queries

### Session Management

- Sessions stored in browser via Supabase SDK
- Automatic token refresh every 55 minutes
- Tokens expire after 1 hour
- Refresh tokens valid for 30 days (configurable)

### Password Requirements

- Minimum 6 characters (Supabase default)
- Can configure in Supabase dashboard:
  - Minimum length
  - Require uppercase/lowercase
  - Require numbers/symbols

### Email Verification

- Optional (configured in Supabase dashboard)
- If enabled, users must confirm email before sign-in
- Confirmation link expires after 24 hours

## Common Patterns

### Conditional Rendering Based on Auth

```typescript
const { user } = useAuth();

return (
  <div>
    {user ? (
      <UserDashboard user={user} />
    ) : (
      <GuestDashboard />
    )}
  </div>
);
```

### Protected Routes

```typescript
const { user, loading } = useAuth();

if (loading) return <Spinner />;
if (!user) return <Navigate to="/login" />;

return <ProtectedContent />;
```

### User-Specific Data Fetching

```typescript
const { user } = useAuth();

useEffect(() => {
  if (user) {
    fetchUserData(user.id);
  }
}, [user?.id]);
```

### Sign-In with Redirect

```typescript
const { signIn } = useAuth();
const router = useRouter();

const handleSignIn = async (email: string, password: string) => {
  await signIn(email, password);
  router.push('/dashboard');
};
```

## Enhancements Needed for Custom Cards

### 1. Add Migration Trigger (Task 10)

Update `auth-context.tsx` to trigger localStorage→Supabase migration on sign-in.

### 2. Add Card Clearing on Sign-Out (Task 10)

Clear Supabase cards from Zustand state when user signs out.

### 3. Add Error Handling for Migration (Task 10)

Show toast notification if migration fails (non-blocking).

## Implementation Checklist

- [x] AuthProvider wraps app
- [x] useAuth hook provides user and methods
- [x] Sign in/up/out methods work
- [x] Session persisted across page refreshes
- [x] Token refresh automatic
- [ ] Migration triggered on SIGNED_IN event (Task 10)
- [ ] Cards cleared on SIGNED_OUT event (Task 10)
- [ ] Migration errors handled gracefully (Task 10)

## Next Steps

1. Implement migration trigger in `auth-context.tsx` (Task 10)
2. Create `migrateLocalStorageCardsToSupabase()` function (Task 9)
3. Test sign-in flow with card migration
4. Test sign-out flow with card clearing
5. Add error handling for failed migrations

## See Also

- `docs/custom-cards-migration-flow.md` - Migration implementation
- `docs/zustand-supabase-store-implementation.md` - Store integration
- `src/lib/auth-context.tsx` - Implementation
- `src/types/auth.d.ts` - Type definitions
