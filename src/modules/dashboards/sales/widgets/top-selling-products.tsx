"use client";

import { ProgressListWidget } from "@/components/widgets/progress-list-widget";

import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { useTopSellingProducts } from "../hooks/use-top-selling-products";

type TopSellingProductsProps = {
  dictionary: SalesDashboardDictionary;
  locale: "fa" | "en";
};

export function TopSellingProducts({
  dictionary,
  locale,
}: TopSellingProductsProps) {
  const { data, isPending, isError } = useTopSellingProducts(locale);

  return (
    <ProgressListWidget
      locale={locale}
      translations={dictionary.topSellingProducts}
      items={data?.items ?? []}
      currency={data?.currency?.code}
      isLoading={isPending}
      isError={isError}
      variant="classic"
      valueMode="amount"
      display={{
        rank: "highlighted",
        progress: true,
        meta: true,
      }}
    />
  );
}
