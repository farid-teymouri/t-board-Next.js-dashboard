import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductInformationSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="w-full">
          {/* Tabs */}
          <div className="w-full overflow-x-auto">
            <div className="inline-flex w-max min-w-full justify-start border-b">
              <Skeleton className="h-9 w-24 shrink-0" />
              <Skeleton className="ms-4 h-9 w-28 shrink-0" />
              <Skeleton className="ms-4 h-9 w-40 shrink-0" />
              <Skeleton className="ms-4 h-9 w-28 shrink-0" />
              <Skeleton className="ms-4 h-9 w-20 shrink-0" />
            </div>
          </div>

          {/* Description content */}
          <div className="pt-6">
            <div className="space-y-5 text-sm">
              {/* Paragraph 1 */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-[94%] rounded-md" />
                <Skeleton className="h-5 w-[78%] rounded-md" />
              </div>

              {/* Paragraph 2 */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-[96%] rounded-md" />
                <Skeleton className="h-5 w-[88%] rounded-md" />
              </div>

              {/* Features */}
              <div className="space-y-3 ps-5">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-2 shrink-0 rounded-full" />
                  <Skeleton className="h-5 w-[82%] rounded-md" />
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton className="size-2 shrink-0 rounded-full" />
                  <Skeleton className="h-5 w-[72%] rounded-md" />
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton className="size-2 shrink-0 rounded-full" />
                  <Skeleton className="h-5 w-[88%] rounded-md" />
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton className="size-2 shrink-0 rounded-full" />
                  <Skeleton className="h-5 w-[64%] rounded-md" />
                </div>
              </div>

              {/* Paragraph 3 */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-[91%] rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
