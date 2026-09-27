"use client";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { ProductMedia } from "./widgets";

type EcommerceEditProductProps = {
  dictionary: EcommerceEditProductDictionary;
  locale: "fa" | "en";
};

export function EcommerceEditProduct({
  dictionary,
}: EcommerceEditProductProps) {
  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-2">
          <ProductMedia dictionary={dictionary.media} />
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Generic: SummaryWidget */}
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Generic: MetricWidget */}
        </section>
      </div>
    </div>
  );
}
