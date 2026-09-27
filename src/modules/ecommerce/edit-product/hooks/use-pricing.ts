"use client";

import { useQuery } from "@tanstack/react-query";

import type { PricingData } from "../widgets/pricing/types";

async function fetchPricing(): Promise<PricingData> {
  const response = await fetch("/api/ecommerce/edit-product/pricing");

  if (!response.ok) {
    throw new Error("Failed to fetch product pricing");
  }

  return response.json();
}

export function usePricing() {
  return useQuery({
    queryKey: ["ecommerce", "edit-product", "pricing"],
    queryFn: fetchPricing,
  });
}
