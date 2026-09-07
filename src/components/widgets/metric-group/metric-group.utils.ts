import type { MetricChange, MetricValueFormat, MetricCurrency } from "./types";

export function formatMetricValue(
  value: number,
  format: MetricValueFormat = "number",
  locale: string,
  currency?: MetricCurrency,
) {
  const numberLocale = locale === "fa" ? "fa-IR" : "en-US";

  if (format === "currency") {
    if (currency === "IRT") {
      const formattedValue = new Intl.NumberFormat(numberLocale, {
        maximumFractionDigits: 0,
      }).format(value);

      return locale === "fa"
        ? `${formattedValue} تومان`
        : `${formattedValue} toman`;
    }

    if (currency) {
      return new Intl.NumberFormat(numberLocale, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(value);
    }
  }

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
    : "text-rose-600 dark:text-rose-400";
}
