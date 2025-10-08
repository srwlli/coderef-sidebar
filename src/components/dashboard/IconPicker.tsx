'use client';

import React from 'react';
import { CURATED_ICONS, getIconComponent } from '@/lib/icon-utils';
import { cn } from '@/lib/utils';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

/**
 * Simple grid icon picker showing 50 curated lucide-react icons
 *
 * TO EXPAND TO ALL 1000+ ICONS:
 * 1. Add search input field above grid
 * 2. Filter CURATED_ICONS based on search term
 * 3. Consider react-window or react-virtualized for performance
 * 4. Add icon name labels on hover/focus
 */
export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select icon"
      className="grid max-h-[300px] grid-cols-6 gap-2 overflow-y-auto rounded-md border p-2 sm:grid-cols-8"
    >
      {CURATED_ICONS.map((iconName) => {
        const Icon = getIconComponent(iconName);
        const isSelected = value === iconName;

        return (
          <button
            key={iconName}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={iconName}
            onClick={() => onChange(iconName)}
            className={cn(
              'flex items-center justify-center rounded-md p-3 transition-all',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'focus:ring-2 focus:ring-blue-500 focus:outline-none',
              isSelected && 'bg-blue-100 ring-2 ring-blue-500 dark:bg-blue-900'
            )}
            title={iconName}
          >
            <Icon className="h-8 w-8" />
          </button>
        );
      })}
    </div>
  );
}
