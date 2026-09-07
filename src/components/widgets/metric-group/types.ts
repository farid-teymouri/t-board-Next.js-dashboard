import type { LucideIcon } from "lucide-react";

export type MetricValueFormat = "number" | "currency" | "percent";

export type MetricChange = {
  value: number;
};

export type MetricCurrency = "USD" | "EUR" | "GBP" | "IRR" | "IRT";

export type MetricItem = {
  id: string;
  label: string;
  value: number;
  format?: MetricValueFormat;
  icon?: LucideIcon;
  change?: MetricChange;
  currency?: MetricCurrency;
};

export type MetricGroupProps = {
  items: MetricItem[];
  locale: string;
  isLoading?: boolean;
};
