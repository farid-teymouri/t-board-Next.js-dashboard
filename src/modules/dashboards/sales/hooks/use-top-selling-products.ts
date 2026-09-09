"use client";

import { useQuery } from "@tanstack/react-query";

import type { TopSellingProductsResponse } from "@/types/dashboards/sales/top-selling-products";

export function useTopSellingProducts(locale: "fa" | "en") {
  return useQuery<TopSellingProductsResponse>({
    queryKey: ["dashboards", "sales", "top-selling-products", locale],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboards/sales/top-selling-products?locale=${locale}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch top selling products");
      }

      return response.json() as Promise<TopSellingProductsResponse>;
    },
  });
}
