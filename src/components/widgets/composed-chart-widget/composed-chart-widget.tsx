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
  yAxes,
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

  const resolvedYAxes =
    yAxes && yAxes.length > 0
      ? yAxes
      : [
          {
            id: "default",
            position: "left" as const,
            formatter,
          },
        ];

  const getSeriesAxisId = (item: (typeof series)[number]) =>
    item.yAxisId ?? resolvedYAxes[0]?.id ?? "default";

  return (
    <Card className="h-full flex justify-between">
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
          className="h-[350px] min-h-0 min-w-0 select-none overscroll-contain"
          dir={locale === "fa" ? "rtl" : "ltr"}
        >
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ComposedChart
              accessibilityLayer
              data={visibleData}
              margin={{
                left: 16,
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
              {resolvedYAxes.map((axis) => (
                <YAxis
                  key={axis.id}
                  yAxisId={axis.id}
                  orientation={axis.position ?? "left"}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={axis.position === "right" ? 12 : 40}
                  ticks={axis.ticks}
                  domain={axis.domain}
                  tickFormatter={(value) =>
                    axis.formatter
                      ? axis.formatter(Number(value), locale)
                      : String(value)
                  }
                />
              ))}

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
                const axisId = getSeriesAxisId(item);

                if (item.type === "bar") {
                  return (
                    <Bar
                      key={item.dataKey}
                      dataKey={item.dataKey}
                      yAxisId={axisId}
                      fill={item.color}
                      radius={item.radius}
                      barSize={item.barSize}
                    />
                  );
                }

                return (
                  <Line
                    key={item.dataKey}
                    dataKey={item.dataKey}
                    yAxisId={axisId}
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
