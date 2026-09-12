"use client";

import {
  BreakdownWidget,
  BreakdownWidgetSkeleton,
} from "@/components/widgets/breakdown-widget";

import { useSalesByCategory } from "../hooks/use-sales-by-category";

import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

type SalesByCategoryProps = {
  dictionary: EcommerceDashboardDictionary["salesByCategory"];
  locale: "fa" | "en";
};

export function SalesByCategory({ locale, dictionary }: SalesByCategoryProps) {
  const { data, isLoading, isError } = useSalesByCategory(locale);

  if (isLoading) {
    return <BreakdownWidgetSkeleton variant="list" itemCount={5} />;
  }

  if (isError || !data) {
    return (
      <div className="text-sm text-muted-foreground">{dictionary.error}</div>
    );
  }

  const { netSales, categories } = data;

  const items = [
    {
      id: "apparel",
      label: dictionary.apparel,
      value: categories.apparel,
      color: "var(--chart-1)",
    },
    {
      id: "electronics",
      label: dictionary.electronics,
      value: categories.electronics,
      color: "var(--chart-2)",
    },
    {
      id: "homeLiving",
      label: dictionary.homeLiving,
      value: categories.homeLiving,
      color: "var(--chart-3)",
    },
    {
      id: "beauty",
      label: dictionary.beauty,
      value: categories.beauty,
      color: "var(--chart-4)",
    },
    {
      id: "other",
      label: dictionary.other,
      value: categories.other,
      color: "var(--chart-5)",
    },
  ];

  return (
    <BreakdownWidget
      locale={locale}
      title={dictionary.title}
      description={dictionary.description}
      total={{
        value: netSales,
        label: dictionary.netSales,
      }}
      items={items}
      variant="list"
    />
  );
}
