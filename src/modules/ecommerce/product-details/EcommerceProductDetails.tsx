"use client";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

type EcommerceProductDetailsProps = {
  dictionary: EcommerceProductDetailsDictionary;
  locale: "fa" | "en";
};

export function EcommerceProductDetails({
  dictionary,
  locale,
}: EcommerceProductDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-4 grid-cols-1 w-full">
        <section className="xl:col-span-2 lg:col-span-4 col-span-1">
          {/* → Product Summary */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Product Metrics */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Product Inventory */}
        </section>

        <section className="xl:col-span-2 lg:col-span-4 col-span-1">
          {/* → Product Sales Chart */}
        </section>

        <section
          className="xl:col-span-1 lg:col-span-2 col-span-1  
          group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1"
        >
          {/* → Product Details */}
        </section>

        <section
          className="xl:col-span-2 lg:col-span-4 col-span-1  
          group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1"
        >
          {/* → Recent Orders / Activity */}
        </section>
      </div>
    </div>
  );
}
