# Implementation Readiness Checklist

## Status: ✅ READY FOR IMPLEMENTATION

All documentation complete, contradictions resolved, security patterns defined.

---

## Quick Start

1. **Read:** `docs/ARCHITECTURE-DECISION.md` - Understand auth-only architecture
2. **Review:** `supabase-custom-cards-plan.json` - 13 tasks in order
3. **Security:** `docs/api-security-patterns.md` - Critical user_id patterns
4. **Implement:** Follow tasks 1-13 sequentially

---

## Documentation Completeness

### ✅ Core Documentation (All Exist)

| Document                                     | Status    | Summary                                                                                                                                                                                      |
| -------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ARCHITECTURE-DECISION.md**                 | ✅ Exists | **Auth-only architecture**: No guest mode, no localStorage, dashboard requires sign-in. Simplified from dual API approach.                                                                   |
| **api-security-patterns.md**                 | ✅ Exists | **CRITICAL SECURITY**: API functions MUST obtain user_id internally from `supabase.auth.getUser()`. NEVER accept userId from caller. Includes attack vectors, correct patterns, and testing. |
| **zustand-supabase-store-implementation.md** | ✅ Exists | **Zustand store with Supabase**: Optimistic updates, rollback patterns, loading states, error handling. Includes complete code for all CRUD operations.                                      |
| **auth-integration.md**                      | ✅ Exists | **useAuth hook API**: `{ user, loading, signIn, signUp, signOut }`. User object structure, session management, existing implementation details.                                              |
| **auth-and-offline-strategy.md**             | ✅ Exists | **Client-side auth + offline blocking**: Dashboard uses client hooks (~200ms auth check), blocks CRUD when offline, shows retry option. No mutation queue for MVP.                           |
| **field-name-mapping.md**                    | ✅ Exists | **snake_case ↔ camelCase conversion**: `dbToApp()`, `appToInsert()`, `appToUpdate()` functions. Database uses snake_case, app uses camelCase. Complete examples and tests.                  |
| **custom-cards-migration-flow.md**           | ✅ Exists | **v0→v1 migration**: href→links array via Zustand persist. (Stage 2 localStorage→Supabase removed due to auth-only decision).                                                                |
| **supabase-type-generation.md**              | ✅ Exists | **Auto-generate DB types**: Use `supabase gen types typescript` to create TypeScript types from database schema. Includes NPM scripts and CI/CD workflow.                                    |
| **retry-logic-patterns.md**                  | ✅ Exists | **Network resilience**: Exponential backoff, jitter, retry on 429/500/502/503. `isRetryableError()` function. Integration with Zustand store.                                                |
| **conflict-resolution.md**                   | ✅ Exists | **Cross-device conflicts**: Last-Write-Wins (MVP), Optimistic Locking, Field-Level Merging, CRDTs. Recommended: LWW for simplicity.                                                          |

### ✅ Implementation Plan

| Document                            | Status      | Summary                                                                                                                                      |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **supabase-custom-cards-plan.json** | ✅ Complete | **13 tasks + documentation**: v2.0.0, auth-only, no localStorage, comprehensive security guidance, testing checklist, edge cases documented. |

---

## Critical Security Patterns (Read Before Coding)

### 🔐 user_id Injection (MUST READ: `docs/api-security-patterns.md`)

**The Rule:**

```typescript
// ✅ CORRECT
export async function createCard(card: CustomCard): Promise<CustomCard> {
  const {
    data: { user },
  } = await supabase.auth.getUser(); // ← Internal retrieval
  if (!user) throw new Error('Not authenticated');

  const payload = appToInsert(card, user.id); // ← user.id from session
  const { data } = await supabase.from('custom_cards').insert(payload);
  return dbToApp(data);
}

// ❌ WRONG - NEVER DO THIS
export async function createCard(card: CustomCard, userId: string) {
  // userId from caller can be forged - SECURITY RISK!
}
```

**Why:**

- Prevents data forgery (caller can't pass victim's user_id)
- `supabase.auth.getUser()` reads from JWT token (cryptographically signed)
- RLS policies at database level provide defense in depth

**Checklist for Every API Function:**

- [ ] NO userId parameter in function signature
- [ ] Calls `supabase.auth.getUser()` internally
- [ ] Throws error if `user === null`
- [ ] Uses `user.id` from authenticated session

---

## Architecture Decision Summary

### Auth-Only Architecture (No Guest Mode)

**Decision:** Dashboard requires authentication. No localStorage for custom cards.

**Implications:**

- ✅ Simpler implementation (no dual API)
- ✅ All cards always synced to cloud
- ✅ No migration complexity
- ✅ No localStorage fallback
- ❌ Cannot try custom cards without sign-up
- ❌ No offline CRUD operations

**Offline Behavior:**

- Block CRUD actions when `!navigator.onLine`
- Show error: "You are offline. Custom cards require an internet connection."
- Provide retry button when back online
- No mutation queue for MVP (can add later if needed)

**See:** `docs/ARCHITECTURE-DECISION.md`, `docs/auth-and-offline-strategy.md`

---

## Implementation Order

### Phase 1: Database Setup (Tasks 1-3)

**Task 1: Database Schema**

- Create `custom_cards` table with JSONB validation
- Indexes on `user_id` and `created_at`
- CHECK constraints: title ≤50 chars, 1-16 links, link labels ≤30 chars

**Task 2: Row Level Security**

- Enable RLS on `custom_cards`
- Policies: SELECT/INSERT/UPDATE/DELETE filtered by `auth.uid() = user_id`

**Task 3: Timestamp Trigger**

- Auto-update `updated_at` on row changes

**Deliverable:** Migration file `supabase/migrations/create_custom_cards_table.sql`

---

### Phase 2: API Layer (Tasks 4-5)

**Task 4: Field Mapping**

- Create `src/lib/api/field-mapping.ts`
- Types: `CustomCardRow`, `CustomCardInsert`, `CustomCardUpdate`
- Functions: `dbToApp()`, `appToInsert()`, `appToUpdate()`
- **Critical:** Conversion between snake_case (DB) and camelCase (app)

**Task 5: API Service**

- Create `src/lib/api/custom-cards.ts`
- **SECURITY:** All functions call `supabase.auth.getUser()` internally
- Functions:
  - `fetchCustomCardsFromSupabase(): Promise<CustomCard[]>`
  - `createCustomCardInSupabase(card): Promise<CustomCard>`
  - `updateCustomCardInSupabase(id, updates): Promise<CustomCard>`
  - `deleteCustomCardFromSupabase(id): Promise<void>`

**Deliverable:** Type-safe API with internal user_id injection

**References:**

- `docs/field-name-mapping.md` - Complete implementation guide
- `docs/api-security-patterns.md` - Security patterns and testing

---

### Phase 3: State Management (Tasks 6-7)

**Task 6: Zustand Store**

- Update `src/stores/use-app-store.ts`
- Add state: `isLoadingCards`, `cardsError`
- Add actions: `fetchCustomCards`, `addCustomCard`, `updateCustomCard`, `deleteCustomCard`
- **Pattern:** Optimistic updates with automatic rollback on error
- **Persistence:** Do NOT persist `customCards` (fetched from Supabase on auth)

**Task 7: useCustomCards Hook**

- Create `src/hooks/use-custom-cards.ts`
- Auto-fetch cards when authenticated
- Clean API: `{ cards, isLoading, error, addCard, updateCard, deleteCard }`

**Deliverable:** Store with optimistic updates and error handling

**Reference:** `docs/zustand-supabase-store-implementation.md` (600+ lines, complete code)

---

### Phase 4: UI Integration (Tasks 8-10)

**Task 8: Dashboard Updates**

- Update `src/app/(app)/dashboard/page.tsx`
- Use `useCustomCards` hook
- Show loading skeletons
- Display errors with retry button

**Task 9: Auth Provider Enhancement**

- Update `src/lib/auth-context.tsx`
- Clear cards on sign-out: `if (event === 'SIGNED_OUT') { useAppStore.setState({ customCards: [] }) }`

**Task 10: Route Protection**

- Protect dashboard: Redirect to `/login` if not authenticated
- Pattern:
  ```typescript
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);
  ```

**Deliverable:** Auth-protected dashboard with loading states

**Reference:** `docs/auth-integration.md`, `docs/auth-and-offline-strategy.md`

---

### Phase 5: Enhancements (Tasks 11-13)

**Task 11: Optimistic Updates**

- Already included in Task 6 store implementation
- Temp ID pattern: `temp-${uuid}` for creates
- Rollback on error

**Task 12: Realtime Sync (Optional)**

- Add to `useCustomCards` hook
- Subscribe to `postgres_changes` on `custom_cards`
- **CRITICAL:** Cleanup with `supabase.removeChannel(channel)` in useEffect return

**Task 13: Rate Limiting**

- **MVP:** Client-side limits (20 creates/hour, 50 updates/hour)
- **Future:** Edge Functions or database-enforced limits
- Monitor in Supabase Dashboard → Database → Logs

**Deliverable:** Production-ready features with monitoring

**References:**

- `docs/retry-logic-patterns.md` - Network resilience
- `docs/conflict-resolution.md` - Cross-device sync

---

## Auth & Token Handling

### Token Lifecycle (Auto-Managed by Supabase SDK)

- **Access Token:** 1 hour TTL, auto-refreshed ~5 min before expiry
- **Refresh Token:** 30 days TTL, used to get new access tokens
- **Storage:** localStorage (managed by SDK)
- **Events:** `TOKEN_REFRESHED`, `SIGNED_OUT`, `SIGNED_IN`

### Session Expiry Flow

```
User inactive for 30+ days
  ↓
Refresh token expires
  ↓
SDK attempts refresh → fails
  ↓
onAuthStateChange fires SIGNED_OUT
  ↓
AuthProvider sets user = null
  ↓
Dashboard useEffect detects no user
  ↓
Redirect to /login with "Session expired" message
```

### API Authentication Pattern

Every API call:

1. `supabase.auth.getUser()` - reads from cached session
2. If no user → throw "Not authenticated"
3. If user → use `user.id` for queries
4. Supabase SDK auto-attaches JWT to requests
5. RLS policies validate `auth.uid() = user_id`

**Reference:** `docs/auth-and-offline-strategy.md` - Complete auth flow

---

## Testing Strategy

### Unit Tests

```typescript
// Field mapping
describe('dbToApp', () => {
  it('converts snake_case to camelCase', () => {
    const row = { id: '1', icon_name: 'Star', created_at: '2025-10-08' };
    const result = dbToApp(row);
    expect(result.iconName).toBe('Star');
    expect(result.createdAt).toBe('2025-10-08');
  });
});

// Security
describe('createCard', () => {
  it('throws if not authenticated', async () => {
    mockAuthUser(null);
    await expect(createCard(card)).rejects.toThrow('Not authenticated');
  });
});

// Optimistic updates
describe('store', () => {
  it('rolls back on error', async () => {
    const { addCustomCard, customCards } = useAppStore.getState();
    mockSupabaseError();

    await expect(addCustomCard(card)).rejects.toThrow();
    expect(customCards).toHaveLength(0); // Rolled back
  });
});
```

### Integration Tests

- [ ] Create card → appears in list
- [ ] Update card → changes reflected
- [ ] Delete card → removed from list
- [ ] Sign out → cards cleared
- [ ] Offline → CRUD blocked with error
- [ ] Expired session → redirect to /login
- [ ] Cross-device → realtime updates (if enabled)

### Security Tests

- [ ] RLS prevents reading other users' cards
- [ ] RLS prevents updating other users' cards
- [ ] API throws "Not authenticated" when no session
- [ ] user_id cannot be forged from client

---

## Edge Cases Handled

| Case                 | Behavior                        | Reference                      |
| -------------------- | ------------------------------- | ------------------------------ |
| User signs out       | Clear cards, redirect to /login | Task 9                         |
| User deletes account | CASCADE delete all cards        | Task 1 (SQL)                   |
| Network offline      | Block CRUD, show retry button   | `auth-and-offline-strategy.md` |
| Session expired      | SIGNED_OUT event → redirect     | `auth-and-offline-strategy.md` |
| Conflicting updates  | Last-Write-Wins (updated_at)    | `conflict-resolution.md`       |
| Supabase down        | Retry with exponential backoff  | `retry-logic-patterns.md`      |

---

## Pre-Development Checklist

### Documentation Review

- [x] Read `ARCHITECTURE-DECISION.md` - Understand auth-only approach
- [x] Read `api-security-patterns.md` - **CRITICAL** for security
- [x] Review `supabase-custom-cards-plan.json` - Task details
- [x] Skim `zustand-supabase-store-implementation.md` - Store patterns
- [x] Verify all 10 docs exist (all ✅ above)

### Environment Setup

- [ ] Supabase project created
- [ ] Environment variables configured:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Supabase CLI installed (`npm install -g supabase`)
- [ ] Linked to project (`supabase link --project-ref <ref>`)

### Implementation Ready

- [ ] Git branch created (`git checkout -b feature/supabase-custom-cards`)
- [ ] All docs reviewed
- [ ] Security patterns understood
- [ ] Team aligned on auth-only architecture

---

## During Development: Quick Reference

### User ID Pattern (Every API Function)

```typescript
const {
  data: { user },
} = await supabase.auth.getUser();
if (!user) throw new Error('Not authenticated');
// Use user.id for queries, NEVER accept from caller
```

### Field Mapping (Every Query)

```typescript
// DB → App
const cards = data.map(dbToApp);

// App → DB (insert)
const payload = appToInsert(card, user.id);

// App → DB (update)
const payload = appToUpdate(updates);
```

### Optimistic Update (Every Mutation)

```typescript
// 1. Save original
const original = get().customCards;

// 2. Update immediately
set({ customCards: [...original, tempCard] });

// 3. Try Supabase
try {
  const serverCard = await createCard(card);
  set({
    customCards: get().customCards.map((c) =>
      c.id === tempId ? serverCard : c
    ),
  });
} catch (error) {
  // 4. Rollback on error
  set({ customCards: original });
  throw error;
}
```

### Error Handling

```typescript
// Show user-friendly error
set({ cardsError: 'Failed to create card. Please try again.' });

// Re-throw for caller to handle (e.g., toast notification)
throw error;
```

---

## Success Criteria

### Minimum Viable Product (MVP)

- [x] All documentation complete
- [ ] Database schema with RLS
- [ ] API functions with internal user_id injection
- [ ] Zustand store with optimistic updates
- [ ] Auth-protected dashboard
- [ ] Loading states and error handling
- [ ] Cards persist to Supabase per user

### Nice to Have

- [ ] Realtime sync across devices
- [ ] Rate limiting (client-side)
- [ ] Auto-generated types
- [ ] Retry logic with exponential backoff
- [ ] Conflict resolution (Last-Write-Wins)

### Production Ready

- [ ] All tests passing
- [ ] Security audit complete
- [ ] Performance monitoring
- [ ] Error logging configured
- [ ] User acceptance testing

---

## Documentation Index

### By Topic

**Architecture & Planning:**

- `ARCHITECTURE-DECISION.md` - Why auth-only
- `supabase-custom-cards-plan.json` - 13-task implementation plan
- `IMPLEMENTATION-READINESS.md` (this doc) - Pre-dev checklist

**Security (READ FIRST):**

- `api-security-patterns.md` - user_id injection, attack vectors, testing

**Implementation Guides:**

- `zustand-supabase-store-implementation.md` - Complete store code (600+ lines)
- `field-name-mapping.md` - snake_case ↔ camelCase conversion
- `auth-integration.md` - useAuth hook API
- `auth-and-offline-strategy.md` - Client auth + offline blocking

**Advanced Topics:**

- `supabase-type-generation.md` - Auto-generate types from DB
- `retry-logic-patterns.md` - Network resilience
- `conflict-resolution.md` - Cross-device sync strategies
- `custom-cards-migration-flow.md` - v0→v1 migration (for reference)

---

## Questions or Issues?

1. **Security question?** → Read `api-security-patterns.md`
2. **How to implement X?** → Check task X in `supabase-custom-cards-plan.json`
3. **Field name confusion?** → See `field-name-mapping.md`
4. **Auth flow unclear?** → Read `auth-and-offline-strategy.md`
5. **Store patterns?** → See `zustand-supabase-store-implementation.md`

---

## Ready to Code?

✅ **All documentation complete**
✅ **Security patterns defined**
✅ **No contradictions or gaps**
✅ **Implementation path clear**

**Start with Task 1:** Create Supabase migration for `custom_cards` table

```bash
# 1. Create migration
supabase migration new create_custom_cards_table

# 2. Copy SQL from Task 1 in plan
# 3. Test migration
supabase db reset

# 4. Generate types
npm run db:types

# 5. Proceed to Task 2
```

**Good luck! 🚀**
