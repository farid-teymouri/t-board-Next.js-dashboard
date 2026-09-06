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
          ? "inline-flex items-center gap-1 font-medium text-emerald-600"
          : "inline-flex items-center gap-1 font-medium text-red-600"
      }
    >
      <Icon className="h-4 w-4" />
      {numberFormatter.format(growth.value)}%
    </span>
  );
}
