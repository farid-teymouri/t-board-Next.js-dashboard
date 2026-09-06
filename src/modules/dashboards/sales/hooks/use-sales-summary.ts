import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";
import type { SalesOverview } from "@/types/dashboards/sales/overview";
import type { GrowthPeriod } from "@/types/metrics/growth";

export function useSalesSummary(
  locale: "fa" | "en",
  period: GrowthPeriod = "month",
) {
  return useQuery({
    queryKey: ["dashboards", "sales", "sales-overview", locale, period],
    queryFn: () =>
      apiGet<SalesOverview>(
        `/api/dashboards/sales/sales-overview?locale=${locale}&period=${period}`,
      ),
  });
}
