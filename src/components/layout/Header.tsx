'use client';

import { SidebarTrigger } from '@/components/layout/sidebar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, List } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNotedPage = pathname === '/noted';

  const currentTab = searchParams.get('tab') || 'create';

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="bg-background sticky top-0 z-50 flex h-12 items-center gap-4 border-b px-4">
      <SidebarTrigger />
      <div className="font-semibold">
        {isNotedPage ? (
          <span className="text-foreground">noted</span>
        ) : (
          <>
            <span className="text-blue-600">code</span>
            <span className="text-black dark:text-white">ref</span>
          </>
        )}
      </div>

      {isNotedPage && (
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant={currentTab === 'create' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('create')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Note</span>
          </Button>
          <Button
            variant={currentTab === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('list')}
            className="flex items-center gap-2"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">My Notes</span>
          </Button>
        </div>
      )}
    </header>
  );
}
