"use client";

import type { FinanceDashboardDictionary } from "@/i18n/dictionaries";

import {
  FinanceSummary,
  KpiCards,
  CashFlow,
  TotalBalance,
  SpendingByCategory,
  Accounts,
} from "./widgets";

type FinanceDashboardProps = {
  dictionary: FinanceDashboardDictionary;
  locale: "fa" | "en";
};

export function FinanceDashboard({
  dictionary,
  locale,
}: FinanceDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          {/* → Generic: SummaryWidget */}
          <FinanceSummary
            dictionary={dictionary.financeSummary}
            locale={locale}
          />
        </section>
        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          {/* → Generic: KpiCardsWidget */}
          <KpiCards translations={dictionary.kpiCards} locale={locale} />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-2">
          {/* → Generic: ComposedChartWidget */}
          <CashFlow dictionary={dictionary.cashFlow} locale={locale} />
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Generic: FeaturedMetricWidget */}
          <TotalBalance dictionary={dictionary.totalBalance} locale={locale} />
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Generic: BreakdownWidget */}
          <SpendingByCategory
            dictionary={dictionary.spendingByCategory}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          <Accounts locale={locale} dictionary={dictionary.accounts} />
        </section>
      </div>
    </div>
  );
}
