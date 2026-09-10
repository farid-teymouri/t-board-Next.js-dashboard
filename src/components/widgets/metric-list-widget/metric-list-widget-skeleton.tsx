import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricListWidgetSkeletonProps {
  itemCount?: number;
}

export function MetricListWidgetSkeleton({
  itemCount = 4,
}: MetricListWidgetSkeletonProps) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-32" />
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
