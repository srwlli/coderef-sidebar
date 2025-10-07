import {
  GitBranch,
  FileText,
  Star,
  FolderOpen,
  MessageSquare,
  Sparkles,
  History,
  Settings,
  ExternalLink,
  PlusCircle,
  BarChart3,
  Package,
  Database,
  Cloud,
  Globe,
  Workflow,
  Code,
  BookOpen,
  Zap,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import { LucideIcon } from 'lucide-react';

export interface CardAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

/**
 * Show "Coming Soon" toast notification
 */
const showComingSoon = () => {
  toast.info('Coming Soon', { position: 'top-center' });
};

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
    { icon: Star, label: 'Favorites', onClick: showComingSoon },
    {
      icon: PlusCircle,
      label: 'Create New',
      onClick: navigate('/ai-tools/prompts'),
    },
    { icon: History, label: 'Recent', onClick: showComingSoon },
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
    { icon: Code, label: 'Quick Reference', onClick: showComingSoon },
    { icon: BookOpen, label: 'Git Guide', onClick: showComingSoon },
    { icon: Settings, label: 'Preferences', onClick: showComingSoon },
  ],

  'Next.js Setup': [
    {
      icon: Workflow,
      label: 'View Workflow',
      onClick: navigate('/workflows/nextjs-setup'),
    },
    { icon: FileText, label: 'Documentation', onClick: showComingSoon },
    { icon: Zap, label: 'Quick Start', onClick: showComingSoon },
    { icon: Settings, label: 'Configure', onClick: showComingSoon },
  ],

  // External Platforms
  Noted: [
    {
      icon: ExternalLink,
      label: 'Open App',
      onClick: openExternal('https://noted-bay-three.vercel.app/'),
    },
    { icon: PlusCircle, label: 'New Note', onClick: showComingSoon },
    { icon: Search, label: 'Search Notes', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  Vercel: [
    {
      icon: ExternalLink,
      label: 'Open Dashboard',
      onClick: openExternal('https://vercel.com/teamhart'),
    },
    { icon: Package, label: 'Projects', onClick: showComingSoon },
    { icon: Zap, label: 'Deploy', onClick: showComingSoon },
    { icon: BarChart3, label: 'Analytics', onClick: showComingSoon },
  ],

  'Anthropic Console': [
    {
      icon: ExternalLink,
      label: 'Open Console',
      onClick: openExternal('https://console.anthropic.com/dashboard'),
    },
    { icon: MessageSquare, label: 'API Keys', onClick: showComingSoon },
    { icon: BarChart3, label: 'Usage', onClick: showComingSoon },
    { icon: FileText, label: 'Docs', onClick: showComingSoon },
  ],

  GitHub: [
    {
      icon: ExternalLink,
      label: 'Open GitHub',
      onClick: openExternal('https://github.com/dashboard'),
    },
    { icon: GitBranch, label: 'Repositories', onClick: showComingSoon },
    { icon: PlusCircle, label: 'New Repo', onClick: showComingSoon },
    { icon: Star, label: 'Stars', onClick: showComingSoon },
  ],

  Supabase: [
    {
      icon: ExternalLink,
      label: 'Open Dashboard',
      onClick: openExternal(
        'https://supabase.com/dashboard/org/wskblpimfkjbkgayzxqj'
      ),
    },
    { icon: Database, label: 'Database', onClick: showComingSoon },
    { icon: Settings, label: 'Project Settings', onClick: showComingSoon },
    { icon: FileText, label: 'Docs', onClick: showComingSoon },
  ],

  'Google Stitch': [
    {
      icon: ExternalLink,
      label: 'Open Stitch',
      onClick: openExternal('https://stitch.withgoogle.com/?pli=1'),
    },
    { icon: Sparkles, label: 'New Project', onClick: showComingSoon },
    { icon: FolderOpen, label: 'My Projects', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  Figma: [
    {
      icon: ExternalLink,
      label: 'Open Figma',
      onClick: openExternal(
        'https://www.figma.com/files/team/1500256681417245761/recents-and-sharing?fuid=1500256678774338537'
      ),
    },
    { icon: PlusCircle, label: 'New Design', onClick: showComingSoon },
    { icon: FolderOpen, label: 'My Files', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  'n8n Workflows': [
    {
      icon: ExternalLink,
      label: 'Open n8n',
      onClick: openExternal('http://localhost:5678/home/workflows'),
    },
    { icon: Workflow, label: 'My Workflows', onClick: showComingSoon },
    { icon: PlusCircle, label: 'New Workflow', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  // AI Tools
  ChatGPT: [
    {
      icon: ExternalLink,
      label: 'Open ChatGPT',
      onClick: openExternal('https://chat.openai.com'),
    },
    { icon: MessageSquare, label: 'New Chat', onClick: showComingSoon },
    { icon: History, label: 'History', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  Claude: [
    {
      icon: ExternalLink,
      label: 'Open Claude',
      onClick: openExternal('https://claude.ai'),
    },
    { icon: MessageSquare, label: 'New Chat', onClick: showComingSoon },
    { icon: History, label: 'History', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  Gemini: [
    {
      icon: ExternalLink,
      label: 'Open Gemini',
      onClick: openExternal('https://gemini.google.com'),
    },
    { icon: MessageSquare, label: 'New Chat', onClick: showComingSoon },
    { icon: History, label: 'History', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  DeepSeek: [
    {
      icon: ExternalLink,
      label: 'Open DeepSeek',
      onClick: openExternal('https://chat.deepseek.com'),
    },
    { icon: MessageSquare, label: 'New Chat', onClick: showComingSoon },
    { icon: History, label: 'History', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  Grok: [
    {
      icon: ExternalLink,
      label: 'Open Grok',
      onClick: openExternal('https://grok.x.ai'),
    },
    { icon: MessageSquare, label: 'New Chat', onClick: showComingSoon },
    { icon: History, label: 'History', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  'Le Chat': [
    {
      icon: ExternalLink,
      label: 'Open Le Chat',
      onClick: openExternal('https://chat.mistral.ai'),
    },
    { icon: MessageSquare, label: 'New Chat', onClick: showComingSoon },
    { icon: History, label: 'History', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  Perplexity: [
    {
      icon: ExternalLink,
      label: 'Open Perplexity',
      onClick: openExternal('https://perplexity.ai'),
    },
    { icon: Search, label: 'New Search', onClick: showComingSoon },
    { icon: History, label: 'History', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  Lovable: [
    {
      icon: ExternalLink,
      label: 'Open Lovable',
      onClick: openExternal('https://lovable.dev/'),
    },
    { icon: PlusCircle, label: 'New Project', onClick: showComingSoon },
    { icon: FolderOpen, label: 'My Projects', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  Replit: [
    {
      icon: ExternalLink,
      label: 'Open Replit',
      onClick: openExternal('https://replit.com'),
    },
    { icon: PlusCircle, label: 'New Repl', onClick: showComingSoon },
    { icon: FolderOpen, label: 'My Repls', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],

  'GitHub Copilot': [
    {
      icon: ExternalLink,
      label: 'Open Copilot',
      onClick: openExternal('https://github.com/features/copilot'),
    },
    { icon: FileText, label: 'Documentation', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
    { icon: Sparkles, label: 'Features', onClick: showComingSoon },
  ],

  Cursor: [
    {
      icon: ExternalLink,
      label: 'Open Cursor',
      onClick: openExternal('https://cursor.sh'),
    },
    { icon: FileText, label: 'Documentation', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
    { icon: Zap, label: 'Get Started', onClick: showComingSoon },
  ],

  V0: [
    {
      icon: ExternalLink,
      label: 'Open V0',
      onClick: openExternal('https://v0.dev'),
    },
    { icon: PlusCircle, label: 'New Component', onClick: showComingSoon },
    { icon: History, label: 'History', onClick: showComingSoon },
    { icon: Settings, label: 'Settings', onClick: showComingSoon },
  ],
};

/**
 * Get actions for a specific card
 * Returns empty array if card not found
 */
export function getCardActions(cardTitle: string): CardAction[] {
  return cardActionsMap[cardTitle] || [];
}
