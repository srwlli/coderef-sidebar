# Conflict Resolution for Custom Cards

## Overview

When custom cards sync across devices via Supabase Realtime, conflicts can occur when the same card is modified simultaneously on different devices. This document outlines our conflict resolution strategies.

## Conflict Scenarios

### Scenario 1: Cross-Device Edits

```
Device A (laptop):     Edit Card X → title: "New Title"
Device B (phone):      Edit Card X → icon: "Rocket"
                              ↓
                         Who wins?
```

### Scenario 2: Offline Edits

```
Device A (offline):    Edit Card X → Add link
Device B (online):     Edit Card X → Change title
                              ↓
                       Device A comes online
                              ↓
                         Conflict!
```

### Scenario 3: Rapid Sequential Edits

```
t=0ms:  User edits on Device A
t=50ms: Realtime update arrives from Device B
t=100ms: Device A saves to Supabase
                              ↓
                      Race condition!
```

## Resolution Strategies

### Strategy 1: Last-Write-Wins (LWW) - **RECOMMENDED FOR MVP**

**How it works:** The most recent update (by `updated_at` timestamp) always wins.

#### Database Implementation

```sql
-- updated_at is automatically set by trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_custom_cards_updated_at
  before update on custom_cards
  for each row
  execute function update_updated_at_column();
```

#### Application Logic

```typescript
// src/stores/use-app-store.ts

export const useAppStore = create<AppStore>()((set, get) => ({
  updateCustomCard: async (id: string, updates: Partial<CustomCard>) => {
    // Optimistic update
    const previousCards = get().customCards;
    set({
      customCards: previousCards.map((card) =>
        card.id === id ? { ...card, ...updates } : card
      ),
    });

    try {
      // Server update (last-write-wins)
      const updatedCard = await updateCustomCardInSupabase(id, updates);

      // Replace with server version (includes updated_at)
      set({
        customCards: get().customCards.map((card) =>
          card.id === id ? updatedCard : card
        ),
      });
    } catch (error) {
      // Rollback on error
      set({ customCards: previousCards });
      throw error;
    }
  },
}));
```

#### Realtime Handling

```typescript
// src/hooks/use-realtime-cards.ts

useEffect(() => {
  const channel = supabase
    .channel('custom_cards_changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'custom_cards',
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
        const updatedCard = payload.new as CustomCardRow;

        // Get current state
        const currentCards = useAppStore.getState().customCards;
        const localCard = currentCards.find((c) => c.id === updatedCard.id);

        // Last-write-wins: Always accept server update
        set({
          customCards: currentCards.map((card) =>
            card.id === updatedCard.id ? dbToApp(updatedCard) : card
          ),
        });

        // Optional: Notify user if local changes were overwritten
        if (localCard && hasLocalChanges(localCard)) {
          toast.info('Card was updated on another device');
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user?.id]);
```

#### Pros & Cons

**Pros:**

- ✅ Simple to implement
- ✅ No complex merge logic
- ✅ Works well for single-user scenarios
- ✅ Database handles it automatically

**Cons:**

- ❌ Can lose data if simultaneous edits
- ❌ No merge of concurrent changes
- ❌ User may not realize their changes were overwritten

### Strategy 2: Optimistic Locking with Version Numbers

**How it works:** Each card has a version number. Updates fail if version doesn't match.

#### Database Schema

```sql
alter table custom_cards add column version integer default 1;

create or replace function increment_version()
returns trigger as $$
begin
  new.version = old.version + 1;
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger increment_custom_cards_version
  before update on custom_cards
  for each row
  execute function increment_version();
```

#### Application Logic

```typescript
// src/lib/api/custom-cards.ts

export async function updateCustomCardInSupabase(
  id: string,
  updates: Partial<CustomCard>,
  expectedVersion: number
): Promise<CustomCard> {
  const updatePayload = appToUpdate(updates);

  const { data, error } = await supabase
    .from('custom_cards')
    .update(updatePayload)
    .eq('id', id)
    .eq('version', expectedVersion) // Optimistic lock
    .select()
    .single();

  if (error?.code === 'PGRST116') {
    // No rows updated - version mismatch
    throw new ConflictError('Card was modified by another device');
  }

  if (error) throw error;
  return dbToApp(data as CustomCardRow);
}
```

#### Handling Conflicts

```typescript
// src/stores/use-app-store.ts

updateCustomCard: async (id: string, updates: Partial<CustomCard>) => {
  const card = get().customCards.find((c) => c.id === id);
  if (!card) throw new Error('Card not found');

  try {
    const updatedCard = await updateCustomCardInSupabase(
      id,
      updates,
      card.version
    );

    set({
      customCards: get().customCards.map((c) =>
        c.id === id ? updatedCard : c
      ),
    });
  } catch (error) {
    if (error instanceof ConflictError) {
      // Fetch latest version
      const latestCard = await fetchCustomCardById(id);

      // Show conflict dialog to user
      showConflictDialog({
        local: { ...card, ...updates },
        remote: latestCard,
        onResolve: (resolved) => {
          // User chose which version to keep
          updateCustomCard(id, resolved);
        },
      });
    } else {
      throw error;
    }
  }
};
```

#### Pros & Cons

**Pros:**

- ✅ Detects conflicts reliably
- ✅ Prevents silent data loss
- ✅ User can choose resolution

**Cons:**

- ❌ More complex implementation
- ❌ Requires version tracking
- ❌ Extra round-trip on conflict

### Strategy 3: Field-Level Merging

**How it works:** Merge non-conflicting field changes automatically.

#### Merge Logic

```typescript
// src/lib/conflict-resolution.ts

export interface VersionedCard extends CustomCard {
  version: number;
  updatedAt: string;
}

export function mergeCards(
  base: VersionedCard, // Original version
  local: VersionedCard, // Local changes
  remote: VersionedCard // Remote changes
): VersionedCard {
  const merged: VersionedCard = { ...base };

  // Merge title
  if (local.title !== base.title && remote.title !== base.title) {
    // Both changed - conflict
    merged.title = remote.title; // Last-write-wins
  } else if (local.title !== base.title) {
    merged.title = local.title;
  } else if (remote.title !== base.title) {
    merged.title = remote.title;
  }

  // Merge iconName
  if (local.iconName !== base.iconName && remote.iconName !== base.iconName) {
    merged.iconName = remote.iconName; // Last-write-wins
  } else if (local.iconName !== base.iconName) {
    merged.iconName = local.iconName;
  } else if (remote.iconName !== base.iconName) {
    merged.iconName = remote.iconName;
  }

  // Merge links (more complex)
  merged.links = mergeLinks(base.links, local.links, remote.links);

  // Use latest timestamp
  merged.updatedAt =
    remote.updatedAt > local.updatedAt ? remote.updatedAt : local.updatedAt;

  merged.version = Math.max(local.version, remote.version) + 1;

  return merged;
}

function mergeLinks(
  base: CustomLink[],
  local: CustomLink[],
  remote: CustomLink[]
): CustomLink[] {
  // Create map by link ID
  const baseMap = new Map(base.map((l) => [l.id, l]));
  const localMap = new Map(local.map((l) => [l.id, l]));
  const remoteMap = new Map(remote.map((l) => [l.id, l]));

  const allIds = new Set([
    ...baseMap.keys(),
    ...localMap.keys(),
    ...remoteMap.keys(),
  ]);

  const merged: CustomLink[] = [];

  for (const id of allIds) {
    const baseLink = baseMap.get(id);
    const localLink = localMap.get(id);
    const remoteLink = remoteMap.get(id);

    if (!baseLink && localLink && remoteLink) {
      // Both added - keep remote (last-write-wins)
      merged.push(remoteLink);
    } else if (localLink && !remoteLink) {
      // Local added or remote deleted
      if (baseLink) {
        // Remote deleted - respect deletion
      } else {
        // Local added - keep it
        merged.push(localLink);
      }
    } else if (!localLink && remoteLink) {
      // Remote added or local deleted
      if (baseLink) {
        // Local deleted - respect deletion
      } else {
        // Remote added - keep it
        merged.push(remoteLink);
      }
    } else if (localLink && remoteLink) {
      // Both modified - merge fields
      merged.push({
        id,
        label:
          remoteLink.label !== baseLink?.label
            ? remoteLink.label
            : localLink.label,
        href:
          remoteLink.href !== baseLink?.href ? remoteLink.href : localLink.href,
      });
    }
  }

  return merged;
}
```

#### Pros & Cons

**Pros:**

- ✅ Preserves non-conflicting changes
- ✅ Less data loss
- ✅ Better UX for concurrent edits

**Cons:**

- ❌ Very complex logic
- ❌ Hard to reason about
- ❌ May not always produce expected results

### Strategy 4: CRDTs (Conflict-free Replicated Data Types)

**How it works:** Use data structures designed for automatic conflict resolution.

#### Yjs Integration Example

```typescript
// src/lib/crdt/card-sync.ts
import * as Y from 'yjs';
import { SupabaseProvider } from 'y-supabase';

export function setupCRDT(userId: string) {
  // Create Yjs document
  const ydoc = new Y.Doc();

  // Create shared map for cards
  const cards = ydoc.getMap('customCards');

  // Sync with Supabase
  const provider = new SupabaseProvider(ydoc, supabase, {
    table: 'custom_cards_crdt',
    userId,
  });

  // Observe changes
  cards.observe((event) => {
    // Update local state
    const updatedCards = Array.from(cards.values());
    useAppStore.setState({ customCards: updatedCards });
  });

  return { ydoc, cards, provider };
}

// Usage in component
const { cards } = setupCRDT(user.id);

// Update card (CRDT handles conflicts automatically)
cards.set(cardId, updatedCard);
```

#### Pros & Cons

**Pros:**

- ✅ Automatic conflict resolution
- ✅ Mathematically proven correctness
- ✅ Great for collaborative editing
- ✅ No lost updates

**Cons:**

- ❌ Significant complexity
- ❌ Large bundle size
- ❌ Requires CRDT-specific backend
- ❌ Overkill for simple use cases

## Recommended Approach

### For MVP: **Last-Write-Wins** (Strategy 1)

```typescript
// Simple implementation:
// 1. Database trigger maintains updated_at
// 2. Realtime updates always replace local state
// 3. Optional: Toast notification on overwrite
```

**When to use:**

- Single-user scenarios (our current case)
- Low conflict probability
- Simple data structures
- Need fast implementation

### For Future: **Optimistic Locking** (Strategy 2)

Add version numbers when:

- Multi-device usage increases
- Users report lost changes
- Conflicts become common

### For Collaboration: **CRDTs** (Strategy 4)

Consider if we add:

- Multi-user card editing
- Real-time collaboration
- Shared card collections

## User Experience Considerations

### Silent Last-Write-Wins

```typescript
// No user notification - just replace
set({
  customCards: currentCards.map((card) =>
    card.id === updatedCard.id ? dbToApp(updatedCard) : card
  ),
});
```

**Good for:** Low-conflict scenarios, simple changes

### Notification on Conflict

```typescript
if (cardWasLocallyModified && remoteUpdateArrived) {
  toast.info('Card updated on another device', {
    action: {
      label: 'Undo',
      onClick: () => revertToLocalVersion(),
    },
  });
}
```

**Good for:** Moderate conflicts, power users

### Conflict Resolution Dialog

```tsx
// src/components/conflict-dialog.tsx
export function ConflictDialog({ local, remote, onResolve }) {
  return (
    <Dialog>
      <DialogTitle>Conflicting Changes</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3>Your Changes</h3>
            <CardPreview card={local} />
            <Button onClick={() => onResolve(local)}>Keep Mine</Button>
          </div>
          <div>
            <h3>Other Device</h3>
            <CardPreview card={remote} />
            <Button onClick={() => onResolve(remote)}>Keep Theirs</Button>
          </div>
        </div>
        <Button onClick={() => onResolve(mergeCards(local, remote))}>
          Merge Both
        </Button>
      </DialogContent>
    </Dialog>
  );
}
```

**Good for:** High-value data, clear conflicts

## Implementation Checklist

### Phase 1: Last-Write-Wins (MVP)

- [x] Database trigger for `updated_at`
- [ ] Realtime subscription replaces local state
- [ ] Optional: Toast notification on conflict
- [ ] Monitor conflict frequency

### Phase 2: Optimistic Locking (If Needed)

- [ ] Add `version` column to database
- [ ] Implement version checking in updates
- [ ] Handle `ConflictError` in store
- [ ] Add conflict resolution UI

### Phase 3: Advanced (Future)

- [ ] Research CRDT libraries
- [ ] Implement field-level merging
- [ ] Add conflict resolution dialog
- [ ] User preference for conflict strategy

## Testing Conflict Scenarios

### Test 1: Simultaneous Edits

```typescript
// test/conflict-resolution.test.ts
import { describe, it, expect } from 'vitest';

describe('Conflict Resolution', () => {
  it('resolves with last-write-wins', async () => {
    // Device A: Edit card
    await updateCard(cardId, { title: 'Title A' });

    // Device B: Edit same card
    await updateCard(cardId, { title: 'Title B' });

    // Fetch card
    const card = await fetchCard(cardId);

    // Most recent update wins
    expect(card.title).toBe('Title B');
  });

  it('notifies on conflict', async () => {
    const onConflict = vi.fn();

    // Local edit
    updateCardLocally(cardId, { title: 'Local' });

    // Remote update arrives
    handleRealtimeUpdate({ id: cardId, title: 'Remote' });

    expect(onConflict).toHaveBeenCalled();
  });
});
```

### Test 2: Offline Sync

```typescript
it('syncs offline changes on reconnect', async () => {
  // Go offline
  mockOffline();

  // Make changes
  await updateCard(cardId, { title: 'Offline Edit' });

  // Come online
  mockOnline();

  // Changes should sync
  await waitForSync();

  const serverCard = await fetchCardFromDB(cardId);
  expect(serverCard.title).toBe('Offline Edit');
});
```

## Monitoring and Debugging

### Log Conflicts

```typescript
// src/lib/analytics.ts
export function logConflict(type: string, details: any) {
  console.warn('[Conflict]', type, details);

  // Send to analytics
  analytics.track('conflict_detected', {
    type,
    cardId: details.cardId,
    strategy: 'last-write-wins',
    timestamp: new Date().toISOString(),
  });
}
```

### Dashboard Metrics

Track:

- Conflict frequency per user
- Conflict resolution time
- Data loss incidents
- User complaints about lost changes

## See Also

- `docs/zustand-supabase-store-implementation.md` - Store implementation
- `docs/retry-logic-patterns.md` - Network resilience
- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
- [CRDTs Explained](https://crdt.tech/)
