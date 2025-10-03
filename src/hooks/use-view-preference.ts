'use client';

import { useState, useEffect } from 'react';

type ViewType = 'grid' | 'list';

export function useViewPreference() {
  const [view, setView] = useState<ViewType>(() => {
    if (typeof window === 'undefined') return 'grid';
    const stored = localStorage.getItem('dashboard-view');
    return stored === 'grid' || stored === 'list' ? stored : 'grid';
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'dashboard-view' &&
        (e.newValue === 'grid' || e.newValue === 'list')
      ) {
        setView(e.newValue);
      }
    };

    // Listen for changes from other tabs
    window.addEventListener('storage', handleStorageChange);

    // Listen for custom event from same page
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ViewType>;
      setView(customEvent.detail);
    };

    window.addEventListener('view-preference-change', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('view-preference-change', handleCustomEvent);
    };
  }, []);

  const updateView = (newView: ViewType) => {
    setView(newView);
    localStorage.setItem('dashboard-view', newView);
    // Dispatch custom event so all instances update
    window.dispatchEvent(
      new CustomEvent('view-preference-change', { detail: newView })
    );
  };

  return [view, updateView] as const;
}
