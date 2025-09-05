import { Skeleton } from './Skeleton';

function CardSkeleton() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
        <div className="px-6">
          <div className="space-y-1.5">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="px-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

export { CardSkeleton };
