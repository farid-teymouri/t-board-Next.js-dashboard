import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrganizationSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="space-y-5">
          <Skeleton className="h-5 w-24" />

          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="space-y-5">
          <Skeleton className="h-5 w-28" />

          <div className="space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        <div className="space-y-5">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
