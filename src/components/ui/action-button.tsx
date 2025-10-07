import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
  className?: string;
}

/**
 * Action button component for use in action modals
 * Displays an icon and label in a flexible, accessible button
 */
export function ActionButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  destructive = false,
  className,
}: ActionButtonProps) {
  const iconColor = destructive
    ? 'text-red-600'
    : 'text-gray-700 dark:text-gray-200';
  const textColor = destructive
    ? 'text-red-600'
    : 'text-gray-700 dark:text-gray-200';
  const hoverBg = destructive
    ? 'hover:bg-red-50 dark:hover:bg-red-900/20'
    : 'hover:bg-gray-100 dark:hover:bg-gray-700';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-2',
        'rounded-xl border px-3 py-4',
        'bg-white dark:bg-gray-800',
        'border-gray-200 dark:border-gray-700',
        hoverBg,
        'transition-colors duration-150',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus:ring-2 focus:ring-blue-500 focus:outline-none',
        className
      )}
      aria-label={label}
    >
      <Icon className={cn('h-7 w-7 flex-shrink-0', iconColor)} />
      <span className={cn('text-sm font-medium', textColor)}>{label}</span>
    </button>
  );
}
