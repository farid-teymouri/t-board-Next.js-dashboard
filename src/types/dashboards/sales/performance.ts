export type SalesPerformancePeriod = "month";

export interface SalesPerformanceDataPoint {
  month: number;
  thisPeriod: number;
  previousPeriod: number;
}

export interface SalesPerformanceResponse {
  period: SalesPerformancePeriod;
  data: SalesPerformanceDataPoint[];
}
