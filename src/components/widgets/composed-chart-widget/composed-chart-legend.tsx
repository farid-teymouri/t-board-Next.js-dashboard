import type { ChartSeries } from "./types";

interface ComposedChartLegendProps {
  series: ChartSeries[];
}

export function ComposedChartLegend({ series }: ComposedChartLegendProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      {series.map((item) => (
        <div key={item.dataKey} className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: item.color,
            }}
          />

          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
