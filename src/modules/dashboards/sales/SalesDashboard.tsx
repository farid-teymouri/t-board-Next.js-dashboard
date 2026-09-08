import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { SalesSummary, Revenue, SalesMetrics } from "./widgets";

import { SalesPerformance } from "./widgets";
import { TotalBalance } from "./widgets/total-balance";
import { VisitorDevices } from "./widgets/visitor-devices";
import { PerformanceRanking } from "./widgets/performance-ranking";
import { RecentTransactions } from "./widgets/recent-transactions";
type SalesDashboardProps = {
  dictionary: SalesDashboardDictionary;
  locale: "fa" | "en";
};

export function SalesDashboard({ dictionary, locale }: SalesDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full">
        <section className="xl:col-span-2 col-span-3">
          {/* → Generic: SummaryWidget */}
          <SalesSummary dictionary={dictionary} locale={locale} period="year" />
        </section>
        <section className="xl:col-span-1 col-span-3">
          {/* → Generic: MetricWidget */}
          <Revenue
            locale={locale}
            labels={dictionary.revenue}
            period="year"
            trend="up"
          />
        </section>
        <section className="col-span-3">
          {/* → Generic: MetricGroup */}
          <SalesMetrics
            locale={locale}
            translations={dictionary.salesMetrics}
          />
        </section>
        <section className="xl:col-span-2 col-span-3">
          {/* → Generic: ComparisonChartWidget */}
          <SalesPerformance
            locale={locale}
            translations={dictionary.salesPerformance}
            initialPeriod="month"
            valueFormat="compact"
          />
        </section>
        <section className="xl:col-span-1 lg:col-span-2 col-span-3">
          <TotalBalance
            locale={locale}
            translations={dictionary.totalBalance}
          />
        </section>
        <section
          className="lg:col-span-1 col-span-3  
        group-data-[sidebar-state=collapsed]/dashboard-grid:lg:col-span-1"
        >
          <VisitorDevices
            locale={locale}
            translations={dictionary.visitorDevices}
          />
        </section>
        <section
          className="xl:col-span-1 col-span-3  
        group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1"
        >
          <PerformanceRanking
            locale={locale}
            translations={dictionary.topSellingProducts}
            apiUrl={`/api/dashboards/sales/top-selling-products?locale=${locale}`}
            queryKey={["dashboards", "sales", "top-selling-products", locale]}
            variant="classic"
            valueMode="amount"
            showProgress
            showMeta
            showRank
            highlightTopRank
          />
        </section>

        <section className="xl:col-span-1 col-span-3">
          <PerformanceRanking
            locale={locale}
            translations={dictionary.trafficSource}
            apiUrl={`/api/dashboards/sales/traffic-source?locale=${locale}`}
            queryKey={["dashboards", "sales", "traffic-source", locale]}
            variant="colorful"
            valueMode="percentage"
            showProgress
            showMeta={false}
            showRank={false}
          />
        </section>
        <section className="col-span-3">
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
