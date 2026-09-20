"use client";

import { useQuery } from "@tanstack/react-query";

import type { EcommerceProductDetailsData } from "@/types/ecommerce/product-details";

async function fetchProductDetails() {
  const response = await fetch("/api/ecommerce/product-details");

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  return response.json() as Promise<EcommerceProductDetailsData>;
}

export function useProductDetails() {
  return useQuery({
    queryKey: ["ecommerce-product-details"],
    queryFn: fetchProductDetails,
  });
}
