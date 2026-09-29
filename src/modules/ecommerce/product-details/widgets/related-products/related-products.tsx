"use client";

import { useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { useRelatedProducts } from "../../hooks/use-related-products";

import { RelatedProductCard } from "./related-product-card";
import { RelatedProductsSkeleton } from "./related-products-skeleton";

type RelatedProductsProps = {
  dictionary: EcommerceProductDetailsDictionary["relatedProducts"];
  locale: "fa" | "en";
};

export function RelatedProducts({ dictionary, locale }: RelatedProductsProps) {
  const { data, isLoading, isError } = useRelatedProducts();

  const viewportRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <RelatedProductsSkeleton />;
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          {dictionary.error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-6">
        <h2 className="text-lg font-semibold">{dictionary.title}</h2>

        <div className="relative">
          {/* Left highlight */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-linear-to-r from-card via-card/30 to-transparent sm:w-20" />

          {/* Right highlight */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-linear-to-l from-card via-card/30 to-transparent sm:w-20" />

          <div
            ref={viewportRef}
            dir="ltr"
            className={[
              "flex gap-4 overflow-x-auto",
              "scrollbar-none",
              "touch-pan-x",
              "scroll-smooth",
              "snap-x snap-mandatory",
              "overscroll-x-contain",
            ].join(" ")}
          >
            {data.products.map((product) => (
              <div
                key={product.id}
                className={[
                  "w-[75%] shrink-0 snap-start",
                  "sm:w-[45%]",
                  "md:w-[31%]",
                  "lg:w-[23%]",
                  "xl:w-[16%]",
                ].join(" ")}
              >
                <RelatedProductCard product={product} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
