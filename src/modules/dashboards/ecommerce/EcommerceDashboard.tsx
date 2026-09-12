"use client";

import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

import {
  EcommerceQuickActions,
  MonthlyTarget,
  KpiCards,
  RevenueOrders,
  SalesByCategory,
} from "./widgets";

type EcommerceDashboardProps = {
  translations: EcommerceDashboardDictionary;
  locale: "fa" | "en";
};

export function EcommerceDashboard({
  translations,
  locale,
}: EcommerceDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-2">
          {/* → Generic: QuickActionsWidget */}
          <EcommerceQuickActions
            translations={translations.quickActions}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-1">
          {/* → Generic: TargetWidget */}
          <MonthlyTarget
            translations={translations.monthlyTarget}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          <KpiCards translations={translations.kpiCards} locale={locale} />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-2">
          {/* → Generic: ComposedChartWidget */}
          <RevenueOrders
            translations={translations.revenueOrders}
            locale={locale}
          />
        </section>
        <section className="col-span-1 lg:col-span-4 xl:col-span-1">
          {/* → Generic: BreakdownWidget */}
          <SalesByCategory
            translations={translations.salesByCategory}
            locale={locale}
          />
        </section>
      </div>
    </div>
  );
}
