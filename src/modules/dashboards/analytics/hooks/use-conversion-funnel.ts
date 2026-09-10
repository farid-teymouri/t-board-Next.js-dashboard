import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";

import type { ConversionFunnelResponse } from "@/types/dashboards/analytics/conversion-funnel";

export function useConversionFunnel(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["dashboards", "analytics", "conversion-funnel", locale],
    queryFn: () =>
      apiGet<ConversionFunnelResponse>(
        `/api/dashboards/analytics/conversion-funnel?locale=${locale}`,
      ),
  });
}
