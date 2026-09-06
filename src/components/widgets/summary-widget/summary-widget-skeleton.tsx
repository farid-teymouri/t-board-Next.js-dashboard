import { Card, CardContent } from "@/components/ui/card";

export function SummaryWidgetSkeleton() {
  return (
    <Card>
      <CardContent className="flex h-full flex-col justify-between gap-4">
        <div className="space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />

          <div className="h-8 w-64 animate-pulse rounded bg-muted" />

          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted/70" />

            <div className="h-4 w-4/5 animate-pulse rounded bg-muted/70" />
          </div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-20 flex-1 animate-pulse rounded-lg bg-muted/50"
            />
          ))}
        </div>

        <div className="flex gap-3">
          <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />

          <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
