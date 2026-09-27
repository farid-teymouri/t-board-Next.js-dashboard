"use client";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { usePricing } from "../../hooks/use-pricing";

import { PricingForm } from "./pricing-form";
import { PricingSkeleton } from "./pricing-skeleton";

type PricingProps = {
  dictionary: EcommerceEditProductDictionary["pricing"];
  locale: "fa" | "en";
};

export function Pricing({ dictionary, locale }: PricingProps) {
  const { data, isLoading, isError } = usePricing();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <PricingSkeleton />
        ) : isError || !data ? (
          <div className="flex min-h-40 items-center justify-center text-sm text-destructive">
            {dictionary.error}
          </div>
        ) : (
          <PricingForm data={data} dictionary={dictionary} locale={locale} />
        )}
      </CardContent>
    </Card>
  );
}
