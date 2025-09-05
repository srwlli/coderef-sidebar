import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home, Settings, GitBranch, Cog, MessageSquare } from 'lucide-react';
import Link from 'next/link';

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
                    <SidebarMenuButton asChild>
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
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger className="mb-4" />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
