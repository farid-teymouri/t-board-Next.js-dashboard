"use client";

import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

import { EcommerceQuickActions, MonthlyTarget, KpiCards } from "./widgets";

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
            dictionary={dictionary.quickActions}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-1">
          {/* → Generic: TargetWidget */}
          <MonthlyTarget
            dictionary={dictionary.monthlyTarget}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          {/* → Generic: KpiCardsWidget */}
          <KpiCards dictionary={dictionary.kpiCards} locale={locale} />
        </section>
      </div>
    </div>
  );
}
