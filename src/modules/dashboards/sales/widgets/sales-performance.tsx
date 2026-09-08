"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ComparisonChartWidget,
  ComparisonChartWidgetSkeleton,
} from "@/components/widgets/comparison-chart-widget";
import type {
  ComparisonChartPeriod,
  ComparisonChartSeries,
} from "@/components/widgets/comparison-chart-widget";
import type {
  SalesPerformancePeriod,
  SalesPerformanceResponse,
} from "@/types/dashboards/sales/sales-performance";
import { formatCurrency } from "@/utils/currency";

import { useSalesPerformance } from "../hooks/use-sales-performance";

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
  valueFormat = "compact",
}: SalesPerformanceProps) {
  const [selectedPeriod, setSelectedPeriod] =
    useState<SalesPerformancePeriod>(initialPeriod);

  const { data, isLoading, isError } = useSalesPerformance(selectedPeriod);

  const activePeriod = data?.period ?? selectedPeriod;

  const chartData = data
    ? mapPerformanceData(data.data, data.period, translations.months)
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

  if (isError || !data) {
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

  const periodLabels: Record<SalesPerformancePeriod, string> = {
    year: translations.year,
    month: translations.month,
    week: translations.week,
  };

  const periods: ComparisonChartPeriod<SalesPerformancePeriod>[] =
    data.availablePeriods.map((period) => ({
      value: period,
      label: periodLabels[period],
    }));

  const description = translations.description.replace(
    "{period}",
    periodLabels[activePeriod],
  );

  const handlePeriodChange = (period: SalesPerformancePeriod) => {
    if (!data.availablePeriods.includes(period)) {
      return;
    }

    setSelectedPeriod(period);
  };

  const formatAxisValue = (value: number) => {
    if (valueFormat === "compact") {
      const formatter = new Intl.NumberFormat(
        locale === "fa" ? "fa-IR" : "en-US",
        {
          maximumFractionDigits: 0,
        },
      );

      return locale === "fa"
        ? `${formatter.format(value / 1000)} هزار`
        : `${formatter.format(value / 1000)}k`;
    }

    return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(
      value,
    );
  };

  return (
    <ComparisonChartWidget
      key={data.period}
      title={translations.title}
      description={description}
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
          currency: data.currency,
        })
      }
    />
  );
}
