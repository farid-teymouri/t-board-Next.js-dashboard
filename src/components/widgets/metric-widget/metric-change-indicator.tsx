"use client";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";

import type { GrowthMetric } from "@/types/metrics/growth";

type MetricChangeIndicatorProps = {
  growth: GrowthMetric;
  locale: "fa" | "en";
};

export function MetricChangeIndicator({
  growth,
  locale,
}: MetricChangeIndicatorProps) {
  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    maximumFractionDigits: 1,
  });

  const config = {
    up: {
      icon: ArrowUp,
      className: "text-[var(--metric-up)] border-[var(--metric-up)]",
    },
    down: {
      icon: ArrowDown,
      className: "text-[var(--metric-down)] border-[var(--metric-down)]",
    },
    neutral: {
      icon: Minus,
      className: "text-[var(--metric-neutral)] border-[var(--metric-neutral)]",
    },
  } as const;

  const { icon: Icon, className } = config[growth.trend];

  return (
    <span
      className={`inline-flex items-center gap-1 border-b py-1 text-sm font-medium ${className}`}
    >
      <Icon className="h-4 w-4" />
      {formatter.format(growth.value)}%
    </span>
  );
}
