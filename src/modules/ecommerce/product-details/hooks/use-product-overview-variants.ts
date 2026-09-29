"use client";

import { useQuery } from "@tanstack/react-query";

import type { ProductOverviewVariants } from "../widgets/product-overview/types";

async function fetchProductOverviewVariants() {
  const response = await fetch(
    "/api/ecommerce/product-details/product-overview/variants",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product overview variants");
  }

  return response.json() as Promise<ProductOverviewVariants>;
}

export function useProductOverviewVariants() {
  return useQuery({
    queryKey: ["ecommerce-product-details-product-overview-variants"],
    queryFn: fetchProductOverviewVariants,
  });
}
