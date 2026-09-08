"use client";

import { useState } from "react";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { formatCurrency } from "@/utils/currency";
import type { Currency } from "@/utils/currency";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { FeaturedMetricWidget } from "@/components/widgets/featured-metric-widget";

import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { useTotalBalance } from "../hooks/use-total-balance";

type TotalBalanceProps = {
  locale: "fa" | "en";
  translations: SalesDashboardDictionary["totalBalance"];
};

const currencies = [
  {
    code: "USD",
    key: "usd",
  },
  {
    code: "EUR",
    key: "eur",
  },
  {
    code: "GBP",
    key: "gbp",
  },
  {
    code: "IRT",
    key: "irt",
  },
] as const;

function TotalBalanceError({ message }: { message: string }) {
  return (
    <Card className="h-full">
      <CardContent className="flex min-h-[420px] items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}

export function TotalBalance({ locale, translations }: TotalBalanceProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("IRT");

  const { data, isPending, isError } = useTotalBalance(selectedCurrency);

  if (isError) {
    return <TotalBalanceError message={translations.error} />;
  }
  if (isPending || !data) {
    return (
      <FeaturedMetricWidget
        header={{
          title: translations.title,
          selector: {
            options: currencies.map((currency) => ({
              value: currency.code,
              label: translations.currencies[currency.key],
            })),
            value: selectedCurrency,
            onChange: (value) => setSelectedCurrency(value as Currency),
          },
        }}
        content={{
          type: "card",
          loading: true,
        }}
      />
    );
  }

  const isNegativeBalance = data.availableBalance < 0;

  const balanceLabel = isNegativeBalance
    ? translations.insufficientBalance
    : translations.availableBalance;

  return (
    <FeaturedMetricWidget
      header={{
        title: translations.title,
        selector: {
          options: currencies.map((currency) => ({
            value: currency.code,
            label: translations.currencies[currency.key],
          })),
          value: selectedCurrency,
          onChange: (value) => setSelectedCurrency(value as Currency),
        },
      }}
      content={{
        type: "card",
        label: data.bankName,
        amountLabel: balanceLabel,
        amount: formatCurrency(data.availableBalance, {
          locale,
          currency: data.currency,
        }),
        currency: data.currency,
        identifier: data.cardNumber,
        direction: locale === "fa" ? "rtl" : "ltr",
      }}
      footer={
        <>
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="secondary" className="h-10">
              <ArrowUpRight className="size-4" />
              {translations.actions.deposit}
            </Button>

            <Button type="button" className="h-10" disabled={isNegativeBalance}>
              <ArrowDownLeft className="size-4" />
              {translations.actions.withdraw}
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 border-t pt-5">
            <div
              className={`space-y-1 ${
                locale === "fa" ? "text-right" : "text-left"
              }`}
            >
              <p className="text-xs text-muted-foreground">
                {translations.summary.income}
              </p>

              <p
                className={`text-sm font-semibold tabular-nums ${
                  data.summary.income < 0 ? "text-destructive" : "text-chart-3"
                }`}
              >
                {data.summary.income > 0 && "+ "}
                {formatCurrency(data.summary.income, {
                  locale,
                  currency: data.currency,
                })}
              </p>
            </div>

            <div
              className={`space-y-1 ${
                locale === "fa" ? "text-right" : "text-left"
              }`}
            >
              <p className="text-xs text-muted-foreground">
                {translations.summary.spend}
              </p>

              <p className="text-sm font-semibold tabular-nums">
                {formatCurrency(data.summary.spend, {
                  locale,
                  currency: data.currency,
                })}
              </p>
            </div>

            <div
              className={`space-y-1 ${
                locale === "fa" ? "text-right" : "text-left"
              }`}
            >
              <p className="text-xs text-muted-foreground">
                {translations.summary.saved}
              </p>

              <p className="text-sm font-semibold tabular-nums">
                {formatCurrency(data.summary.saved, {
                  locale,
                  currency: data.currency,
                })}
              </p>
            </div>
          </div>
        </>
      }
    ></FeaturedMetricWidget>
  );
}
