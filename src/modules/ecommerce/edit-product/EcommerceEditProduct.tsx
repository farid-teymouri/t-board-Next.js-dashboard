"use client";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";
import { ProductMedia } from "./widgets/product-media";
import { useEditProduct } from "./hooks/use-edit-product";
type EcommerceEditProductProps = {
  dictionary: EcommerceEditProductDictionary;
  locale: "fa" | "en";
};

export function EcommerceEditProduct({
  dictionary,
  locale,
}: EcommerceEditProductProps) {
  const { data, isLoading, isError } = useEditProduct();

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
      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-4 grid-cols-1 w-full">
        <section className="col-span-1 lg:col-span-4 xl:col-span-2">
          <ProductMedia
            media={data.media}
            dictionary={dictionary.media}
            locale={locale}
          />
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: SummaryWidget */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: MetricWidget */}
        </section>
      </div>
    </div>
  );
}
