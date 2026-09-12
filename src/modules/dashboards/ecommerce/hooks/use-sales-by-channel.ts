import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";

import type { SalesByChannelResponse } from "@/types/dashboards/ecommerce/sales-by-channel";

export function useSalesByChannel(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["dashboards", "ecommerce", "sales-by-channel", locale],

    queryFn: () =>
      apiGet<SalesByChannelResponse>(
        `/api/dashboards/ecommerce/sales-by-channel?locale=${locale}`,
      ),
  });
}
