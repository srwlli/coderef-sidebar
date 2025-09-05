import { CardSkeleton } from '@/components/skeletons';

export default function Loading() {
  return (
    <div className="p-8">
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </main>
    </div>
  );
}
