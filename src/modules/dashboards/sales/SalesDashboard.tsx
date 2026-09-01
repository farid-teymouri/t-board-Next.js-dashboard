import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { SalesOverview } from "./widgets/sales-overview";
import { TotalRevenueWidget } from "./widgets/total-revenue";

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
    </div>
  );
}
