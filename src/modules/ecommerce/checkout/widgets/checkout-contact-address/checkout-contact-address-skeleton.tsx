import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutContactAddressSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />

          <div className="space-y-1">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
        </div>

        {/* Contact Information */}
        <section className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <Skeleton className="h-5 w-40" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <div className="space-y-1">
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-3 w-56 max-w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Address */}
        <section className="space-y-6">
          <div className="space-y-1">
            <Skeleton className="h-5 w-36" />
          </div>

          {/* First / Last Name */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>

          {/* Address 1 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full" />
          </div>

          {/* Address 2 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full" />
          </div>

          {/* Province / City */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>

          {/* Phone / Postcode */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-11 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>

          {/* Company */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-28 w-full" />
          </div>

          <Skeleton className="h-px w-full" />

          {/* Continue Button */}
          <div className="flex justify-end">
            <Skeleton className="h-11 w-full sm:w-40" />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
