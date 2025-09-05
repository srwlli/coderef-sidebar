'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimpleCollapsibleContainerProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export function SimpleCollapsibleContainer({
  title,
  icon,
  children,
  defaultExpanded = false,
  className,
}: SimpleCollapsibleContainerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={cn('border-border rounded-lg border-2', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="hover:bg-accent flex w-full items-center gap-3 p-4 text-left transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="text-foreground h-5 w-5" />
        ) : (
          <ChevronRight className="text-foreground h-5 w-5" />
        )}

        {icon && <span className="text-foreground">{icon}</span>}

        <h3 className="text-foreground flex-1 font-semibold">{title}</h3>
      </button>

      {isExpanded && (
        <div className="bg-background border-t px-4 pb-4">
          <div className="pt-6 [&>*:first-child]:mt-0">{children}</div>
        </div>
      )}
    </div>
  );
}
