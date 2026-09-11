"use client";

import { useState } from "react";
import { Pie, PieChart } from "recharts";
import { formatNumber } from "@/utils/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import type { BreakdownWidgetProps } from "./types";

export function BreakdownWidget({
  locale,
  title,
  description,
  total,
  items,
  variant = "default",
}: BreakdownWidgetProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartConfig = Object.fromEntries(
    items.map((item) => [
      item.id,
      {
        label: item.label,
        color: item.color,
      },
    ]),
  ) satisfies ChartConfig;

  const chartData = items.map((item) => ({
    name: item.id,
    value: total.value > 0 ? (item.value / total.value) * 100 : 0,
    amount: item.value,
    fill: item.color,
  }));

  const activeItem = activeIndex !== null ? chartData[activeIndex] : undefined;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader
        className={`pb-0 ${
          locale === "fa" ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <CardTitle>{title}</CardTitle>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center pb-2">
        <div className="relative size-[260px] min-h-0 min-w-0 shrink-0">
          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
            <span
              className="text-3xl font-bold leading-none tabular-nums"
              style={{
                color: activeItem?.fill,
              }}
            >
              {activeItem
                ? `${formatNumber(activeItem.value, locale)}%`
                : formatNumber(total.value, locale, "compact")}
            </span>

            <span className="mt-2 text-sm text-muted-foreground">
              {activeItem ? chartConfig[activeItem.name]?.label : total.label}
            </span>
          </div>

          <ChartContainer
            config={chartConfig}
            className="relative z-10 size-[260px] min-h-0 min-w-0"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="bg-background/60 backdrop-blur-sm"
                    formatter={(value, _name, item) => {
                      const key = item?.payload?.name;

                      const config =
                        typeof key === "string"
                          ? chartConfig[key as keyof typeof chartConfig]
                          : undefined;

                      return (
                        <div className="flex min-w-[160px] items-center justify-between gap-4">
                          <span className="text-muted-foreground">
                            {config?.label ?? ""}
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="font-medium tabular-nums">
                              {formatNumber(
                                Number(item?.payload?.amount ?? 0),
                                locale,
                              )}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              {formatNumber(Number(value), locale)}%
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                }
              />

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                startAngle={90}
                endAngle={-270}
                innerRadius={78}
                outerRadius={108}
                paddingAngle={2}
                stroke="none"
                onMouseEnter={(_, index) => {
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                }}
              />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>

      {variant === "list" ? (
        <div
          dir={locale === "fa" ? "rtl" : "ltr"}
          className="flex flex-col gap-3 px-6 py-4"
        >
          {items.map((item) => {
            const percentage =
              total.value > 0 ? (item.value / total.value) * 100 : 0;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <span className="truncate text-sm text-muted-foreground">
                    {item.label}
                  </span>
                </div>

                <span className="shrink-0 text-sm font-semibold tabular-nums">
                  {formatNumber(percentage, locale)}%
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          dir={locale === "fa" ? "rtl" : "ltr"}
          className="grid gap-4 border-t px-6 py-4"
          style={{
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
          }}
        >
          {items.map((item) => (
            <div key={item.id} className="flex min-w-0 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="truncate text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>

              <span className="text-sm font-semibold tabular-nums">
                {formatNumber(item.value, locale)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
