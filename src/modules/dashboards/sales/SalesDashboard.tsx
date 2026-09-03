import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { SalesOverview } from "./widgets/sales-overview";
import { TotalRevenueWidget } from "./widgets/total-revenue";
import { OverviewMetrics } from "./widgets/overview-metrics";
import { Performance } from "./widgets/performance";
import { TotalBalance } from "./widgets/total-balance";
import { VisitorDevices } from "./widgets/visitor-devices";

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
        <section
          className="lg:col-span-1 col-span-3  
        group-data-[sidebar-state=collapsed]/dashboard-grid:md:col-span-1 "
        >
          <TotalBalance
            locale={locale}
            translations={dictionary.totalBalance}
          />
        </section>
        <section
          className="lg:col-span-1 col-span-3  
        group-data-[sidebar-state=collapsed]/dashboard-grid:md:col-span-1"
        >
          <VisitorDevices
            locale={locale}
            translations={dictionary.visitorDevices}
          />
        </section>
        <section className=" sm:col-span-1 col-span-3"></section>
        <section className=" sm:col-span-1 col-span-3"></section>
      </div>
    </div>
  );
}
