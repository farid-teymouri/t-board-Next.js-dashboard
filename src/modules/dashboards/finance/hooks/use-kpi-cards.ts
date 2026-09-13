"use client";

import { useQuery } from "@tanstack/react-query";
import type {
  KpiChangeDirection,
  KpiChangeTone,
  KpiValueType,
} from "@/components/widgets/kpi-cards-widget";
import type { Currency } from "@/utils/currency";

type FinanceKpiCardId =
  | "total-balance"
  | "monthly-income"
  | "monthly-expenses"
  | "net-savings-rate";

type KpiCardApiItem = {
  id: FinanceKpiCardId;
  value: number;
  valueType: KpiValueType;
  currency?: Currency;
  change: {
    value: number;
    direction: KpiChangeDirection;
    tone: KpiChangeTone;
  };
  chart: {
    value: number;
  }[];
};

type KpiCardsApiResponse = {
  items: KpiCardApiItem[];
};

export function useKpiCards() {
  return useQuery<KpiCardsApiResponse>({
    queryKey: ["dashboards", "finance", "kpi-cards"],
    queryFn: async () => {
      const response = await fetch("/api/dashboards/finance/kpi-cards");

      if (!response.ok) {
        throw new Error("Failed to fetch finance KPI cards");
      }

      return response.json();
    },
  });
}
