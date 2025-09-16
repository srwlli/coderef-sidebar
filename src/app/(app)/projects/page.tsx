'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FolderOpen, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/cards/Card';
import { Button } from '@/components/ui/button';
import { ViewToggle } from '@/components/projects/ViewToggle';
import { ProjectsTable } from '@/components/projects/ProjectsTable';
import Link from 'next/link';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') || 'cards';

  // Legacy hardcoded projects for card view
  // TODO: Remove when fully migrated to database
  const legacyProjects = [
    { name: 'coderef', href: '/projects/coderef' },
    { name: 'coderef2', href: '/projects/coderef2' },
    { name: 'MyStudyApp', href: '/projects/mystudyapp' },
    { name: 'Smart Phrases', href: '/projects/smart-phrases' },
    { name: 'My Sports Rank', href: '/projects/my-sports-rank' },
    { name: "iCaughta'", href: '/projects/icaughta' },
    { name: 'noted', href: '/projects/noted' },
    { name: 'formed', href: '/projects/formed' },
    { name: 'Agents', href: '/projects/agents' },
    { name: 'Highway Games', href: '/projects/highway-games' },
    { name: 'My Dash', href: '/projects/my-dash' },
    { name: 'Paper trail', href: '/projects/paper-trail' },
    { name: 'UDS', href: '/projects/uds' },
    { name: 'Workflows', href: '/projects/workflows' },
    { name: 'Project 15', href: '/projects/project-landing' },
    { name: 'Project 16', href: '/projects/project-landing' },
  ];

  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        {/* Header with view toggle */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">
              {currentView === 'table'
                ? 'Manage your projects and track missing fields'
                : 'Browse your project collection'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
            <ViewToggle />
          </div>
        </div>

        {/* Content based on current view */}
        {currentView === 'table' ? (
          <ProjectsTable />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {legacyProjects.map((project, index) => (
              <Link
                key={`project-${index}`}
                href={project.href}
                className="block"
              >
                <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                  <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                    <FolderOpen className="mb-2 h-8 w-8 flex-shrink-0 text-black" />
                    <CardTitle className="text-sm leading-tight sm:text-base">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
