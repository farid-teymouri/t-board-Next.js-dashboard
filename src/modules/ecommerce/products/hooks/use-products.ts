"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  EcommerceProductsData,
} from "@/types/ecommerce/products";

async function fetchProducts(
  locale: "fa" | "en",
): Promise<EcommerceProductsData> {
  const response = await fetch(
    `/api/ecommerce/products?locale=${locale}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export function useProducts(locale: "fa" | "en") {
  return useQuery({
    queryKey: [
      "ecommerce",
      "products",
      locale,
    ],

    queryFn: () => fetchProducts(locale),
  });
}