import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

import { SalesOverview } from "./widgets";

type SalesDashboardProps = {
  dictionary: SalesDashboardDictionary;
  locale: "fa" | "en";
};

export function SalesDashboard({ dictionary, locale }: SalesDashboardProps) {
  return (
    <div className="space-y-8">
      <SalesOverview dictionary={dictionary} locale={locale} />
    </div>
  );
}
