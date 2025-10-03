'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  className?: string;
  inline?: boolean; // For header integration
}

// Route mapping for better display names
const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/ai-tools': 'AI Tools',
  '/ai-tools/prompts': 'Prompts',
  '/workflows': 'Workflows',
  '/workflows/nextjs-setup': 'Next.js Setup',
  '/git-commands': 'Git Commands',
  '/settings': 'Settings',
};

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always start with dashboard/home
  breadcrumbs.push({
    label: 'Dashboard',
    href: '/dashboard',
    isActive: pathname === '/dashboard' || pathname === '/',
  });

  // Build breadcrumb path
  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    const isLast = index === paths.length - 1;

    if (currentPath !== '/dashboard') {
      breadcrumbs.push({
        label:
          routeLabels[currentPath] ||
          path.charAt(0).toUpperCase() + path.slice(1),
        href: currentPath,
        isActive: isLast,
      });
    }
  });

  return breadcrumbs;
}

export function Breadcrumb({ className, inline = false }: BreadcrumbProps) {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  if (inline) {
    // Inline version for header integration
    return (
      <nav
        aria-label="Breadcrumb"
        className={cn('flex items-center', className)}
      >
        <ol className="flex items-center space-x-1 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="text-muted-foreground/50 mx-1 h-3 w-3" />
              )}
              {index === 0 && (
                <Home className="text-muted-foreground/70 mr-2 h-3 w-3" />
              )}
              {item.isActive ? (
                <span className="text-foreground font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'text-muted-foreground bg-background/50 flex items-center space-x-1 border-b px-4 py-2 text-sm',
        className
      )}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="text-muted-foreground/50 mx-1 h-4 w-4" />
            )}
            {index === 0 && (
              <Home className="text-muted-foreground/70 mr-2 h-4 w-4" />
            )}
            {item.isActive ? (
              <span className="text-foreground font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
