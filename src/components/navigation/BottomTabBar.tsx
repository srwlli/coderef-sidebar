'use client';

import { Home, Square } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  {
    id: 'tab1',
    label: 'Placeholder',
    icon: Square,
    href: '#',
    disabled: true,
  },
  {
    id: 'tab2',
    label: 'Placeholder',
    icon: Square,
    href: '#',
    disabled: true,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    disabled: false,
  },
  {
    id: 'tab4',
    label: 'Placeholder',
    icon: Square,
    href: '#',
    disabled: true,
  },
  {
    id: 'tab5',
    label: 'Placeholder',
    icon: Square,
    href: '#',
    disabled: true,
  },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="bottom-tabs fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = !tab.disabled && (pathname === tab.href || (tab.href === '/dashboard' && pathname === '/'));
          const IconComponent = tab.icon;

          if (tab.disabled) {
            return (
              <div
                key={tab.id}
                className="flex flex-col items-center justify-center min-h-[56px] px-3 opacity-30"
              >
                <IconComponent className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">
                  {tab.label}
                </span>
              </div>
            );
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center min-h-[56px] px-3 transition-colors rounded-lg',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <IconComponent className="h-5 w-5" />
              <span className="text-xs mt-1">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}