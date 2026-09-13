"use client";

import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

import {
  EcommerceQuickActions,
  MonthlyTarget,
  KpiCards,
  RevenueOrders,
  SalesByCategory,
  SalesByChannel,
  InventoryStatus,
  TopProducts,
  RecentOrders,
} from "./widgets";

type EcommerceDashboardProps = {
  dictionary: EcommerceDashboardDictionary;
  locale: "fa" | "en";
};

export function EcommerceDashboard({
  dictionary,
  locale,
}: EcommerceDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-2">
          {/* → Generic: QuickActionsWidget */}
          <EcommerceQuickActions
            translations={dictionary.quickActions}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-1">
          {/* → Generic: TargetWidget */}
          <MonthlyTarget
            translations={dictionary.monthlyTarget}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          <KpiCards translations={dictionary.kpiCards} locale={locale} />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-2">
          {/* → Generic: ComposedChartWidget */}
          <RevenueOrders
            translations={dictionary.revenueOrders}
            locale={locale}
          />
        </section>
        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Generic: BreakdownWidget */}
          <SalesByCategory
            translations={dictionary.salesByCategory}
            locale={locale}
          />
        </section>
        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Generic: ProgressListWidget */}
          <SalesByChannel
            translations={dictionary.salesByChannel}
            locale={locale}
          />
        </section>
        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Generic: SegmentedProgressWidget */}
          <InventoryStatus
            translations={dictionary.inventoryStatus}
            locale={locale}
          />
        </section>
        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Generic: ProgressListWidget */}
          <TopProducts translations={dictionary.topProducts} locale={locale} />
        </section>
        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          {/* → Generic: TableWidget */}
          <RecentOrders
            translations={dictionary.recentOrders}
            locale={locale}
          />
        </section>
      </div>
    </div>
  );
}
