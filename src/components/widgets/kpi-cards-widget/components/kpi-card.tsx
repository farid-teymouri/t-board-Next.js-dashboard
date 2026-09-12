"use client";

import { formatCurrency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import { KpiCardChart } from "./kpi-card-chart";
import { KpiCardChange } from "./kpi-card-change";

import type { KpiCardItem } from "../types";

type KpiCardProps = {
  item: KpiCardItem;
  locale: "fa" | "en";
};

export function KpiCard({ item, locale }: KpiCardProps) {
  const Icon = item.icon;

  const formattedValue =
    item.valueType === "currency"
      ? formatCurrency(item.value, {
          locale,
          currency: item.currency ?? "IRT",
        })
      : item.valueType === "percentage"
        ? `${formatNumber(item.value, locale, "decimal")}%`
        : formatNumber(item.value, locale);

  return (
    <div className="rounded-xl ring-1 ring-foreground/10 bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            {item.label}
          </p>

          <KpiCardChange change={item.change} locale={locale} />
        </div>

        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-lg"
          style={{
            color: `var(--${item.color})`,
            backgroundColor: `color-mix(in srgb, var(--${item.color}) 12%, transparent)`,
          }}
        >
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-semibold tracking-tight">
          {formattedValue}
        </p>
      </div>

      <div className="mt-4">
        <KpiCardChart data={item.chart} color={item.color} />
      </div>
    </div>
  );
}
