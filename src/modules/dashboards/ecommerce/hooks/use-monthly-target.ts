"use client";

import { useQuery } from "@tanstack/react-query";

import type { EcommerceMonthlyTargetData } from "@/types/dashboards/ecommerce/monthly-target";

export function useMonthlyTarget() {
  return useQuery<EcommerceMonthlyTargetData>({
    queryKey: ["ecommerce", "monthly-target"],
    queryFn: async () => {
      const response = await fetch("/api/dashboards/ecommerce/monthly-target");

      if (!response.ok) {
        throw new Error("Failed to fetch monthly target");
      }

      return response.json();
    },
  });
}
