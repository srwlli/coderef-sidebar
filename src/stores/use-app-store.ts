import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    }),
    {
      name: 'app-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these values
        view: state.view,
        sidebarOpen: state.sidebarOpen,
        // Don't persist lastCopiedId (session-only)
      }),
    }
  )
);
