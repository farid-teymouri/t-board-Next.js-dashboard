"use client";

import { useQuery } from "@tanstack/react-query";

import type { EcommerceEditProductData } from "@/types/ecommerce/edit-product";

async function fetchEditProduct(): Promise<EcommerceEditProductData> {
  const response = await fetch("/api/ecommerce/edit-product");

  if (!response.ok) {
    throw new Error("Failed to fetch edit product");
  }

  return response.json();
}

export function useEditProduct() {
  return useQuery({
    queryKey: ["ecommerce", "edit-product"],
    queryFn: fetchEditProduct,
  });
}
