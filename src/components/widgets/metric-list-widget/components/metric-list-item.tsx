import { cn } from "@/lib/utils";

import type { MetricListItem as MetricListItemType } from "../types";

interface MetricListItemProps extends Omit<MetricListItemType, "value"> {
  value: string;
  iconClassName?: string;
}

export function MetricListItem({
  label,
  value,
  change,
  icon: Icon,
  iconClassName,
}: MetricListItemProps) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
      {Icon && (
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-md",
            iconClassName,
          )}
        >
          <Icon className="size-4" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="mt-1 text-lg font-semibold tracking-tight">{value}</p>
      </div>

      <span
        className={cn(
          "text-sm font-medium",
          isPositive && "text-chart-3",
          isNegative && "text-destructive",
          !isPositive && !isNegative && "text-muted-foreground",
        )}
      >
        {change > 0 ? "+" : ""}
        {change}%
      </span>
    </div>
  );
}
