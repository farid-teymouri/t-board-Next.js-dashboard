"use client";

import { useQuery } from "@tanstack/react-query";

import type { SalesMetricsResponse } from "@/types/dashboards/sales/sales-metrics";

async function getSalesMetrics(): Promise<SalesMetricsResponse> {
  const response = await fetch("/api/dashboards/sales/sales-metrics");

  if (!response.ok) {
    throw new Error("Failed to fetch sales metrics");
  }

  return response.json();
}

export function useSalesMetrics(locale: string) {
  return useQuery({
    queryKey: ["dashboards", "sales", "metrics", locale],
    queryFn: getSalesMetrics,
  });
}
