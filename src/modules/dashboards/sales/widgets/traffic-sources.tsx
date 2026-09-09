"use client";

import { ProgressListWidget } from "@/components/widgets/progress-list-widget";

import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { useTrafficSources } from "../hooks/use-traffic-sources";

type TrafficSourcesProps = {
  dictionary: SalesDashboardDictionary;
  locale: "fa" | "en";
};

export function TrafficSources({ dictionary, locale }: TrafficSourcesProps) {
  const { data, isPending, isError } = useTrafficSources(locale);

  return (
    <ProgressListWidget
      locale={locale}
      translations={dictionary.trafficSource}
      items={data?.items ?? []}
      isLoading={isPending}
      isError={isError}
      variant="colorful"
      valueMode="percentage"
      display={{
        rank: "hidden",
        progress: true,
        meta: false,
      }}
    />
  );
}
