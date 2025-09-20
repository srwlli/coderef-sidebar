'use client';

import React from 'react';
import { Plus, Edit, Eye, Trash2, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/cards/Card';
import { Badge } from '@/components/ui/badge';
import { DbProject } from '@/lib/forms/formTypes';
import { cn } from '@/lib/utils';

interface ProjectsListProps {
  projects: DbProject[];
  loading: boolean;
  error: string | null;
  onViewProject: (project: DbProject) => void;
  onEditProject: (project: DbProject) => void;
  onDeleteProject: (id: number) => void;
  onCreateProject: () => void;
  className?: string;
}

export function ProjectsList({
  projects,
  loading,
  error,
  onViewProject,
  onEditProject,
  onDeleteProject,
  onCreateProject,
  className,
}: ProjectsListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = (id: number, projectName: string) => {
    if (confirm(`Are you sure you want to delete "${projectName}"?`)) {
      onDeleteProject(id);
    }
  };

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('p-8 text-center text-red-500', className)}>
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={onCreateProject} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 text-gray-400">
              <Plus className="h-12 w-12" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-600">
              No projects yet
            </h3>
            <p className="mb-6 max-w-md text-center text-gray-500">
              Create your first project to get started organizing your work and
              ideas.
            </p>
            <Button
              onClick={onCreateProject}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="h-auto cursor-pointer transition-shadow duration-200 hover:shadow-lg"
                onClick={() => onViewProject(project)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-2 text-base font-semibold">
                      {project.project_name}
                    </CardTitle>
                    <div className="ml-2 flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProject(project);
                        }}
                        title="Edit project"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProject(project);
                        }}
                        title="View project"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project.id, project.project_name);
                        }}
                        title="Delete project"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Description */}
                  {project.description && (
                    <p className="mb-3 line-clamp-3 text-sm text-gray-600">
                      {project.description}
                    </p>
                  )}

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          <Tag className="mr-1 h-2 w-2" />
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(project.created_at)}</span>
                    </div>
                    {project.username && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{project.username}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
