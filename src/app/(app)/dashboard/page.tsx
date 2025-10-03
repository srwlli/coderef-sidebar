'use client';

import { Card, CardHeader, CardTitle, ListCard } from '@/components/cards';
import {
  Bot,
  Github,
  Database,
  Cloud,
  Globe,
  Sparkles,
  MessageSquare,
  GitBranch,
  Settings,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { useViewPreference } from '@/hooks/use-view-preference';

export default function Dashboard() {
  const [view] = useViewPreference();
  const dashboardItems = [
    // Internal Tools
    {
      title: 'Prompts',
      href: '/ai-tools/prompts',
      icon: MessageSquare,
    },
    {
      title: 'Git Commands',
      href: '/git-commands',
      icon: GitBranch,
    },
    {
      title: 'Next.js Setup',
      href: '/workflows/nextjs-setup',
      icon: Settings,
    },
    // Platforms & Services
    {
      title: 'Noted',
      href: 'https://noted-bay-three.vercel.app/',
      icon: Globe,
      external: true,
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
      title: 'Google Stitch',
      href: 'https://stitch.withgoogle.com/?pli=1',
      icon: Sparkles,
      external: true,
    },
    {
      title: 'n8n Workflows',
      href: 'http://localhost:5678/home/workflows',
      icon: Workflow,
      external: true,
    },
    // AI Tools
    {
      title: 'ChatGPT',
      href: 'https://chat.openai.com',
      icon: Bot,
      external: true,
    },
    {
      title: 'Claude',
      href: 'https://claude.ai',
      icon: Bot,
      external: true,
    },
    {
      title: 'Gemini',
      href: 'https://gemini.google.com',
      icon: Bot,
      external: true,
    },
    {
      title: 'DeepSeek',
      href: 'https://chat.deepseek.com',
      icon: Bot,
      external: true,
    },
    {
      title: 'Grok',
      href: 'https://grok.x.ai',
      icon: Bot,
      external: true,
    },
    {
      title: 'Le Chat',
      href: 'https://chat.mistral.ai',
      icon: Bot,
      external: true,
    },
    {
      title: 'Perplexity',
      href: 'https://perplexity.ai',
      icon: Bot,
      external: true,
    },
    {
      title: 'Lovable',
      href: 'https://lovable.dev/',
      icon: Bot,
      external: true,
    },
    {
      title: 'Replit',
      href: 'https://replit.com',
      icon: Bot,
      external: true,
    },
    {
      title: 'GitHub Copilot',
      href: 'https://github.com/features/copilot',
      icon: Bot,
      external: true,
    },
    {
      title: 'Cursor',
      href: 'https://cursor.sh',
      icon: Bot,
      external: true,
    },
    {
      title: 'V0',
      href: 'https://v0.dev',
      icon: Bot,
      external: true,
    },
  ];

  return (
    <>
      {view === 'grid' ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                <Card className="h-24 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                  <CardHeader className="flex h-full flex-col items-center justify-center p-3 text-center">
                    <IconComponent className="mb-1.5 h-6 w-6 flex-shrink-0 sm:mb-2 sm:h-8 sm:w-8" />
                    <CardTitle className="text-xs leading-tight sm:text-sm">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {dashboardItems.map((item, index) => (
            <ListCard
              key={index}
              title={item.title}
              href={item.href}
              icon={item.icon}
              external={item.external}
            />
          ))}
        </div>
      )}
    </>
  );
}
