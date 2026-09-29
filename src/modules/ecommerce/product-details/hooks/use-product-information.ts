"use client";

import { useQuery } from "@tanstack/react-query";

import type { ProductInformation } from "../widgets/product-information/types";

async function fetchProductInformation() {
  const response = await fetch(
    "/api/ecommerce/product-details/product-information",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product information");
  }

  return response.json() as Promise<ProductInformation>;
}

export function useProductInformation() {
  return useQuery({
    queryKey: ["ecommerce-product-details-product-information"],
    queryFn: fetchProductInformation,
  });
}
