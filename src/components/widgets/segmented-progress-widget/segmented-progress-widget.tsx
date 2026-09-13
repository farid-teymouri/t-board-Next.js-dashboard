"use client";

import { AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { SegmentedProgressBar } from "./components/segmented-progress-bar";
import { SegmentedProgressLegend } from "./components/segmented-progress-legend";
import type { SegmentedProgressWidgetProps } from "./types";

export function SegmentedProgressWidget({
  translations,
  segments,
  total,
  locale,
  showLegend = true,
  showAlert = true,
  alert,
}: SegmentedProgressWidgetProps) {
  const resolvedTotal =
    total ?? segments.reduce((sum, segment) => sum + segment.value, 0);

  if (!segments.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>{translations.title}</CardTitle>

        {translations.subtitle && (
          <p className="text-sm text-muted-foreground">
            {translations.subtitle}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-5">
        <SegmentedProgressBar segments={segments} total={resolvedTotal} />

        {showLegend && (
          <SegmentedProgressLegend segments={segments} locale={locale} />
        )}

        {showAlert && alert && (
          <>
            <Separator />

            <div
              className={cn(
                "flex items-center gap-2 rounded-md",
                "bg-yellow-500/10 px-3 py-2.5",
                "text-sm text-yellow-700 dark:text-yellow-400",
              )}
            >
              <AlertTriangle className="size-4 shrink-0" />

              <span>{alert}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
