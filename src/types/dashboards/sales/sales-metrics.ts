import type { Currency } from "@/utils/currency";

export type SalesMetricId =
  | "customers"
  | "products"
  | "transactions"
  | "averageOrderValue"
  | "refundRate";

export type SalesMetric = {
  id: SalesMetricId;
  value: number;
  change: number;
  format: "number" | "currency" | "percent";
  currency?: Currency;
};
export type SalesMetricsResponse = {
  items: SalesMetric[];
};
