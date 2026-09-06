"use client";

import {
  Banknote,
  CircleDollarSign,
  Package,
  Receipt,
  Users,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import type {
  OverviewMetric,
  OverviewMetricId,
  OverviewMetricsResponse,
} from "@/types/dashboards/sales/overview-metrics";

type OverviewMetricsProps = {
  locale: string;
  translations: Record<string, string>;
};

const metricIcons: Record<OverviewMetricId, typeof Users> = {
  customers: Users,
  products: Package,
  transactions: Receipt,
  averageOrderValue: CircleDollarSign,
  refundRate: Banknote,
};

async function getOverviewMetrics(): Promise<OverviewMetricsResponse> {
  const response = await fetch("/api/dashboards/sales/overview-metrics");

  if (!response.ok) {
    throw new Error("Failed to fetch overview metrics");
  }

  return response.json();
}

function formatMetricValue(metric: OverviewMetric, locale: string) {
  const numberLocale = locale === "fa" ? "fa-IR" : "en-US";

  const formatter = new Intl.NumberFormat(numberLocale, {
    minimumFractionDigits: metric.format === "number" ? 0 : 1,
    maximumFractionDigits: metric.format === "number" ? 0 : 2,
  });

  const value = formatter.format(metric.value);

  switch (metric.format) {
    case "currency":
      return locale === "fa" ? `$${value}` : `$${value}`;

    case "percent":
      return `${value}%`;

    default:
      return value;
  }
}

function formatChange(change: number, locale: string) {
  const numberLocale = locale === "fa" ? "fa-IR" : "en-US";

  const value = new Intl.NumberFormat(numberLocale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(change));

  return `${change >= 0 ? "+" : "−"}${value}%`;
}

function getChangeClass(change: number) {
  return change >= 0
    ? "text-chart-3 dark:text-chart-3"
    : "text-rose-600 dark:text-rose-400";
}

function OverviewMetricItem({
  metric,
  label,
  locale,
}: {
  metric: OverviewMetric;
  label: string;
  locale: string;
}) {
  const Icon = metricIcons[metric.id];

  return (
    <div className="flex min-w-0 flex-1">
      <div className="flex w-full items-center gap-4 px-3 py-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl dark:bg-sky-800/20 bg-sky-300/10">
          <Icon className="size-5 dark:text-sky-500 text-sky-400" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-muted-foreground">
            {label}
          </div>

          <div className="mt-1 flex items-baseline justify-between gap-3">
            <span className="text-xl font-semibold tracking-tight">
              {formatMetricValue(metric, locale)}
            </span>

            <span
              className={`text-xs font-medium ${getChangeClass(metric.change)}`}
            >
              {formatChange(metric.change, locale)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OverviewMetrics({
  locale,
  translations,
}: OverviewMetricsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboards", "sales", "overview-metrics", locale],
    queryFn: getOverviewMetrics,
  });

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <div className="flex animate-pulse divide-x divide-border rtl:divide-x-reverse">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex min-w-0 flex-1 gap-4 px-5 py-5">
              <div className="size-11 shrink-0 rounded-xl bg-muted" />

              <div className="flex flex-1 flex-col gap-2">
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-6 w-20 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="p-6 text-sm text-muted-foreground">
        Failed to load overview metrics.
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap divide-x xl:divide-y-0  divide-y divide-border rtl:divide-x-reverse">
        {data.items.map((metric) => (
          <div
            key={metric.id}
            className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5"
          >
            <OverviewMetricItem
              metric={metric}
              locale={locale}
              label={translations[metric.id]}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
