"use client";

import { useMemo, useState } from "react";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useProductOverview } from "../../hooks/use-product-overview";
import { useProductOverviewVariants } from "../../hooks/use-product-overview-variants";

import { ProductOverviewSkeleton } from "./product-overview-skeleton";
import { ProductOverviewSummary } from "./product-overview-summary";
import { ProductOverviewVariants } from "./product-overview-variants";
import { ProductOverviewActions } from "./product-overview-actions";
type ProductOverviewProps = {
  dictionary: EcommerceProductDetailsDictionary["overview"];
  locale: "fa" | "en";
};

export function ProductOverview({ dictionary, locale }: ProductOverviewProps) {
  const { data, isLoading, isError } = useProductOverview();

  const {
    data: variants,
    isLoading: isVariantsLoading,
    isError: isVariantsError,
  } = useProductOverviewVariants();

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const effectiveSelectedVariants = useMemo(() => {
    if (!variants) {
      return selectedVariants;
    }

    const next = { ...selectedVariants };

    variants.options.forEach((option) => {
      const hasSelectedValue = option.values.some(
        (value) => value.id === selectedVariants[option.id] && !value.disabled,
      );

      if (hasSelectedValue) {
        return;
      }

      const firstAvailableValue = option.values.find(
        (value) => !value.disabled,
      );

      if (firstAvailableValue) {
        next[option.id] = firstAvailableValue.id;
      }
    });

    return next;
  }, [variants, selectedVariants]);

  const effectivePricing = useMemo(() => {
    if (!data || !variants) {
      return {
        price: data?.price ?? 0,
        originalPrice: data?.originalPrice,
      };
    }

    const combination = variants.combinations.find((item) =>
      variants.options.every(
        (option) =>
          item.selections[option.id] === effectiveSelectedVariants[option.id],
      ),
    );

    if (!combination) {
      return {
        price: data.price,
        originalPrice: data.originalPrice,
      };
    }

    return {
      price: combination.price,
      originalPrice: combination.originalPrice,
    };
  }, [data, variants, effectiveSelectedVariants]);

  if (isLoading) {
    return <ProductOverviewSkeleton />;
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
      <CardContent className="space-y-5">
        <ProductOverviewSummary
          data={data}
          dictionary={dictionary}
          locale={locale}
          price={effectivePricing.price}
          originalPrice={effectivePricing.originalPrice}
        />

        <Separator />

        <ProductOverviewVariants
          locale={locale}
          variants={variants}
          isLoading={isVariantsLoading}
          isError={isVariantsError}
          selectedValues={effectiveSelectedVariants}
          onSelectionChange={setSelectedVariants}
          dictionary={dictionary}
        />

        <Separator />

        <ProductOverviewActions
          data={data}
          dictionary={dictionary}
          locale={locale}
        />
      </CardContent>
    </Card>
  );
}
