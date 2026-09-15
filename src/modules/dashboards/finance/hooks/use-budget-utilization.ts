"use client";

import { useQuery } from "@tanstack/react-query";

import type { BudgetUtilizationResponse } from "@/types/dashboards/finance/budget-utilization";

export function useBudgetUtilization(locale: "fa" | "en") {
  return useQuery<BudgetUtilizationResponse>({
    queryKey: ["dashboards", "finance", "budget-utilization", locale],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboards/finance/budget-utilization?locale=${locale}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch budget utilization");
      }

      return response.json() as Promise<BudgetUtilizationResponse>;
    },
  });
}
