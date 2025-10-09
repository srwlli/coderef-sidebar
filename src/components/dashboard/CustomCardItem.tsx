'use client';

import { Card, CardHeader, CardTitle } from '@/components/cards';
import { LucideIcon } from 'lucide-react';
import { useLongPress } from '@/hooks/use-long-press';
import { useRouter } from 'next/navigation';
import { CustomCard } from '@/stores/use-app-store';

interface CustomCardItemProps {
  card: CustomCard;
  icon: LucideIcon;
  view: 'grid' | 'list';
  onLongPress?: () => void;
}

/**
 * Renders custom cards in both grid and list views
 * Matches existing GridCardItem and ListCard design exactly
 */
export function CustomCardItem({
  card,
  icon: Icon,
  view,
  onLongPress,
}: CustomCardItemProps) {
  const router = useRouter();

  const { style, ...handlers } = useLongPress({
    onLongPress: () => {
      if (onLongPress) onLongPress();
    },
    onClick: () => {
      // Open first link by default
      if (card.links.length > 0) {
        const firstLink = card.links[0];
        if (firstLink.href.startsWith('http')) {
          window.open(firstLink.href, '_blank', 'noopener,noreferrer');
        } else {
          router.push(firstLink.href);
        }
      }
    },
  });

  // Grid view variant
  if (view === 'grid') {
    return (
      <div className="block" style={style} {...handlers}>
        <Card className="h-24 cursor-pointer py-0 transition-shadow duration-200 hover:shadow-lg">
          <CardHeader className="flex h-full flex-col items-center justify-center p-3 text-center">
            <Icon className="mb-1.5 h-6 w-6 flex-shrink-0 sm:mb-2 sm:h-8 sm:w-8" />
            <CardTitle className="text-xs leading-tight sm:text-sm">
              {card.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // List view variant
  return (
    <div className="block" style={style} {...handlers}>
      <Card className="cursor-pointer gap-0 py-0 transition-shadow duration-200 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3 p-4">
          <Icon className="h-5 w-5 flex-shrink-0" />
          <CardTitle className="text-sm">{card.title}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
