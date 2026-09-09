"use client";

import { useQuery } from "@tanstack/react-query";

import type { TrafficSourcesResponse } from "@/types/dashboards/sales/traffic-source";

export function useTrafficSources(locale: "fa" | "en") {
  return useQuery<TrafficSourcesResponse>({
    queryKey: ["dashboards", "sales", "traffic-source", locale],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboards/sales/traffic-source?locale=${locale}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch traffic sources");
      }

      return response.json() as Promise<TrafficSourcesResponse>;
    },
  });
}
