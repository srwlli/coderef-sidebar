# Custom Cards Migration Flow

## Overview

This document describes the complete migration path for custom cards from localStorage to Supabase, including the existing href→links schema migration.

## Migration Stages

### Stage 0: Legacy Format (Before Multiple Links)

**Storage:** `localStorage['app-storage']`

**Schema:**

```typescript
{
  version: 0,
  state: {
    customCards: [
      {
        id: string,
        title: string,
        href: string,        // Single URL only
        iconName: string,
        createdAt: string
      }
    ]
  }
}
```

---

### Stage 1: Links Array Format (Current)

**Trigger:** Zustand persist loads from localStorage

**Migration:** `v0 → v1` (href → links)

**Schema:**

```typescript
{
  version: 1,
  state: {
    customCards: [
      {
        id: string,
        title: string,
        links: [              // Multiple links supported
          {
            id: string,
            label: string,
            href: string
          }
        ],
        iconName: string,
        createdAt: string
      }
    ]
  }
}
```

**Migration Code:** (src/stores/use-app-store.ts:93-141)

```typescript
if (version === 0 && persistedState && typeof persistedState === 'object') {
  // Convert single href to links array
  return {
    ...state,
    customCards: cards.map((card) => {
      if ('href' in cardObj && !('links' in cardObj)) {
        return {
          ...cardObj,
          links: [
            {
              id: uuidv4(),
              label: 'Open',
              href: cardObj.href,
            },
          ],
        };
      }
      return card;
    }),
  } as AppStore;
}
```

**Status:** ✅ Implemented and running

---

### Stage 2: Supabase Migration (To Be Implemented)

**Trigger:** User signs in for first time with localStorage cards

**Storage:** Supabase `public.custom_cards` table

**Schema:**

```sql
CREATE TABLE public.custom_cards (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  title text,
  icon_name text,              -- snake_case in DB
  links jsonb,                 -- Array stored as JSONB
  created_at timestamptz,
  updated_at timestamptz
);
```

**Migration Function:**

```typescript
// src/lib/migrate-cards-to-supabase.ts
export async function migrateLocalStorageCardsToSupabase(userId: string) {
  // 1. Read from Zustand store (already at v1 after Stage 1)
  const localCards = useAppStore.getState().customCards;

  // 2. Check if migration already happened
  const migrated = localStorage.getItem('supabase-migration-complete');
  if (migrated === 'true' || localCards.length === 0) {
    return;
  }

  try {
    // 3. Batch insert to Supabase (already v1 format with links array)
    await Promise.all(
      localCards.map((card) =>
        createCustomCard({
          user_id: userId,
          title: card.title,
          icon_name: card.iconName, // camelCase → snake_case
          links: card.links,
        })
      )
    );

    // 4. Mark migration complete
    localStorage.setItem('supabase-migration-complete', 'true');

    // 5. Clear localStorage cards (keep other state)
    useAppStore.setState({ customCards: [] });
  } catch (error) {
    console.error('Migration failed:', error);
    throw error; // Don't mark as complete on failure
  }
}
```

**Trigger Point:** (src/lib/auth-context.tsx)

```typescript
useEffect(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      // Migrate localStorage cards to Supabase
      await migrateLocalStorageCardsToSupabase(session.user.id);

      // Then fetch from Supabase
      await fetchCustomCards();
    }
  });
}, []);
```

---

### Stage 3: Supabase-Only (Future State)

**Trigger:** User signs in (no localStorage cards)

**Flow:**

```
1. User signs in
2. Check migration flag: 'supabase-migration-complete' = true
3. Skip migration
4. Fetch cards from Supabase
5. Load into Zustand store
```

**Zustand Store Behavior:**

```typescript
// Auth user
customCards: [],                    // Fetched from Supabase
persist: false,                     // Don't persist to localStorage

// Guest user
customCards: [],                    // Managed in localStorage
persist: true,                      // Persist to localStorage via Zustand
```

---

## Complete Migration Timeline

### Scenario A: Existing User (v0 cards in localStorage)

```
1. App loads
   └─> Zustand reads localStorage
       └─> Detects version: 0
           └─> Runs v0→v1 migration (href → links)
               └─> Cards now have links array in localStorage

2. User signs in
   └─> Auth context detects SIGNED_IN event
       └─> Checks localStorage for cards
           └─> Found 3 cards (v1 format)
               └─> Runs migrateLocalStorageCardsToSupabase()
                   ├─> Inserts 3 cards to Supabase
                   ├─> Sets migration flag = 'true'
                   └─> Clears customCards from localStorage

3. Future sessions
   └─> User signs in
       └─> Migration flag = 'true'
           └─> Skip migration
               └─> Fetch from Supabase directly
```

### Scenario B: New User (No localStorage)

```
1. App loads
   └─> Zustand reads localStorage
       └─> No cards found
           └─> customCards: []

2. User signs in
   └─> Auth context detects SIGNED_IN event
       └─> Checks localStorage for cards
           └─> No cards found
               └─> Skip migration
                   └─> Fetch from Supabase (empty)

3. User creates card via UI
   └─> Calls addCustomCard()
       └─> Inserts to Supabase
           └─> Updates Zustand state
```

### Scenario C: Guest User (No Auth)

```
1. App loads
   └─> Zustand reads localStorage
       └─> May have v0 or v1 cards
           └─> v0→v1 migration runs if needed

2. User stays signed out
   └─> All cards managed via localStorage
       └─> Zustand persist = true
           └─> Changes saved to localStorage

3. User creates/edits cards
   └─> Updates localStorage only
       └─> No Supabase interaction
```

---

## Migration Safety Checks

### 1. Idempotency

```typescript
// Migration can run multiple times safely
if (localStorage.getItem('supabase-migration-complete') === 'true') {
  return; // Already migrated
}
```

### 2. Rollback on Failure

```typescript
try {
  await migrateToSupabase();
  localStorage.setItem('supabase-migration-complete', 'true');
} catch (error) {
  // Don't set flag - allows retry on next sign-in
  console.error('Migration failed, will retry next sign-in');
}
```

### 3. Data Integrity

```typescript
// Verify card count matches before clearing localStorage
const insertedCount = await countSupabaseCards(userId);
if (insertedCount === localCards.length) {
  clearLocalStorageCards();
} else {
  throw new Error('Card count mismatch - migration incomplete');
}
```

---

## State Management Strategy

### Auth Users (Supabase)

```typescript
{
  customCards: [],           // Fetched from Supabase
  _hasHydrated: true,
  _persistState: {
    version: 1,
    rehydrated: true
  }
}

// Zustand persist config
partialize: (state) => {
  const { user } = useAuth();
  if (user) {
    // Don't persist customCards for auth users
    return {
      view: state.view,
      sidebarOpen: state.sidebarOpen,
      // Exclude customCards
    };
  } else {
    // Persist everything for guest users
    return {
      view: state.view,
      sidebarOpen: state.sidebarOpen,
      customCards: state.customCards,
    };
  }
}
```

### Guest Users (localStorage)

```typescript
{
  customCards: [/* cards */],  // Managed via Zustand persist
  _hasHydrated: true,
  _persistState: {
    version: 1,
    rehydrated: true
  }
}
```

---

## Testing Checklist

### v0 → v1 Migration

- [ ] v0 cards with single `href` convert to `links` array
- [ ] Migration preserves `id`, `title`, `iconName`, `createdAt`
- [ ] Default label is "Open"
- [ ] Migration only runs once per app load
- [ ] Invalid cards are skipped gracefully

### localStorage → Supabase Migration

- [ ] Migration runs on first sign-in
- [ ] All localStorage cards inserted to Supabase
- [ ] Migration flag prevents duplicate migrations
- [ ] localStorage cleared after successful migration
- [ ] Failed migration allows retry on next sign-in
- [ ] Card count verified before clearing localStorage

### Hybrid State Management

- [ ] Auth users fetch from Supabase (not localStorage)
- [ ] Guest users persist to localStorage
- [ ] Sign-out clears Supabase cards from state
- [ ] Sign-in triggers migration + fetch
- [ ] State updates correctly on auth changes

---

## Files Modified/Created

| File                                       | Purpose                         | Status       |
| ------------------------------------------ | ------------------------------- | ------------ |
| `src/stores/use-app-store.ts:93-141`       | v0→v1 migration                 | ✅ Existing  |
| `src/lib/migrate-cards-to-supabase.ts`     | localStorage→Supabase migration | 🔴 To Create |
| `src/lib/auth-context.tsx`                 | Trigger migration on sign-in    | 🟡 To Update |
| `src/stores/use-app-store.ts`              | Conditional persist logic       | 🟡 To Update |
| `supabase/migrations/001_custom_cards.sql` | Database schema                 | 🔴 To Create |

---

## FAQ

### Q: What happens if migration fails mid-way?

**A:** The migration flag is only set after successful completion. Failed migrations will retry on next sign-in. Consider adding a migration attempt counter to prevent infinite retries.

### Q: Can users have both localStorage and Supabase cards?

**A:** No. Once migrated, only Supabase is used. Guest users only use localStorage.

### Q: What if a user signs out after migration?

**A:** Their cards remain in Supabase. Sign-out clears the local Zustand state but doesn't delete from database.

### Q: Can migration be reversed?

**A:** Not automatically. Users can export cards before migrating, or implement a "Download my data" feature.

### Q: How do we handle concurrent edits during migration?

**A:** Migration happens synchronously before first fetch. Lock UI with loading state during migration to prevent edits.

---

## Next Steps

1. ✅ Document migration flow (this file)
2. ⏭️ Implement `migrateLocalStorageCardsToSupabase()`
3. ⏭️ Update `auth-context.tsx` to trigger migration
4. ⏭️ Add conditional persist logic to Zustand store
5. ⏭️ Test all migration scenarios
