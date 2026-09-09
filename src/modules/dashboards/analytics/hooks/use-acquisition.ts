"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import type { ChartPeriod } from "@/components/widgets/composed-chart-widget";
import type {
  AnalyticsAcquisitionConfig,
  AnalyticsAcquisitionResponse,
} from "@/types/dashboards/analytics/acquisition";

const acquisitionQueryKey = ["dashboards", "analytics", "acquisition"];

async function fetchAcquisitionConfig(): Promise<AnalyticsAcquisitionConfig> {
  const response = await fetch("/api/dashboards/analytics/acquisition");

  if (!response.ok) {
    throw new Error("Failed to fetch acquisition configuration");
  }

  const result = await response.json();

  return {
    availablePeriods: result.availablePeriods,
    defaultPeriod: result.defaultPeriod,
  };
}

async function fetchAcquisition(
  period: ChartPeriod,
): Promise<AnalyticsAcquisitionResponse> {
  const response = await fetch(
    `/api/dashboards/analytics/acquisition?period=${period}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch acquisition data");
  }

  return response.json();
}

export function useAcquisition() {
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod | null>(
    null,
  );

  const configQuery = useQuery({
    queryKey: [...acquisitionQueryKey, "config"],
    queryFn: fetchAcquisitionConfig,
  });

  const availablePeriods = configQuery.data?.availablePeriods ?? [];

  const period =
    selectedPeriod && availablePeriods.includes(selectedPeriod)
      ? selectedPeriod
      : (configQuery.data?.defaultPeriod ?? null);

  const dataQuery = useQuery({
    queryKey: [...acquisitionQueryKey, period],
    queryFn: () => fetchAcquisition(period as ChartPeriod),
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
