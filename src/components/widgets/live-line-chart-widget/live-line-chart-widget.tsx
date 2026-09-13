"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { RadioBadge } from "@/components/ui/radio-badge";
import { formatNumber } from "@/utils/formatters";

import type { LiveLineChartWidgetProps } from "./types";

const chartConfig = {
  value: {
    label: "Active users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function LiveLineChartWidget({
  title,
  description,
  liveLabel,
  value,
  data,
  goalsTitle,
  goals,
  locale,
}: LiveLineChartWidgetProps) {
  return (
    <Card className="h-full ">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-medium tracking-tight">{title}</h3>

            <p className="text-sm font-medium text-muted-foreground">
              {description}
            </p>
          </div>

          <RadioBadge className="shrink-0 bg-chart-3/15 border border-chart-3 text-chart-3">
            {liveLabel}
          </RadioBadge>
        </div>

        <div className="pt-3">
          <div className="text-3xl font-semibold tracking-tight tabular-nums">
            {formatNumber(value, locale)}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              {locale === "fa" ? "نفر" : value === 1 ? "person" : "people"}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="w-full" dir={locale === "fa" ? "rtl" : "ltr"}>
          <ChartContainer
            config={chartConfig}
            className="h-full w-full max-h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 12,
                  right: 8,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="var(--muted-foreground)"
                  strokeOpacity={0.3}
                  strokeDasharray="3 13"
                />

                <XAxis
                  dataKey="timestamp"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  minTickGap={28}
                  tickFormatter={(timestamp) =>
                    new Date(timestamp).toLocaleTimeString(
                      locale === "fa" ? "fa-IR" : "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      },
                    )
                  }
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  width={40}
                  allowDecimals={false}
                  tickFormatter={(value) => formatNumber(Number(value), locale)}
                />

                <Tooltip
                  cursor={{
                    stroke: "var(--muted-foreground)",
                    strokeDasharray: "4 4",
                  }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) {
                      return null;
                    }

                    const item = payload[0];
                    const itemValue = Number(item.value ?? 0);

                    return (
                      <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
                        <div className="text-xs text-muted-foreground">
                          {new Date(
                            String(item.payload?.timestamp),
                          ).toLocaleTimeString(
                            locale === "fa" ? "fa-IR" : "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            },
                          )}
                        </div>

                        <div className="mt-1 text-sm font-medium tabular-nums">
                          {formatNumber(itemValue, locale)}{" "}
                          <span className="font-normal text-muted-foreground">
                            {locale === "fa"
                              ? "نفر"
                              : itemValue === 1
                                ? "person"
                                : "people"}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--chart-3)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: "var(--chart-3)",
                  }}
                  isAnimationActive
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="my-5 border-t" />

        <div className="space-y-5">
          <h4 className="text-sm font-medium">{goalsTitle}</h4>

          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="min-w-0 truncate text-sm text-muted-foreground">
                    {goal.label}
                  </span>

                  <span className="shrink-0 text-xs font-medium tabular-nums">
                    {formatNumber(goal.value, locale)}%
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${goal.value}%`,
                      backgroundColor: goal.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
