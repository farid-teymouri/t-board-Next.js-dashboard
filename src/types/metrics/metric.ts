import type { Currency } from "@/utils/currency";
import type { GrowthMetric } from "./growth";

export type MetricUnit = {
  code: string;
};

export type MetricSeriesPoint = {
  label: string;
  value: number;
};

export type MetricData = {
  value: number;
  currency?: Currency;
  unit?: MetricUnit;
  growth?: GrowthMetric;
  series?: MetricSeriesPoint[];
};
