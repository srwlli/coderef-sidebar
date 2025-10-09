'use client';

import { Card, CardHeader, CardTitle } from '@/components/cards';
import { MessageSquare, GitBranch, Settings } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface WorkflowTool {
  title: string;
  href: string;
  icon: LucideIcon;
}

const workflowTools: WorkflowTool[] = [
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
];

export default function WorkflowsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Dev Workflows</h1>
        <p className="text-muted-foreground mt-2">
          Development workflows and productivity tools
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workflowTools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.href}
              className="block"
              onClick={() => router.push(tool.href)}
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
