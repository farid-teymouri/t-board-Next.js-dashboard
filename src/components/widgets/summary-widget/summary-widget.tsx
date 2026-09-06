import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { SummaryMetric } from "./summary-metric";

import type { SummaryWidgetProps } from "./types";

export function SummaryWidget({
  eyebrow,
  title,
  description,
  metrics = [],
  actions = [],
}: SummaryWidgetProps) {
  return (
    <Card>
      <CardContent className="flex h-full w-full flex-col justify-between gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="w-full space-y-3">
            {eyebrow && (
              <p className="text-sm font-medium text-muted-foreground">
                {eyebrow}
              </p>
            )}

            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

            {description && (
              <div className="text-sm leading-6 text-muted-foreground">
                {description}
              </div>
            )}
          </div>

          {metrics.length > 0 && (
            <div className="flex w-full shrink-0 flex-wrap items-center justify-center gap-2 text-center">
              {metrics.map((metric) => (
                <SummaryMetric
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                />
              ))}
            </div>
          )}
        </div>

        {actions.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 sm:flex-row">
            {actions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant ?? "default"}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
