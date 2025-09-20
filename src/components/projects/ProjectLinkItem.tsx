'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { getIconComponent, ProjectLink } from '@/lib/iconUtils';
import { cn } from '@/lib/utils';

interface ProjectLinkItemProps {
  link: ProjectLink;
  onLinkClick?: () => void;
}

export function ProjectLinkItem({ link, onLinkClick }: ProjectLinkItemProps) {
  const Icon = getIconComponent(link.icon);

  const commonClasses =
    'flex items-center gap-2 px-3 py-2 text-sm transition-colors';

  // Disabled placeholder links
  if (link.type === 'placeholder') {
    return (
      <div className={cn(commonClasses, 'cursor-not-allowed text-gray-400')}>
        <Icon className="h-4 w-4" />
        <span>{link.label}</span>
        <span className="ml-auto text-xs">(Coming Soon)</span>
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
        className={cn(commonClasses, 'hover:bg-gray-50')}
        onClick={onLinkClick}
      >
        <Icon className="h-4 w-4" />
        <span>{link.label}</span>
        <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
      </a>
    );
  }

  // Internal links
  return (
    <Link
      href={link.url}
      className={cn(commonClasses, 'hover:bg-gray-50')}
      onClick={onLinkClick}
    >
      <Icon className="h-4 w-4" />
      <span>{link.label}</span>
    </Link>
  );
}
