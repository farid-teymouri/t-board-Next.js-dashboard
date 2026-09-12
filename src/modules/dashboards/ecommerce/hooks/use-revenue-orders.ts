"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import type { ChartPeriod } from "@/components/widgets/composed-chart-widget";

import type {
  EcommerceRevenueOrdersConfig,
  EcommerceRevenueOrdersResponse,
} from "@/types/dashboards/ecommerce/revenue-orders";

const revenueOrdersQueryKey = ["dashboards", "ecommerce", "revenue-orders"];

async function fetchRevenueOrdersConfig(): Promise<EcommerceRevenueOrdersConfig> {
  const response = await fetch("/api/dashboards/ecommerce/revenue-orders");

  if (!response.ok) {
    throw new Error("Failed to fetch revenue and orders configuration");
  }

  return response.json();
}

async function fetchRevenueOrders(
  period: ChartPeriod,
): Promise<EcommerceRevenueOrdersResponse> {
  const response = await fetch(
    `/api/dashboards/ecommerce/revenue-orders?period=${period}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch revenue and orders data");
  }

  return response.json();
}

export function useRevenueOrders() {
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod | null>(
    null,
  );

  const configQuery = useQuery({
    queryKey: [...revenueOrdersQueryKey, "config"],
    queryFn: fetchRevenueOrdersConfig,
  });

  const availablePeriods = configQuery.data?.availablePeriods ?? [];

  const period =
    selectedPeriod && availablePeriods.includes(selectedPeriod)
      ? selectedPeriod
      : (configQuery.data?.defaultPeriod ?? null);

  const dataQuery = useQuery({
    queryKey: [...revenueOrdersQueryKey, period],
    queryFn: () => fetchRevenueOrders(period as ChartPeriod),
    enabled: period !== null,
  });

  const setPeriod = (value: ChartPeriod) => {
    if (availablePeriods.includes(value)) {
      setSelectedPeriod(value);
    }
  };

  return {
    data: dataQuery.data,
    availablePeriods,
    period,
    setPeriod,
    isLoading: configQuery.isLoading || dataQuery.isLoading,
    isError: configQuery.isError || dataQuery.isError,
  };
}
