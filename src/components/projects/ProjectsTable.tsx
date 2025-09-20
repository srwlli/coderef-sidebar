'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Search } from 'lucide-react';
import type { DbProject } from '@/lib/forms/formTypes';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ProjectForm } from '@/components/forms/ProjectForm';

interface ProjectsTableProps {
  className?: string;
  projects: DbProject[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function ProjectsTable({
  className,
  projects,
  loading,
  error,
  onRefresh,
}: ProjectsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState<DbProject | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  console.log(
    'ProjectsTable - projects:',
    projects,
    'loading:',
    loading,
    'error:',
    error
  );

  // Filter projects based on search
  const filteredProjects = projects.filter((project) => {
    return (
      searchTerm === '' ||
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleEditProject = (project: DbProject) => {
    console.log('Edit button clicked for project:', project);

    // Ensure project has all required fields
    const safeProject = {
      ...project,
      tags: Array.isArray(project.tags) ? project.tags : [],
      links: Array.isArray(project.links) ? project.links : [],
      description: project.description || '',
      notes: project.notes || '',
    };

    console.log('Safe project for editing:', safeProject);
    setEditingProject(safeProject);
    setIsEditSheetOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditSheetOpen(false);
    setEditingProject(null);
    onRefresh(); // Refresh data after edit
  };

  const handleEditCancel = () => {
    setIsEditSheetOpen(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results summary */}
      <div className="text-muted-foreground mb-4 text-sm">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-muted-foreground py-8 text-center"
                >
                  {projects.length === 0
                    ? 'No projects found'
                    : 'No projects match your filters'}
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    {project.project_name}
                  </TableCell>

                  <TableCell className="max-w-xs">
                    <div className="truncate" title={project.description}>
                      {project.description || 'No description'}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Edit Project"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Project Sheet */}
      <Sheet
        open={isEditSheetOpen}
        onOpenChange={(open) => {
          setIsEditSheetOpen(open);
          if (!open) {
            setEditingProject(null);
          }
        }}
      >
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Project</SheetTitle>
            <SheetDescription>
              Update the project information below
            </SheetDescription>
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
    </div>
  );
}
