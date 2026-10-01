import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutReviewSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-52" />

          <div className="flex items-start gap-2">
            <Skeleton className="mt-0.5 size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        </div>

        {/* Checkout Information */}
        <div className="grid gap-4 sm:grid-cols-1">
          {/* Contact */}
          <Card className="py-2!">
            <CardContent className="space-y-2 px-4">
              <Skeleton className="h-4 w-28" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-64 max-w-full" />
                <Skeleton className="h-4 w-56 max-w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="py-2!">
            <CardContent className="space-y-2 px-4">
              <Skeleton className="h-4 w-32" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-72 max-w-full" />
                <Skeleton className="h-4 w-48 max-w-full" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-44" />
              </div>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card className="py-2!">
            <CardContent className="space-y-2 px-4">
              <Skeleton className="h-4 w-20" />

              <div className="space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-64 max-w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="py-2!">
            <CardContent className="space-y-2 px-4">
              <Skeleton className="h-4 w-28" />

              <div className="space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-48 max-w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Skeleton className="h-px w-full" />

        {/* Products */}
        <div className="space-y-6">
          <Skeleton className="h-4 w-20" />

          <div className="space-y-6 divide-y">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-start gap-4 space-y-4">
                {/* Product Image */}
                <Skeleton className="size-24 shrink-0 rounded-lg" />

                {/* Product Info + Price */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0 space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-64 max-w-full" />
                      <Skeleton className="h-3 w-32" />
                    </div>

                    <Skeleton className="h-5 w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 rounded-2xl border p-4">
          <Skeleton className="size-4 shrink-0 rounded-sm" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-11 w-full sm:w-40" />
          <Skeleton className="h-11 w-full sm:w-48" />
        </div>
      </CardContent>
    </Card>
  );
}
