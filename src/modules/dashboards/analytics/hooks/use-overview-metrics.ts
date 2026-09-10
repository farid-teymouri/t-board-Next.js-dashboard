"use client";

import { useQuery } from "@tanstack/react-query";

import type { AnalyticsOverviewMetricsResponse } from "@/types/dashboards/analytics/overview-metrics";

const overviewMetricsQueryKey = ["dashboards", "analytics", "overview-metrics"];

async function fetchOverviewMetrics(
  locale: "fa" | "en",
): Promise<AnalyticsOverviewMetricsResponse> {
  const response = await fetch(
    `/api/dashboards/analytics/overview-metrics?locale=${locale}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch overview metrics");
  }

  return response.json();
}

export function useOverviewMetrics(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["dashboards", "analytics", "overview-metrics", locale],
    queryFn: () => fetchOverviewMetrics(locale),
  });
}
