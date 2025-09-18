'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
  onAddNote: () => void;
}

export default function MobileHeader({ onAddNote }: MobileHeaderProps) {
  return (
    <header className="mobile-header fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-foreground">noted</h1>
      <Button
        onClick={onAddNote}
        size="sm"
        className="h-9 w-9 p-0"
        aria-label="Add new note"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </header>
  );
}