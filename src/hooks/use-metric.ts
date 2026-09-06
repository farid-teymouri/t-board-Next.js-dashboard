"use client";

import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";

import type { MetricData } from "@/types/metrics/metric";

type UseMetricOptions = {
  apiUrl: string;
  queryKey: readonly unknown[];
};

export function useMetric({ apiUrl, queryKey }: UseMetricOptions) {
  return useQuery({
    queryKey,
    queryFn: () => apiGet<MetricData>(apiUrl),
  });
}
