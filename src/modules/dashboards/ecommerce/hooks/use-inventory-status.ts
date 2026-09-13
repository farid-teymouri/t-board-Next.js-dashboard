import { useQuery } from "@tanstack/react-query";

import type { InventoryStatusResponse } from "@/types/dashboards/ecommerce/inventory-status";

export function useInventoryStatus() {
  return useQuery<InventoryStatusResponse>({
    queryKey: ["ecommerce", "inventory-status"],
    queryFn: async () => {
      const response = await fetch(
        "/api/dashboards/ecommerce/inventory-status",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch inventory status");
      }

      return response.json();
    },
  });
}
