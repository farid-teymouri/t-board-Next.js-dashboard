"use client";

import { useMemo } from "react";

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

import { useAcquisition } from "../../hooks/use-acquisition";
import { BarLineLegend } from "./bar-line-legend";
import { BarLinePeriod } from "./bar-line-period";
import { BarLineSkeleton } from "./bar-line-skeleton";
import { BarLineTooltip } from "./bar-line-tooltip";
import { useBarLineZoom } from "./use-bar-line-zoom";
import { formatValue, getMonthLabel } from "./bar-line.utils";

interface BarLineTranslations {
  label: string;
  title: string;
  description: string;
  period: {
    year: string;
    month: string;
    week: string;
  };
  series: {
    sessions: string;
    newVisitors: string;
    returning: string;
  };
  error: string;
}

interface BarLineProps {
  translations: BarLineTranslations;
  locale: "en" | "fa";
}

export function BarLine({ translations, locale }: BarLineProps) {
  const { data, isLoading, isError } = useAcquisition();

  const chartConfig = {
    sessions: {
      label: translations.series.sessions,
      color: "var(--chart-3)",
    },
    newVisitors: {
      label: translations.series.newVisitors,
      color: "var(--chart-4)",
    },
    returning: {
      label: translations.series.returning,
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  const chartData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.data.map((item) => ({
      ...item,
      monthLabel: getMonthLabel(item.month, locale),
    }));
  }, [data, locale]);

  const { containerRef: chartContainerRef, visibleRange } = useBarLineZoom({
    dataLength: chartData.length,
  });

  const visibleData = chartData.slice(visibleRange.start, visibleRange.end);

  if (isLoading) {
    return <BarLineSkeleton locale={locale} />;
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <p className="text-sm font-medium text-muted-foreground">
            {translations.label}
          </p>

          <h3 className="text-base font-semibold">{translations.title}</h3>

          <p className="text-sm text-muted-foreground">
            {translations.description}
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-sm text-destructive">
            {translations.error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {translations.label}
          </p>

          <h3 className="text-base font-semibold">{translations.title}</h3>

          <p className="text-sm text-muted-foreground">
            {translations.description}
          </p>
        </div>

        <BarLinePeriod translations={translations.period} />
      </CardHeader>

      <CardContent>
        <div
          ref={chartContainerRef}
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
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={40}
                tickFormatter={(value) => formatValue(Number(value), locale)}
              />

              <Tooltip
                cursor={{
                  stroke: "var(--color-muted-foreground)",
                  strokeDasharray: "4 4",
                }}
                content={
                  <BarLineTooltip
                    locale={locale}
                    translations={translations.series}
                  />
                }
              />

              <Bar dataKey="newVisitors" className="fill-chart-4" radius={4} />

              <Bar dataKey="returning" className="fill-chart-5" radius={4} />

              <Line
                dataKey="sessions"
                type="natural"
                stroke="var(--chart-3)"
                strokeWidth={3}
                dot={false}
              />
            </ComposedChart>
          </ChartContainer>
        </div>

        <BarLineLegend translations={translations.series} />
      </CardContent>
    </Card>
  );
}
