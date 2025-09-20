'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { getIconComponent, ProjectLink } from '@/lib/iconUtils';
import { cn } from '@/lib/utils';

interface ProjectLinkButtonProps {
  link: ProjectLink;
}

export function ProjectLinkButton({ link }: ProjectLinkButtonProps) {
  const Icon = getIconComponent(link.icon);
  const isDisabled = link.type === 'placeholder';

  const buttonClasses = cn(
    'flex items-center gap-3 p-4 rounded-lg border transition-colors text-left w-full',
    isDisabled
      ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
      : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
  );

  // Disabled placeholder links
  if (isDisabled) {
    return (
      <div className={buttonClasses}>
        <Icon className="h-5 w-5 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium">{link.label}</div>
          <div className="text-xs text-gray-400">Coming Soon</div>
        </div>
      </div>
    );
  }

  // External links
  if (link.type === 'external') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        <Icon className="h-5 w-5 flex-shrink-0 text-gray-600" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-gray-900">{link.label}</div>
          <div className="truncate text-xs text-gray-500">{link.url}</div>
        </div>
        <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400" />
      </a>
    );
  }

  // Internal links
  return (
    <Link href={link.url} className={buttonClasses}>
      <Icon className="h-5 w-5 flex-shrink-0 text-gray-600" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-gray-900">{link.label}</div>
        <div className="text-xs text-gray-500">{link.url}</div>
      </div>
    </Link>
  );
}
