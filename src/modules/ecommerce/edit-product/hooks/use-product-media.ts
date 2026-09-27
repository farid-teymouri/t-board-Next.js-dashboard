"use client";

import { useQuery } from "@tanstack/react-query";

import type { ProductMedia } from "../widgets/product-media/type";

async function fetchProductMedia(): Promise<ProductMedia[]> {
  const response = await fetch("/api/ecommerce/edit-product/media");

  if (!response.ok) {
    throw new Error("Failed to fetch product media");
  }

  return response.json();
}

export function useProductMedia() {
  return useQuery({
    queryKey: ["ecommerce", "edit-product", "media"],
    queryFn: fetchProductMedia,
  });
}
