import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { ProgressListRank, ProgressListVariant } from "../types";

type ProgressListWidgetSkeletonProps = {
  variant: ProgressListVariant;
  rank: ProgressListRank;
};

export function ProgressListWidgetSkeleton({
  variant,
  rank,
}: ProgressListWidgetSkeletonProps) {
  const showRank = rank !== "hidden";

  return (
    <div className="flex flex-col">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "space-y-3 py-4 first:pt-0 last:pb-0",
            variant === "colorful" && "rounded-xl p-3",
          )}
        >
          {variant === "products" ? (
            <>
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-lg" />

                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-1.5 flex-1 rounded-sm" />
                <Skeleton className="h-4 w-20 shrink-0" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3">
                {showRank && (
                  <Skeleton className="mt-1 size-6 shrink-0 rounded-full" />
                )}

                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>

                <Skeleton className="h-4 w-16 shrink-0" />
              </div>

              <Skeleton
                className={cn(
                  showRank && "ms-8 w-[calc(100%-2rem)]",
                  !showRank && "w-full",
                  variant === "classic"
                    ? "h-1.5 rounded-sm"
                    : "h-2.5 rounded-full",
                )}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
