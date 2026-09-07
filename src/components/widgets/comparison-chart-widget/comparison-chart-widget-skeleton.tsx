import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ComparisonChartWidgetSkeleton() {
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />

            <div className="mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-lg border p-0.5 py-1">
            <div className="h-7 w-12 animate-pulse rounded-md bg-muted" />
            <div className="h-7 w-12 animate-pulse rounded-md bg-muted" />
            <div className="h-7 w-12 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[360px] animate-pulse rounded-md bg-muted/50" />
      </CardContent>
    </Card>
  );
}
