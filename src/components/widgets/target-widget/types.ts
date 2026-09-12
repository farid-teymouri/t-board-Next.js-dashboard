import type { Currency } from "@/utils/currency";

export type TargetPeriod = "monthly" | "quarterly";

export type TargetPeriodData = {
  achieved: number;
  target: number;
  remaining: number;
  dailyRunRate: number;
  currency: Currency;
  daysAhead?: number;
};

export type TargetWidgetData = {
  period: string;
  periods: Record<TargetPeriod, TargetPeriodData>;
};

export type TargetWidgetDictionary = {
  title: string;
  ofTarget: string;
  monthly: string;
  quarterly: string;
  booked: string;
  remaining: string;
  dailyRunRate: string;
  progressMessage: string;
};
