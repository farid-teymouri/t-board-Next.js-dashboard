"use client";

import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";
import type { TotalBalanceResponse } from "@/types/dashboards/sales/total-balance";
import type { Currency } from "@/utils/currency";

export function useTotalBalance(currency: Currency) {
  return useQuery({
    queryKey: ["dashboards", "sales", "total-balance", currency],
    queryFn: () =>
      apiGet<TotalBalanceResponse>(
        `/api/dashboards/sales/total-balance?currency=${currency}`,
      ),
    staleTime: 5 * 60 * 1000,
  });
}
