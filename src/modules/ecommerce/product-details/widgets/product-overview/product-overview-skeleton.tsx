import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ProductOverviewSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-5">
        {/* Breadcrumb */}
        <div className="h-3 w-32 animate-pulse rounded-md bg-muted" />

        {/* Product title */}
        <div className="flex items-start justify-between gap-4">
          <div className="h-6 w-3/4 animate-pulse rounded-md bg-muted" />

          <div className="size-9 shrink-0 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />

          <div className="h-4 w-20 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Pricing */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-7 w-28 animate-pulse rounded-md bg-muted" />

          <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />

          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
        </div>

        {/* Stock */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />

          <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-11/12 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
        </div>

        <Separator />

        {/* Variants */}
        <div className="space-y-5">
          {/* Color */}
          <div className="space-y-3">
            <div className="h-4 w-12 animate-pulse rounded-md bg-muted" />

            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5">
                  <div className="h-3 w-12 animate-pulse rounded-md bg-muted" />

                  <div className="size-9 animate-pulse rounded-full bg-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-3">
            <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />

            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-9 w-20 animate-pulse rounded-md bg-muted"
                />
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Quantity */}
            <div className="h-10 w-full animate-pulse rounded-lg bg-muted sm:w-34" />

            {/* Action buttons */}
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-0">
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted sm:w-36 sm:rounded-e-none" />

              <div className="h-10 w-full animate-pulse rounded-lg bg-muted sm:w-36 sm:rounded-s-none sm:rounded-e-md" />
            </div>
          </div>

          {/* Product details */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-3 w-16 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
