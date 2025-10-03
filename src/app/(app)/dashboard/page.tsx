'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/cards';
import {
  Bot,
  Github,
  Workflow,
  Database,
  Cloud,
  Globe,
  Sparkles,
  MessageSquare,
  LayoutGrid,
  List,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const dashboardItems = [
    // Internal Tools
    {
      title: 'Workflows',
      href: '/workflows',
      icon: Workflow,
    },
    {
      title: 'Prompts',
      href: '/ai-tools/prompts',
      icon: MessageSquare,
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
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* View Toggle Header */}
      <div className="flex items-center justify-end gap-2 border-b px-8 py-3">
        <Button
          variant={view === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setView('grid')}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          variant={view === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setView('list')}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
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
          <div className="space-y-2">
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
                  <Card className="cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                      <IconComponent className="h-6 w-6 flex-shrink-0" />
                      <CardTitle className="text-sm sm:text-base">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
