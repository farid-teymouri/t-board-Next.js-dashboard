import { formatCurrency, type Currency } from "@/utils/currency";
import type { MetricChange, MetricValueFormat } from "./types";

export function formatMetricValue(
  value: number,
  format: MetricValueFormat = "number",
  locale: string,
  currency?: Currency,
) {
  const currencyLocale = locale === "fa" ? "fa" : "en";

  if (format === "currency" && currency) {
    return formatCurrency(value, {
      locale: currencyLocale,
      currency,
      maximumFractionDigits: 2,
    });
  }

  const numberLocale = locale === "fa" ? "fa-IR" : "en-US";

  const formatter = new Intl.NumberFormat(numberLocale, {
    minimumFractionDigits: format === "number" ? 0 : 1,
    maximumFractionDigits: format === "number" ? 0 : 2,
  });

  const formattedValue = formatter.format(value);

  if (format === "percent") {
    return `${formattedValue}%`;
  }

  return formattedValue;
}

export function formatMetricChange(change: MetricChange, locale: string) {
  const numberLocale = locale === "fa" ? "fa-IR" : "en-US";

  const formattedValue = new Intl.NumberFormat(numberLocale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(change.value));

  return `${change.value >= 0 ? "+" : "−"}${formattedValue}%`;
}

export function getMetricChangeClass(change: MetricChange) {
  return change.value >= 0
    ? "text-chart-3 dark:text-chart-3"
    : "text-destructive";
}
