"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

import { ComposedChartLegend } from "./composed-chart-legend";
import { ComposedChartPeriod } from "./composed-chart-period";
import { ComposedChartTooltip } from "./composed-chart-tooltip";
import { useComposedChartZoom } from "./use-composed-chart-zoom";
import type { ComposedChartWidgetProps } from "./types";

export function ComposedChartWidget<T>({
  data,
  series,
  locale,
  xAxisDataKey,
  header,
  periods,
  formatter,
}: ComposedChartWidgetProps<T>) {
  const chartConfig = series.reduce<ChartConfig>((config, item) => {
    config[item.dataKey] = {
      label: item.label,
      color: item.color,
    };

    return config;
  }, {});

  const { containerRef, visibleRange } = useComposedChartZoom({
    dataLength: data.length,
  });

  const visibleData = data.slice(visibleRange.start, visibleRange.end);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="text-sm font-medium text-muted-foreground">
              {header.label}
            </div>

            <h3 className="text-xl">{header.title}</h3>

            <p className="text-sm font-medium text-muted-foreground">
              {header.description}
            </p>
          </div>

          {periods && (
            <div className="shrink-0">
              <ComposedChartPeriod
                options={periods.options}
                value={periods.value}
                onChange={periods.onChange}
              />
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
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ComposedChart
              accessibilityLayer
              data={visibleData}
              margin={{
                left: 0,
                right: 12,
                top: 8,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey={xAxisDataKey}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={40}
                tickFormatter={(value) =>
                  formatter ? formatter(Number(value), locale) : String(value)
                }
              />

              <Tooltip
                cursor={{
                  stroke: "var(--color-muted-foreground)",
                  strokeDasharray: "4 4",
                }}
                content={
                  <ComposedChartTooltip
                    locale={locale}
                    series={series}
                    formatter={formatter}
                  />
                }
              />

              {series.map((item) => {
                if (item.type === "bar") {
                  return (
                    <Bar
                      key={item.dataKey}
                      dataKey={item.dataKey}
                      fill={item.color}
                      radius={item.radius}
                    />
                  );
                }

                return (
                  <Line
                    key={item.dataKey}
                    dataKey={item.dataKey}
                    type="natural"
                    stroke={item.color}
                    strokeWidth={3}
                    dot={false}
                  />
                );
              })}
            </ComposedChart>
          </ChartContainer>
        </div>

        <ComposedChartLegend series={series} />
      </CardContent>
    </Card>
  );
}
