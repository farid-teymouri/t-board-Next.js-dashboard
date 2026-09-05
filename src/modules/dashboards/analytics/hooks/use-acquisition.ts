"use client";

import { useQuery } from "@tanstack/react-query";

import type { AnalyticsAcquisitionResponse } from "@/app/api/types/dashboards/analytics/acquisition";

export function useAcquisition() {
  return useQuery<AnalyticsAcquisitionResponse>({
    queryKey: ["dashboards", "analytics", "acquisition"],
    queryFn: async () => {
      const response = await fetch("/api/dashboards/analytics/acquisition");

      if (!response.ok) {
        throw new Error("Failed to fetch acquisition data");
      }

      return response.json();
    },
  });
}
