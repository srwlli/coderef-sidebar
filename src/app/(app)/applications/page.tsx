'use client';

import { FolderOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/cards/Card';
import Link from 'next/link';

export default function ApplicationsPage() {
  // All applications currently link to the same landing page
  // TODO: Update individual hrefs when specific application pages are created
  const applications = [
    {
      name: 'coderef',
      href: '/applications/coderef',
    },
    {
      name: 'coderef2',
      href: '/applications/coderef2',
    },
    {
      name: 'Application 3',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 4',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 5',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 6',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 7',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 8',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 9',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 10',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 11',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 12',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 13',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 14',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 15',
      href: '/applications/application-landing',
    },
    {
      name: 'Application 16',
      href: '/applications/application-landing',
    },
  ];

  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {applications.map((application, index) => (
            <Link
              key={`application-${index}`}
              href={application.href}
              className="block"
            >
              <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                  <FolderOpen className="mb-2 h-8 w-8 flex-shrink-0 text-black" />
                  <CardTitle className="text-sm leading-tight sm:text-base">
                    {application.name}
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
