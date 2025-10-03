'use client';

import { Card, CardHeader, CardTitle } from '@/components/cards';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';
import { GitBranch, Plus, Settings } from 'lucide-react';
import Link from 'next/link';

export default function WorkflowsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/git-commands" className="block">
            <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                <GitBranch className="mb-2 h-8 w-8 flex-shrink-0" />
                <CardTitle className="text-sm leading-tight sm:text-base">
                  Git Commands
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/workflows/nextjs-setup" className="block">
            <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                <Settings className="mb-2 h-8 w-8 flex-shrink-0" />
                <CardTitle className="text-sm leading-tight sm:text-base">
                  Next.js Setup
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <SimpleCollapsibleContainer
          title="Coming Soon"
          icon={<Plus />}
          defaultExpanded={false}
          className="w-full"
        >
          <div className="p-6 text-center">
            <Settings className="mx-auto mb-3 h-8 w-8 text-gray-400" />
            <p className="text-gray-600">
              Workflow builder and management features will be available here in
              a future update.
            </p>
          </div>
        </SimpleCollapsibleContainer>
      </div>
    </div>
  );
}
