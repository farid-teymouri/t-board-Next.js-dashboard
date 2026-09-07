export type Currency = "IRT" | "USD" | "EUR" | "GBP";

interface FormatCurrencyOptions {
  locale: "fa" | "en";
  currency: Currency;
}

const currencyLabels: Record<Currency, { fa: string; en: string }> = {
  IRT: {
    fa: "تومان",
    en: "Toman",
  },
  USD: {
    fa: "دلار",
    en: "USD",
  },
  EUR: {
    fa: "یورو",
    en: "EUR",
  },
  GBP: {
    fa: "پوند",
    en: "GBP",
  },
};

export function formatCurrency(
  value: number,
  { locale, currency }: FormatCurrencyOptions,
) {
  const formattedValue = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  ).format(value);

  return `${formattedValue} ${currencyLabels[currency][locale]}`;
}
