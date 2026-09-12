import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";

import type { SalesByCategoryResponse } from "@/types/dashboards/ecommerce/sales-by-category";

export function useSalesByCategory(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["dashboards", "ecommerce", "sales-by-category", locale],

    queryFn: () =>
      apiGet<SalesByCategoryResponse>(
        "/api/dashboards/ecommerce/sales-by-category",
      ),

    staleTime: 5 * 60 * 1000,
  });
}
