'use client';

import { Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/layout/sidebar';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { ViewToggle } from '@/components/layout/ViewToggle';
import { useAppStore } from '@/stores/use-app-store';

export default function Header({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const openAddCardModal = useAppStore((state) => state.openAddCardModal);
  const isDashboard = pathname === '/dashboard';

  return (
    <header className="bg-background sticky top-[env(safe-area-inset-top)] z-50 flex h-12 items-center gap-4 border-b px-4">
      <SidebarTrigger className="md:hidden" />
      <Breadcrumb inline className="min-w-0 flex-1" />
      <ViewToggle />
      {isDashboard && (
        <button
          onClick={openAddCardModal}
          className="hover:bg-accent hover:text-accent-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors"
          aria-label="Add custom card"
        >
          <Plus className="h-5 w-5" />
        </button>
      )}
      {children}
    </header>
  );
}
