"use client";

import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

import {
  BreakdownWidget,
  BreakdownWidgetSkeleton,
} from "@/components/widgets/breakdown-widget";

import { useVisitorDevices } from "../hooks/use-visitor-devices";

type VisitorDevicesProps = {
  locale: "fa" | "en";
  translations: AnalyticsDashboardDictionary["visitorDevices"];
};

export function VisitorDevices({ locale, translations }: VisitorDevicesProps) {
  const { data, isLoading, isError } = useVisitorDevices(locale);

  if (isLoading) {
    return <BreakdownWidgetSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">{translations.error}</p>
      </div>
    );
  }

  const { totalVisitors, devices } = data;

  const items = [
    {
      id: "mobile",
      label: translations.mobile,
      value: devices.mobile,
      color: "var(--chart-1)",
    },
    {
      id: "desktop",
      label: translations.desktop,
      value: devices.desktop,
      color: "var(--chart-2)",
    },
    {
      id: "tablet",
      label: translations.tablet,
      value: devices.tablet,
      color: "var(--chart-3)",
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
    />
  );
}
