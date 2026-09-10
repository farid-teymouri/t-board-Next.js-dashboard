"use client";

import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

import { AcquisitionChart, OverviewMetrics } from "./widgets";

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
      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-4 grid-cols-1 w-full">
        <section className="xl:col-span-2 col-span-4">
          {/* → Generic: ComposedChartWidget */}
          <AcquisitionChart
            translations={dictionary.acquisition}
            locale={locale}
          />
        </section>
        <section className="xl:col-span-1 lg:col-span-2 col-span-4">
          {/* → Generic: MetricListWidget */}
          <OverviewMetrics
            translations={dictionary.overviewMetrics}
            locale={locale}
          />
        </section>
        <section
          className="xl:col-span-1 lg:col-span-2 col-span-4  
         "
        >
          {/* → Generic: MetricListWidget */}
          <OverviewMetrics
            translations={dictionary.overviewMetrics}
            locale={locale}
          />
        </section>
      </div>
    </div>
  );
}
