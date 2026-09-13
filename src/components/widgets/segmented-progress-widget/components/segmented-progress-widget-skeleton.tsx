import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SegmentedProgressWidgetSkeleton() {
  return (
    <Card className="flex h-full flex-col gap-6">
      <CardHeader className="space-y-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-28" />
      </CardHeader>

      <CardContent className="flex h-full flex-col justify-between space-y-5">
        <div className="space-y-5">
          {/* Segmented progress bar */}
          <Skeleton className="h-3 w-full rounded-full" />

          {/* Legend */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`skeleton-legend-${index}`}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Skeleton className="size-2.5 shrink-0 rounded-full" />

                  <Skeleton
                    className={
                      index === 0
                        ? "h-4 w-24"
                        : index === 1
                          ? "h-4 w-20"
                          : "h-4 w-28"
                    }
                  />
                </div>

                <Skeleton className="h-4 w-12 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Alert */}
        <div className="space-y-5">
          <div className="h-px w-full bg-border" />

          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
