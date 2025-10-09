'use client';

import { Card, CardHeader, CardTitle } from '@/components/cards';
import { Bot, Search } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface AIChatTool {
  title: string;
  href: string;
  icon: LucideIcon;
}

const aiChatTools: AIChatTool[] = [
  {
    title: 'Gemini',
    href: 'https://gemini.google.com',
    icon: Bot,
  },
  {
    title: 'DeepSeek',
    href: 'https://chat.deepseek.com',
    icon: Bot,
  },
  {
    title: 'Le Chat',
    href: 'https://chat.mistral.ai',
    icon: Bot,
  },
  {
    title: 'Perplexity',
    href: 'https://perplexity.ai',
    icon: Search,
  },
];

export default function AIChatPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">AI Chat</h1>
        <p className="text-muted-foreground mt-2">
          AI chat interfaces and conversational tools
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {aiChatTools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.href}
              className="block"
              onClick={() =>
                window.open(tool.href, '_blank', 'noopener,noreferrer')
              }
            >
              <Card className="h-24 cursor-pointer py-0 transition-shadow duration-200 hover:shadow-lg">
                <CardHeader className="flex h-full flex-col items-center justify-center p-3 text-center">
                  <IconComponent className="mb-1.5 h-6 w-6 flex-shrink-0 sm:mb-2 sm:h-8 sm:w-8" />
                  <CardTitle className="text-xs leading-tight sm:text-sm">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
