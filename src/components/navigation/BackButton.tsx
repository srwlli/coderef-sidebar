'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
  fallbackHref?: string;
}

// Define parent relationships for logical back navigation
const parentRoutes: Record<string, { parent: string; label: string }> = {
  '/workflows/nextjs-setup': { parent: '/workflows', label: 'Workflows' },
  '/ai-tools': { parent: '/dashboard', label: 'Dashboard' },
  '/prompts': { parent: '/dashboard', label: 'Dashboard' },
  '/settings': { parent: '/dashboard', label: 'Dashboard' },
};

export function BackButton({
  className,
  fallbackHref = '/dashboard',
}: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const parentRoute = parentRoutes[pathname];

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(parentRoute?.parent || fallbackHref);
    }
  }, [router, parentRoute?.parent, fallbackHref]);

  // Add keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack]);

  // Don't show back button on dashboard/home
  if (pathname === '/' || pathname === '/dashboard') {
    return null;
  }

  return (
    <button
      onClick={handleBack}
      className={cn(
        'text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors',
        'focus:ring-ring rounded-md px-2 py-1 focus:ring-2 focus:ring-offset-2 focus:outline-none',
        className
      )}
      title={`Back to ${parentRoute?.label || 'Previous page'} (Alt + ←)`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back to {parentRoute?.label || 'Previous page'}</span>
    </button>
  );
}
