'use client';

import React, { useState } from 'react';
import { ProjectForm } from '../forms/ProjectForm';
import { ProjectsList } from './ProjectsList';
import { ProjectView } from './ProjectView';
import { useProjectsSimple } from '@/hooks/useProjectsSimple';
import { DbProject } from '@/lib/forms/formTypes';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface ProjectsDashboardProps {
  className?: string;
  initialTab?: string;
}

type ViewMode = 'create' | 'list' | 'view' | 'edit';

export function ProjectsDashboard({
  className,
  initialTab = 'list',
}: ProjectsDashboardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(initialTab as ViewMode);
  const [selectedProject, setSelectedProject] = useState<DbProject | null>(
    null
  );
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Always call hooks before any early returns
  const { projects, loading, error, deleteProject, refreshProjects } =
    useProjectsSimple({
      supabaseClient: supabase,
      user: user,
    });

  // Handle authentication and supabase availability
  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Please log in to view projects.</p>
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">
          Database not configured. Please check your environment settings.
        </p>
      </div>
    );
  }

  const handleProjectSuccess = () => {
    refreshProjects();
    setViewMode('list');
  };

  const handleViewProject = (project: DbProject) => {
    setSelectedProject(project);
    setViewMode('view');
  };

  const handleEditProject = (project: DbProject) => {
    setSelectedProject(project);
    setViewMode('edit');
  };

  const handleEditSuccess = () => {
    refreshProjects();
    setViewMode('list');
    setSelectedProject(null);
  };

  const handleEditCancel = () => {
    setViewMode('list');
    setSelectedProject(null);
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
        type: 'success',
      });
      // If we're viewing the deleted project, go back to list
      if (selectedProject?.id === id) {
        setViewMode('list');
        setSelectedProject(null);
      }
    } catch (error) {
      console.error('Delete project error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        type: 'error',
      });
    }
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'create':
        return (
          <ProjectForm
            mode="create"
            onSuccess={handleProjectSuccess}
            onCancel={() => setViewMode('list')}
            className="h-full"
          />
        );

      case 'list':
        return (
          <ProjectsList
            projects={projects}
            loading={loading}
            error={error}
            onViewProject={handleViewProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onCreateProject={() => setViewMode('create')}
            className="h-full overflow-y-auto"
          />
        );

      case 'view':
        return selectedProject ? (
          <ProjectView
            project={selectedProject}
            onBack={() => setViewMode('list')}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            className="h-full overflow-y-auto"
          />
        ) : null;

      case 'edit':
        return selectedProject ? (
          <ProjectForm
            mode="edit"
            initialData={selectedProject}
            onSuccess={handleEditSuccess}
            onCancel={handleEditCancel}
            className="h-full"
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {renderContent()}
    </div>
  );
}
