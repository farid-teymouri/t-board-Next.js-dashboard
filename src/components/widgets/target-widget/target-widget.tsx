"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";
import { TargetWidgetSkeleton } from "./components/target-widget-skeleton";
import { TargetChart } from "./components/target-chart";
import { TargetSummary } from "./components/target-summary";
import { TargetPeriodToggle } from "./components/target-period-toggle";
import type {
  TargetPeriod,
  TargetWidgetData,
  TargetWidgetDictionary,
} from "./types";

type TargetWidgetProps = {
  data?: TargetWidgetData;
  translations: TargetWidgetDictionary;
  locale: "fa" | "en";
  isLoading?: boolean;
  isError?: boolean;
};

export function TargetWidget({
  data,
  translations,
  locale,
  isLoading = false,
  isError = false,
}: TargetWidgetProps) {
  const [period, setPeriod] = useState<TargetPeriod>("monthly");

  const periodData = data?.periods[period];

  const percentage =
    periodData && periodData.target > 0
      ? Math.min(
          Math.max((periodData.achieved / periodData.target) * 100, 0),
          100,
        )
      : 0;

  const periodLabel = (() => {
    if (!data?.period) {
      return "";
    }

    const [year, month] = data.period.split("-").map(Number);

    if (!year || !month) {
      return data.period;
    }

    return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
      month: "long",
    }).format(new Date(year, month - 1, 1));
  })();

  if (isLoading) {
    return <TargetWidgetSkeleton />;
  }

  if (isError || !data || !periodData) {
    return (
      <Card>
        <CardContent className="flex min-h-96 items-center justify-center">
          <span className="text-destructive text-sm">
            Failed to load target data.
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">{periodLabel}</p>

            <h3 className="text-base font-semibold">{translations.title}</h3>
          </div>

          <TargetPeriodToggle
            value={period}
            monthly={translations.monthly}
            quarterly={translations.quarterly}
            onChange={setPeriod}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <TargetChart
          percentage={percentage}
          locale={locale}
          ofTarget={translations.ofTarget}
        />

        <TargetSummary
          data={periodData}
          locale={locale}
          template={translations.progressMessage}
        />

        <div className="border-t pt-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">
                {translations.booked}
              </p>
              <p className="font-semibold">
                {formatCurrency(periodData.achieved, {
                  locale,
                  currency: periodData.currency,
                })}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">
                {translations.remaining}
              </p>
              <p className="font-semibold">
                {formatCurrency(periodData.remaining, {
                  locale,
                  currency: periodData.currency,
                })}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">
                {translations.dailyRunRate}
              </p>
              <p className="font-semibold">
                {formatCurrency(periodData.dailyRunRate, {
                  locale,
                  currency: periodData.currency,
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
