"use client";

import { useQuery } from "@tanstack/react-query";

import type { AnalyticsReferrersEventsResponse } from "@/types/dashboards/analytics/referrers-events";

async function fetchReferrersEvents(
  locale: "fa" | "en",
): Promise<AnalyticsReferrersEventsResponse> {
  const response = await fetch(
    `/api/dashboards/analytics/referrers-events?locale=${locale}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch referrers and events");
  }

  return response.json();
}

export function useReferrersEvents(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["dashboards", "analytics", "referrers-events", locale],
    queryFn: () => fetchReferrersEvents(locale),
  });
}
