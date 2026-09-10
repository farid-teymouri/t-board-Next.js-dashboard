export interface AnalyticsOverviewMetric {
  id: string;
  value: number | string;
  change: number;
}

export interface AnalyticsOverviewMetricsResponse {
  label: string;
  metrics: AnalyticsOverviewMetric[];
}
