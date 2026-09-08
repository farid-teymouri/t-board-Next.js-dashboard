export type Currency = "IRR" | "IRT" | "TRY" | "USD" | "USDT" | "EUR" | "GBP";

export type CurrencyLocale = "fa" | "en";

export type CurrencyPosition = "prefix" | "suffix";

export type CurrencyDisplay = {
  symbol: string;
  name: string;
};

export type CurrencyDefinition = {
  code: Currency;
  fa: CurrencyDisplay;
  en: CurrencyDisplay;
};

export type FormatCurrencyOptions = {
  locale: CurrencyLocale;
  currency: Currency;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  position?: CurrencyPosition;
};
