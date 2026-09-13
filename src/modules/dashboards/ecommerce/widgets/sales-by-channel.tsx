"use client";

import { ProgressListWidget } from "@/components/widgets/progress-list-widget";

import { useSalesByChannel } from "../hooks/use-sales-by-channel";

import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

type SalesByChannelProps = {
  translations: EcommerceDashboardDictionary["salesByChannel"];
  locale: "fa" | "en";
};

export function SalesByChannel({
  translations,

  locale,
}: SalesByChannelProps) {
  const { data, isPending, isError } = useSalesByChannel(locale);

  return (
    <ProgressListWidget
      locale={locale}
      translations={translations}
      items={data?.items ?? []}
      variant="funnel"
      valueMode="amount"
      currency="IRT"
      display={{
        rank: "hidden",

        progress: true,

        meta: false,
      }}
      isLoading={isPending}
      isError={isError}
    />
  );
}
