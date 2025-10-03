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
 * Reusable list view card component with vertical layout.
 * Matches grid card style but displayed in single column.
 */
export function ListCard({ title, href, icon: Icon, external }: ListCardProps) {
  return (
    <Link
      href={href}
      className="block"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Card className="h-24 cursor-pointer py-0 transition-shadow duration-200 hover:shadow-lg">
        <CardHeader className="flex h-full flex-col items-center justify-center p-3 text-center">
          <Icon className="mb-1.5 h-6 w-6 flex-shrink-0 sm:mb-2 sm:h-8 sm:w-8" />
          <CardTitle className="text-xs leading-tight sm:text-sm">
            {title}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
