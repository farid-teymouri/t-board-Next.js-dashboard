import { Card, CardContent } from "@/components/ui/card";

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
      </CardContent>
    </Card>
  );
}
