"use client";

import { useQuery } from "@tanstack/react-query";

import type { ProductMedia } from "@/types/ecommerce/product-details";

async function fetchProductMedia() {
  const response = await fetch("/api/ecommerce/product-details/media");

  if (!response.ok) {
    throw new Error("Failed to fetch product media");
  }

  return response.json() as Promise<ProductMedia[]>;
}

export function useProductMedia() {
  return useQuery({
    queryKey: ["ecommerce-product-details-media"],
    queryFn: fetchProductMedia,
  });
}
