"use client";

import { useState } from "react";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { formatCurrency } from "@/utils/currency";
import type { Currency } from "@/utils/currency";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

function TotalBalanceSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />

          <div className="flex gap-1 rounded-lg border p-1">
            {currencies.map((currency) => (
              <div
                key={currency.code}
                className="h-8 w-12 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="relative h-[210px] overflow-hidden rounded-2xl bg-muted/50">
          <div className="absolute inset-0 animate-pulse bg-muted/60" />

          <div className="absolute inset-x-5 top-5 space-y-3">
            <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-36 animate-pulse rounded bg-muted" />
            <div className="h-8 w-44 animate-pulse rounded bg-muted" />

            <div className="pt-16">
              <div className="h-5 w-52 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 animate-pulse rounded-lg bg-muted" />
          <div className="h-10 animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-6 w-24 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TotalBalanceError() {
  return (
    <Card className="h-full">
      <CardContent className="flex min-h-[420px] items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          Unable to load total balance.
        </p>
      </CardContent>
    </Card>
  );
}

export function TotalBalance({ locale, translations }: TotalBalanceProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("IRT");

  const { data, isPending, isError } = useTotalBalance(selectedCurrency);

  if (isPending) {
    return <TotalBalanceSkeleton />;
  }

  if (isError || !data) {
    return <TotalBalanceError />;
  }

  const isNegativeBalance = data.availableBalance < 0;

  const balanceLabel = isNegativeBalance
    ? translations.insufficientBalance
    : translations.availableBalance;

  return (
    <FeaturedMetricWidget
      header={
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-semibold">{translations.title}</h3>

          <div className="flex shrink-0 items-center gap-1 rounded-lg border bg-muted/20 p-1">
            {currencies.map((currency) => {
              const isActive = currency.code === selectedCurrency;

              return (
                <Button
                  key={currency.code}
                  type="button"
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCurrency(currency.code)}
                  className={`h-8 rounded-lg px-3 text-xs ${
                    !isActive
                      ? "cursor-pointer hover:bg-secondary hover:text-foreground"
                      : ""
                  }`}
                >
                  {translations.currencies[currency.key]}
                </Button>
              );
            })}
          </div>
        </div>
      }
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
