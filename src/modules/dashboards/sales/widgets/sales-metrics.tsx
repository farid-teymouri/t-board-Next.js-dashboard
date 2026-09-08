"use client";

import {
  Banknote,
  CircleDollarSign,
  Package,
  Receipt,
  Users,
} from "lucide-react";

import {
  MetricGroup,
  type MetricItem,
} from "@/components/widgets/metric-group";
import { useSalesMetrics } from "../hooks/use-sales-metrics";

type SalesMetricsProps = {
  locale: "fa" | "en";
  translations: Record<string, string>;
};
const metricIcons = {
  customers: Users,
  products: Package,
  transactions: Receipt,
  averageOrderValue: CircleDollarSign,
  refundRate: Banknote,
} as const;

export function SalesMetrics({ locale, translations }: SalesMetricsProps) {
  const { data, isLoading, isError } = useSalesMetrics(locale);

  if (isError) {
    return (
      <div className="rounded-xl border p-6 text-sm text-muted-foreground">
        Failed to load sales metrics.
      </div>
    );
  }

  const items: MetricItem[] =
    data?.items.map((metric) => ({
      id: metric.id,
      label: translations[metric.id],
      value: metric.value,
      format: metric.format,
      currency: metric.currency,
      icon: metricIcons[metric.id],
      change: {
        value: metric.change,
      },
    })) ?? [];

  return <MetricGroup items={items} locale={locale} isLoading={isLoading} />;
}
