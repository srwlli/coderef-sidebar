'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Grid, Table } from 'lucide-react';

type ViewType = 'cards' | 'table';

interface ViewToggleProps {
  className?: string;
}

export function ViewToggle({ className }: ViewToggleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<ViewType>('cards');

  useEffect(() => {
    // Get view from URL or localStorage
    const urlView = searchParams.get('view') as ViewType;
    const savedView = localStorage.getItem('projects-view') as ViewType;

    const initialView = urlView || savedView || 'cards';
    setCurrentView(initialView);

    // Update URL if needed
    if (!urlView && initialView !== 'cards') {
      const params = new URLSearchParams(searchParams.toString());
      params.set('view', initialView);
      router.replace(`/projects?${params.toString()}`);
    }
  }, [searchParams, router]);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    localStorage.setItem('projects-view', view);

    const params = new URLSearchParams(searchParams.toString());
    if (view === 'cards') {
      params.delete('view');
    } else {
      params.set('view', view);
    }

    const queryString = params.toString();
    const url = queryString ? `/projects?${queryString}` : '/projects';
    router.push(url);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-muted-foreground text-sm font-medium">View:</span>

      <div className="flex rounded-lg border p-1">
        <Button
          variant={currentView === 'cards' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleViewChange('cards')}
          className="flex items-center gap-2 px-3"
        >
          <Grid className="h-4 w-4" />
          Cards
        </Button>

        <Button
          variant={currentView === 'table' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleViewChange('table')}
          className="flex items-center gap-2 px-3"
        >
          <Table className="h-4 w-4" />
          Table
        </Button>
      </div>
    </div>
  );
}
