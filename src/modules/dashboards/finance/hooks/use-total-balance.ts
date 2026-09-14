"use client";

import { useQuery } from "@tanstack/react-query";

import type { FinanceTotalBalanceResponse } from "@/types/dashboards/finance/total-balance";

async function fetchTotalBalance(): Promise<FinanceTotalBalanceResponse> {
  const response = await fetch("/api/dashboards/finance/total-balance");

  if (!response.ok) {
    throw new Error("Failed to fetch total balance");
  }

  return response.json();
}

export function useTotalBalance() {
  return useQuery({
    queryKey: ["finance", "total-balance"],
    queryFn: fetchTotalBalance,
  });
}
