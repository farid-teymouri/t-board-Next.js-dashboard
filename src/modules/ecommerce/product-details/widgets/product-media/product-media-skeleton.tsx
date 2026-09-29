import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductMediaSkeleton() {
  return (
    <Card className="flex h-full overflow-hidden">
      <CardContent className="flex h-full min-h-0 flex-col gap-4 p-4 sm:p-6">
        {/* Main media stage */}
        <Skeleton className="min-h-0 flex-1 w-full rounded-xl" />

        {/* Media thumbnails */}
        <div className="flex shrink-0 flex-wrap gap-2 sm:gap-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton
              key={index}
              className="size-16 shrink-0 rounded-xl sm:size-20"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
