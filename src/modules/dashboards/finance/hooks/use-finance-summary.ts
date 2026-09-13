import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";
import type { FinanceSummary } from "@/types/dashboards/finance/finance-summary";

export function useFinanceSummary(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["dashboards", "finance", "finance-summary", locale],
    queryFn: () =>
      apiGet<FinanceSummary>(
        `/api/dashboards/finance/finance-summary?locale=${locale}`,
      ),
  });
}
