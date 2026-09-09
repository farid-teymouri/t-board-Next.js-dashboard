import type { ChartPeriod } from "@/components/widgets/composed-chart-widget";

export interface AnalyticsAcquisitionItem {
  key: string;
  sessions: number;
  newVisitors: number;
  returning: number;
}

export interface AnalyticsAcquisitionConfig {
  availablePeriods: ChartPeriod[];
  defaultPeriod: ChartPeriod;
}

export interface AnalyticsAcquisitionResponse {
  period: ChartPeriod;
  data: AnalyticsAcquisitionItem[];
}
