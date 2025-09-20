'use client';

import React from 'react';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DbProject } from '@/lib/forms/formTypes';
import { cn } from '@/lib/utils';

interface ProjectViewProps {
  project: DbProject;
  onBack: () => void;
  onEdit: (project: DbProject) => void;
  onDelete: (id: number) => void;
  className?: string;
}

export function ProjectView({
  project,
  onBack,
  onEdit,
  onDelete,
  className,
}: ProjectViewProps) {
  const handleEdit = () => {
    onEdit(project);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      onDelete(project.id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Project Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {project.project_name}
            </h1>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created {formatDate(project.created_at)}</span>
            </div>
            {project.username && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{project.username}</span>
              </div>
            )}
            {project.updated_at !== project.created_at && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Updated {formatDate(project.updated_at)}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {project.description && (
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-wrap text-gray-700">
                  {project.description}
                </p>
              </div>
            </div>
          )}

          {/* Notes */}
          {project.notes && (
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                Notes
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-wrap text-gray-700">
                  {project.notes}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                Links
              </h2>
              <div className="space-y-2">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border p-3 transition-colors hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {link.title || link.url}
                      </div>
                      {link.description && (
                        <div className="text-sm text-gray-600">
                          {link.description}
                        </div>
                      )}
                      {link.title && (
                        <div className="text-xs text-gray-400">{link.url}</div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!project.description &&
            !project.notes &&
            (!project.tags || project.tags.length === 0) &&
            (!project.links || project.links.length === 0) && (
              <div className="py-12 text-center">
                <div className="mb-2 text-gray-400">
                  This project has no additional details.
                </div>
                <Button variant="outline" onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Add Details
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
