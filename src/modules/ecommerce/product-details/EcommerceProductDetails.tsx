"use client";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import {
  ProductMedia,
  ProductOverview,
  ProductInformation,
  ProductServiceFeatures,
} from "./widgets";
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
      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-4">
        <section className="col-span-1 space-y-6 xl:col-span-2">
          <ProductMedia dictionary={dictionary.media} />

          <ProductServiceFeatures
            dictionary={dictionary.serviceFeatures}
            locale={locale}
          />
        </section>

        <section className="col-span-1 flex xl:col-span-2">
          <ProductOverview dictionary={dictionary.overview} locale={locale} />
        </section>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          <ProductInformation
            dictionary={dictionary.information}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-2">
          {/* → Product Sales Chart */}
        </section>

        <section
          className="
            col-span-1 lg:col-span-2 xl:col-span-1
            group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1
          "
        >
          {/* → Product Details */}
        </section>

        <section
          className="
            col-span-1 lg:col-span-4 xl:col-span-2
            group-data-[sidebar-state=collapsed]/dashboard-grid:xl:col-span-1
          "
        >
          {/* → Recent Orders / Activity */}
        </section>
      </div>
    </div>
  );
}
