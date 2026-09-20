"use client";

import type { EcommerceProductsDictionary } from "@/i18n/dictionaries";

// import {
//   AcquisitionChart,
//   ConversionFunnel,
//   OverviewMetrics,
//   ReferrersEvents,
//   RightNow,
//   TrafficChannels,
//   VisitorDevices,
//   TopPages,
// } from "./widgets";

type EcommerceProductsProps = {
  dictionary: EcommerceProductsDictionary;
  locale: "fa" | "en";
};

export function EcommerceProducts({
  dictionary,
  locale,
}: EcommerceProductsProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-4 grid-cols-1 w-full">
        <section className="xl:col-span-2 lg:col-span-4 col-span-1">
          {/* → Generic: ComposedChartWidget */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: LiveLineChartWidget */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: MetricListWidget */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: ProgressListWidget */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: BreakdownWidget */}
        </section>
        <section
          className="xl:col-span-1 lg:col-span-2 col-span-1  
          group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1"
        >
          {/* → Generic: BreakdownWidget */}
        </section>

        <section
          className="xl:col-span-2 lg:col-span-4 col-span-1  
          group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1"
        >
          {/* → Generic: TableWidget */}
        </section>

        <section className="xl:col-span-3 lg:col-span-4 col-span-1">
          {/* → Generic: MetricListWidget / sections variant */}
        </section>
      </div>
    </div>
  );
}
