"use client";

import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";

import type { RightNowResponse } from "@/types/dashboards/analytics/right-now";

const queryKey = ["dashboards", "analytics", "right-now"];

async function fetchRightNow(): Promise<RightNowResponse> {
  return apiGet<RightNowResponse>("/api/dashboards/analytics/right-now");
}

export function useRightNow() {
  return useQuery({
    queryKey,
    queryFn: fetchRightNow,
    refetchInterval: 2000,
    refetchIntervalInBackground: false,
    staleTime: 0,
  });
}
