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
}

// Route mapping for better display names
const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
  '/projects/coderef': 'coderef',
  '/projects/coderef2': 'coderef2',
  '/projects/project-landing': 'Coming Soon',
  '/applications': 'Applications',
  '/applications/coderef': 'coderef',
  '/applications/coderef2': 'coderef2',
  '/applications/application-landing': 'Coming Soon',
  '/ai-tools': 'AI Tools',
  '/ai-tools/prompts': 'Prompts',
  '/ai-tools/spec-kit': 'Spec Kit',
  '/tech-stacks': 'Tech Stacks',
  '/tech-stacks/nextjs-setup': 'Next.js Setup',
  '/tech-stacks/this-stack': 'This Stack',
  '/links': 'Links',
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

export function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  // Don't show breadcrumbs on dashboard/home
  if (pathname === '/' || pathname === '/dashboard') {
    return null;
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
