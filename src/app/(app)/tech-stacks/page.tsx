'use client';

import { Info } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/cards/Card';
import Link from 'next/link';

export default function TechStacksPage() {
  // Internal tools
  const internalTools = [
    {
      name: 'This Stack',
      href: '/tech-stacks/this-stack',
      icon: Info,
    },
  ];

  return (
    <div className="p-8">
      <main className="mx-auto max-w-6xl">
        <div className="space-y-6">
          {/* Internal tools cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {internalTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={`internal-${index}`}
                  href={tool.href}
                  className="block"
                >
                  <Card className="h-32 cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                    <CardHeader className="flex h-full flex-col items-center justify-center p-4 text-center">
                      <IconComponent className="mb-2 h-8 w-8 flex-shrink-0" />
                      <CardTitle className="text-sm leading-tight sm:text-base">
                        {tool.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
