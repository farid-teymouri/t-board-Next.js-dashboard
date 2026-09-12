"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/utils/formatters";

import type { KpiCardChange } from "../types";

type KpiCardChangeProps = {
  change: KpiCardChange;
  locale: "fa" | "en";
};

const toneClasses = {
  positive: "border-chart-3/30 bg-chart-3/10 text-chart-3",
  negative: "border-destructive/30 bg-destructive/10 text-destructive",
  neutral: "border-muted-foreground/30 bg-muted text-muted-foreground",
};

export function KpiCardChange({ change, locale }: KpiCardChangeProps) {
  const Icon = change.direction === "up" ? ArrowUp : ArrowDown;

  return (
    <Badge
      variant="outline"
      className={`mt-1 gap-0.5 px-1.5 py-0.5 text-xs font-medium ${toneClasses[change.tone]}`}
    >
      <Icon className="size-3" aria-hidden="true" />
      {formatNumber(change.value, locale, "decimal")}%
    </Badge>
  );
}
