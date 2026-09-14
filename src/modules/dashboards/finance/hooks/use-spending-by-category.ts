import { useQuery } from "@tanstack/react-query";

import type { SpendingByCategoryData } from "@/types/dashboards/finance/spending-by-category";

async function fetchSpendingByCategory(): Promise<SpendingByCategoryData> {
  const response = await fetch("/api/dashboards/finance/spending-by-category");

  if (!response.ok) {
    throw new Error("Failed to fetch spending by category");
  }

  return response.json();
}

export function useSpendingByCategory() {
  return useQuery({
    queryKey: ["finance", "spending-by-category"],
    queryFn: fetchSpendingByCategory,
  });
}
