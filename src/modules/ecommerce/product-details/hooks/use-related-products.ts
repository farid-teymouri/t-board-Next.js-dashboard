"use client";

import { useQuery } from "@tanstack/react-query";

import type { RelatedProductsData } from "../widgets/related-products/types";

const RELATED_PRODUCTS_QUERY_KEY = [
  "ecommerce",
  "product-details",
  "related-products",
];

async function fetchRelatedProducts(): Promise<RelatedProductsData> {
  const response = await fetch(
    "/api/ecommerce/product-details/related-products",
  );

  if (!response.ok) {
    throw new Error("Failed to load related products");
  }

  return response.json();
}

export function useRelatedProducts() {
  return useQuery({
    queryKey: RELATED_PRODUCTS_QUERY_KEY,
    queryFn: fetchRelatedProducts,
  });
}
