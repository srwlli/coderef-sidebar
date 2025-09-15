'use client';

import { Link as LinkIcon, ExternalLink } from 'lucide-react';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';
import { Button } from '@/components/ui/button';
import { FormSubmissionsDisplay } from '@/components/forms/FormSubmissionsDisplay';

export default function LinksPage() {
  const formUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSfwsV7K4HsS3p09_fqM9mySYiLzEdyPnVGEQLgUYzNe5QdwHA/viewform';

  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="space-y-6">
          <SimpleCollapsibleContainer
            title="Google Form"
            icon={<LinkIcon />}
            defaultExpanded={true}
            className="w-full"
          >
            <div className="flex flex-col items-center gap-4">
              <p className="text-muted-foreground text-center">
                Click below to open the Google Form in a new tab.
              </p>
              <Button asChild>
                <a href={formUrl} target="_blank" rel="noopener noreferrer">
                  Open Form in New Tab
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </SimpleCollapsibleContainer>

          <FormSubmissionsDisplay />
        </div>
      </main>
    </div>
  );
}
