'use client';

import { useAppStore } from '@/stores/use-app-store';

type ViewType = 'grid' | 'list';

/**
 * Hook for dashboard view preference (grid vs list)
 * Now powered by Zustand with automatic localStorage persistence
 * Maintains same API for backward compatibility
 */
export function useViewPreference() {
  const view = useAppStore((state) => state.view);
  const setView = useAppStore((state) => state.setView);

  return [view, setView] as const;
}
