"use client";

import {
  SegmentedProgressWidget,
  SegmentedProgressWidgetSkeleton,
} from "@/components/widgets/segmented-progress-widget";
import { formatNumber } from "@/utils/formatters";
import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

import { useInventoryStatus } from "../hooks/use-inventory-status";

type InventoryStatusProps = {
  translations: EcommerceDashboardDictionary["inventoryStatus"];
  locale: "fa" | "en";
};

export function InventoryStatus({
  translations,
  locale,
}: InventoryStatusProps) {
  const { data, isLoading, isError } = useInventoryStatus();

  if (isLoading) {
    return <SegmentedProgressWidgetSkeleton />;
  }

  if (isError || !data) {
    return null;
  }

  return (
    <SegmentedProgressWidget
      locale={locale}
      translations={{
        title: translations.title,
        subtitle: `${formatNumber(data.total, locale)} ${translations.skusTracked}`,
      }}
      segments={[
        {
          id: "in-stock",
          label: translations.items.inStock,
          value: data.items.find((item) => item.id === "in-stock")?.value ?? 0,
          className: "bg-chart-2",
        },
        {
          id: "low-stock",
          label: translations.items.lowStock,
          value: data.items.find((item) => item.id === "low-stock")?.value ?? 0,
          className: "bg-chart-4",
        },
        {
          id: "out-of-stock",
          label: translations.items.outOfStock,
          value:
            data.items.find((item) => item.id === "out-of-stock")?.value ?? 0,
          className: "bg-chart-5",
        },
      ]}
      total={data.total}
      alert={`${formatNumber(
        data.belowReorderThreshold,
        locale,
      )} ${translations.reorderThreshold}`}
    />
  );
}
