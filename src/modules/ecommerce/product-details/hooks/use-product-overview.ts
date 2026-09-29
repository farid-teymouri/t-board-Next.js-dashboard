"use client";

import { useQuery } from "@tanstack/react-query";

import type { ProductOverview } from "../widgets/product-overview/types";

async function fetchProductOverview() {
  const response = await fetch(
    "/api/ecommerce/product-details/product-overview",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product overview");
  }

  return response.json() as Promise<ProductOverview>;
}

export function useProductOverview() {
  return useQuery({
    queryKey: ["ecommerce-product-details-product-overview"],
    queryFn: fetchProductOverview,
  });
}
