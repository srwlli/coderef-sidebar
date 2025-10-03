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
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type { DbProject } from '@/types/project';

interface ProjectsTableProps {
  className?: string;
  projects: DbProject[];
  loading: boolean;
  error: string | null;
}

export function ProjectsTable({
  className,
  projects,
  loading,
  error,
}: ProjectsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

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
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
