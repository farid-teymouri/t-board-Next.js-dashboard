import { useQuery } from "@tanstack/react-query";

import type {
  SalesPerformancePeriod,
  SalesPerformanceResponse,
} from "@/types/dashboards/sales/sales-performance";

async function fetchSalesPerformance(
  period: SalesPerformancePeriod,
): Promise<SalesPerformanceResponse> {
  const response = await fetch(
    `/api/dashboards/sales/sales-performance?period=${period}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch sales performance.");
  }

  return response.json();
}

export function useSalesPerformance(
  locale: "fa" | "en",
  period: SalesPerformancePeriod,
) {
  return useQuery({
    queryKey: ["dashboards", "sales", "performance", locale, period],
    queryFn: () => fetchSalesPerformance(period),
    staleTime: 5 * 60 * 1000,
  });
}
