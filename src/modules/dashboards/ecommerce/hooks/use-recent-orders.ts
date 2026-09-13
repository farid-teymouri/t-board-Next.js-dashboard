import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";
import type { RecentOrdersResponse } from "@/types/dashboards/ecommerce/recent-orders";

type UseRecentOrdersParams = {
  locale: "en" | "fa";
};

export function useRecentOrders({ locale }: UseRecentOrdersParams) {
  return useQuery<RecentOrdersResponse>({
    queryKey: ["recent-orders", locale],

    queryFn: () =>
      apiGet<RecentOrdersResponse>(
        `/api/dashboards/ecommerce/recent-orders?locale=${locale}`,
      ),

    staleTime: 1000 * 60 * 5,
  });
}
