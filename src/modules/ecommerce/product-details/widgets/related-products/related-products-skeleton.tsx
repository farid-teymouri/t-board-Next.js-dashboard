import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RelatedProductsSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-5 p-4 sm:p-6">
        <Skeleton className="h-7 w-48" />

        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-[calc((100%-4rem)/3)] shrink-0 space-y-3 sm:w-[calc((100%-4rem)/3)] lg:w-[calc((100%-5rem)/4)] xl:w-[calc((100%-6rem)/6)]"
            >
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-3 w-2/5" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
