import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";
import type { SalesSummary } from "@/types/dashboards/sales/sales-summary";
import type { GrowthPeriod } from "@/types/metrics/growth";

export function useSalesSummary(
  locale: "fa" | "en",
  period: GrowthPeriod = "month",
) {
  return useQuery({
    queryKey: ["dashboards", "sales", "sales-summary", locale, period],
    queryFn: () =>
      apiGet<SalesSummary>(
        `/api/dashboards/sales/sales-summary?locale=${locale}&period=${period}`,
      ),
  });
}
