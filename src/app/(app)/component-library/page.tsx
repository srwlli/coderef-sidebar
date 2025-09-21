'use client';

import { Package, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/cards';
import Link from 'next/link';

export default function ComponentLibraryPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Package className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Component Library</h1>
          <Badge variant="outline" className="text-sm">
            Development
          </Badge>
        </div>
        <div className="flex items-center gap-2">{/* Future: Actions */}</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <main className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Component development and testing environment.
            </p>
          </div>

          {/* Preview Page Card */}
          <Link href="/component-library/preview-page">
            <Card className="group cursor-pointer transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5" />
                    <div>
                      <CardTitle>Component Preview</CardTitle>
                      <p className="mt-1 text-sm text-gray-600">
                        Professional component library with interactive
                        documentation
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-600" />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  View interactive component examples, documentation, and live
                  previews including CollapsibleContainer and mock components.
                </div>
              </CardHeader>
            </Card>
          </Link>
        </main>
      </div>
    </div>
  );
}
