'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/layout/sidebar';
import {
  Home,
  Cog,
  MessageSquare,
  Bot,
  FileText,
  StickyNote,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FileText,
  },
  {
    title: 'Noted',
    href: '/noted',
    icon: StickyNote,
  },
  {
    title: 'Prompts',
    href: '/ai-tools/prompts',
    icon: MessageSquare,
  },
  {
    title: 'AI Tools',
    href: '/ai-tools',
    icon: Bot,
  },
  {
    title: 'Forms',
    href: '/forms',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Cog,
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href === '/dashboard' && pathname === '/');

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        asChild
                        isActive={isActive}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex flex-1 flex-col">
          <Header />
          {pathname !== '/noted' && <Breadcrumb />}
          <div className="flex-1 overflow-x-hidden">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
