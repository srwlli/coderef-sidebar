'use client';

import { Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/cards';

interface AddCardButtonProps {
  onClick: () => void;
}

/**
 * Dashed border card tile that triggers the add card modal
 * Matches grid card layout and sizing
 */
export function AddCardButton({ onClick }: AddCardButtonProps) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left"
      aria-label="Add custom card"
    >
      <Card className="h-24 cursor-pointer border border-dashed border-gray-300 bg-transparent py-0 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-950/20">
        <CardHeader className="flex h-full flex-col items-center justify-center p-3 text-center">
          <Plus className="text-muted-foreground mb-1.5 h-6 w-6 flex-shrink-0 sm:mb-2 sm:h-8 sm:w-8" />
          <CardTitle className="text-muted-foreground text-xs leading-tight sm:text-sm">
            Add Card
          </CardTitle>
        </CardHeader>
      </Card>
    </button>
  );
}
