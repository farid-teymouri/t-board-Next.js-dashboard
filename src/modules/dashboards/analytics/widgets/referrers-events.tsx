"use client";

import { AlertTriangle, Check } from "lucide-react";
import { Twitter, MessageCircle, LinkedIn, Google } from "@deemlol/next-icons";
import {
  MetricListWidget,
  MetricListWidgetSkeleton,
} from "@/components/widgets/metric-list-widget";
import type { MetricListSection } from "@/components/widgets/metric-list-widget/types";
import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

import { useReferrersEvents } from "../hooks/use-referrers-events";

interface ReferrersEventsProps {
  translations: AnalyticsDashboardDictionary["referrersEvents"];
  locale: "fa" | "en";
}

const referrerIcons = {
  "google.com": Google,
  "reddit.com": MessageCircle,
  "x.com": Twitter,
  "linkedin.com": LinkedIn,
} as const;

const eventIcons = {
  success: Check,
  info: Check,
  warning: AlertTriangle,
} as const;

const eventColors = {
  success: "bg-chart-3/20 text-chart-3",
  info: "bg-chart-2/20 text-chart-2",
  warning: "bg-chart-5/20 text-chart-5",
} as const;

export function ReferrersEvents({
  translations,
  locale,
}: ReferrersEventsProps) {
  const { data, isLoading, isError } = useReferrersEvents(locale);

  if (isLoading) {
    return <MetricListWidgetSkeleton variant="sections" />;
  }

  if (isError || !data) {
    return <div className="text-sm text-destructive">{translations.error}</div>;
  }

  const sections: MetricListSection[] = [
    {
      id: "top-referrers",
      title: translations.topReferrers.title,
      action: {
        label: translations.topReferrers.action,
      },
      items: data.topReferrers.map((referrer) => ({
        id: referrer.id,
        label: referrer.domain,
        meta: referrer.category,
        value: referrer.value,
        icon: referrerIcons[referrer.domain as keyof typeof referrerIcons],
      })),
    },
    {
      id: "recent-events",
      title: translations.recentEvents.title,
      action: {
        label: translations.recentEvents.action,
      },
      items: data.recentEvents.map((event) => {
        const Icon = eventIcons[event.type];

        return {
          id: event.id,
          label: (
            <>
              {event.label}{" "}
              {event.emphasized && (
                <a
                  href=""
                  className="font-semibold text-chart-2 hover:underline"
                  dir="ltr"
                >
                  {event.emphasized}
                </a>
              )}
              {event.suffix && <> {event.suffix}</>}
            </>
          ),
          meta: event.meta,
          icon: Icon,
          iconClassName: eventColors[event.type],
        };
      }),
    },
  ];

  return (
    <MetricListWidget variant="sections" sections={sections} locale={locale} />
  );
}
