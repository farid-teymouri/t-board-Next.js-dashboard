"use client";

import { CreditCard, Send } from "lucide-react";

import {
  SummaryWidget,
  SummaryWidgetSkeleton,
} from "@/components/widgets/summary-widget";

import { formatCurrency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import type { FinanceDashboardDictionary } from "@/i18n/dictionaries";

import { useFinanceSummary } from "../hooks/use-finance-summary";

type FinanceSummaryProps = {
  dictionary: FinanceDashboardDictionary["financeSummary"];
  locale: "fa" | "en";
};

export function FinanceSummary({ dictionary, locale }: FinanceSummaryProps) {
  const { data, isPending, isError } = useFinanceSummary(locale);

  if (isPending) {
    return <SummaryWidgetSkeleton />;
  }

  if (isError || !data) {
    return null;
  }

  const savedAmount = formatCurrency(data.savedAmount, {
    locale,
    currency: data.currency,
    maximumFractionDigits: 0,
  });

  return (
    <SummaryWidget
      eyebrow={dictionary.label}
      title={dictionary.title.replace("{amount}", savedAmount)}
      description={data.description}
      metrics={[
        {
          label: dictionary.stats.savingsRate,
          value: `${formatNumber(data.savingsRate, locale)}%`,
        },
        {
          label: dictionary.stats.billsDue,
          value: formatNumber(data.billsDue, locale),
        },
        {
          label: dictionary.stats.budgetsOver,
          value: formatNumber(data.budgetsOver, locale),
        },
      ]}
      actions={[
        {
          label: dictionary.actions.transfer,
          icon: <Send className="size-4" />,
        },
        {
          label: dictionary.actions.payBills,
          icon: <CreditCard className="size-4" />,
          variant: "secondary",
        },
      ]}
    />
  );
}
