"use client";

import { useQuery } from "@tanstack/react-query";

import type { QuickActionsResponse } from "@/types/dashboards/ecommerce/quick-actions";

export function useQuickActions(locale: "fa" | "en") {
  return useQuery<QuickActionsResponse>({
    queryKey: ["ecommerce", "quick-actions", locale],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboards/ecommerce/quick-actions?locale=${locale}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quick actions");
      }

      return response.json();
    },
  });
}
