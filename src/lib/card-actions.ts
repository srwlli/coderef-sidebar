import {
  GitBranch,
  FolderOpen,
  ExternalLink,
  PlusCircle,
  Workflow,
  Rocket,
  Edit,
  Trash,
  Globe,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { CustomCard } from '@/stores/use-app-store';

export interface CardAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

/**
 * Open external URL in new tab
 */
const openExternal = (url: string) => () => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Navigate to internal route
 */
const navigate = (path: string) => () => {
  window.location.href = path;
};

/**
 * Card-specific action definitions
 * Maps card titles to their available actions
 */
export const cardActionsMap: Record<string, CardAction[]> = {
  // Internal Tools
  Prompts: [
    {
      icon: PlusCircle,
      label: 'Create New',
      onClick: navigate('/ai-tools/prompts'),
    },
    {
      icon: FolderOpen,
      label: 'Browse All',
      onClick: navigate('/ai-tools/prompts'),
    },
  ],

  'Git Commands': [
    {
      icon: GitBranch,
      label: 'View Commands',
      onClick: navigate('/git-commands'),
    },
  ],

  'Next.js Setup': [
    {
      icon: Workflow,
      label: 'View Workflow',
      onClick: navigate('/workflows/nextjs-setup'),
    },
  ],

  // External Platforms
  Noted: [
    {
      icon: ExternalLink,
      label: 'Open App',
      onClick: openExternal('https://noted-bay-three.vercel.app/'),
    },
  ],

  Vercel: [
    {
      icon: ExternalLink,
      label: 'Open Dashboard',
      onClick: openExternal('https://vercel.com/teamhart'),
    },
    {
      icon: Rocket,
      label: 'Deployments',
      onClick: openExternal('https://vercel.com/teamhart/~/deployments'),
    },
  ],

  'Anthropic Console': [
    {
      icon: ExternalLink,
      label: 'Open Console',
      onClick: openExternal('https://console.anthropic.com/dashboard'),
    },
  ],

  GitHub: [
    {
      icon: ExternalLink,
      label: 'Open GitHub',
      onClick: openExternal('https://github.com/dashboard'),
    },
  ],

  Supabase: [
    {
      icon: ExternalLink,
      label: 'Open Dashboard',
      onClick: openExternal(
        'https://supabase.com/dashboard/org/wskblpimfkjbkgayzxqj'
      ),
    },
  ],

  'Google Stitch': [
    {
      icon: ExternalLink,
      label: 'Open Stitch',
      onClick: openExternal('https://stitch.withgoogle.com/?pli=1'),
    },
  ],

  Figma: [
    {
      icon: ExternalLink,
      label: 'Open Figma',
      onClick: openExternal(
        'https://www.figma.com/files/team/1500256681417245761/recents-and-sharing?fuid=1500256678774338537'
      ),
    },
  ],

  'n8n Workflows': [
    {
      icon: ExternalLink,
      label: 'Open n8n',
      onClick: openExternal('http://localhost:5678/home/workflows'),
    },
  ],

  // AI Tools
  ChatGPT: [
    {
      icon: ExternalLink,
      label: 'Open ChatGPT',
      onClick: openExternal('https://chat.openai.com'),
    },
  ],

  Claude: [
    {
      icon: ExternalLink,
      label: 'Open Claude',
      onClick: openExternal('https://claude.ai'),
    },
  ],

  Gemini: [
    {
      icon: ExternalLink,
      label: 'Open Gemini',
      onClick: openExternal('https://gemini.google.com'),
    },
  ],

  DeepSeek: [
    {
      icon: ExternalLink,
      label: 'Open DeepSeek',
      onClick: openExternal('https://chat.deepseek.com'),
    },
  ],

  Grok: [
    {
      icon: ExternalLink,
      label: 'Open Grok',
      onClick: openExternal('https://grok.x.ai'),
    },
  ],

  'Le Chat': [
    {
      icon: ExternalLink,
      label: 'Open Le Chat',
      onClick: openExternal('https://chat.mistral.ai'),
    },
  ],

  Perplexity: [
    {
      icon: ExternalLink,
      label: 'Open Perplexity',
      onClick: openExternal('https://perplexity.ai'),
    },
  ],

  Lovable: [
    {
      icon: ExternalLink,
      label: 'Open Lovable',
      onClick: openExternal('https://lovable.dev/'),
    },
  ],

  Replit: [
    {
      icon: ExternalLink,
      label: 'Open Replit',
      onClick: openExternal('https://replit.com'),
    },
  ],

  'GitHub Copilot': [
    {
      icon: ExternalLink,
      label: 'Open Copilot',
      onClick: openExternal('https://github.com/features/copilot'),
    },
  ],

  Cursor: [
    {
      icon: ExternalLink,
      label: 'Open Cursor',
      onClick: openExternal('https://cursor.sh'),
    },
  ],

  V0: [
    {
      icon: ExternalLink,
      label: 'Open V0',
      onClick: openExternal('https://v0.dev'),
    },
  ],
};

interface GetCardActionsOptions {
  cardTitle: string;
  customCard?: CustomCard | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

/**
 * Get actions for a specific card
 * - For custom cards: returns Open, Edit, Delete actions
 * - For default cards: returns card-specific actions from cardActionsMap
 */
export function getCardActions(
  options: GetCardActionsOptions | string
): CardAction[] {
  // Support legacy string signature for backward compatibility
  if (typeof options === 'string') {
    return cardActionsMap[options] || [];
  }

  const { cardTitle, customCard, onEdit, onDelete } = options;

  // Custom card actions (check for id property)
  if (customCard?.id) {
    // Generate actions from links array
    const linkActions = customCard.links.map((link) => {
      const isExternal = link.href.startsWith('http');
      return {
        icon: isExternal ? ExternalLink : Globe,
        label: link.label,
        onClick: () => {
          if (isExternal) {
            window.open(link.href, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = link.href;
          }
        },
      };
    });

    return [
      ...linkActions,
      {
        icon: Edit,
        label: 'Edit',
        onClick: () => onEdit?.(),
      },
      {
        icon: Trash,
        label: 'Delete',
        onClick: () => onDelete?.(),
        destructive: true,
      },
    ];
  }

  // Default card actions
  return cardActionsMap[cardTitle] || [];
}
