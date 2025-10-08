import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface CustomCard {
  id: string;
  title: string;
  href: string;
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
      customCards: [],
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
