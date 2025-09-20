'use client';

import { Bot, MessageSquare, Wrench } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/cards/Card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
export default function AIToolsPage() {
  // Internal tools
  const internalTools = [
    {
      name: 'Prompts',
      href: '/ai-tools/prompts',
      icon: MessageSquare,
      isInternal: true,
    },
    {
      name: 'Spec Kit',
      href: '/ai-tools/spec-kit',
      icon: Wrench,
      isInternal: true,
    },
  ];

  const aiTools = [
    {
      name: 'ChatGPT',
      url: 'https://chat.openai.com',
    },
    {
      name: 'Claude',
      url: 'https://claude.ai',
    },
    {
      name: 'Gemini',
      url: 'https://gemini.google.com',
    },
    {
      name: 'DeepSeek',
      url: 'https://chat.deepseek.com',
    },
    {
      name: 'Grok',
      url: 'https://grok.x.ai',
    },
    {
      name: 'Le Chat',
      url: 'https://chat.mistral.ai',
    },
    {
      name: 'Perplexity',
      url: 'https://perplexity.ai',
    },
    {
      name: 'Lovable',
      url: 'https://lovable.dev/',
    },
    {
      name: 'Replit',
      url: 'https://replit.com',
    },
    {
      name: 'GitHub Copilot',
      url: 'https://github.com/features/copilot',
    },
    {
      name: 'Cursor',
      url: 'https://cursor.sh',
    },
    {
      name: 'V0',
      url: 'https://v0.dev',
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6" />
          <h1 className="text-2xl font-bold">AI Tools</h1>
          <Badge variant="outline" className="text-sm">
            {internalTools.length + aiTools.length} tools
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {/* Future: Add Tool, Settings, etc. */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <main className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Internal tools */}
            {internalTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={`internal-${index}`}
                  href={tool.href}
                  className="block"
                >
                  <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                    <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                      <IconComponent className="mb-2 h-8 w-8 flex-shrink-0" />
                      <CardTitle className="text-sm leading-tight sm:text-base">
                        {tool.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}

            {/* External AI tools */}
            {aiTools.map((tool, index) => (
              <a
                key={`external-${index}`}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                  <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                    <Bot className="mb-2 h-8 w-8 flex-shrink-0" />
                    <CardTitle className="text-sm leading-tight sm:text-base">
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
