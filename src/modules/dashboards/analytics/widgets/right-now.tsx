"use client";

import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

import {
  LiveLineChartWidget,
  LiveLineChartWidgetSkeleton,
} from "@/components/widgets/live-line-chart-widget";

import { useRightNow } from "../hooks/use-right-now";

type RightNowProps = {
  translations: AnalyticsDashboardDictionary["rightNow"];
  locale: "fa" | "en";
};

export function RightNow({ translations, locale }: RightNowProps) {
  const { data, isLoading, isError } = useRightNow();

  if (isLoading || !data) {
    return <LiveLineChartWidgetSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-xl border text-sm text-destructive">
        {translations.error}
      </div>
    );
  }

  const goals = [
    {
      id: "newsletter",
      label: translations.goals.newsletter,
      value: data.goals[0]?.value ?? 0,
      color: "var(--chart-3)",
    },
    {
      id: "demo",
      label: translations.goals.demo,
      value: data.goals[1]?.value ?? 0,
      color: "var(--chart-2)",
    },
    {
      id: "checkout",
      label: translations.goals.checkout,
      value: data.goals[2]?.value ?? 0,
      color: "var(--chart-4)",
    },
  ];

  return (
    <LiveLineChartWidget
      title={translations.title}
      description={translations.description}
      liveLabel={translations.live}
      value={data.currentValue}
      data={data.points}
      goalsTitle={translations.goals.title}
      goals={goals}
      locale={locale}
    />
  );
}
