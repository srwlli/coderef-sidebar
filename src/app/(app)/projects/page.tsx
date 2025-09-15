'use client';

import { FolderOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/cards/Card';
import Link from 'next/link';

export default function ProjectsPage() {
  // All projects currently link to the same landing page
  // TODO: Update individual hrefs when specific project pages are created
  const projects = [
    {
      name: 'coderef',
      href: '/projects/coderef',
    },
    {
      name: 'coderef2',
      href: '/projects/coderef2',
    },
    {
      name: 'Project 3',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 4',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 5',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 6',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 7',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 8',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 9',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 10',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 11',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 12',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 13',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 14',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 15',
      href: '/projects/project-landing',
    },
    {
      name: 'Project 16',
      href: '/projects/project-landing',
    },
  ];

  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, index) => (
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
      </main>
    </div>
  );
}
