"use client";

import {
  MetricWidget,
  MetricWidgetSkeleton,
  type MetricWidgetLabels,
} from "@/components/widgets/metric-widget";

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
    `/api/dashboards/sales/total-revenue` +
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

  return <MetricWidget locale={locale} labels={labels} data={data} />;
}
