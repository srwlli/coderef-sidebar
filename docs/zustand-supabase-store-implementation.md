# Zustand Store with Supabase Integration - Complete Implementation

## Overview

This document provides the complete implementation for Task 6: integrating Supabase into the Zustand store while maintaining localStorage fallback for guest users.

## Store Interface Updates

### Current Interface (localStorage only)

```typescript
export interface AppStore {
  // Existing state
  customCards: CustomCard[];
  addCustomCard: (card: Omit<CustomCard, 'id' | 'createdAt'>) => void;
  updateCustomCard: (
    id: string,
    updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
  ) => void;
  deleteCustomCard: (id: string) => void;
}
```

### New Interface (Supabase + localStorage)

```typescript
export interface AppStore {
  // Custom cards state
  customCards: CustomCard[];

  // Loading & error states
  isLoadingCards: boolean;
  cardsError: string | null;

  // Async actions (Supabase)
  fetchCustomCards: () => Promise<void>;
  addCustomCard: (card: Omit<CustomCard, 'id' | 'createdAt'>) => Promise<void>;
  updateCustomCard: (
    id: string,
    updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
  ) => Promise<void>;
  deleteCustomCard: (id: string) => Promise<void>;

  // Sync actions (localStorage fallback)
  addCustomCardLocal: (card: Omit<CustomCard, 'id' | 'createdAt'>) => void;
  updateCustomCardLocal: (
    id: string,
    updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
  ) => void;
  deleteCustomCardLocal: (id: string) => void;

  // Utility
  clearCardsError: () => void;

  // ... existing state (view, sidebar, etc.)
}
```

## Complete Implementation

### src/stores/use-app-store.ts

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import {
  fetchCustomCardsFromSupabase,
  createCustomCardInSupabase,
  updateCustomCardInSupabase,
  deleteCustomCardFromSupabase,
} from '@/lib/api/custom-cards';

export interface CustomLink {
  id: string;
  label: string;
  href: string;
}

export interface CustomCard {
  id: string;
  title: string;
  links: CustomLink[];
  iconName: string;
  createdAt: string;
}

export interface AppStore {
  // Copy button tracking (global state for "last copied" indicator)
  lastCopiedId: string | null;
  setLastCopied: (id: string) => void;
  clearLastCopied: () => void;

  // View preference (grid vs list)
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;

  // Sidebar state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Custom dashboard cards
  customCards: CustomCard[];
  isLoadingCards: boolean;
  cardsError: string | null;

  // Async actions (Supabase for auth users)
  fetchCustomCards: () => Promise<void>;
  addCustomCard: (card: Omit<CustomCard, 'id' | 'createdAt'>) => Promise<void>;
  updateCustomCard: (
    id: string,
    updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
  ) => Promise<void>;
  deleteCustomCard: (id: string) => Promise<void>;

  // Sync actions (localStorage for guest users)
  addCustomCardLocal: (card: Omit<CustomCard, 'id' | 'createdAt'>) => void;
  updateCustomCardLocal: (
    id: string,
    updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
  ) => void;
  deleteCustomCardLocal: (id: string) => void;

  // Utility
  clearCardsError: () => void;
}

/**
 * Helper: Check if user is authenticated
 */
async function isAuthenticated(): Promise<boolean> {
  if (!supabase) return false;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return !!user;
}

/**
 * Global app store using Zustand with conditional persistence
 */
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Copy button state
      lastCopiedId: null,
      setLastCopied: (id) => set({ lastCopiedId: id }),
      clearLastCopied: () => set({ lastCopiedId: null }),

      // View preference state
      view: 'grid',
      setView: (view) => set({ view }),

      // Sidebar state
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),

      // Custom cards state
      customCards: [],
      isLoadingCards: false,
      cardsError: null,

      /**
       * Fetch custom cards from Supabase (auth users only)
       */
      fetchCustomCards: async () => {
        // Check auth
        const authed = await isAuthenticated();
        if (!authed) {
          console.warn('fetchCustomCards called without authentication');
          return;
        }

        set({ isLoadingCards: true, cardsError: null });

        try {
          const cards = await fetchCustomCardsFromSupabase();
          set({ customCards: cards, isLoadingCards: false });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Failed to fetch cards';
          set({ cardsError: message, isLoadingCards: false });
          console.error('Error fetching custom cards:', error);
        }
      },

      /**
       * Add custom card (async - Supabase)
       * Uses optimistic updates for better UX
       */
      addCustomCard: async (card) => {
        // Check auth
        const authed = await isAuthenticated();
        if (!authed) {
          console.warn(
            'addCustomCard called without authentication - use addCustomCardLocal instead'
          );
          return;
        }

        // Generate temp ID for optimistic update
        const tempId = `temp-${uuidv4()}`;
        const tempCard: CustomCard = {
          ...card,
          id: tempId,
          createdAt: new Date().toISOString(),
        };

        // Optimistic update
        set({
          customCards: [...get().customCards, tempCard],
          cardsError: null,
        });

        try {
          // Insert to Supabase
          const serverCard = await createCustomCardInSupabase(card);

          // Replace temp card with server card
          set({
            customCards: get().customCards.map((c) =>
              c.id === tempId ? serverCard : c
            ),
          });
        } catch (error) {
          // Rollback optimistic update
          set({
            customCards: get().customCards.filter((c) => c.id !== tempId),
            cardsError:
              error instanceof Error ? error.message : 'Failed to add card',
          });
          console.error('Error adding custom card:', error);
          throw error; // Re-throw for UI error handling
        }
      },

      /**
       * Update custom card (async - Supabase)
       * Uses optimistic updates
       */
      updateCustomCard: async (id, updates) => {
        // Check auth
        const authed = await isAuthenticated();
        if (!authed) {
          console.warn(
            'updateCustomCard called without authentication - use updateCustomCardLocal instead'
          );
          return;
        }

        // Store original card for rollback
        const originalCard = get().customCards.find((c) => c.id === id);
        if (!originalCard) {
          console.error(`Card ${id} not found`);
          return;
        }

        // Optimistic update
        set({
          customCards: get().customCards.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
          cardsError: null,
        });

        try {
          // Update in Supabase
          await updateCustomCardInSupabase(id, updates);
        } catch (error) {
          // Rollback optimistic update
          set({
            customCards: get().customCards.map((c) =>
              c.id === id ? originalCard : c
            ),
            cardsError:
              error instanceof Error ? error.message : 'Failed to update card',
          });
          console.error('Error updating custom card:', error);
          throw error;
        }
      },

      /**
       * Delete custom card (async - Supabase)
       * Uses optimistic updates
       */
      deleteCustomCard: async (id) => {
        // Check auth
        const authed = await isAuthenticated();
        if (!authed) {
          console.warn(
            'deleteCustomCard called without authentication - use deleteCustomCardLocal instead'
          );
          return;
        }

        // Store original card for rollback
        const originalCard = get().customCards.find((c) => c.id === id);
        if (!originalCard) {
          console.error(`Card ${id} not found`);
          return;
        }

        // Optimistic update
        set({
          customCards: get().customCards.filter((c) => c.id !== id),
          cardsError: null,
        });

        try {
          // Delete from Supabase
          await deleteCustomCardFromSupabase(id);
        } catch (error) {
          // Rollback optimistic update
          set({
            customCards: [...get().customCards, originalCard],
            cardsError:
              error instanceof Error ? error.message : 'Failed to delete card',
          });
          console.error('Error deleting custom card:', error);
          throw error;
        }
      },

      /**
       * Add custom card (sync - localStorage)
       * Used for guest users
       */
      addCustomCardLocal: (card) => {
        const newCard: CustomCard = {
          ...card,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        set({ customCards: [...get().customCards, newCard] });
      },

      /**
       * Update custom card (sync - localStorage)
       * Used for guest users
       */
      updateCustomCardLocal: (id, updates) => {
        set({
          customCards: get().customCards.map((card) =>
            card.id === id ? { ...card, ...updates } : card
          ),
        });
      },

      /**
       * Delete custom card (sync - localStorage)
       * Used for guest users
       */
      deleteCustomCardLocal: (id) => {
        set({
          customCards: get().customCards.filter((card) => card.id !== id),
        });
      },

      /**
       * Clear error state
       */
      clearCardsError: () => set({ cardsError: null }),
    }),
    {
      name: 'app-storage',
      version: 1,

      /**
       * Migration: v0 (single href) → v1 (links array)
       */
      migrate: (
        persistedState: unknown,
        version: number
      ): AppStore | undefined => {
        if (
          version === 0 &&
          persistedState &&
          typeof persistedState === 'object'
        ) {
          try {
            const state = persistedState as Record<string, unknown>;
            const cards = Array.isArray(state.customCards)
              ? state.customCards
              : [];

            return {
              ...state,
              customCards: cards.map((card: unknown) => {
                if (card && typeof card === 'object') {
                  const cardObj = card as Record<string, unknown>;
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
                }
                return card;
              }),
            } as AppStore;
          } catch (error) {
            console.error('Custom card migration failed:', error);
            return {
              ...(persistedState as unknown as AppStore),
              customCards: [],
            };
          }
        }
        return persistedState as AppStore | undefined;
      },

      /**
       * Conditional persistence:
       * - Auth users: Don't persist customCards (fetched from Supabase)
       * - Guest users: Persist customCards (localStorage only)
       */
      partialize: (state) => {
        // We can't check auth synchronously here, so we persist everything
        // and rely on fetchCustomCards to override on auth
        return {
          view: state.view,
          sidebarOpen: state.sidebarOpen,
          customCards: state.customCards, // Always persist, auth users override on fetch
        };
      },
    }
  )
);
```

## Usage Patterns

### For Authenticated Users

```typescript
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useAppStore } from '@/stores/use-app-store';

export function Dashboard() {
  const { user } = useAuth();
  const {
    customCards,
    isLoadingCards,
    cardsError,
    fetchCustomCards,
    addCustomCard,
    updateCustomCard,
    deleteCustomCard,
  } = useAppStore();

  // Fetch cards on mount if authenticated
  useEffect(() => {
    if (user) {
      fetchCustomCards();
    }
  }, [user?.id, fetchCustomCards]);

  const handleAddCard = async (data: any) => {
    try {
      await addCustomCard(data);
      // Success! Optimistic update already applied
    } catch (error) {
      // Error! Already rolled back, show toast
      toast.error('Failed to add card');
    }
  };

  if (isLoadingCards) {
    return <Skeleton />;
  }

  if (cardsError) {
    return (
      <ErrorState
        message={cardsError}
        onRetry={fetchCustomCards}
      />
    );
  }

  return (
    <div>
      {customCards.map(card => (
        <CardItem
          key={card.id}
          card={card}
          onUpdate={(updates) => updateCustomCard(card.id, updates)}
          onDelete={() => deleteCustomCard(card.id)}
        />
      ))}
    </div>
  );
}
```

### For Guest Users

```typescript
'use client';

import { useAppStore } from '@/stores/use-app-store';

export function GuestDashboard() {
  const {
    customCards,
    addCustomCardLocal,
    updateCustomCardLocal,
    deleteCustomCardLocal,
  } = useAppStore();

  // No fetch needed - localStorage auto-hydrated by Zustand persist

  const handleAddCard = (data: any) => {
    addCustomCardLocal(data);
    // Synchronous - no error handling needed
  };

  return (
    <div>
      {customCards.map(card => (
        <CardItem
          key={card.id}
          card={card}
          onUpdate={(updates) => updateCustomCardLocal(card.id, updates)}
          onDelete={() => deleteCustomCardLocal(card.id)}
        />
      ))}
    </div>
  );
}
```

### Unified Hook (Recommended)

```typescript
// src/hooks/use-custom-cards.ts
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useAppStore } from '@/stores/use-app-store';

export function useCustomCards() {
  const { user } = useAuth();
  const {
    customCards,
    isLoadingCards,
    cardsError,
    fetchCustomCards,
    addCustomCard,
    updateCustomCard,
    deleteCustomCard,
    addCustomCardLocal,
    updateCustomCardLocal,
    deleteCustomCardLocal,
    clearCardsError,
  } = useAppStore();

  // Auto-fetch on auth
  useEffect(() => {
    if (user) {
      fetchCustomCards();
    }
  }, [user?.id]);

  // Return appropriate methods based on auth state
  return {
    cards: customCards,
    isLoading: isLoadingCards,
    error: cardsError,
    clearError: clearCardsError,

    // Automatically use async or sync based on auth
    addCard: user ? addCustomCard : addCustomCardLocal,
    updateCard: user
      ? updateCustomCard
      : (id: string, updates: any) => updateCustomCardLocal(id, updates),
    deleteCard: user ? deleteCustomCard : deleteCustomCardLocal,
  };
}
```

### Using the Unified Hook

```typescript
'use client';

import { useCustomCards } from '@/hooks/use-custom-cards';

export function Dashboard() {
  const { cards, isLoading, error, addCard, updateCard, deleteCard } = useCustomCards();

  // Works for both auth and guest users!
  const handleAddCard = async (data: any) => {
    try {
      await addCard(data); // async for auth, sync for guest
    } catch (error) {
      // Only triggered for auth users
      toast.error('Failed to add card');
    }
  };

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      {cards.map(card => (
        <CardItem
          key={card.id}
          card={card}
          onUpdate={(updates) => updateCard(card.id, updates)}
          onDelete={() => deleteCard(card.id)}
        />
      ))}
    </div>
  );
}
```

## State Flow Diagrams

### Guest User Flow

```
1. App loads
   └─> Zustand persist rehydrates from localStorage
       └─> customCards populated from localStorage
           └─> Render cards

2. User adds card
   └─> addCustomCardLocal()
       └─> Update Zustand state
           └─> Zustand persist saves to localStorage
               └─> Render new card
```

### Authenticated User Flow

```
1. App loads
   └─> Zustand persist rehydrates from localStorage
       └─> customCards may have old data

2. Auth provider detects user
   └─> useCustomCards hook calls fetchCustomCards()
       └─> isLoadingCards = true
           └─> Fetch from Supabase
               └─> Replace customCards with server data
                   └─> isLoadingCards = false
                       └─> Render cards

3. User adds card
   └─> addCustomCard()
       └─> Optimistic: Add temp card to state
           └─> Render temp card immediately
               └─> Insert to Supabase
                   ├─> Success: Replace temp with server card
                   └─> Failure: Remove temp card + show error
```

## Error Handling

### Network Errors

```typescript
try {
  await addCustomCard(data);
} catch (error) {
  if (error.message.includes('network')) {
    toast.error('Network error - please check connection');
  } else if (error.message.includes('auth')) {
    toast.error('Session expired - please sign in again');
  } else {
    toast.error('Failed to add card');
  }
}
```

### Auth State Changes

```typescript
// In auth-context.tsx
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Clear Supabase cards from state
    useAppStore.setState({ customCards: [] });
  }

  if (event === 'SIGNED_IN') {
    // Trigger fetch (will happen via useEffect in useCustomCards)
  }
});
```

## Testing Checklist

- [ ] Guest user can add/edit/delete cards via localStorage
- [ ] Auth user can add/edit/delete cards via Supabase
- [ ] Optimistic updates apply immediately
- [ ] Failed operations rollback correctly
- [ ] Error messages display appropriately
- [ ] Loading states show during async operations
- [ ] Sign-out clears Supabase cards from state
- [ ] Sign-in triggers fetch from Supabase
- [ ] localStorage migration (v0→v1) still works
- [ ] Supabase migration (Task 9) integrates correctly

## Performance Considerations

1. **Debounce updates** - Batch rapid edits
2. **Cache Supabase responses** - Use React Query for caching
3. **Lazy load cards** - Paginate if >50 cards
4. **Optimistic UI** - Already implemented via temp IDs

## Security Considerations

1. **RLS enforced** - Supabase handles user isolation
2. **No user_id exposed** - API functions use `auth.uid()`
3. **Guest data isolated** - localStorage per-browser
4. **HTTPS only** - Supabase enforces encryption

## Next Steps

1. Implement API service layer (Task 5)
2. Create useCustomCards hook (Task 7)
3. Update Dashboard to use hook (Task 8)
4. Add migration trigger (Task 10)
5. Test all flows end-to-end
