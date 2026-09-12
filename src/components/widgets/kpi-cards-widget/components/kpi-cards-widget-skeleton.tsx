"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function KpiCardsWidgetSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl ring-1 ring-foreground/10 bg-card p-5"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-12" />
            </div>

            <Skeleton className="size-9 rounded-lg" />
          </div>

          <Skeleton className="mt-5 h-7 w-32" />

          <Skeleton className="mt-5 h-12 w-full" />
        </div>
      ))}
    </div>
  );
}
