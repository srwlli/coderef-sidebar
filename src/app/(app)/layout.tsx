import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/layout/sidebar';
import { Home, Settings, GitBranch, Cog, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Next.js Setup',
    href: '/nextjs-setup',
    icon: Settings,
  },
  {
    title: 'Git Commands',
    href: '/git-commands',
    icon: GitBranch,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Cog,
  },
  {
    title: 'Prompts',
    href: '/prompts',
    icon: MessageSquare,
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex flex-1 flex-col">
          <Header />
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
