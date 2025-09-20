'use client';

import { Plus, Settings } from 'lucide-react';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';

export default function FormsPage() {
  return (
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
            Form builder and management features will be available here in a
            future update.
          </p>
        </div>
      </SimpleCollapsibleContainer>
    </div>
  );
}
