'use client';

import { useState } from 'react';
import {
  RefreshCw,
  Search,
  Calendar,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { SimpleCollapsibleContainer } from '@/components/collapsibles/SimpleCollapsibleContainer';
import { Button } from '@/components/ui/button';
import { useFormResponses } from '@/hooks/useFormResponses';
import { FormResponse } from '@/types/form-response';

function formatTimestamp(timestamp: string): string {
  try {
    return new Date(timestamp).toLocaleString();
  } catch {
    return timestamp;
  }
}

function SubmissionCard({ submission }: { submission: FormResponse }) {
  const answers = submission.answers;
  const title = answers.title || 'Untitled';
  const project = answers.project || 'Unknown Project';
  const subCategory = answers['sub categorization'] || '';
  const description = answers.description || '';
  const link = answers.link;

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
            <span className="rounded-md bg-blue-100 px-2 py-1 text-blue-800">
              {project}
            </span>
            {subCategory && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-700">
                {subCategory}
              </span>
            )}
          </div>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <Calendar className="h-3 w-3" />
          {formatTimestamp(submission.createTime)}
        </div>
      </div>

      {description && (
        <p className="text-sm leading-relaxed text-gray-700">{description}</p>
      )}

      {link && (
        <div className="pt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            {link}
          </a>
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse space-y-3 rounded-lg border p-4">
          <div className="h-6 w-1/3 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="h-16 rounded bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="py-8 text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        Failed to Load Submissions
      </h3>
      <p className="mb-4 text-sm text-gray-600">{error}</p>
      <Button onClick={onRetry} variant="outline" size="sm">
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}

export function FormSubmissionsDisplay() {
  const { data, isLoading, error, refetch, isRefetching } = useFormResponses();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubmissions =
    data?.responses?.filter((submission) => {
      const searchFields = [
        submission.answers.title,
        submission.answers.project,
        submission.answers['sub categorization'],
        submission.answers.description,
      ].filter(Boolean);

      return searchFields.some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <SimpleCollapsibleContainer
        title="Form Submissions"
        icon={<AlertCircle className="h-5 w-5" />}
        defaultExpanded={true}
      >
        <ErrorState error={error.message} onRetry={handleRefresh} />
      </SimpleCollapsibleContainer>
    );
  }

  return (
    <SimpleCollapsibleContainer
      title="Form Submissions"
      icon={<Calendar className="h-5 w-5" />}
      defaultExpanded={true}
    >
      <div className="space-y-4">
        {/* Header with refresh and search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search submissions..."
              className="w-full rounded-md border py-2 pr-4 pl-10 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isRefetching}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        {data && (
          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <span>Total: {data.totalResponses}</span>
            {searchTerm && <span>Filtered: {filteredSubmissions.length}</span>}
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <LoadingState />
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            {searchTerm
              ? 'No submissions match your search.'
              : 'No submissions found.'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <SubmissionCard
                key={submission.responseId}
                submission={submission}
              />
            ))}
          </div>
        )}
      </div>
    </SimpleCollapsibleContainer>
  );
}
