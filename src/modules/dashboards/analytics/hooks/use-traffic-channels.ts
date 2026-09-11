import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";

import type { TrafficChannelsResponse } from "@/types/dashboards/analytics/traffic-channels";

export function useTrafficChannels(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["dashboards", "analytics", "traffic-channels", locale],
    queryFn: () =>
      apiGet<TrafficChannelsResponse>(
        "/api/dashboards/analytics/traffic-channels",
      ),
    staleTime: 5 * 60 * 1000,
  });
}
