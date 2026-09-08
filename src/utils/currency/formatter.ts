import { currencies } from "./currencies";
import type { CurrencyLocale, FormatCurrencyOptions } from "./types";

const localeMap: Record<CurrencyLocale, string> = {
  fa: "fa-IR",
  en: "en-US",
};

export function formatCurrency(
  value: number,
  {
    locale,
    currency,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    position,
  }: FormatCurrencyOptions,
): string {
  const definition = currencies[currency];
  const display = definition[locale];

  const formattedValue = new Intl.NumberFormat(localeMap[locale], {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);

  const resolvedPosition = position ?? (locale === "en" ? "prefix" : "suffix");

  if (resolvedPosition === "prefix") {
    const separator =
      locale === "en" && (currency === "IRR" || currency === "IRT") ? " " : "";

    return `${display.symbol}${separator}${formattedValue}`;
  }

  return `${formattedValue} ${display.symbol}`;
}
