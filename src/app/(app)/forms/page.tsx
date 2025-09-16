'use client';

import { FileText } from 'lucide-react';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';

export default function FormsPage() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="space-y-6">
          <SimpleCollapsibleContainer
            title="Forms"
            icon={<FileText />}
            defaultExpanded={true}
            className="w-full"
          >
            <div className="flex flex-col items-center gap-4 py-12">
              <div className="space-y-4 text-center">
                <FileText className="text-muted-foreground mx-auto h-16 w-16" />
                <h2 className="text-foreground text-2xl font-semibold">
                  Forms Coming Soon
                </h2>
                <p className="text-muted-foreground max-w-md">
                  We're working on a powerful forms system integrated with
                  Supabase. Check back soon for form creation and management
                  capabilities.
                </p>
              </div>
            </div>
          </SimpleCollapsibleContainer>
        </div>
      </main>
    </div>
  );
}
