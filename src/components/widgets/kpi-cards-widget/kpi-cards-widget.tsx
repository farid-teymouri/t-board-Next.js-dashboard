"use client";

import { KpiCard } from "./components/kpi-card";
import { KpiCardsWidgetSkeleton } from "./components/kpi-cards-widget-skeleton";

import type { KpiCardsWidgetProps } from "./types";

export function KpiCardsWidget({
  items,
  locale,
  isLoading = false,
}: KpiCardsWidgetProps) {
  if (isLoading) {
    return <KpiCardsWidgetSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.slice(0, 4).map((item) => (
        <KpiCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
