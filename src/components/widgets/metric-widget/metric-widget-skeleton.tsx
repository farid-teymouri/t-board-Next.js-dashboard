import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function MetricWidgetSkeleton() {
  return (
    <Card className="flex h-full w-full flex-col justify-between pb-0 sm:w-[385px] xl:w-full">
      <CardHeader>
        <div className="space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />

          <div className="h-9 w-36 animate-pulse rounded bg-muted" />

          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="mb-3 h-[122px] animate-pulse rounded-md bg-muted/50 mx-3" />
      </CardContent>
    </Card>
  );
}
