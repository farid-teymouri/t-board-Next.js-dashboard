"use client";

import { useId } from "react";

import { Area, AreaChart, CartesianGrid } from "recharts";
import type { GrowthTrend } from "@/types/metrics/growth";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { MetricChangeIndicator } from "./metric-change-indicator";
import type { MetricWidgetProps } from "./types";

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;
function getMetricColor(trend?: GrowthTrend) {
  switch (trend) {
    case "up":
      return "var(--metric-up)";

    case "down":
      return "var(--metric-down)";

    case "neutral":
      return "var(--metric-neutral)";

    default:
      return "var(--foreground)";
  }
}

export function MetricWidget({
  locale,
  labels,
  data,
  className,
  valueFormatter,
}: MetricWidgetProps) {
  const gradientId = useId().replace(/:/g, "");
  const metricColor = getMetricColor(data.growth?.trend);
  const formatter =
    valueFormatter ??
    ((value: number) =>
      new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value));

  return (
    <Card
      className={`flex h-full w-full flex-col justify-between pb-0 sm:w-[385px] xl:w-full ${
        className ?? ""
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2 rtl:text-right">
            <p className="text-sm text-muted-foreground">{labels.title}</p>

            <div className="flex flex-wrap items-center gap-2">
              <h2
                className="text-xl font-bold sm:text-3xl"
                style={{ color: metricColor }}
              >
                {formatter(data.value)}
              </h2>

              {data.unit && (
                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                  {labels.units?.[data.unit.code] ?? data.unit.code}
                </span>
              )}
            </div>

            {data.growth && (
              <div className="flex flex-wrap items-center gap-2">
                <MetricChangeIndicator growth={data.growth} locale={locale} />

                <span className="text-sm text-muted-foreground">
                  {labels.comparison[data.growth.period]}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      {data.series && data.series.length > 0 && (
        <CardContent className="p-0">
          <ChartContainer config={chartConfig} className="h-[122px] w-full">
            <AreaChart
              data={data.series}
              margin={{
                top: 0,
                right: 18,
                left: 18,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id={`metric-fill-${gradientId}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={metricColor} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={metricColor} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} horizontal={false} />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatter(Number(value))}
                  />
                }
              />

              <Area
                dataKey="value"
                type="natural"
                stroke={metricColor}
                fill={`url(#metric-fill-${gradientId})`}
                fillOpacity={1}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
