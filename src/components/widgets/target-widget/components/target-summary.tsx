"use client";

import { formatCurrency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import type { TargetPeriodData } from "../types";

type TargetSummaryProps = {
  data: TargetPeriodData;
  locale: "fa" | "en";
  template: string;
};

function formatTargetCurrency(
  value: number,
  locale: "fa" | "en",
  currency: TargetPeriodData["currency"],
) {
  return formatCurrency(value, {
    locale,
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function TargetSummary({ data, locale, template }: TargetSummaryProps) {
  const achieved = formatTargetCurrency(data.achieved, locale, data.currency);

  const target = formatTargetCurrency(data.target, locale, data.currency);

  const daysAhead = formatNumber(data.daysAhead ?? 0, locale);

  const summary = template
    .replace("{achieved}", achieved)
    .replace("{target}", target)
    .replace("{daysAhead}", daysAhead);

  return <p className="text-muted-foreground text-sm">{summary}</p>;
}
