import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/cards';

interface ListCardProps {
  title: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

/**
 * Reusable list view card component with consistent sizing.
 * Uses 12px gaps and border radius, 16px padding to match mobile UI.
 */
export function ListCard({ title, href, icon: Icon, external }: ListCardProps) {
  return (
    <Link
      href={href}
      className="block"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Card className="cursor-pointer rounded-xl transition-shadow duration-200 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3 p-4">
          <Icon className="h-6 w-6 flex-shrink-0" />
          <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
