import { Card, CardContent, CardHeader } from "@/components/ui/card";

type BreakdownWidgetSkeletonProps = {
  itemCount?: number;
};

export function BreakdownWidgetSkeleton({
  itemCount = 3,
}: BreakdownWidgetSkeletonProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="h-6 w-40 animate-pulse rounded bg-muted" />

        <div className="mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center">
        <div className="relative aspect-square w-full max-w-[250px]">
          <div className="absolute inset-8 animate-pulse rounded-full border-20 border-muted" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="h-8 w-20 animate-pulse rounded bg-muted" />

            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </CardContent>

      <div
        className="grid gap-4 border-t px-6 py-4"
        style={{
          gridTemplateColumns: `repeat(${itemCount}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-3 w-16 animate-pulse rounded bg-muted" />

            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </Card>
  );
}
