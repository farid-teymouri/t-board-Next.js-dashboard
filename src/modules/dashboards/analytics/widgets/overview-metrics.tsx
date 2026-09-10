"use client";

import { Activity, Gauge, Timer, Users } from "lucide-react";

import {
  MetricListWidget,
  MetricListWidgetSkeleton,
} from "@/components/widgets/metric-list-widget";

import type { MetricListItem } from "@/components/widgets/metric-list-widget/types";

import { useOverviewMetrics } from "../hooks/use-overview-metrics";

interface OverviewMetricsTranslations {
  title: string;
  metrics: {
    sessions: string;
    uniqueVisitors: string;
    bounceRate: string;
    avgSession: string;
  };
  error: string;
}

interface OverviewMetricsProps {
  translations: OverviewMetricsTranslations;
  locale: "fa" | "en";
}

export function OverviewMetrics({
  translations,
  locale,
}: OverviewMetricsProps) {
  const { data, isLoading, isError } = useOverviewMetrics(locale);

  if (isLoading) {
    return <MetricListWidgetSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border p-6 text-sm text-destructive">
        {translations.error}
      </div>
    );
  }

  const metricLabels = {
    sessions: translations.metrics.sessions,
    "unique-visitors": translations.metrics.uniqueVisitors,
    "bounce-rate": translations.metrics.bounceRate,
    "avg-session": translations.metrics.avgSession,
  } as const;

  const metricIcons = {
    sessions: Activity,
    "unique-visitors": Users,
    "bounce-rate": Gauge,
    "avg-session": Timer,
  } as const;

  const items: MetricListItem[] = data.metrics.map((metric) => {
    const id = metric.id as keyof typeof metricLabels;

    return {
      id: metric.id,
      label: metricLabels[id],
      value: Number(metric.value),
      valueType: id === "avg-session" ? "duration" : "number",
      change: metric.change,
      icon: metricIcons[id],
    };
  });

  return (
    <MetricListWidget
      header={{
        label: data.label,
        title: translations.title,
      }}
      items={items}
      locale={locale}
    />
  );
}
