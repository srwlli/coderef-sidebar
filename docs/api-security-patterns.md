# API Security Patterns for Custom Cards

## Critical Security Rule: Internal user_id Injection

**⚠️ SECURITY WARNING**: All API functions MUST obtain `user_id` internally from the authenticated session. NEVER accept `user_id` as a parameter from the caller.

## Why This Matters

### The Risk: Data Forgery

```typescript
// ❌ INSECURE - NEVER DO THIS
export async function createCustomCard(
  card: CustomCard,
  userId: string // ← DANGEROUS: caller can forge this
): Promise<CustomCard> {
  const { data, error } = await supabase
    .from('custom_cards')
    .insert({
      user_id: userId, // ← Attacker could pass ANY user_id
      title: card.title,
      icon_name: card.iconName,
      links: card.links,
    })
    .select()
    .single();

  if (error) throw error;
  return dbToApp(data);
}

// Malicious usage:
await createCustomCard(myCard, 'victim-user-id-123'); // ← Creates card for VICTIM!
```

**Attack Vector**: Malicious client code could pass any `user_id`, creating/reading/updating/deleting other users' data.

### The Solution: Internal Retrieval

```typescript
// ✅ SECURE - ALWAYS DO THIS
export async function createCustomCard(
  card: Omit<CustomCard, 'id' | 'createdAt'>
  // NO userId parameter
): Promise<CustomCard> {
  if (!supabase) throw new Error('Supabase not configured');

  // Get user from authenticated session (NOT from caller)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Fail immediately if no authenticated user
  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  // Convert app model to database format
  const insertPayload = appToInsert(card, user.id); // ← user.id from session

  // Insert with user_id from authenticated session
  const { data, error } = await supabase
    .from('custom_cards')
    .insert(insertPayload)
    .select()
    .single();

  if (error) throw error;

  // Convert database row to app model
  return dbToApp(data as CustomCardRow);
}
```

**Security Guarantee**: `user.id` comes from Supabase's authenticated session (JWT token), which cannot be forged.

## Implementation Pattern for All CRUD Operations

### CREATE (Insert)

```typescript
export async function createCustomCardInSupabase(
  card: Omit<CustomCard, 'id' | 'createdAt'>
): Promise<CustomCard> {
  if (!supabase) throw new Error('Supabase not configured');

  // 1. Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // 2. Inject user_id from session
  const insertPayload = appToInsert(card, user.id);

  // 3. Insert to database
  const { data, error } = await supabase
    .from('custom_cards')
    .insert(insertPayload)
    .select()
    .single();

  if (error) throw error;

  // 4. Return app-formatted result
  return dbToApp(data as CustomCardRow);
}
```

### READ (Select)

```typescript
export async function fetchCustomCardsFromSupabase(): Promise<CustomCard[]> {
  if (!supabase) throw new Error('Supabase not configured');

  // 1. Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // 2. Query with user_id from session
  const { data, error } = await supabase
    .from('custom_cards')
    .select('*')
    .eq('user_id', user.id) // ← Filter by authenticated user
    .order('created_at', { ascending: true });

  if (error) throw error;

  // 3. Convert all rows to app format
  return (data as CustomCardRow[]).map(dbToApp);
}
```

### UPDATE

```typescript
export async function updateCustomCardInSupabase(
  id: string,
  updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
): Promise<CustomCard> {
  if (!supabase) throw new Error('Supabase not configured');

  // 1. Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // 2. Convert updates to database format
  const updatePayload = appToUpdate(updates);

  // 3. Update with BOTH id AND user_id check
  const { data, error } = await supabase
    .from('custom_cards')
    .update(updatePayload)
    .eq('id', id)
    .eq('user_id', user.id) // ← Defense in depth: double-check ownership
    .select()
    .single();

  if (error) throw error;

  // 4. Return updated card
  return dbToApp(data as CustomCardRow);
}
```

### DELETE

```typescript
export async function deleteCustomCardFromSupabase(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');

  // 1. Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // 2. Delete with BOTH id AND user_id check
  const { error } = await supabase
    .from('custom_cards')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id); // ← Prevent deleting other users' cards

  if (error) throw error;
}
```

## Defense in Depth: Multiple Security Layers

### Layer 1: Row Level Security (RLS) at Database

```sql
-- RLS Policy: Users can only select their own cards
create policy "Users can view own custom cards"
  on public.custom_cards
  for select
  using (auth.uid() = user_id);

-- Even if API code is buggy, database blocks cross-user access
```

**How it works:**

- Supabase attaches JWT token to all requests
- `auth.uid()` extracts user ID from JWT
- Database automatically filters queries by `auth.uid() = user_id`

### Layer 2: API-Level user_id Injection

```typescript
// API ensures user_id comes from authenticated session
const {
  data: { user },
} = await supabase.auth.getUser();
const insertPayload = { ...card, user_id: user.id };
```

**How it works:**

- `supabase.auth.getUser()` reads from JWT token (stored in memory/localStorage)
- JWT is cryptographically signed by Supabase (cannot be forged)
- Even if RLS fails, API prevents wrong user_id

### Layer 3: Explicit WHERE Clauses

```typescript
// Extra check: Filter by user_id in WHERE clause
.eq('user_id', user.id)
```

**How it works:**

- Adds explicit user_id filter to query
- Redundant with RLS, but provides clarity in code
- Useful for debugging (can see filter in logs)

## Common Mistakes to Avoid

### ❌ Mistake 1: Accepting user_id from caller

```typescript
// WRONG
export async function createCard(card: CustomCard, userId: string) {
  // userId could be forged
}
```

**Fix:** Remove userId parameter, get from `supabase.auth.getUser()`

### ❌ Mistake 2: Trusting client-side user object

```typescript
// WRONG
const { user } = useAuth(); // Client hook
await createCard(card, user.id); // User object from React state could be stale
```

**Fix:** API should call `supabase.auth.getUser()` directly

### ❌ Mistake 3: Skipping auth check

```typescript
// WRONG
export async function fetchCards() {
  const { data } = await supabase.from('custom_cards').select('*');
  // No user check - would return ALL cards (blocked by RLS, but bad practice)
}
```

**Fix:** Always get user first, throw if null

### ❌ Mistake 4: Using stale session

```typescript
// WRONG
let cachedUser = null;

export async function createCard(card) {
  if (!cachedUser) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    cachedUser = user; // Cache could become stale
  }
  // Use cachedUser...
}
```

**Fix:** Always call `supabase.auth.getUser()` fresh (it's cached internally by SDK)

## Type Safety for Security

### TypeScript Types Enforce Correct Patterns

```typescript
// Field mapping types prevent user_id in app layer
export interface CustomCard {
  id: string;
  title: string;
  iconName: string;
  links: CustomLink[];
  createdAt: string;
  // NO user_id - not exposed to app layer
}

// Database types include user_id
export interface CustomCardRow {
  id: string;
  user_id: string; // ← Only in DB layer
  title: string;
  icon_name: string;
  links: CustomLink[];
  created_at: string;
  updated_at: string;
}

// Insert type requires user_id (provided by API, not caller)
export interface CustomCardInsert {
  user_id: string; // ← API provides this from auth.getUser()
  title: string;
  icon_name: string;
  links: CustomLink[];
}
```

### Conversion Functions Ensure Correct Flow

```typescript
// app → DB: Requires explicit userId (from auth.getUser())
export function appToInsert(
  card: Omit<CustomCard, 'id' | 'createdAt'>,
  userId: string // ← Must be provided by API, not caller
): CustomCardInsert {
  return {
    user_id: userId,
    title: card.title,
    icon_name: card.iconName,
    links: card.links,
  };
}

// DB → app: Strips user_id (not needed in app)
export function dbToApp(row: CustomCardRow): CustomCard {
  return {
    id: row.id,
    // user_id NOT included
    title: row.title,
    iconName: row.icon_name,
    links: row.links,
    createdAt: row.created_at,
    // updated_at NOT included
  };
}
```

## Security Checklist for Implementation

Before implementing each API function, verify:

- [ ] Function does NOT accept `userId` parameter from caller
- [ ] Function calls `supabase.auth.getUser()` at the start
- [ ] Function throws error if `user` is null/undefined
- [ ] INSERT operations use `user.id` from `auth.getUser()`
- [ ] SELECT operations filter by `user.id` from `auth.getUser()`
- [ ] UPDATE operations include `.eq('user_id', user.id)`
- [ ] DELETE operations include `.eq('user_id', user.id)`
- [ ] RLS policies are enabled on `custom_cards` table
- [ ] Type signatures match security-conscious patterns

## Testing Security

### Unit Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { createCustomCardInSupabase } from '@/lib/api/custom-cards';

describe('API Security', () => {
  it('throws if not authenticated', async () => {
    // Mock: No authenticated user
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: null },
      error: null,
    });

    await expect(
      createCustomCardInSupabase({ title: 'Test', iconName: 'Star', links: [] })
    ).rejects.toThrow('Not authenticated');
  });

  it('uses authenticated user_id, not caller-provided', async () => {
    const mockUser = { id: 'auth-user-123' };

    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const insertSpy = vi.spyOn(supabase.from('custom_cards'), 'insert');

    await createCustomCardInSupabase({
      title: 'Test',
      iconName: 'Star',
      links: [],
    });

    // Verify insert used auth user_id
    expect(insertSpy).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: 'auth-user-123' })
    );
  });
});
```

### Manual Security Testing

1. **Test RLS policies:**

   ```sql
   -- As user A, try to read user B's cards
   SELECT * FROM custom_cards WHERE user_id = 'user-b-id';
   -- Should return 0 rows (blocked by RLS)
   ```

2. **Test API without auth:**

   ```typescript
   // Sign out
   await supabase.auth.signOut();

   // Try to create card
   await createCustomCardInSupabase({ title: 'Test', ... });
   // Should throw "Not authenticated"
   ```

3. **Test API with expired token:**

   ```typescript
   // Manually expire token in localStorage
   localStorage.setItem('supabase.auth.token', 'expired-token');

   // Try to create card
   await createCustomCardInSupabase({ title: 'Test', ... });
   // Should throw authentication error
   ```

## Summary

### Golden Rules

1. **NEVER** accept `user_id` from caller
2. **ALWAYS** call `supabase.auth.getUser()` in every API function
3. **ALWAYS** check if `user` is null before proceeding
4. **ALWAYS** include `.eq('user_id', user.id)` in UPDATE/DELETE
5. **ALWAYS** rely on RLS as final defense layer

### Security Model

```
Caller (Zustand Store)
  ↓
  Calls API function (NO userId param)
  ↓
API Function
  ↓
  1. supabase.auth.getUser() → JWT token → user.id
  2. Inject user.id into query
  3. Send to Supabase
  ↓
Supabase Database
  ↓
  1. Extract auth.uid() from JWT
  2. Apply RLS policies (user_id = auth.uid())
  3. Return filtered results
  ↓
API Function
  ↓
  Convert DB format to app format (strip user_id)
  ↓
Return to Caller
```

## See Also

- `docs/field-name-mapping.md` - Conversion functions (appToInsert, dbToApp)
- `docs/auth-integration.md` - useAuth hook and auth context
- `supabase-custom-cards-plan.json` - Task 5: API Security section
- `docs/auth-and-offline-strategy.md` - Auth state and token management
