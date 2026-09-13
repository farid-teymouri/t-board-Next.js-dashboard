"use client";

import type { FinanceDashboardDictionary } from "@/i18n/dictionaries";

import { FinanceSummary, KpiCards } from "./widgets";

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
          <FinanceSummary
            dictionary={dictionary.financeSummary}
            locale={locale}
          />
        </section>{" "}
        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          <KpiCards translations={dictionary.kpiCards} locale={locale} />
        </section>
      </div>
    </div>
  );
}
