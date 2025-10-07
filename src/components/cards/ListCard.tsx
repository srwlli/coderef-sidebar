'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/cards';
import { useLongPress } from '@/hooks/use-long-press';
import { useRouter } from 'next/navigation';

interface ListCardProps {
  title: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  onLongPress?: () => void;
}

/**
 * Reusable list view card component.
 * Matches reference card sizing: 16px padding, 12px gap, 12px border radius.
 * Supports long-press for action modal.
 */
export function ListCard({
  title,
  href,
  icon: Icon,
  external,
  onLongPress,
}: ListCardProps) {
  const router = useRouter();

  const longPressHandlers = useLongPress({
    onLongPress: () => {
      if (onLongPress) onLongPress();
    },
    onClick: () => {
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(href);
      }
    },
  });

  // If no long-press handler, use regular Link
  if (!onLongPress) {
    return (
      <Link
        href={href}
        className="block"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <Card className="cursor-pointer gap-0 py-0 transition-shadow duration-200 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3 p-4">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <CardTitle className="text-sm">{title}</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    );
  }

  // With long-press support
  return (
    <div className="block" {...longPressHandlers}>
      <Card className="cursor-pointer gap-0 py-0 transition-shadow duration-200 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3 p-4">
          <Icon className="h-5 w-5 flex-shrink-0" />
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
