'use client';

import { BackButton } from './BackButton';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  showBackButton = true,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn('bg-background/50 border-b px-8 py-4', className)}>
      <div className="flex flex-col space-y-3">
        {showBackButton && <BackButton />}

        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            )}
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
