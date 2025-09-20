'use client';

import { Suspense } from 'react';
import { ProjectsDashboard } from '@/components/projects/ProjectsDashboard';

function ProjectsContent() {
  return <ProjectsDashboard className="h-full" />;
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="py-4 text-center">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
