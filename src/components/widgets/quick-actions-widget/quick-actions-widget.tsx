"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { QuickActionsWidgetProps } from "./types";

export function QuickActionsWidget({
  eyebrow,
  title,
  actionLabel,
  onActionClick,
  actions,
  locale,
}: QuickActionsWidgetProps) {
  const isRtl = locale === "fa";

  return (
    <Card dir={isRtl ? "rtl" : "ltr"} className="h-full">
      <CardHeader className="flex flex-row items-end justify-between gap-4">
        <div className="space-y-1">
          {eyebrow && (
            <p className="text-muted-foreground text-xs font-medium">
              {eyebrow}
            </p>
          )}

          <CardTitle>{title}</CardTitle>
        </div>

        {actionLabel && (
          <Button
            variant="link"
            className="h-auto shrink-0 p-0"
            onClick={onActionClick}
          >
            {actionLabel}
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              type="button"
              variant="outline"
              className="h-auto min-h-24 min-w-28 flex-1 flex-col gap-2 px-4 py-4 sm:flex-none"
              onClick={action.onClick}
            >
              {action.icon}
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
