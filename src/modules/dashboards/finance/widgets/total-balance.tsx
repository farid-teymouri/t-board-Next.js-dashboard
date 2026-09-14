"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FeaturedMetricWidget } from "@/components/widgets/featured-metric-widget";
import type { FeaturedMetricSelectorOption } from "@/components/widgets/featured-metric-widget/types";
import { formatCurrency } from "@/utils/currency";

import type { FinanceDashboardDictionary } from "@/i18n/dictionaries";

import { useTotalBalance } from "../hooks/use-total-balance";

type TotalBalanceProps = {
  dictionary: FinanceDashboardDictionary["totalBalance"];
  locale: "fa" | "en";
};

export function TotalBalance({ dictionary, locale }: TotalBalanceProps) {
  const { data, isLoading } = useTotalBalance();

  const [selectedCurrency, setSelectedCurrency] = useState("IRT");

  if (isLoading || !data) {
    return (
      <FeaturedMetricWidget
        header={{
          title: dictionary.title,
          selector: {
            options: [
              { value: "IRT", label: "IRT" },
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
              { value: "GBP", label: "GBP" },
            ],
            value: selectedCurrency,
            onChange: setSelectedCurrency,
          },
        }}
        content={{
          type: "card",
          loading: true,
        }}
      />
    );
  }

  const account = data.accounts.find(
    (item) => item.currency === selectedCurrency,
  );

  if (!account) {
    return null;
  }

  const currencyOptions: readonly FeaturedMetricSelectorOption[] =
    data.accounts.map((item) => ({
      value: item.currency,
      label: item.currency,
    }));

  const formatAmount = (value: number) =>
    formatCurrency(value, {
      locale,
      currency: account.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const summaryItems = [
    {
      label: dictionary.income,
      value:
        locale === "fa"
          ? `${formatAmount(account.summary.income)} +`
          : `+ ${formatAmount(account.summary.income)}`,
      className: "text-chart-3",
    },
    {
      label: dictionary.expenses,
      value:
        locale === "fa"
          ? `${formatAmount(account.summary.expenses)} −`
          : `− ${formatAmount(account.summary.expenses)}`,
      className: "text-destructive",
    },
    {
      label: dictionary.saved,
      value: formatAmount(account.summary.saved),
      className: "text-chart-2",
    },
  ];

  return (
    <FeaturedMetricWidget
      header={{
        title: dictionary.title,
        selector: {
          options: currencyOptions,
          value: selectedCurrency,
          onChange: setSelectedCurrency,
        },
      }}
      content={{
        type: "card",
        label: account.bankName,
        amountLabel: dictionary.availableBalance,
        amount: formatAmount(account.amount),
        currency: account.currency,
        identifier: account.cardNumber,
        direction: locale === "fa" ? "rtl" : "ltr",
      }}
      footer={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="default" className="w-full">
              <ArrowUpRight className="size-4" />
              {dictionary.transfer}
            </Button>

            <Button variant="outline" className="w-full">
              <ArrowDownLeft className="size-4" />
              {dictionary.deposit}
            </Button>
          </div>

          <hr className="border-border" />

          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3">
            {summaryItems.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>

                <p className={`text-sm font-semibold ${item.className}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
