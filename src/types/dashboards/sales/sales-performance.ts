import type { Currency } from "@/utils/currency";

export type SalesPerformancePeriod = "year" | "month" | "week";

export interface SalesPerformanceDataPoint {
  label: string | number;
  thisPeriod: number;
  previousPeriod: number;
}

export interface SalesPerformanceResponse {
  period: SalesPerformancePeriod;
  currency: Currency;
  data: SalesPerformanceDataPoint[];
}
