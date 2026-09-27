"use client";

import { useQuery } from "@tanstack/react-query";

import type { PerformanceData } from "../widgets/performance/types";

export function usePerformance() {
  return useQuery<PerformanceData>({
    queryKey: ["ecommerce", "edit-product", "performance"],
    queryFn: async () => {
      const response = await fetch("/api/ecommerce/edit-product/performance");

      if (!response.ok) {
        throw new Error("Failed to fetch performance data");
      }

      return response.json();
    },
  });
}
