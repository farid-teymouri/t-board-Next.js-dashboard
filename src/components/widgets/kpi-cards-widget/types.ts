import type { LucideIcon } from "lucide-react";

import type { Currency } from "@/utils/currency";

export type KpiCardColor =
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5";

export type KpiValueType = "number" | "currency" | "percentage";

export type KpiChangeDirection = "up" | "down";

export type KpiChangeTone = "positive" | "negative" | "neutral";

export type KpiCardDataPoint = {
  value: number;
};

export type KpiCardChange = {
  value: number;
  direction: KpiChangeDirection;
  tone: KpiChangeTone;
};

export type KpiCardItem = {
  id: string;
  label: string;
  value: number;
  valueType: KpiValueType;

  currency?: Currency;

  change: KpiCardChange;

  icon: LucideIcon;
  color: KpiCardColor;

  chart: KpiCardDataPoint[];
};

export type KpiCardsWidgetProps = {
  items: KpiCardItem[];
  locale: "fa" | "en";
  isLoading?: boolean;
};
