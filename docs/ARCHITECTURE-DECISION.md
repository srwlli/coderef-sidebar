# Architecture Decision: Auth-Only Dashboard

## Decision

The dashboard is an **auth-protected route**. Users must sign in to access custom cards.

**Date:** 2025-10-08
**Status:** Accepted

## Context

Initial plan included both auth and guest modes with localStorage fallback, which added significant complexity:

- Dual API (async for auth, sync for guest)
- localStorage migration to Supabase on sign-in
- Conditional persistence logic
- Migration flag tracking
- Complex state management

## Decision

Dashboard requires authentication. No guest mode for custom cards.

## Consequences

### Removed Complexity

- ❌ No localStorage for custom cards
- ❌ No migration from localStorage to Supabase (Task 9 - REMOVED)
- ❌ No dual API (guest methods - REMOVED)
- ❌ No conditional persistence
- ❌ No migration flag tracking

### Simplified Implementation

- ✅ Single Supabase-only API
- ✅ All custom cards always synced to cloud
- ✅ No data loss (backed up in Supabase)
- ✅ Simpler Zustand store
- ✅ Fewer edge cases
- ✅ Easier testing

### User Experience

- ✅ Default cards viewable without auth
- ✅ Custom cards require sign-in
- ✅ All custom cards backed up automatically
- ✅ Cross-device sync (same account)
- ❌ No "try before sign-up" for custom cards
- ❌ Cannot use offline (auth required)

## Implementation Changes

### Zustand Store (Simplified)

```typescript
export interface AppStore {
  // Custom cards (Supabase only)
  customCards: CustomCard[];
  isLoadingCards: boolean;
  cardsError: string | null;

  // Async actions (Supabase only - no local methods)
  fetchCustomCards: () => Promise<void>;
  addCustomCard: (card) => Promise<void>;
  updateCustomCard: (id, updates) => Promise<void>;
  deleteCustomCard: (id) => Promise<void>;
  clearCardsError: () => void;
}
```

### Route Protection

```typescript
// app/(app)/dashboard/page.tsx
export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  if (loading) return <Spinner />;
  if (!user) return null; // Redirecting

  return <DashboardContent />;
}
```

### Auth Provider (Simplified)

```typescript
// No migration trigger needed
supabase.auth.onAuthStateChange((event, session) => {
  setUser(session?.user ?? null);

  if (event === 'SIGNED_OUT') {
    // Clear cards from state
    useAppStore.setState({ customCards: [] });
  }

  // No SIGNED_IN migration logic needed
});
```

## Tasks Affected

### Removed Tasks

- ~~Task 9: Add Data Migration Utility~~ - Not needed
- ~~Task 11: Add Optimistic Updates~~ - Still needed but simpler

### Simplified Tasks

- **Task 6:** Zustand Store - Remove guest methods
- **Task 7:** useCustomCards Hook - No auth detection needed
- **Task 8:** Dashboard Updates - Add route protection
- **Task 10:** Auth Provider - Remove migration trigger

### Unchanged Tasks

- Task 1-5: Database, RLS, Types, API - No changes
- Task 12: Realtime Sync - Optional enhancement

## Zustand Persistence

Since custom cards are Supabase-only:

```typescript
partialize: (state) => ({
  view: state.view,
  sidebarOpen: state.sidebarOpen,
  // Don't persist customCards (fetched from Supabase on auth)
});
```

## Default Cards

Default cards (Prompts, Git Commands, ChatGPT, etc.) remain **publicly accessible**:

- No auth required to view
- Rendered server-side or in public layout
- Custom cards require sign-in

## Migration Path

For existing users with localStorage cards (if any):

- **Option 1:** Ignore - localStorage cards are lost (acceptable)
- **Option 2:** One-time manual import via UI (if needed)
- **Option 3:** No action - new feature, no existing users

**Decision:** Option 1 - No migration needed (new feature)

## Alternative Considered

**Guest mode with localStorage:** Rejected due to:

- Complexity of dual API
- Migration edge cases
- Data loss risk (localStorage can be cleared)
- Unclear UX (which cards are local vs synced?)

## References

- `docs/zustand-supabase-store-implementation.md` - To be updated
- `docs/auth-integration.md` - Already correct (auth-only)
- `supabase-custom-cards-plan.json` - To be updated
