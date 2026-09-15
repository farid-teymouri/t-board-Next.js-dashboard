"use client";

import { AlertTriangle } from "lucide-react";

import { ProgressListWidget } from "@/components/widgets/progress-list-widget";
import type { FinanceDashboardDictionary } from "@/i18n/dictionaries";

import { useBudgetUtilization } from "../hooks/use-budget-utilization";

type BudgetUtilizationProps = {
  dictionary: FinanceDashboardDictionary["budgetUtilization"];
  locale: "fa" | "en";
};

const formatBudgetAmount = (value: number, locale: "fa" | "en") => {
  const formatted =
    locale === "fa"
      ? new Intl.NumberFormat("fa-IR", {
          maximumFractionDigits: 1,
        })
          .format(value)
          .replace(/٫/g, "٬")
      : new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 1,
        }).format(value);

  return locale === "fa" ? `${formatted}م تومان` : `${formatted}M IRT`;
};

export function BudgetUtilization({
  dictionary,
  locale,
}: BudgetUtilizationProps) {
  const { data, isPending, isError } = useBudgetUtilization(locale);

  const items =
    data?.items.map((item) => ({
      id: item.id,
      name: item.name,
      value: item.spent,
      progress: item.progress,
      valueLabel: (
        <>
          {formatBudgetAmount(item.spent, locale)}
          {" / "}
          {formatBudgetAmount(item.budget, locale)}
        </>
      ),
    })) ?? [];

  return (
    <ProgressListWidget
      locale={locale}
      translations={dictionary}
      items={items}
      isLoading={isPending}
      isError={isError}
      variant="colorful"
      display={{
        rank: "hidden",
        progress: true,
        meta: false,
      }}
      alert={
        data?.alert
          ? {
              message: data.alert.message,
              variant: "destructive",
              icon: <AlertTriangle className="size-4 shrink-0" />,
            }
          : undefined
      }
    />
  );
}
