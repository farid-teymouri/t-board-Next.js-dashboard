"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ComposedChartWidgetSkeletonProps {
  locale: "fa" | "en";
}

export function ComposedChartWidgetSkeleton({
  locale,
}: ComposedChartWidgetSkeletonProps) {
  return (
    <Card className="h-full flex justify-between">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="h-5 w-40 animate-pulse rounded-md bg-muted" />

            <div className="h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />

            <div className="h-4 w-96 max-w-full animate-pulse rounded-md bg-muted" />
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-lg border p-1 py-1">
            <div className="h-8 w-14 animate-pulse rounded-md bg-muted" />
            <div className="h-8 w-14 animate-pulse rounded-md bg-muted" />
            <div className="h-8 w-14 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div
          className="h-[300px] w-full animate-pulse rounded-md bg-muted/50"
          dir={locale === "fa" ? "rtl" : "ltr"}
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 animate-pulse rounded-sm bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
