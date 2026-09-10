"use client";

import { useQuery } from "@tanstack/react-query";

import type { AnalyticsOverviewMetricsResponse } from "@/types/dashboards/analytics/overview-metrics";

const overviewMetricsQueryKey = ["dashboards", "analytics", "overview-metrics"];

async function fetchOverviewMetrics(): Promise<AnalyticsOverviewMetricsResponse> {
  const response = await fetch("/api/dashboards/analytics/overview-metrics");

  if (!response.ok) {
    throw new Error("Failed to fetch overview metrics");
  }

  return response.json();
}

export function useOverviewMetrics() {
  return useQuery({
    queryKey: overviewMetricsQueryKey,
    queryFn: fetchOverviewMetrics,
  });
}
