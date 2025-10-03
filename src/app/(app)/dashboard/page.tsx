import { Card, CardHeader, CardTitle } from '@/components/cards';
import { Bot, Github, Workflow, Database, Cloud, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const dashboardItems = [
    {
      title: 'AI Tools',
      href: '/ai-tools',
      icon: Bot,
    },
    {
      title: 'Workflows',
      href: '/workflows',
      icon: Workflow,
    },
    {
      title: 'Vercel',
      href: 'https://vercel.com/teamhart',
      icon: Cloud,
      external: true,
    },
    {
      title: 'Anthropic Console',
      href: 'https://console.anthropic.com/dashboard',
      icon: Globe,
      external: true,
    },
    {
      title: 'GitHub',
      href: 'https://github.com/dashboard',
      icon: Github,
      external: true,
    },
    {
      title: 'Supabase',
      href: 'https://supabase.com/dashboard/org/wskblpimfkjbkgayzxqj',
      icon: Database,
      external: true,
    },
    {
      title: 'n8n Workflows',
      href: 'http://localhost:5678/home/workflows',
      icon: Workflow,
      external: true,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboardItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="block"
              {...(item.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
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
    </div>
  );
}
