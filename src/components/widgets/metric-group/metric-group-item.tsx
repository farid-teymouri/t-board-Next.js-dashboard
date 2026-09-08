import type { MetricItem } from "./types";

import {
  formatMetricChange,
  formatMetricValue,
  getMetricChangeClass,
} from "./metric-group.utils";

type MetricGroupItemProps = {
  item: MetricItem;
  locale: string;
};

export function MetricGroupItem({ item, locale }: MetricGroupItemProps) {
  const Icon = item.icon;

  return (
    <div className="flex min-w-0 flex-1">
      <div className="flex w-full items-center gap-4 px-3 py-3">
        {Icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky-300/10 dark:bg-sky-800/20">
            <Icon className="size-5 text-sky-400 dark:text-sky-500" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-muted-foreground">
            {item.label}
          </div>

          <div className="mt-1 flex items-baseline justify-between gap-3">
            <span className="text-lg font-semibold tracking-tight">
              {formatMetricValue(
                item.value,
                item.format,
                locale,
                item.currency,
              )}
            </span>

            {item.change && (
              <span
                className={`text-xs font-medium ${getMetricChangeClass(
                  item.change,
                )}`}
              >
                {formatMetricChange(item.change, locale)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
