"use client";

import { useQuery } from "@tanstack/react-query";

import type { ProductStatusData } from "../widgets/status/types";

const fetchProductStatus = async (): Promise<ProductStatusData> => {
  const response = await fetch("/api/ecommerce/edit-product/status");

  if (!response.ok) {
    throw new Error("Failed to fetch product status");
  }

  return response.json();
};

export function useProductStatus() {
  return useQuery({
    queryKey: ["ecommerce", "edit-product", "status"],
    queryFn: fetchProductStatus,
  });
}
