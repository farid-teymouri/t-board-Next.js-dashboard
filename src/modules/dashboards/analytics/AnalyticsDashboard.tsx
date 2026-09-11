"use client";

import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

import {
  AcquisitionChart,
  ConversionFunnel,
  OverviewMetrics,
  ReferrersEvents,
  RightNow,
  TrafficChannels,
  VisitorDevices,
  TopPages,
} from "./widgets";

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
        <section className="xl:col-span-2 lg:col-span-4 col-span-1">
          {/* → Generic: ComposedChartWidget */}
          <AcquisitionChart
            translations={dictionary.acquisition}
            locale={locale}
          />
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: LiveLineChartWidget */}
          <RightNow translations={dictionary.rightNow} locale={locale} />
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: MetricListWidget */}
          <OverviewMetrics
            translations={dictionary.overviewMetrics}
            locale={locale}
          />
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: ProgressListWidget */}
          <ConversionFunnel
            translations={dictionary.conversionFunnel}
            locale={locale}
          />
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: BreakdownWidget */}
          <TrafficChannels
            locale={locale}
            translations={dictionary.trafficChannels}
          />
        </section>
        <section
          className="xl:col-span-1 lg:col-span-2 col-span-1  
          group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1"
        >
          {/* → Generic: BreakdownWidget */}
          <VisitorDevices
            locale={locale}
            translations={dictionary.visitorDevices}
          />
        </section>

        <section
          className="xl:col-span-2 lg:col-span-4 col-span-1  
          group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1"
        >
          {/* → Generic: TableWidget */}
          <TopPages locale={locale} translations={dictionary.topPages} />
        </section>

        <section className="xl:col-span-3 lg:col-span-4 col-span-1">
          {/* → Generic: MetricListWidget / sections variant */}
          <ReferrersEvents
            translations={dictionary.referrersEvents}
            locale={locale}
          />
        </section>
      </div>
    </div>
  );
}
