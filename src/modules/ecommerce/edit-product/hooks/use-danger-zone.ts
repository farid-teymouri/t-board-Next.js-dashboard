import { useQuery } from "@tanstack/react-query";

import type { DangerZoneData } from "../widgets/danger-zone/types";

export function useDangerZone() {
  return useQuery<DangerZoneData>({
    queryKey: ["ecommerce", "edit-product", "danger-zone"],
    queryFn: async () => {
      const response = await fetch("/api/ecommerce/edit-product/danger-zone");

      if (!response.ok) {
        throw new Error("Failed to fetch danger zone data");
      }

      return response.json();
    },
  });
}
