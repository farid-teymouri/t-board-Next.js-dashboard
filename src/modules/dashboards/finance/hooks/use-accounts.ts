import { useQuery } from "@tanstack/react-query";

import type { FinanceAccount } from "@/types/dashboards/finance/accounts";

export function useAccounts(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["dashboards", "finance", "accounts", locale],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboards/finance/accounts?locale=${locale}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }

      return response.json() as Promise<FinanceAccount[]>;
    },
  });
}
