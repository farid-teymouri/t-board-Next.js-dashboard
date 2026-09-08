import type { LucideIcon } from "lucide-react";
import type { Currency } from "@/utils/currency";

export type MetricValueFormat = "number" | "currency" | "percent";

export type MetricChange = {
  value: number;
};

export type MetricItem = {
  id: string;
  label: string;
  value: number;
  format?: MetricValueFormat;
  icon?: LucideIcon;
  change?: MetricChange;
  currency?: Currency;
};

export type MetricGroupProps = {
  items: MetricItem[];
  locale: string;
  isLoading?: boolean;
};
