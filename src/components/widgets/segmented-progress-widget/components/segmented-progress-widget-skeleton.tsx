import { Skeleton } from "@/components/ui/skeleton";

export function SegmentedProgressWidgetSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-28" />
      </div>

      <Skeleton className="h-3 w-full rounded-full" />

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
