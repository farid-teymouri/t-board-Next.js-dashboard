import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ProductOverviewSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="space-y-9 p-6">
        {/* Breadcrumb */}
        <div className="h-5 w-52 animate-pulse rounded-md bg-muted" />

        {/* Product title */}
        <div className="flex items-start justify-between gap-6">
          <div className="h-10 w-4/5 animate-pulse rounded-md bg-muted" />
          <div className="size-12 shrink-0 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-4">
          <div className="h-6 w-36 animate-pulse rounded-md bg-muted" />
          <div className="h-6 w-28 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Pricing */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="h-11 w-40 animate-pulse rounded-md bg-muted" />
          <div className="h-8 w-30 animate-pulse rounded-md bg-muted" />
          <div className="h-9 w-28 animate-pulse rounded-full bg-muted" />
        </div>

        {/* Stock */}
        <div className="flex items-center gap-4">
          <div className="h-9 w-32 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Description */}
        <div className="space-y-4">
          <div className="h-6 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-6 w-11/12 animate-pulse rounded-md bg-muted" />
          <div className="h-6 w-4/5 animate-pulse rounded-md bg-muted" />
        </div>

        <Separator />

        {/* Variants */}
        <div className="space-y-9">
          {/* Color */}
          <div className="space-y-4">
            <div className="h-6 w-20 animate-pulse rounded-md bg-muted" />

            <div className="flex flex-wrap gap-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />
                  <div className="size-13 animate-pulse rounded-full bg-muted" />{" "}
                  <div className="size-13 animate-pulse rounded-full bg-muted" />{" "}
                  <div className="size-13 animate-pulse rounded-full bg-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-4">
            <div className="h-6 w-20 animate-pulse rounded-md bg-muted" />

            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-12 w-18 animate-pulse rounded-md bg-muted"
                />
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Quantity */}
            <div className="h-13 w-full animate-pulse rounded-lg bg-muted sm:w-40" />

            {/* Action buttons */}
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-0">
              <div className="h-13 w-full animate-pulse rounded-lg bg-muted sm:w-44 sm:rounded-e-none" />
              <div className="h-13 w-full animate-pulse rounded-lg bg-muted sm:w-44 sm:rounded-s-none sm:rounded-e-md" />
            </div>
          </div>

          {/* Product details */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-7">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-5 w-28 animate-pulse rounded-md bg-muted" />
                <div className="h-6 w-36 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
