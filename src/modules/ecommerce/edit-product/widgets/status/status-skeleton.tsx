import { Skeleton } from "@/components/ui/skeleton";

export function StatusSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-start gap-3">
            <Skeleton className="mt-0.5 size-4 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-44" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-px w-full" />

      <div className="space-y-4">
        <Skeleton className="h-4 w-28" />

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="size-4 rounded-sm" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
