'use client';

import { SidebarTrigger } from '@/components/layout/sidebar';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { ViewToggle } from '@/components/layout/ViewToggle';

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="bg-background sticky top-[env(safe-area-inset-top)] z-50 flex h-12 items-center gap-4 border-b px-4">
      <SidebarTrigger className="md:hidden" />
      <Breadcrumb inline className="min-w-0 flex-1" />
      <ViewToggle />
      {children}
    </header>
  );
}
