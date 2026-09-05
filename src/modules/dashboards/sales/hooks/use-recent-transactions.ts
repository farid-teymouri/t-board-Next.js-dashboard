import { useQuery } from "@tanstack/react-query";

import type { RecentTransactionsResponse } from "@/app/api/types/dashboards/sales/recent-transactions";
import { apiGet } from "@/lib/api/client";

type UseRecentTransactionsParams = {
  locale: "en" | "fa" | "ar";
};

export function useRecentTransactions({ locale }: UseRecentTransactionsParams) {
  return useQuery<RecentTransactionsResponse>({
    queryKey: ["recent-transactions", locale],

    queryFn: () =>
      apiGet<RecentTransactionsResponse>(
        `/api/dashboards/sales/recent-transactions?locale=${locale}`,
      ),

    staleTime: 1000 * 60 * 5,
  });
}
