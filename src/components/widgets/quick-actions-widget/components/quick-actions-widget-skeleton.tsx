import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type QuickActionsWidgetSkeletonProps = {
  actionCount?: number;
};

export function QuickActionsWidgetSkeleton({
  actionCount = 4,
}: QuickActionsWidgetSkeletonProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-32" />
        </div>

        <Skeleton className="h-4 w-16" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: actionCount }).map((_, index) => (
            <div
              key={index}
              className="flex min-h-24 min-w-28 flex-1 flex-col items-center justify-center gap-2 rounded-md border px-4 py-4 sm:flex-none"
            >
              <Skeleton className="size-5 rounded-md" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
