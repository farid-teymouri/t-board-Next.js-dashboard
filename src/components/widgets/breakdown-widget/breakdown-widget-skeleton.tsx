import { Card, CardContent, CardHeader } from "@/components/ui/card";

import type { BreakdownWidgetVariant } from "./types";

type BreakdownWidgetSkeletonProps = {
  itemCount?: number;
  variant?: BreakdownWidgetVariant;
};

export function BreakdownWidgetSkeleton({
  itemCount = 3,
  variant = "default",
}: BreakdownWidgetSkeletonProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="h-6 w-40 animate-pulse rounded bg-muted" />

        <div className="mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center pb-2">
        <div className="relative size-[260px] min-h-0 min-w-0 shrink-0">
          <div className="absolute inset-0 animate-pulse rounded-full border-30 border-muted" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="h-8 w-20 animate-pulse rounded bg-muted" />

            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </CardContent>

      {variant === "list" ? (
        <div className="flex flex-col gap-4 px-6 py-4">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex min-w-0 items-center gap-2">
                <div className="size-2 shrink-0 animate-pulse rounded-full bg-muted" />

                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-4 w-10 shrink-0 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </Card>
  );
}
