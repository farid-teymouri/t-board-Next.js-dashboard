"use client";

import { TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  MetricListWidget,
  MetricListWidgetSkeleton,
} from "@/components/widgets/metric-list-widget";
import { formatCurrency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

import { useCustomerInsights } from "../hooks/use-customer-insights";

interface CustomerInsightsProps {
  translations: EcommerceDashboardDictionary["customerInsights"];
  locale: "fa" | "en";
}

export function CustomerInsights({
  translations,
  locale,
}: CustomerInsightsProps) {
  const { data, isLoading, isError } = useCustomerInsights(locale);

  if (isLoading) {
    return (
      <MetricListWidgetSkeleton variant="sections" sectionItemCounts={[3, 3]} />
    );
  }

  if (isError || !data) {
    return null;
  }

  const sections = [
    {
      id: "low-stock-alerts",
      title: data.lowStockAlerts.title,
      action: {
        label: data.lowStockAlerts.action,
      },
      items: data.lowStockAlerts.items.map((item) => ({
        id: item.id,
        label: item.name,
        meta: item.sku,
        icon: TriangleAlert,
        iconClassName: "bg-chart-5/20 text-chart-5",
        badge: (
          <Badge
            variant="secondary"
            className="shrink-0 bg-chart-5/20 text-chart-5"
          >
            {formatNumber(item.quantity, locale)} {translations.lowStock.left}
          </Badge>
        ),
      })),
    },

    {
      id: "top-customers",
      title: data.topCustomers.title,
      items: data.topCustomers.items.map((customer) => ({
        id: customer.id,
        label: customer.name,
        meta: `${formatNumber(customer.orders, locale)} ${
          translations.topCustomers.orders
        }`,
        iconContent: customer.initials,
        iconClassName: "bg-chart-2/20 text-chart-2",
        valueDisplay: formatCurrency(customer.total, {
          locale,
          currency: customer.currency,
          maximumFractionDigits: 0,
        }),
      })),
    },
  ];

  return (
    <MetricListWidget variant="sections" sections={sections} locale={locale} />
  );
}
