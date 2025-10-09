import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

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
  addCustomCard: (card: Omit<CustomCard, 'id' | 'createdAt'>) => void;
  updateCustomCard: (
    id: string,
    updates: Partial<Omit<CustomCard, 'id' | 'createdAt'>>
  ) => void;
  deleteCustomCard: (id: string) => void;
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

      // Custom cards state
      customCards: [
        {
          id: 'default-claude-card',
          title: 'Claude',
          iconName: 'Bot',
          createdAt: new Date().toISOString(),
          links: [
            { id: uuidv4(), label: 'Chat', href: 'https://claude.ai' },
            {
              id: uuidv4(),
              label: 'Console',
              href: 'https://console.anthropic.com',
            },
            {
              id: uuidv4(),
              label: 'Docs',
              href: 'https://docs.anthropic.com',
            },
            {
              id: uuidv4(),
              label: 'API Reference',
              href: 'https://docs.anthropic.com/en/api',
            },
            {
              id: uuidv4(),
              label: 'Pricing',
              href: 'https://www.anthropic.com/pricing',
            },
            {
              id: uuidv4(),
              label: 'Release Notes',
              href: 'https://docs.anthropic.com/en/release-notes',
            },
            {
              id: uuidv4(),
              label: 'Claude Code',
              href: 'https://docs.claude.com/en/docs/claude-code',
            },
          ],
        },
      ],
      addCustomCard: (card) => {
        const newCard: CustomCard = {
          ...card,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        set({ customCards: [...get().customCards, newCard] });
      },
      updateCustomCard: (id, updates) => {
        set({
          customCards: get().customCards.map((card) =>
            card.id === id ? { ...card, ...updates } : card
          ),
        });
      },
      deleteCustomCard: (id) => {
        set({
          customCards: get().customCards.filter((card) => card.id !== id),
        });
      },
    }),
    {
      name: 'app-storage', // localStorage key
      version: 2, // Bump from 1 to 2 to add default Claude custom card
      migrate: (
        persistedState: unknown,
        version: number
      ): AppStore | undefined => {
        if (!persistedState || typeof persistedState !== 'object') {
          return persistedState as AppStore | undefined;
        }

        let state = persistedState as Record<string, unknown>;

        try {
          // Migrate from v0 (single href) to v1 (links array)
          if (version < 1) {
            const cards = Array.isArray(state.customCards)
              ? state.customCards
              : [];

            state = {
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
            };
          }

          // Migrate from v1 to v2 (add default Claude card)
          if (version < 2) {
            const cards = Array.isArray(state.customCards)
              ? state.customCards
              : [];

            // Only add if default Claude card doesn't exist
            const hasClaudeCard = cards.some(
              (card: unknown) =>
                card &&
                typeof card === 'object' &&
                (card as Record<string, unknown>).id === 'default-claude-card'
            );

            if (!hasClaudeCard) {
              state = {
                ...state,
                customCards: [
                  {
                    id: 'default-claude-card',
                    title: 'Claude',
                    iconName: 'Bot',
                    createdAt: new Date().toISOString(),
                    links: [
                      {
                        id: uuidv4(),
                        label: 'Chat',
                        href: 'https://claude.ai',
                      },
                      {
                        id: uuidv4(),
                        label: 'Console',
                        href: 'https://console.anthropic.com',
                      },
                      {
                        id: uuidv4(),
                        label: 'Docs',
                        href: 'https://docs.anthropic.com',
                      },
                      {
                        id: uuidv4(),
                        label: 'API Reference',
                        href: 'https://docs.anthropic.com/en/api',
                      },
                      {
                        id: uuidv4(),
                        label: 'Pricing',
                        href: 'https://www.anthropic.com/pricing',
                      },
                      {
                        id: uuidv4(),
                        label: 'Release Notes',
                        href: 'https://docs.anthropic.com/en/release-notes',
                      },
                      {
                        id: uuidv4(),
                        label: 'Claude Code',
                        href: 'https://docs.claude.com/en/docs/claude-code',
                      },
                    ],
                  },
                  ...cards,
                ],
              };
            }
          }

          return state as AppStore;
        } catch (error) {
          console.error('Custom card migration failed:', error);
          // Fallback: preserve other state, reset custom cards
          return {
            ...(persistedState as unknown as AppStore),
            customCards: [],
          };
        }
      },
      partialize: (state) => ({
        // Only persist these values
        view: state.view,
        sidebarOpen: state.sidebarOpen,
        customCards: state.customCards,
        // Don't persist lastCopiedId (session-only)
      }),
    }
  )
);
