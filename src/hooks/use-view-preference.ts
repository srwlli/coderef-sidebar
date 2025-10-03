'use client';

import { useState } from 'react';

type ViewType = 'grid' | 'list';

export function useViewPreference() {
  const [view, setView] = useState<ViewType>(() => {
    if (typeof window === 'undefined') return 'grid';
    const stored = localStorage.getItem('dashboard-view');
    return stored === 'grid' || stored === 'list' ? stored : 'grid';
  });

  const updateView = (newView: ViewType) => {
    setView(newView);
    localStorage.setItem('dashboard-view', newView);
  };

  return [view, updateView] as const;
}
