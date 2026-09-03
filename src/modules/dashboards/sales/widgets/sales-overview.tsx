"use client";

import { useQuery } from "@tanstack/react-query";
import { SoftBadge } from "@/components/ui/soft-badge";
import { apiGet } from "@/lib/api/client";

import type { UserProfile } from "@/app/api/types/profile";
import type { SalesOverview } from "@/app/api/types/dashboards/sales/overview";
import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

type TemplateValues = Record<string, ReactNode>;

export function renderTemplate(template: string, values: TemplateValues) {
  return template.split(/(\{\w+\})/g).map((part, index) => {
    const match = part.match(/^\{(\w+)\}$/);

    if (!match) {
      return part;
    }

    return <span key={`${match[1]}-${index}`}>{values[match[1]]}</span>;
  });
}
type SalesOverviewProps = {
  dictionary: SalesDashboardDictionary;
  locale: "fa" | "en";
};
function SalesOverviewSkeleton() {
  return (
    <Card>
      <CardContent className="flex h-full flex-col justify-between gap-4">
        <div className="space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />

          <div className="h-8 w-64 animate-pulse rounded bg-muted" />

          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted/70" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted/70" />
          </div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-20 flex-1 animate-pulse rounded-lg bg-muted/50"
            />
          ))}
        </div>

        <div className="flex gap-3">
          <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
          <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
export function SalesOverview({ dictionary, locale }: SalesOverviewProps) {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => apiGet<UserProfile>("/api/profile"),
  });

  const {
    data: sales,
    isPending: isSalesPending,
    isError: isSalesError,
  } = useQuery({
    queryKey: ["dashboards", "sales", "sales-overview", locale],
    queryFn: () =>
      apiGet<SalesOverview>(
        `/api/dashboards/sales/sales-overview?locale=${locale}`,
      ),
  });

  if (isProfilePending || isSalesPending) {
    return <SalesOverviewSkeleton />;
  }

  if (isProfileError || isSalesError || !profile || !sales) {
    return null;
  }
  const numberFormatter = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  );

  const formatNumber = (value: number) => numberFormatter.format(value);

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 justify-between h-full w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="w-full space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              {dictionary.label}
            </p>

            <h2 className="text-2xl font-semibold tracking-tight">
              {dictionary.welcome.replace("{name}", profile.name)}
            </h2>

            <p className=" text-sm leading-6 text-muted-foreground">
              {renderTemplate(dictionary.description, {
                growth: formatNumber(sales.revenueGrowth),
                product1: (
                  <SoftBadge variant="ghost">{sales.topProducts[0]}</SoftBadge>
                ),
                product2: (
                  <SoftBadge variant="ghost">{sales.topProducts[1]}</SoftBadge>
                ),
                pendingInvoices: formatNumber(sales.pendingInvoices),
              })}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 items-center justify-center text-center w-full">
            <div className="flex flex-col gap-2 items-center justify-center max-w-[210px] w-full bg-secondary/30 p-px rounded-lg py-2">
              <p className="text-sm text-muted-foreground items-center justify-center">
                {dictionary.stats.targetHit}
              </p>

              <p className="text-2xl font-semibold items-center justify-center text-center block w-full">
                {formatNumber(sales.targetHit)}%
              </p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center max-w-[210px] w-full bg-secondary/30 p-px rounded-lg py-2">
              <p className="text-sm text-muted-foreground items-center justify-center">
                {dictionary.stats.dealsWon}
              </p>

              <p className="text-2xl font-semibold items-center justify-center text-center block w-full">
                {formatNumber(sales.dealsWon)}
              </p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center max-w-[210px] w-full bg-secondary/30 p-px rounded-lg py-2">
              <p className="text-sm text-muted-foreground items-center justify-center">
                {dictionary.stats.stillOpen}
              </p>

              <p className="text-2xl font-semibold items-center justify-center text-center block w-full">
                {formatNumber(sales.stillOpen)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-row flex-wrap items-center gap-3">
          <Button>{dictionary.actions.createInvoice}</Button>

          <Button variant="secondary">{dictionary.actions.viewPipeline}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
