import type { ChartSeries } from "./types";

interface ComposedChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
    payload?: {
      label?: string;
    };
  }>;
  series: ChartSeries[];
  locale: "fa" | "en";
  formatter?: (value: number, locale: "fa" | "en") => string;
}

export function ComposedChartTooltip({
  active,
  payload,
  series,
  locale,
  formatter,
}: ComposedChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      {payload.map((item) => {
        const currentSeries = series.find(
          (seriesItem) => seriesItem.dataKey === item.dataKey,
        );

        if (!currentSeries) {
          return null;
        }

        const value = Number(item.value ?? 0);

        return (
          <div
            key={item.dataKey}
            className="flex items-center justify-between gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: currentSeries.color,
                }}
              />

              <span className="text-muted-foreground">
                {currentSeries.label}
              </span>
            </div>

            <span className="font-medium">
              {formatter ? formatter(value, locale) : value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
