import { ExternalLink, FileText, GitBranch, Settings } from 'lucide-react';

/**
 * Maps icon names from database to Lucide React components
 */
export function getIconComponent(iconName: string) {
  const iconMap = {
    ExternalLink,
    FileText,
    GitBranch,
    Settings,
  };

  return iconMap[iconName as keyof typeof iconMap] || ExternalLink;
}

/**
 * Type definition for project link from database
 */
export interface ProjectLink {
  url: string;
  label: string;
  icon: string;
  type: 'external' | 'internal' | 'placeholder';
}
