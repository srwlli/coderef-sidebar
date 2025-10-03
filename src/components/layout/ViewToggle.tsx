'use client';

import { usePathname } from 'next/navigation';
import { LayoutGrid, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useViewPreference } from '@/hooks/use-view-preference';

export function ViewToggle() {
  const pathname = usePathname();
  const [view, setView] = useViewPreference();

  // Only show on dashboard
  if (pathname !== '/dashboard') {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {view === 'grid' ? (
            <>
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Cards</span>
            </>
          ) : (
            <>
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={view}
          onValueChange={(v) => setView(v as 'grid' | 'list')}
        >
          <DropdownMenuRadioItem value="grid">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Cards
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="list">
            <List className="mr-2 h-4 w-4" />
            List
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
