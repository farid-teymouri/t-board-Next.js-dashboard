"use client";

import { useQuery } from "@tanstack/react-query";

import type { ProductServiceFeaturesData } from "../widgets/product-service-features/types";

export function useProductServiceFeatures() {
  return useQuery<ProductServiceFeaturesData>({
    queryKey: ["ecommerce", "product-details", "product-service-features"],
    queryFn: async () => {
      const response = await fetch(
        "/api/ecommerce/product-details/product-service-features",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product service features");
      }

      return response.json();
    },
  });
}
