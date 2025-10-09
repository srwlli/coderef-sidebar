import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
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

  // Custom dashboard cards (Supabase-backed)
  customCards: CustomCard[];
  isLoadingCards: boolean;
  cardsError: string | null;

  // Async Supabase actions
  fetchCustomCards: () => Promise<void>;
  addCustomCard: (card: Omit<CustomCard, 'id' | 'createdAt'>) => Promise<void>;
  updateCustomCard: (
    id: string,
    updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
  ) => Promise<void>;
  deleteCustomCard: (id: string) => Promise<void>;
  clearCardsError: () => void;
}

/**
 * Global app store using Zustand with localStorage persistence
 * Replaces:
 * - buttonState.ts (module-level state)
 * - use-view-preference custom events
 * - Sidebar localStorage helpers
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

      // Custom cards state (Supabase-backed)
      customCards: [],
      isLoadingCards: false,
      cardsError: null,

      // Fetch cards from Supabase
      fetchCustomCards: async () => {
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

      // Add card with optimistic update
      addCustomCard: async (card) => {
        const tempId = `temp-${uuidv4()}`;
        const tempCard: CustomCard = {
          ...card,
          id: tempId,
          createdAt: new Date().toISOString(),
        };

        // Optimistic update
        set({ customCards: [...get().customCards, tempCard] });

        try {
          const serverCard = await createCustomCardInSupabase(card);

          // Replace temp card with server card
          set({
            customCards: get().customCards.map((c) =>
              c.id === tempId ? serverCard : c
            ),
          });
        } catch (error) {
          // Rollback on error
          set({
            customCards: get().customCards.filter((c) => c.id !== tempId),
            cardsError:
              error instanceof Error ? error.message : 'Failed to create card',
          });
          throw error;
        }
      },

      // Update card with optimistic update
      updateCustomCard: async (id, updates) => {
        const previousCards = get().customCards;

        // Optimistic update
        set({
          customCards: previousCards.map((card) =>
            card.id === id ? { ...card, ...updates } : card
          ),
        });

        try {
          const updatedCard = await updateCustomCardInSupabase(id, updates);

          // Replace with server version
          set({
            customCards: get().customCards.map((c) =>
              c.id === id ? updatedCard : c
            ),
          });
        } catch (error) {
          // Rollback on error
          set({
            customCards: previousCards,
            cardsError:
              error instanceof Error ? error.message : 'Failed to update card',
          });
          throw error;
        }
      },

      // Delete card with optimistic update
      deleteCustomCard: async (id) => {
        const previousCards = get().customCards;

        // Optimistic update
        set({
          customCards: previousCards.filter((card) => card.id !== id),
        });

        try {
          await deleteCustomCardFromSupabase(id);
        } catch (error) {
          // Rollback on error
          set({
            customCards: previousCards,
            cardsError:
              error instanceof Error ? error.message : 'Failed to delete card',
          });
          throw error;
        }
      },

      // Clear error state
      clearCardsError: () => set({ cardsError: null }),
    }),
    {
      name: 'app-storage', // localStorage key
      version: 1, // Bump from 0 to 1 (Zustand defaults to version 0 when not specified)
      migrate: (
        persistedState: unknown,
        version: number
      ): AppStore | undefined => {
        // Migrate from v0 (single href) to v1 (links array)
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
                  // Convert old format to new format
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
            // Fallback: preserve other state, reset custom cards
            return {
              ...(persistedState as unknown as AppStore),
              customCards: [],
            };
          }
        }
        return persistedState as AppStore | undefined;
      },
      partialize: (state) => ({
        // Only persist these values
        view: state.view,
        sidebarOpen: state.sidebarOpen,
        // Don't persist customCards (fetched from Supabase on auth)
        // Don't persist lastCopiedId (session-only)
      }),
    }
  )
);
