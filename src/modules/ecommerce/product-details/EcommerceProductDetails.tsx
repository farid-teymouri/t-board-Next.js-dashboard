"use client";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { ProductMedia } from "./widgets/product-media";
import { useProductDetails } from "./hooks/use-product-details";

type EcommerceProductDetailsProps = {
  dictionary: EcommerceProductDetailsDictionary;
  locale: "fa" | "en";
};

export function EcommerceProductDetails({
  dictionary,
  locale,
}: EcommerceProductDetailsProps) {
  const { data, isLoading, isError } = useProductDetails();

  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
        {dictionary.content.loading}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-40 items-center justify-center text-sm text-destructive">
        {dictionary.content.error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-2">
          <ProductMedia media={data.media} dictionary={dictionary.media} />
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Product Metrics */}
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Product Inventory */}
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
