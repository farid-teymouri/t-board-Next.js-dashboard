import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { SalesOverview } from "./widgets/sales-overview";
import { TotalRevenueWidget } from "./widgets/total-revenue";
import { OverviewMetrics } from "./widgets/overview-metrics";

type SalesDashboardProps = {
  dictionary: SalesDashboardDictionary;
  locale: "fa" | "en";
};

export function SalesDashboard({ dictionary, locale }: SalesDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <SalesOverview dictionary={dictionary} locale={locale} />

        <TotalRevenueWidget locale={locale} />
      </div>

      <div className="space-y-6">
        <OverviewMetrics
          locale={locale}
          translations={dictionary.overviewMetrics}
        />
      </div>
    </div>
  );
}
