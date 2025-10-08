import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

/**
 * Curated list of 50 lucide-react icons for custom dashboard cards
 *
 * TO EXPAND TO ALL 1000+ ICONS:
 * 1. Import all icon names from lucide-react
 * 2. Add search/filter functionality in IconPicker component
 * 3. Consider virtualization for performance with large lists
 */
export const CURATED_ICONS = [
  'Github',
  'Chrome',
  'Globe',
  'Mail',
  'Calendar',
  'Database',
  'Folder',
  'File',
  'Code',
  'Terminal',
  'Settings',
  'User',
  'Users',
  'Home',
  'Search',
  'Bell',
  'Heart',
  'Star',
  'Bookmark',
  'Link',
  'ExternalLink',
  'Download',
  'Upload',
  'Share',
  'Copy',
  'Trash',
  'Edit',
  'Plus',
  'Minus',
  'Check',
  'X',
  'ChevronRight',
  'ArrowRight',
  'Zap',
  'Sparkles',
  'Rocket',
  'Package',
  'Box',
  'ShoppingCart',
  'CreditCard',
  'DollarSign',
  'TrendingUp',
  'BarChart',
  'PieChart',
  'Activity',
  'Cpu',
  'HardDrive',
  'Cloud',
  'Server',
  'Smartphone',
] as const;

export type CuratedIconName = (typeof CURATED_ICONS)[number];

/**
 * Convert icon name string to LucideIcon component
 * Falls back to Link icon if iconName is invalid
 */
export function getIconComponent(iconName: string): LucideIcon {
  const IconsMap = Icons as Record<string, unknown>;
  const Icon = IconsMap[iconName] as LucideIcon | undefined;
  return Icon || Icons.Link;
}
