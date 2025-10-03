'use client';

import { useState, useEffect } from 'react';

type ViewType = 'grid' | 'list';

export function useViewPreference() {
  const [view, setView] = useState<ViewType>('grid');

  useEffect(() => {
    const stored = localStorage.getItem('dashboard-view');
    if (stored === 'grid' || stored === 'list') {
      setView(stored);
    }
  }, []);

  const updateView = (newView: ViewType) => {
    setView(newView);
    localStorage.setItem('dashboard-view', newView);
  };

  return [view, updateView] as const;
}
