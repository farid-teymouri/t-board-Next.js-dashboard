"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  CashFlowPeriod,
  CashFlowResponse,
} from "@/types/dashboards/finance/cash-flow";

async function fetchCashFlow(
  period: CashFlowPeriod,
): Promise<CashFlowResponse> {
  const response = await fetch(
    `/api/dashboards/finance/cash-flow?period=${period}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cash flow data");
  }

  return response.json();
}

export function useCashFlow(period: CashFlowPeriod) {
  return useQuery({
    queryKey: ["finance", "cash-flow", period],
    queryFn: () => fetchCashFlow(period),
  });
}
