"use client";

import { useQuery } from "@tanstack/react-query";

import type { TopPage } from "@/types/dashboards/analytics/top-pages";

type TopPagesResponse = {
  data: TopPage[];
};

export function useTopPages() {
  return useQuery<TopPagesResponse>({
    queryKey: ["analytics", "top-pages"],
    queryFn: async () => {
      const response = await fetch("/api/dashboards/analytics/top-pages");

      if (!response.ok) {
        throw new Error("Failed to fetch top pages");
      }

      return response.json();
    },
  });
}
