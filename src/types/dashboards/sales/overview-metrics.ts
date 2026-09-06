export type OverviewMetricId =
  | "customers"
  | "products"
  | "transactions"
  | "averageOrderValue"
  | "refundRate";

export type OverviewMetric = {
  id: OverviewMetricId;
  value: number;
  change: number;
  format: "number" | "currency" | "percent";
};

export type OverviewMetricsResponse = {
  items: OverviewMetric[];
};
