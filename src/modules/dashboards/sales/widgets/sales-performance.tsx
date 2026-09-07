"use client";
import { useState } from "react";
import type {
  SalesPerformancePeriod,
  SalesPerformanceResponse,
} from "@/types/dashboards/sales/sales-performance";

import { formatCurrency, type Currency } from "@/utils/format-currency";

import { useSalesPerformance } from "../hooks/use-sales-performance";

import {
  ComparisonChartWidget,
  ComparisonChartWidgetSkeleton,
} from "@/components/widgets/comparison-chart-widget";

import type {
  ComparisonChartPeriod,
  ComparisonChartSeries,
} from "@/components/widgets/comparison-chart-widget";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SalesPerformanceProps {
  locale: "fa" | "en";

  translations: {
    title: string;
    description: string;
    thisPeriod: string;
    previousPeriod: string;
    year: string;
    month: string;
    week: string;
    error: string;
    months: string[];
  };

  initialPeriod: SalesPerformancePeriod;

  currency?: Currency;
  valueFormat?: "compact" | "full";
}

function mapPerformanceData(
  data: SalesPerformanceResponse["data"],
  period: SalesPerformancePeriod,
  months: string[],
) {
  return data.map((item) => {
    const label =
      period === "month" && typeof item.label === "number"
        ? (months[item.label - 1] ?? item.label)
        : item.label;

    return {
      label,
      values: {
        current: item.thisPeriod,
        previous: item.previousPeriod,
      },
    };
  });
}
export function SalesPerformance({
  locale,
  translations,
  initialPeriod,
  currency = "IRT",
  valueFormat = "compact",
}: SalesPerformanceProps) {
  const [activePeriod, setActivePeriod] =
    useState<SalesPerformancePeriod>(initialPeriod);

  const { data, isLoading, isError } = useSalesPerformance(
    locale,
    activePeriod,
  );

  const chartData = data
    ? mapPerformanceData(data.data, activePeriod, translations.months)
    : [];

  const currentTotal = chartData.reduce(
    (sum, item) => sum + item.values.current,
    0,
  );

  const previousTotal = chartData.reduce(
    (sum, item) => sum + item.values.previous,
    0,
  );

  const trend = currentTotal >= previousTotal ? "up" : "down";
  const currentColor = trend === "up" ? "var(--color-chart-3)" : "#ef4444";

  const periods: ComparisonChartPeriod[] = [
    {
      value: "year",
      label: translations.year,
    },
    {
      value: "month",
      label: translations.month,
    },
    {
      value: "week",
      label: translations.week,
    },
  ];

  const series: ComparisonChartSeries[] = [
    {
      key: "current",
      label: translations.thisPeriod,
      color: currentColor,
    },
    {
      key: "previous",
      label: translations.previousPeriod,
      color: "var(--color-chart-2)",
      dashed: true,
    },
  ];

  if (isLoading) {
    return <ComparisonChartWidgetSkeleton />;
  }

  if (isError) {
    return (
      <Card className="h-full">
        <CardHeader>
          <h3 className="text-base font-semibold">{translations.title}</h3>

          <p className="text-sm text-muted-foreground">
            {translations.description}
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex h-[360px] items-center justify-center text-sm text-destructive">
            {translations.error}
          </div>
        </CardContent>
      </Card>
    );
  }
  const handlePeriodChange = (period: string) => {
    if (period === "year" || period === "month" || period === "week") {
      setActivePeriod(period);
    }
  };

  const formatAxisValue = (value: number) => {
    if (valueFormat === "compact") {
      if (locale === "fa") {
        return `${new Intl.NumberFormat("fa-IR", {
          maximumFractionDigits: 0,
        }).format(value / 1000)} هزار`;
      }

      return `${new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }).format(value / 1000)}k`;
    }

    return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(
      value,
    );
  };

  return (
    <ComparisonChartWidget
      title={translations.title}
      description={translations.description}
      locale={locale}
      data={chartData}
      series={series}
      periods={periods}
      activePeriod={activePeriod}
      onPeriodChange={handlePeriodChange}
      axisValueFormatter={formatAxisValue}
      valueFormatter={(value) =>
        formatCurrency(value, {
          locale,
          currency,
        })
      }
    />
  );
}
