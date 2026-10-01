import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutShippingSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col justify-between space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-40" />
        </div>

        {/* Shipping Methods */}
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
            >
              {/* Radio + Logo */}
              <div className="flex items-center gap-4 sm:contents">
                <Skeleton className="size-4 shrink-0 rounded-full" />

                <div className="flex size-10 shrink-0 items-center justify-center">
                  <Skeleton className="size-14 rounded-md" />
                </div>
              </div>

              {/* Method Information */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-1 h-3 w-48 max-w-full" />
                  </div>

                  <Skeleton className="h-4 w-20 shrink-0" />
                </div>
              </div>
            </div>
          ))}
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
