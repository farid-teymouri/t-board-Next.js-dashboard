import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { SalesOverview } from "./widgets/sales-overview";
import { TotalRevenueWidget } from "./widgets/total-revenue";
import { OverviewMetrics } from "./widgets/overview-metrics";
import { Performance } from "./widgets/performance";
import { TotalBalance } from "./widgets/total-balance";
import { VisitorDevices } from "./widgets/visitor-devices";
import { PerformanceRanking } from "./widgets/performance-ranking";
type SalesDashboardProps = {
  dictionary: SalesDashboardDictionary;
  locale: "fa" | "en";
};

export function SalesDashboard({ dictionary, locale }: SalesDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full">
        <section className="xl:col-span-2 col-span-3">
          <SalesOverview dictionary={dictionary} locale={locale} />
        </section>
        <section className="xl:col-span-1 col-span-3">
          <TotalRevenueWidget locale={locale} />
        </section>
        <section className="col-span-3">
          <OverviewMetrics
            locale={locale}
            translations={dictionary.overviewMetrics}
          />
        </section>
        <section className="xl:col-span-2 col-span-3">
          <Performance locale={locale} translations={dictionary.performance} />
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
      </div>
    </div>
  );
}
