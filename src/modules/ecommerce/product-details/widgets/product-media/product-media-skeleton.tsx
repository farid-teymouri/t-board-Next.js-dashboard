import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductMediaSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4 p-4 sm:p-6">
        <Skeleton className="aspect-video w-full rounded-xl" />

        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square rounded-xl" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
