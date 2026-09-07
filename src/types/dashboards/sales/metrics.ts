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
};

export type SalesMetricsResponse = {
  items: SalesMetric[];
};
