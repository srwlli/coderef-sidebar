'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/cards/Card';
import { Button } from '@/components/ui/button';
import { ViewToggle } from '@/components/projects/ViewToggle';
import { ProjectsTable } from '@/components/projects/ProjectsTable';
import { useProjects } from '@/hooks/useProjects';
import { ProjectForm } from '@/components/forms/ProjectForm';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { DbProject } from '@/lib/forms/formTypes';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') || 'cards';
  const { data: projects = [], isLoading, error } = useProjects();
  const [editingProject, setEditingProject] = useState<DbProject | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const handleEditProject = (project: DbProject) => {
    setEditingProject(project);
    setIsEditSheetOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditSheetOpen(false);
    setEditingProject(null);
  };

  const handleEditCancel = () => {
    setIsEditSheetOpen(false);
    setEditingProject(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading projects: {error.message}
      </div>
    );
  }

  return (
    <>
      {/* Header with view toggle */}
      <div className="mb-6 flex items-center justify-end gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
        <ViewToggle />
      </div>

      {/* Content based on current view */}
      {currentView === 'table' ? (
        <ProjectsTable />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.length === 0 ? (
            <div className="text-muted-foreground col-span-full py-8 text-center">
              No projects found. Create your first project to get started.
            </div>
          ) : (
            projects.map((project) => (
              <Card
                key={project.id}
                className="h-auto min-h-[140px] transition-shadow duration-200 hover:shadow-lg"
              >
                <CardHeader className="p-4">
                  <CardTitle className="mb-2 text-base font-semibold">
                    {project.project_name}
                  </CardTitle>
                  <p className="text-muted-foreground mb-3 line-clamp-3 flex-1 text-sm">
                    {project.description || 'No description available'}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProject(project)}
                    className="self-start"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Edit Project Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Project</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {editingProject && (
              <ProjectForm
                mode="edit"
                initialData={editingProject}
                onSuccess={handleEditSuccess}
                onCancel={handleEditCancel}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="py-4 text-center">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
