import { Skeleton } from './Skeleton';

function ButtonSkeleton({
  size = 'default',
}: {
  size?: 'sm' | 'default' | 'lg' | 'icon';
}) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    default: 'h-9 w-24',
    lg: 'h-10 w-28',
    icon: 'size-9',
  };

  return <Skeleton className={`rounded-md ${sizeClasses[size]}`} />;
}

export { ButtonSkeleton };
