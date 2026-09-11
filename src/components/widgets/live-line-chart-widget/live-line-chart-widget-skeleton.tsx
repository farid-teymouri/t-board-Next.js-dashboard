import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LiveLineChartWidgetSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-40" />
          </div>

          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        <Skeleton className="mt-3 h-9 w-24" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-[260px] w-full" />

        <div className="my-5 border-t" />

        <div className="space-y-5">
          <Skeleton className="h-4 w-32" />

          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-10" />
              </div>

              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
