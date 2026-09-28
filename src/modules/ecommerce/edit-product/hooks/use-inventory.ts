import { useQuery } from "@tanstack/react-query";

import type { InventoryData } from "../widgets/inventory/types";

async function fetchInventory(): Promise<InventoryData> {
  const response = await fetch("/api/ecommerce/edit-product/inventory");

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return response.json();
}

export function useInventory() {
  return useQuery({
    queryKey: ["ecommerce", "edit-product", "inventory"],
    queryFn: fetchInventory,
  });
}
