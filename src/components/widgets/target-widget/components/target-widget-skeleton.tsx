import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TargetWidgetSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-28" />
          </div>

          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="relative mx-auto size-56">
          <div className="absolute inset-0 rounded-full bg-muted" />

          <div className="absolute inset-4 rounded-full bg-card" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <div className="border-t pt-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-5 w-24" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
