"use client";

import { useQuery } from "@tanstack/react-query";

import {
  type KpiChangeDirection,
  type KpiChangeTone,
} from "@/components/widgets/kpi-cards-widget";

import type { EcommerceKpiCardId } from "@/types/dashboards/ecommerce/kpi-cards";
import type { Currency } from "@/utils/currency";

type KpiCardApiItem = {
  id: EcommerceKpiCardId;
  value: number;
  valueType: "number" | "currency" | "percentage";
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
    queryKey: ["dashboards", "ecommerce", "kpi-cards"],
    queryFn: async () => {
      const response = await fetch("/api/dashboards/ecommerce/kpi-cards");

      if (!response.ok) {
        throw new Error("Failed to fetch ecommerce KPI cards");
      }

      return response.json();
    },
  });
}
