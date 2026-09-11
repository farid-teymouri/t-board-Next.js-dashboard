"use client";

import {
  BreakdownWidget,
  BreakdownWidgetSkeleton,
} from "@/components/widgets/breakdown-widget";

import { useTrafficChannels } from "../hooks/use-traffic-channels";
import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

type TrafficChannelsProps = {
  translations: AnalyticsDashboardDictionary["trafficChannels"];
  locale: "fa" | "en";
};

export function TrafficChannels({
  locale,
  translations,
}: TrafficChannelsProps) {
  const { data, isLoading, isError } = useTrafficChannels(locale);

  if (isLoading) {
    return <BreakdownWidgetSkeleton variant="list" />;
  }

  if (isError || !data) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-destructive">
        {translations.error}
      </div>
    );
  }

  const { totalVisitors, channels } = data;

  const items = [
    {
      id: "organicSearch",
      label: translations.organicSearch,
      value: channels.organicSearch,
      color: "var(--chart-1)",
    },
    {
      id: "direct",
      label: translations.direct,
      value: channels.direct,
      color: "var(--chart-2)",
    },
    {
      id: "social",
      label: translations.social,
      value: channels.social,
      color: "var(--chart-3)",
    },
    {
      id: "referral",
      label: translations.referral,
      value: channels.referral,
      color: "var(--chart-4)",
    },
    {
      id: "paid",
      label: translations.paid,
      value: channels.paid,
      color: "var(--chart-5)",
    },
  ];

  return (
    <BreakdownWidget
      locale={locale}
      title={translations.title}
      description={translations.description}
      total={{
        value: totalVisitors,
        label: translations.visitors,
      }}
      items={items}
      variant="list"
    />
  );
}
