import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductServiceFeaturesSkeleton() {
  return (
    <Card>
      <CardContent className="grid gap-6 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-start gap-4">
            <Skeleton className="size-10 shrink-0 rounded-lg" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-full max-w-40" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
