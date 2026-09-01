"use client";

import { useQuery } from "@tanstack/react-query";
import { SoftBadge } from "@/components/ui/soft-badge";
import { apiGet } from "@/lib/api/client";

import type { UserProfile } from "@/app/api/types/profile";
import type { UserSalesOverview } from "@/app/api/types/dashboards/sales";
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
      apiGet<UserSalesOverview>(
        `/api/dashboards/sales/sales-overview?locale=${locale}`,
      ),
  });

  if (
    isProfilePending ||
    isProfileError ||
    !profile ||
    isSalesPending ||
    isSalesError ||
    !sales
  ) {
    return null;
  }

  const numberFormatter = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  );

  const formatNumber = (value: number) => numberFormatter.format(value);

  return (
    <Card>
      <CardContent className="lg:space-y-6 space-y-8">
        <div className="flex lg:flex-row flex-col items-end justify-between gap-8">
          <div className="lg:max-w-2xl w-full space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              {dictionary.label}
            </p>

            <h2 className="text-2xl font-semibold tracking-tight">
              {dictionary.welcome.replace("{name}", profile.name)}
            </h2>

            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
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

          <div className="flex shrink-0 flex-row gap-2 items-center justify-center text-center max-w-xs w-full">
            <div className="space-y-1 w-full bg-secondary/30 p-px rounded-lg">
              <p className="text-sm text-muted-foreground">
                {dictionary.stats.targetHit}
              </p>

              <p className="text-2xl font-semibold">{sales.targetHit}%</p>
            </div>

            <div className="space-y-1 w-full bg-secondary/30 p-px rounded-lg">
              <p className="text-sm text-muted-foreground">
                {dictionary.stats.dealsWon}
              </p>

              <p className="text-2xl font-semibold">
                {formatNumber(sales.dealsWon)}
              </p>
            </div>

            <div className="space-y-1 w-full bg-secondary/30 p-px rounded-lg">
              <p className="text-sm text-muted-foreground">
                {dictionary.stats.stillOpen}
              </p>

              <p className="text-2xl font-semibold">
                {formatNumber(sales.stillOpen)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3">
          <Button>{dictionary.actions.createInvoice}</Button>

          <Button variant="secondary">{dictionary.actions.viewPipeline}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
