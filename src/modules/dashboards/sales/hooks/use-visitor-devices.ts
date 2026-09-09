import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";

import type { VisitorDevicesResponse } from "@/types/dashboards/sales/visitor-devices";

export function useVisitorDevices(locale: "fa" | "en") {
  return useQuery<VisitorDevicesResponse>({
    queryKey: ["dashboards", "sales", "visitor-devices", locale],
    queryFn: () =>
      apiGet<VisitorDevicesResponse>("/api/dashboards/sales/visitor-devices"),
    staleTime: 5 * 60 * 1000,
  });
}
