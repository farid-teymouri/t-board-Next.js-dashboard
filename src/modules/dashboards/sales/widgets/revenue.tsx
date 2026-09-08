"use client";

import {
  MetricWidget,
  MetricWidgetSkeleton,
  type MetricWidgetLabels,
} from "@/components/widgets/metric-widget";

import { formatCurrency } from "@/utils/currency";

import { useMetric } from "@/hooks/use-metric";

import type { GrowthPeriod, GrowthTrend } from "@/types/metrics/growth";

type RevenueProps = {
  locale: "fa" | "en";
  labels: MetricWidgetLabels;
  period?: GrowthPeriod;
  trend?: GrowthTrend;
};

export function Revenue({
  locale,
  labels,
  period = "year",
  trend = "up",
}: RevenueProps) {
  const apiUrl =
    `/api/dashboards/sales/revenue` +
    `?locale=${locale}` +
    `&period=${period}` +
    `&trend=${trend}`;

  const { data, isPending } = useMetric({
    apiUrl,
    queryKey: ["dashboards", "sales", "revenue", locale, period, trend],
  });

  if (isPending) {
    return <MetricWidgetSkeleton />;
  }

  if (!data) {
    return null;
  }

  const valueFormatter = (value: number) => {
    if (!data.currency) {
      return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(
        value,
      );
    }

    return formatCurrency(value, {
      locale,
      currency: data.currency,
    });
  };

  return (
    <MetricWidget
      locale={locale}
      labels={labels}
      data={data}
      valueFormatter={valueFormatter}
    />
  );
}
