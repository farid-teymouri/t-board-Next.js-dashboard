import { ArrowDown, ArrowUp } from "lucide-react";

import type { GrowthMetric } from "@/types/metrics/growth";

type GrowthIndicatorProps = {
  growth: GrowthMetric;
  locale: "fa" | "en";
};

export function GrowthIndicator({ growth, locale }: GrowthIndicatorProps) {
  const numberFormatter = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
    {
      maximumFractionDigits: 1,
    },
  );

  const isPositive = growth.trend === "up";
  const Icon = isPositive ? ArrowUp : ArrowDown;

  return (
    <span
      className={
        isPositive
          ? "inline-flex items-center gap-1 font-medium text-chart-3 border-b border-chart-3 px-2"
          : "inline-flex items-center gap-1 font-medium text-red-600 border-b border-red-600 px-4"
      }
    >
      <Icon className="h-4 w-4" />
      {numberFormatter.format(growth.value)}%
    </span>
  );
}
