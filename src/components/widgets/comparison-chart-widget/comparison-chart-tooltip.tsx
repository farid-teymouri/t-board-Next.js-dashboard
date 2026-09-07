"use client";

import type { ComparisonChartTooltipProps } from "./types";

function formatValue(value: number, locale: "fa" | "en") {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(
    value,
  );
}

export function ComparisonChartTooltip({
  active,
  payload,
  label,
  locale,
  series,
  labelFormatter,
  valueFormatter,
}: ComparisonChartTooltipProps) {
  if (!active || !payload?.length || label === undefined) {
    return null;
  }

  return (
    <div className="min-w-[190px] overflow-hidden rounded-lg border bg-background shadow-xl">
      <div className="border-b px-3 py-2 text-sm font-medium">
        {labelFormatter ? labelFormatter(label) : label}
      </div>

      <div className="space-y-2 px-3 py-3">
        {series.map((item) => {
          const value = payload.find(
            (entry) => entry.dataKey === item.key,
          )?.value;

          return (
            <div
              key={item.key}
              className="flex items-center justify-between gap-6 text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-muted-foreground">{item.label}</span>
              </div>

              <span className="font-medium tabular-nums">
                {typeof value === "number"
                  ? valueFormatter
                    ? valueFormatter(value)
                    : formatValue(value, locale)
                  : "-"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
