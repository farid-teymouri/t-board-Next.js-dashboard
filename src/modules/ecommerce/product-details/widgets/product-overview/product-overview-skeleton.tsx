import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ProductOverviewSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="space-y-5 p-6">
        {/* Summary */}
        <div className="space-y-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />
            <div className="size-3.5 animate-pulse rounded-full bg-muted" />
            <div className="h-5 w-28 animate-pulse rounded-md bg-muted" />
          </div>

          {/* Product title + Favorite */}
          <div className="flex items-start justify-between gap-4">
            <div className="h-8 w-3/4 animate-pulse rounded-md bg-muted" />
            <div className="size-9 shrink-0 animate-pulse rounded-md bg-muted" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
            <div className="h-5 w-8 animate-pulse rounded-md bg-muted" />
            <div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
          </div>

          {/* Pricing */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-8 w-36 animate-pulse rounded-md bg-muted" />
            <div className="h-6 w-28 animate-pulse rounded-md bg-muted" />
            <div className="h-7 w-24 animate-pulse rounded-full bg-muted" />
          </div>

          {/* Stock */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-7 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-5 w-28 animate-pulse rounded-md bg-muted" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-5 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-5 w-11/12 animate-pulse rounded-md bg-muted" />
            <div className="h-5 w-4/5 animate-pulse rounded-md bg-muted" />
          </div>
        </div>

        <Separator />

        {/* Variants */}
        <div className="space-y-5">
          {/* Color */}
          <div className="space-y-3">
            <div className="h-5 w-16 animate-pulse rounded-md bg-muted" />

            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5">
                  <div className="h-4 w-12 animate-pulse rounded-md bg-muted" />
                  <div className="size-9 animate-pulse rounded-full bg-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-3">
            <div className="h-5 w-16 animate-pulse rounded-md bg-muted" />

            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-9 w-14 animate-pulse rounded-md bg-muted"
                />
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-6">
          {/* Quantity + Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="h-10 w-full animate-pulse rounded-lg bg-muted sm:w-32" />

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted sm:w-36" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted sm:w-36" />
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-1">
                <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
                <div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
