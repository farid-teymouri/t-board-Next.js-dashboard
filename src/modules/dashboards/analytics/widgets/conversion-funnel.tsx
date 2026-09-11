"use client";

import { ProgressListWidget } from "@/components/widgets/progress-list-widget";

import { useConversionFunnel } from "../hooks/use-conversion-funnel";

import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

type ConversionFunnelProps = {
  translations: AnalyticsDashboardDictionary["conversionFunnel"];
  locale: "fa" | "en";
};

export function ConversionFunnel({
  translations,
  locale,
}: ConversionFunnelProps) {
  const { data, isPending, isError } = useConversionFunnel(locale);

  return (
    <ProgressListWidget
      locale={locale}
      translations={translations}
      items={data?.items ?? []}
      variant="funnel"
      valueMode="value"
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
