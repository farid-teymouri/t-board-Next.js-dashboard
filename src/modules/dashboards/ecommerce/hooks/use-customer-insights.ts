import { useQuery } from "@tanstack/react-query";

import type { CustomerInsightsResponse } from "@/types/dashboards/ecommerce/customer-insights";

export function useCustomerInsights(locale: "fa" | "en") {
  return useQuery<CustomerInsightsResponse>({
    queryKey: ["ecommerce", "customer-insights", locale],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboards/ecommerce/customer-insights?locale=${locale}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch customer insights");
      }

      return response.json();
    },
  });
}
