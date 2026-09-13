import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import {
  RecentTransactions,
  Revenue,
  SalesMetrics,
  SalesPerformance,
  SalesSummary,
  TotalBalance,
  VisitorDevices,
  TopSellingProducts,
  TrafficSources,
} from "./widgets";

type SalesDashboardProps = {
  dictionary: SalesDashboardDictionary;
  locale: "fa" | "en";
};

export function SalesDashboard({ dictionary, locale }: SalesDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-4 grid-cols-1 w-full">
        <section className="xl:col-span-2 lg:col-span-4 col-span-1">
          {/* → Generic: SummaryWidget */}
          <SalesSummary dictionary={dictionary} locale={locale} period="year" />
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: MetricWidget */}
          <Revenue
            locale={locale}
            labels={dictionary.revenue}
            period="year"
            trend="up"
          />
        </section>

        <section className="xl:col-span-3 lg:col-span-4 col-span-1">
          {/* → Generic: MetricGroup */}
          <SalesMetrics
            locale={locale}
            translations={dictionary.salesMetrics}
          />
        </section>

        <section className="xl:col-span-2 lg:col-span-4 col-span-1">
          {/* → Generic: ComparisonChartWidget */}
          <SalesPerformance
            locale={locale}
            translations={dictionary.salesPerformance}
            initialPeriod="month"
          />
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: FeaturedMetricWidget */}
          <TotalBalance
            locale={locale}
            translations={dictionary.totalBalance}
          />
        </section>

        <section
          className="xl:col-span-1 lg:col-span-2 col-span-1  
          group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1"
        >
          {/* → Generic: BreakdownWidget */}
          <VisitorDevices
            locale={locale}
            translations={dictionary.visitorDevices}
          />
        </section>

        <section
          className="xl:col-span-1 lg:col-span-2 col-span-1  
          group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1"
        >
          {/* → Generic: ProgressListWidget */}
          <TopSellingProducts locale={locale} dictionary={dictionary} />
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: ProgressListWidget */}
          <TrafficSources dictionary={dictionary} locale={locale} />
        </section>

        <section className="xl:col-span-3 lg:col-span-4 col-span-1">
          {/* → Generic: TableWidget */}
          <RecentTransactions
            locale={locale}
            translations={dictionary.recentTransactions}
          />
        </section>
      </div>
    </div>
  );
}
