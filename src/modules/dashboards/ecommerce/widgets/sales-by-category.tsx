"use client";

import {
  BreakdownWidget,
  BreakdownWidgetSkeleton,
} from "@/components/widgets/breakdown-widget";

import { useSalesByCategory } from "../hooks/use-sales-by-category";

import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

type SalesByCategoryProps = {
  translations: EcommerceDashboardDictionary["salesByCategory"];
  locale: "fa" | "en";
};

export function SalesByCategory({
  locale,
  translations,
}: SalesByCategoryProps) {
  const { data, isLoading, isError } = useSalesByCategory(locale);

  if (isLoading) {
    return <BreakdownWidgetSkeleton variant="list" itemCount={5} />;
  }

  if (isError || !data) {
    return (
      <div className="text-sm text-muted-foreground">{translations.error}</div>
    );
  }

  const { netSales, categories } = data;

  const items = [
    {
      id: "apparel",
      label: translations.apparel,
      value: categories.apparel,
      color: "var(--chart-1)",
    },
    {
      id: "electronics",
      label: translations.electronics,
      value: categories.electronics,
      color: "var(--chart-2)",
    },
    {
      id: "homeLiving",
      label: translations.homeLiving,
      value: categories.homeLiving,
      color: "var(--chart-3)",
    },
    {
      id: "beauty",
      label: translations.beauty,
      value: categories.beauty,
      color: "var(--chart-4)",
    },
    {
      id: "other",
      label: translations.other,
      value: categories.other,
      color: "var(--chart-5)",
    },
  ];

  return (
    <BreakdownWidget
      locale={locale}
      title={translations.title}
      description={translations.description}
      total={{
        value: netSales,
        label: translations.netSales,
      }}
      items={items}
      variant="list"
    />
  );
}
