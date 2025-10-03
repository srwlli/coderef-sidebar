'use client';

import { Plus, Settings, Workflow } from 'lucide-react';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';
import { Badge } from '@/components/ui/badge';

export default function WorkflowsPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Workflow className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Workflows</h1>
          <Badge variant="secondary" className="text-sm">
            Coming Soon
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {/* Future: New Workflow, Templates, Import, etc. */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6">
          <SimpleCollapsibleContainer
            title="Coming Soon"
            icon={<Plus />}
            defaultExpanded={false}
            className="w-full"
          >
            <div className="p-6 text-center">
              <Settings className="mx-auto mb-3 h-8 w-8 text-gray-400" />
              <p className="text-gray-600">
                Workflow builder and management features will be available here
                in a future update.
              </p>
            </div>
          </SimpleCollapsibleContainer>
        </div>
      </div>
    </div>
  );
}
