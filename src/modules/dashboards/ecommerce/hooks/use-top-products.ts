"use client";

import { useQuery } from "@tanstack/react-query";

import type { TopProductsResponse } from "@/types/dashboards/ecommerce/top-products";

export function useTopProducts(locale: "fa" | "en") {
  return useQuery<TopProductsResponse>({
    queryKey: ["dashboards", "ecommerce", "top-products", locale],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboards/ecommerce/top-products?locale=${locale}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch top products");
      }

      return response.json() as Promise<TopProductsResponse>;
    },
  });
}
