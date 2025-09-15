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
      name: 'MyStudyApp',
      href: '/projects/mystudyapp',
    },
    {
      name: 'Smart Phrases',
      href: '/projects/smart-phrases',
    },
    {
      name: 'My Sports Rank',
      href: '/projects/my-sports-rank',
    },
    {
      name: "iCaughta'",
      href: '/projects/icaughta',
    },
    {
      name: 'noted',
      href: '/projects/noted',
    },
    {
      name: 'formed',
      href: '/projects/formed',
    },
    {
      name: 'Agents',
      href: '/projects/agents',
    },
    {
      name: 'Highway Games',
      href: '/projects/highway-games',
    },
    {
      name: 'My Dash',
      href: '/projects/my-dash',
    },
    {
      name: 'Paper trail',
      href: '/projects/paper-trail',
    },
    {
      name: 'UDS',
      href: '/projects/uds',
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
