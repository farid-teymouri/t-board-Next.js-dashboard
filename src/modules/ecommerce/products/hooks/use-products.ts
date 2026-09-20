"use client";

import { useQuery } from "@tanstack/react-query";

import type { EcommerceProductsData } from "@/types/ecommerce/products";

async function fetchProducts() {
  const response = await fetch("/api/ecommerce/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json() as Promise<EcommerceProductsData>;
}

export function useProducts() {
  return useQuery({
    queryKey: ["ecommerce-products"],
    queryFn: fetchProducts,
  });
}
