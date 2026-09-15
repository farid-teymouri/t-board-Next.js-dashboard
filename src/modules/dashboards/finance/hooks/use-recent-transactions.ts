"use client";

import { useQuery } from "@tanstack/react-query";

import type { FinanceTransaction } from "@/types/dashboards/finance/recent-transactions";

const fetchRecentTransactions = async (): Promise<FinanceTransaction[]> => {
  const response = await fetch("/api/dashboards/finance/recent-transactions");

  if (!response.ok) {
    throw new Error("Failed to fetch recent transactions");
  }

  return response.json();
};

export function useRecentTransactions() {
  return useQuery({
    queryKey: ["finance", "recent-transactions"],
    queryFn: fetchRecentTransactions,
  });
}
