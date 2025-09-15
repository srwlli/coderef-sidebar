import { Card, CardHeader, CardTitle } from '@/components/cards';
import {
  GitBranch,
  Bot,
  Layers,
  Settings,
  Link as LinkIcon,
  FolderOpen,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const dashboardItems = [
    {
      title: 'Projects',
      href: '/projects',
      icon: FileText,
    },
    {
      title: 'Git Commands',
      href: '/git-commands',
      icon: GitBranch,
    },
    {
      title: 'AI Tools',
      href: '/ai-tools',
      icon: Bot,
    },
    {
      title: 'Tech Stacks',
      href: '/tech-stacks',
      icon: Layers,
    },
    {
      title: 'Links',
      href: '/links',
      icon: LinkIcon,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashboardItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link key={index} href={item.href} className="block">
                <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                  <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                    <IconComponent className="mb-2 h-8 w-8 flex-shrink-0" />
                    <CardTitle className="text-sm leading-tight sm:text-base">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
