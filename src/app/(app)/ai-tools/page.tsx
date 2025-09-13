'use client';

import { Bot, ExternalLink } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/cards/Card';

export default function AIToolsPage() {
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
      name: 'Loveable',
      url: 'https://loveable.ai',
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
    <div className="p-8">
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {aiTools.map((tool, index) => (
            <a
              key={index}
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
      </div>
    </div>
  );
}
