'use client';

import { Card, CardHeader, CardTitle } from '@/components/cards';
import { Sparkles, Rocket, Code, Wand2, Palette } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface AIBuilderTool {
  title: string;
  href: string;
  icon: LucideIcon;
}

const aiBuilderTools: AIBuilderTool[] = [
  {
    title: 'Google Stitch',
    href: 'https://stitch.withgoogle.com/?pli=1',
    icon: Sparkles,
  },
  {
    title: 'Lovable',
    href: 'https://lovable.dev/',
    icon: Rocket,
  },
  {
    title: 'Replit',
    href: 'https://replit.com',
    icon: Code,
  },
  {
    title: 'GitHub Copilot',
    href: 'https://github.com/features/copilot',
    icon: Code,
  },
  {
    title: 'Cursor',
    href: 'https://cursor.sh',
    icon: Code,
  },
  {
    title: 'V0',
    href: 'https://v0.dev',
    icon: Wand2,
  },
];

export default function AIBuildersPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">AI Builders</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered development and building platforms
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {aiBuilderTools.map((tool) => {
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
