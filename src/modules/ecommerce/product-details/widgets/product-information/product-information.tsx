"use client";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatNumber } from "@/utils/formatters";
import { useProductInformation } from "../../hooks/use-product-information";
import { ProductInformationAdditional } from "./product-information-additional";
import { ProductInformationDescription } from "./product-information-description";
import { ProductInformationSkeleton } from "./product-information-skeleton";
import { ProductInformationSpecification } from "./product-information-specification";
import { ProductInformationReviews } from "./product-information-reviews";
import { ProductInformationVendor } from "./product-information-vendor";
type ProductInformationProps = {
  dictionary: EcommerceProductDetailsDictionary["information"];
  locale: "fa" | "en";
};

export function ProductInformation({
  dictionary,
  locale,
}: ProductInformationProps) {
  const { data, isLoading, isError } = useProductInformation();

  if (isLoading) {
    return <ProductInformationSkeleton />;
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center text-sm text-destructive">
          {dictionary.content.error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="description" className="w-full">
          <div className="w-full overflow-x-auto">
            <TabsList
              variant="line"
              className="inline-flex w-max min-w-full justify-start"
            >
              <TabsTrigger
                value="description"
                className="shrink-0 px-4 text-sm"
              >
                {dictionary.tabs.description}
              </TabsTrigger>

              <TabsTrigger
                value="specification"
                className="shrink-0 px-4 text-sm"
              >
                {dictionary.tabs.specification}
              </TabsTrigger>

              <TabsTrigger
                value="additional-information"
                className="shrink-0 px-4 text-sm"
              >
                {dictionary.tabs.additionalInformation}
              </TabsTrigger>

              <TabsTrigger value="reviews" className="shrink-0 px-4 text-sm">
                {dictionary.tabs.reviews} (
                {formatNumber(data.reviewCount, locale)})
              </TabsTrigger>

              <TabsTrigger value="vendor" className="shrink-0 px-4 text-sm">
                {dictionary.tabs.vendor}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="pt-6">
            <TabsContent value="description" className="mt-0">
              <ProductInformationDescription data={data} locale={locale} />
            </TabsContent>

            <TabsContent value="specification" className="mt-0">
              <ProductInformationSpecification data={data} locale={locale} />
            </TabsContent>

            <TabsContent value="additional-information" className="mt-0">
              <ProductInformationAdditional data={data} locale={locale} />
            </TabsContent>
            <TabsContent value="reviews" className="mt-0">
              <ProductInformationReviews
                data={data}
                dictionary={dictionary}
                locale={locale}
              />
            </TabsContent>
            <TabsContent value="vendor" className="mt-0">
              <ProductInformationVendor
                data={data}
                dictionary={dictionary}
                locale={locale}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
