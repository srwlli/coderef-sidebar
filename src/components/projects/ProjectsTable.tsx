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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Edit,
  ExternalLink,
  Search,
  ArrowUpDown,
  Download,
  Eye,
  EyeOff,
  Trash2,
} from 'lucide-react';
import { useProjects, useDeleteProject } from '@/hooks/useProjects';
import type { DbProject } from '@/lib/forms/formTypes';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ProjectForm } from '@/components/forms/ProjectForm';

interface ProjectsTableProps {
  className?: string;
}

type SortField = 'project_name' | 'username' | 'created_at';
type SortDirection = 'asc' | 'desc';

export function ProjectsTable({ className }: ProjectsTableProps) {
  const { data: projects = [], isLoading, error } = useProjects();
  const deleteProject = useDeleteProject();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showMissingOnly, setShowMissingOnly] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<Set<number>>(
    new Set()
  );
  const [editingProject, setEditingProject] = useState<DbProject | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  // Filter projects based on search and missing fields
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchTerm === '' ||
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const hasMissingFields =
      !project.git ||
      !project.supabase ||
      !project.local_link ||
      !project.deployed_link;
    const matchesFilter = !showMissingOnly || hasMissingFields;

    return matchesSearch && matchesFilter;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'created_at':
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
        break;
      case 'project_name':
        aValue = a.project_name.toLowerCase();
        bValue = b.project_name.toLowerCase();
        break;
      case 'username':
        aValue = a.username.toLowerCase();
        bValue = b.username.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleProjectSelection = (projectId: number) => {
    const newSelection = new Set(selectedProjects);
    if (newSelection.has(projectId)) {
      newSelection.delete(projectId);
    } else {
      newSelection.add(projectId);
    }
    setSelectedProjects(newSelection);
  };

  const selectAllProjects = () => {
    if (selectedProjects.size === sortedProjects.length) {
      setSelectedProjects(new Set());
    } else {
      setSelectedProjects(new Set(sortedProjects.map((p) => p.id)));
    }
  };

  const getMissingFields = (project: DbProject): string[] => {
    const missing: string[] = [];
    if (!project.git) missing.push('Git');
    if (!project.supabase) missing.push('Supabase');
    if (!project.local_link) missing.push('Local');
    if (!project.deployed_link) missing.push('Deployed');
    return missing;
  };

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

  const handleDeleteProject = async (project: DbProject) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${project.project_name}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteProject.mutateAsync(project.id);

        // Remove from selection if it was selected
        if (selectedProjects.has(project.id)) {
          const newSelection = new Set(selectedProjects);
          newSelection.delete(project.id);
          setSelectedProjects(newSelection);
        }

        toast({
          title: 'Project Deleted',
          description: `"${project.project_name}" has been deleted successfully.`,
          type: 'success',
        });
      } catch (error) {
        console.error('Delete failed:', error);
        toast({
          title: 'Delete Failed',
          description: 'Failed to delete project. Please try again.',
          type: 'error',
        });
      }
    }
  };

  const exportToCSV = () => {
    const projectsToExport =
      selectedProjects.size > 0
        ? sortedProjects.filter((p) => selectedProjects.has(p.id))
        : sortedProjects;

    const headers = [
      'Project Name',
      'Username',
      'Description',
      'Tags',
      'Git',
      'Supabase',
      'Local Link',
      'Deployed Link',
      'Created',
      'Updated',
    ];
    const csvContent = [
      headers.join(','),
      ...projectsToExport.map((project) =>
        [
          `"${project.project_name}"`,
          `"${project.username}"`,
          `"${project.description || ''}"`,
          `"${project.tags.join('; ')}"`,
          `"${project.git || ''}"`,
          `"${project.supabase || ''}"`,
          `"${project.local_link || ''}"`,
          `"${project.deployed_link || ''}"`,
          `"${format(new Date(project.created_at), 'yyyy-MM-dd HH:mm')}"`,
          `"${format(new Date(project.updated_at), 'yyyy-MM-dd HH:mm')}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `projects-${format(new Date(), 'yyyy-MM-dd')}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className={className}>
      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="missing-only"
            checked={showMissingOnly}
            onCheckedChange={(checked) => {
              if (typeof checked === 'boolean') {
                setShowMissingOnly(checked);
              }
            }}
          />
          <label
            htmlFor="missing-only"
            className="flex cursor-pointer items-center gap-2 text-sm font-medium"
          >
            {showMissingOnly ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            Missing fields only
          </label>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={exportToCSV}
          disabled={sortedProjects.length === 0}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Results summary */}
      <div className="text-muted-foreground mb-4 text-sm">
        {selectedProjects.size > 0 && (
          <span className="mr-4">
            {selectedProjects.size} of {sortedProjects.length} selected
          </span>
        )}
        Showing {sortedProjects.length} of {projects.length} projects
        {showMissingOnly && (
          <span className="ml-2 text-orange-600">
            (filtered to missing fields only)
          </span>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedProjects.size === sortedProjects.length &&
                    sortedProjects.length > 0
                  }
                  onCheckedChange={selectAllProjects}
                />
              </TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('project_name')}
              >
                <div className="flex items-center gap-1">
                  Project Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('username')}
              >
                <div className="flex items-center gap-1">
                  Username
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>

              <TableHead>Description</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Missing Fields</TableHead>
              <TableHead>Links</TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('created_at')}
              >
                <div className="flex items-center gap-1">
                  Created
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedProjects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-muted-foreground py-8 text-center"
                >
                  {projects.length === 0
                    ? 'No projects found'
                    : 'No projects match your filters'}
                </TableCell>
              </TableRow>
            ) : (
              sortedProjects.map((project) => {
                const missingFields = getMissingFields(project);
                const isSelected = selectedProjects.has(project.id);

                return (
                  <TableRow
                    key={project.id}
                    className={isSelected ? 'bg-muted/50' : ''}
                  >
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() =>
                          toggleProjectSelection(project.id)
                        }
                      />
                    </TableCell>

                    <TableCell className="font-medium">
                      {project.project_name}
                    </TableCell>

                    <TableCell>{project.username}</TableCell>

                    <TableCell className="max-w-xs">
                      <div className="truncate" title={project.description}>
                        {project.description || 'No description'}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      {missingFields.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {missingFields.map((field) => (
                            <Badge
                              key={field}
                              variant="destructive"
                              className="text-xs"
                            >
                              {field}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-xs text-green-600"
                        >
                          Complete
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-1">
                        {project.git && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={project.git}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Git Repository"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {project.deployed_link && (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={project.deployed_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Deployed Site"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(project.created_at), 'MMM d, yyyy')}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Edit Project"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Delete Project"
                          onClick={() => handleDeleteProject(project)}
                          disabled={deleteProject.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

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
    </div>
  );
}
