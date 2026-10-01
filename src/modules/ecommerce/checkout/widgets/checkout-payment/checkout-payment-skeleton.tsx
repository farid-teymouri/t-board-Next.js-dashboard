import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutPaymentSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col justify-between space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />

          <Skeleton className="h-7 w-40" />

          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        {/* Payment Types */}
        <div className="space-y-3">
          {/* Online */}
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="mt-0.5 size-4 shrink-0 rounded-full" />

              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-64 max-w-full" />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-4 flex flex-wrap gap-3 ps-7">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex min-h-11 flex-col items-center gap-3 rounded-md border px-4 py-3"
                >
                  <Skeleton className="size-16 rounded-md" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="mt-0.5 size-4 shrink-0 rounded-full" />

              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-11 w-full sm:w-32" />
          <Skeleton className="h-11 w-full sm:w-44" />
        </div>
      </CardContent>
    </Card>
  );
}
