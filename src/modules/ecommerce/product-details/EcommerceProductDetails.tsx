"use client";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import {
  ProductMedia,
  ProductOverview,
  ProductInformation,
  ProductServiceFeatures,
  RelatedProducts,
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
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          <ProductMedia dictionary={dictionary.media} />
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-2">
          <ProductOverview dictionary={dictionary.overview} locale={locale} />
        </section>

        <section className="col-span-1 space-y-6 lg:col-span-4 xl:col-span-3">
          <ProductServiceFeatures
            dictionary={dictionary.serviceFeatures}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          <ProductInformation
            dictionary={dictionary.information}
            locale={locale}
          />
        </section>

        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          <RelatedProducts
            dictionary={dictionary.relatedProducts}
            locale={locale}
          />
        </section>
      </div>
    </div>
  );
}
