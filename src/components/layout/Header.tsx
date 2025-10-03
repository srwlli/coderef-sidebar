'use client';

import { SidebarTrigger } from '@/components/layout/sidebar';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

export default function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-12 items-center gap-4 border-b px-4 pt-[env(safe-area-inset-top)] backdrop-blur">
      <SidebarTrigger className="md:hidden" />
      <Breadcrumb inline className="min-w-0 flex-1" />
    </header>
  );
}
