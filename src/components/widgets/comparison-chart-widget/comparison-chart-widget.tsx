"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { ComparisonChartTooltip } from "./comparison-chart-tooltip";
import { useChartZoom } from "./use-chart-zoom";

import type { ComparisonChartWidgetProps } from "./types";

export function ComparisonChartWidget({
  title,
  description,
  data,
  series,
  locale,
  periods = [],
  activePeriod,
  onPeriodChange,
  labelFormatter,
  valueFormatter,
  axisValueFormatter,
  height = 360,
}: ComparisonChartWidgetProps) {
  const chartData = data.map((item) => ({
    label: item.label,
    ...item.values,
  }));

  const { containerRef, visibleData } = useChartZoom(chartData);

  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">{title}</h3>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {periods.length > 0 && (
            <div className="flex shrink-0 items-center gap-1 rounded-lg border p-0.5 py-1">
              {periods.map((period) => (
                <button
                  key={period.value}
                  type="button"
                  onClick={() => onPeriodChange?.(period.value)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    activePeriod === period.value &&
                      "bg-primary text-primary-foreground",
                    activePeriod !== period.value &&
                      "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {period.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div
          ref={containerRef}
          className="min-w-0 select-none overscroll-contain"
          dir={locale === "fa" ? "rtl" : "ltr"}
        >
          <div
            className="h-[360px] min-h-[360px] min-w-0 w-full"
            style={{ height }}
          >
            <ResponsiveContainer width="100%" height={height} minWidth={0}>
              <AreaChart
                data={visibleData}
                margin={{
                  top: 12,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="1 12"
                  className="stroke-ring/50"
                />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    labelFormatter ? labelFormatter(value) : String(value)
                  }
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={14}
                  tickMargin={8}
                  tick={{ fontSize: 13 }}
                  tickFormatter={(value) =>
                    axisValueFormatter
                      ? axisValueFormatter(value)
                      : valueFormatter
                        ? valueFormatter(value)
                        : String(value)
                  }
                />

                <Tooltip
                  cursor={{
                    stroke: "var(--color-muted-foreground)",
                    strokeDasharray: "4 4",
                  }}
                  content={
                    <ComparisonChartTooltip
                      locale={locale}
                      series={series}
                      labelFormatter={labelFormatter}
                      valueFormatter={valueFormatter}
                    />
                  }
                />

                {series.map((item) => (
                  <Area
                    key={item.key}
                    type="monotone"
                    dataKey={item.key}
                    stroke={item.color}
                    strokeWidth={item.dashed ? 2 : 2.5}
                    strokeDasharray={item.dashed ? "5 5" : undefined}
                    fill={item.color}
                    fillOpacity={item.dashed ? 0.05 : 0.12}
                    dot={false}
                    activeDot={{ r: item.dashed ? 4 : 5 }}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6">
            {series.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
