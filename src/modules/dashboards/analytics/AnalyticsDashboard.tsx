"use client";

import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

import { BarLine } from "./widgets/bar-line";

type AnalyticsDashboardProps = {
  dictionary: AnalyticsDashboardDictionary;
  locale: "fa" | "en";
};

export function AnalyticsDashboard({
  dictionary,
  locale,
}: AnalyticsDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <section className="col-span-3 xl:col-span-2">
          <BarLine translations={dictionary.acquisition} locale={locale} />
        </section>
      </div>
    </div>
  );
}
