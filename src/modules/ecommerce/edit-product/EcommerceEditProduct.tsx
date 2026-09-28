"use client";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";
import type { ContentEditorDictionary } from "@/components/ui/content-editor/dictionary";
import {
  BasicInformation,
  Organization,
  Performance,
  ProductMedia,
  Status,
  Pricing,
  Inventory,
  Variants,
  SearchEngineListing,
  DangerZone,
} from "./widgets";

type EcommerceEditProductProps = {
  dictionary: EcommerceEditProductDictionary;
  contentEditorDictionary: ContentEditorDictionary;
  locale: "fa" | "en";
};

export function EcommerceEditProduct({
  dictionary,
  contentEditorDictionary,
  locale,
}: EcommerceEditProductProps) {
  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-2 space-y-6">
          <BasicInformation
            dictionary={dictionary.basicInformation}
            contentEditorDictionary={contentEditorDictionary}
            locale={locale}
          />
          <ProductMedia dictionary={dictionary.media} />
          <Pricing dictionary={dictionary.pricing} locale={locale} />
          <Variants dictionary={dictionary.variants} locale={locale} />
          <SearchEngineListing
            dictionary={dictionary.searchEngineListing}
            locale={locale}
          />
          <DangerZone dictionary={dictionary.dangerZone} locale={locale} />
        </section>
        <section className="col-span-1 lg:col-span-4 xl:col-span-1 space-y-6">
          <Status dictionary={dictionary.status} />
          <Performance dictionary={dictionary.performance} locale={locale} />
          <Organization dictionary={dictionary.organization} locale={locale} />
          <Inventory dictionary={dictionary.inventory} locale={locale} />
        </section>
      </div>
    </div>
  );
}
