import type { ChartPeriod } from "@/components/widgets/composed-chart-widget";

export type EcommerceRevenueOrdersItem = {
  key: string;
  revenue: number;
  orders: number;
};

export type EcommerceRevenueOrdersResponse = {
  period: ChartPeriod;
  data: EcommerceRevenueOrdersItem[];
};

export type EcommerceRevenueOrdersConfig = {
  availablePeriods: ChartPeriod[];
  defaultPeriod: ChartPeriod;
};
