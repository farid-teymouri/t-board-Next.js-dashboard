"use client";

import { Badge } from "@/components/ui/badge";
import {
  GrowthIndicator,
  SummaryWidget,
  SummaryWidgetSkeleton,
} from "@/components/widgets/summary-widget";
import { useProfile } from "../hooks/use-profile";
import { useSalesSummary } from "../hooks/use-sales-summary";
import type { SalesDashboardDictionary } from "@/i18n/dictionaries";
import type { GrowthPeriod } from "@/types/metrics/growth";
import { renderTemplate } from "@/lib/utils/render-template";

type SalesSummaryProps = {
  dictionary: SalesDashboardDictionary;
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

  return (
    <SummaryWidget
      eyebrow={dictionary.label}
      title={dictionary.welcome.replace("{name}", profile.name)}
      description={renderTemplate(dictionary.description, {
        currentPeriod: dictionary.growth[sales.revenueGrowth.period],

        comparisonPeriod:
          dictionary.growth.previous[sales.revenueGrowth.period],

        growth: (
          <>
            <GrowthIndicator growth={sales.revenueGrowth} locale={locale} />{" "}
            {sales.revenueGrowth.trend === "up"
              ? dictionary.growth.increased
              : dictionary.growth.decreased}
          </>
        ),

        product1: <Badge variant="default">{sales.topProducts[0]}</Badge>,

        product2: <Badge variant="default">{sales.topProducts[1]}</Badge>,

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
