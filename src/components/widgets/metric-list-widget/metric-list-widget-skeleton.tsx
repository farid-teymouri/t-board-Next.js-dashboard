import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricListWidgetSkeletonProps {
  variant?: "metrics" | "sections";
  itemCount?: number;
  sectionItemCounts?: number[];
}

export function MetricListWidgetSkeleton({
  variant = "metrics",
  itemCount = 4,
  sectionItemCounts = [4, 3],
}: MetricListWidgetSkeletonProps) {
  if (variant === "sections") {
    return (
      <Card className="h-full">
        <CardContent className="space-y-6">
          {sectionItemCounts.map((count, sectionIndex) => (
            <div key={sectionIndex}>
              {sectionIndex > 0 && <div className="mb-6 border-t" />}

              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-12" />
              </div>

              <div className="mt-2">
                {Array.from({ length: count }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3 py-3">
                    <Skeleton className="size-9 shrink-0 rounded-md" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>

                    <Skeleton className="h-4 w-14" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-32" />
      </CardHeader>

      <CardContent>
        <div className="divide-y">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <Skeleton className="size-9 shrink-0 rounded-md" />

              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>

              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
