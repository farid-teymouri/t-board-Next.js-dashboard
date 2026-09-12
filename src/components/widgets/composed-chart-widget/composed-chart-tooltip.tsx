import type { ChartSeries, ChartValueFormatter } from "./types";

type ComposedChartTooltipItem = {
  dataKey?: string | number;
  value?: number | string;
};

interface ComposedChartTooltipProps<T> {
  active?: boolean;
  payload?: ComposedChartTooltipItem[];
  locale: "fa" | "en";
  series: ChartSeries<T>[];
  formatter?: ChartValueFormatter;
}

export function ComposedChartTooltip<T>({
  active,
  payload,
  locale,
  series,
  formatter,
}: ComposedChartTooltipProps<T>) {
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

        const valueFormatter =
          currentSeries.formatter ?? formatter ?? ((value) => String(value));

        return (
          <div
            key={String(item.dataKey)}
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

            <span className="font-medium">{valueFormatter(value, locale)}</span>
          </div>
        );
      })}
    </div>
  );
}
