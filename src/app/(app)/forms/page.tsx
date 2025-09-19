'use client';

import { Plus } from 'lucide-react';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { ProjectData } from '@/lib/forms/formTypes';

export default function FormsPage() {
  const handleProjectSuccess = (data: ProjectData) => {
    console.log('Project created successfully:', data);
  };

  return (
    <div className="space-y-6">
      <SimpleCollapsibleContainer
        title="Create New Project"
        icon={<Plus />}
        defaultExpanded={false}
        className="w-full"
      >
        <div className="p-6">
          <ProjectForm
            onSuccess={handleProjectSuccess}
            className="mx-auto max-w-2xl"
          />
        </div>
      </SimpleCollapsibleContainer>
    </div>
  );
}
