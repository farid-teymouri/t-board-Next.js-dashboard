"use client";

import {
  SummaryWidget,
  SummaryWidgetSkeleton,
} from "@/components/widgets/summary-widget";
import { renderTemplate } from "@/lib/utils/render-template";

import type { SalesDashboardDictionary } from "@/i18n/dictionaries";
import type { GrowthPeriod } from "@/types/metrics/growth";

import { useProfile } from "../hooks/use-profile";
import { useSalesSummary } from "../hooks/use-sales-summary";

type SalesSummaryProps = {
  dictionary: SalesDashboardDictionary["salesSummary"];
  locale: "fa" | "en";
  period?: GrowthPeriod;
};

export function SalesSummary({
  dictionary,
  locale,
  period = "month",
}: SalesSummaryProps) {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useProfile();

  const {
    data: sales,
    isPending: isSalesPending,
    isError: isSalesError,
  } = useSalesSummary(locale, period);

  if (isProfilePending || isSalesPending) {
    return <SummaryWidgetSkeleton />;
  }

  if (isProfileError || isSalesError || !profile || !sales) {
    return null;
  }

  const numberFormatter = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  );

  const formatNumber = (value: number) => numberFormatter.format(value);

  const currentPeriod = dictionary.growth[sales.revenueGrowth.period];

  const previousPeriod = dictionary.growth.previous[sales.revenueGrowth.period];

  return (
    <SummaryWidget
      eyebrow={dictionary.label}
      title={dictionary.welcome.replace("{name}", profile.name)}
      description={renderTemplate(dictionary.description, {
        currentPeriod,
        previousPeriod,
        growth:
          sales.revenueGrowth.trend === "up"
            ? renderTemplate(dictionary.growth.increased, {
                currentPeriod,
                previousPeriod,
                value: (
                  <span className="font-medium text-chart-3">
                    {formatNumber(sales.revenueGrowth.value)}%
                  </span>
                ),
              })
            : renderTemplate(dictionary.growth.decreased, {
                currentPeriod,
                previousPeriod,
                value: (
                  <span className="font-medium text-destructive">
                    {formatNumber(sales.revenueGrowth.value)}%
                  </span>
                ),
              }),
        topProducts:
          sales.revenueGrowth.trend === "up"
            ? renderTemplate(dictionary.growth.topProducts, {
                product1: <>{sales.topProducts[0]}</>,
                product2: <>{sales.topProducts[1]}</>,
              })
            : "",
        pendingInvoices:
          sales.pendingInvoices > 0
            ? renderTemplate(dictionary.pendingInvoices, {
                count: formatNumber(sales.pendingInvoices),
              })
            : "",
      })}
      metrics={[
        {
          label: dictionary.stats.targetHit,
          value: `${formatNumber(sales.targetHit)}%`,
        },
        {
          label: dictionary.stats.dealsWon,
          value: formatNumber(sales.dealsWon),
        },
        {
          label: dictionary.stats.stillOpen,
          value: formatNumber(sales.stillOpen),
        },
      ]}
      actions={[
        {
          label: dictionary.actions.createInvoice,
        },
        {
          label: dictionary.actions.viewPipeline,
          variant: "secondary",
        },
      ]}
    />
  );
}
