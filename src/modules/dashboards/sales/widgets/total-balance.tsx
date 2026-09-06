"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/api/client";

import type { TotalBalanceResponse } from "@/types/dashboards/sales/total-balance";
import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

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
  const { data, isPending, isError } = useQuery({
    queryKey: ["dashboards", "sales", "total-balance", locale],
    queryFn: () =>
      apiGet<TotalBalanceResponse>(
        `/api/dashboards/sales/total-balance?locale=${locale}`,
      ),
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) {
    return <TotalBalanceSkeleton />;
  }

  if (isError || !data) {
    return <TotalBalanceError />;
  }

  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US");

  return (
    <Card className="h-full flex flex-col justify-between overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-semibold">{translations.title}</h3>

          <div className="flex shrink-0 items-center gap-1 rounded-lg border bg-muted/20 p-1 ">
            {currencies.map((currency) => {
              const isActive = currency.code === "IRT";

              return (
                <Button
                  key={currency.code}
                  type="button"
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  disabled={isActive}
                  className={`h-8 px-3 text-xs rounded-lg ${
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
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Bank Card */}
        <div
          dir={locale === "fa" ? "rtl" : "ltr"}
          className="
            relative
            min-h-[210px]
            overflow-hidden
            rounded-2xl
            bg-linear-to-br
            dark:from-primary from-primary  
            dark:via-primary/90 via-primary/70
            dark:to-primary/70 to-primary/60
            p-6
            text-primary-foreground
            shadow-lg
            shadow-primary/20
          "
        >
          {/* Decorative gradient highlights */}
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-20
              size-56
              rounded-full
              dark:bg-sky-500/30 bg-sky-400/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-12
              size-48
              rounded-full
              dark:bg-rose-500/20 bg-rose-400/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-2xl
              bg-linear-to-br
              dark:from-rose-400/90 from-rose-400/50
              via-transparent
              dark:to-sky-400/70 to-sky-300/50
            "
          />

          <div className="relative z-10 flex h-full min-h-[198px] flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div className="text-lg font-semibold tracking-[0.18em]">
                {data.bankName}
              </div>

              <div className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-md font-medium uppercase tracking-wider">
                {data.currency.label}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium text-primary-foreground/70">
                {data.labels.availableBalance}
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">
                  {formatter.format(data.availableBalance)}
                </span>

                <span className="text-xs font-medium text-primary-foreground/70">
                  {data.currency.label}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <div
                dir="ltr"
                className="
                  text-sm
                  font-medium
                  tracking-[0.22em]
                  text-primary-foreground/90
                "
              >
                {data.cardNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="secondary" className="h-10">
            <ArrowUpRight className="size-4" />
            {translations.actions.deposit}
          </Button>

          <Button type="button" className="h-10">
            <ArrowDownLeft className="size-4" />
            {translations.actions.withdraw}
          </Button>
        </div>

        {/* Summary */}
        <div className="flex flex-wrap gap-3 border-t pt-5">
          <div
            className={`space-y-1 ${
              locale === "fa" ? "text-right" : "text-left"
            }`}
          >
            <p className="text-xs text-muted-foreground">
              {translations.summary.income}
            </p>

            <p className="text-sm font-semibold text-chart-3 tabular-nums">
              {formatter.format(data.summary.income)} +{" "}
              <span className="text-xs opacity-70">{data.currency.label}</span>
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
              {formatter.format(data.summary.spend)}{" "}
              <span className="text-xs opacity-70">{data.currency.label}</span>
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
              {formatter.format(data.summary.saved)}{" "}
              <span className="text-xs opacity-70">{data.currency.label}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
