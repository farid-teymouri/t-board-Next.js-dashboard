"use client";

import { useRef, useState } from "react";

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

  const [isDragging, setIsDragging] = useState(false);

  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

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

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      moved: false,
    };

    setIsDragging(true);
    viewport.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport || !dragState.current.isDragging) return;

    const deltaX = event.clientX - dragState.current.startX;

    if (Math.abs(deltaX) > 5) {
      dragState.current.moved = true;
    }

    viewport.scrollLeft = dragState.current.startScrollLeft - deltaX;
  };

  const stopDragging = () => {
    const viewport = viewportRef.current;

    dragState.current.isDragging = false;
    setIsDragging(false);

    if (viewport) {
      viewport.style.scrollBehavior = "";
    }
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.moved) return;

    event.preventDefault();
    event.stopPropagation();

    dragState.current.moved = false;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-6">
        <h2 className="text-lg font-semibold">{dictionary.title}</h2>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-linear-to-r from-card via-card/30 to-transparent sm:w-20" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-linear-to-l from-card via-card/30 to-transparent sm:w-20" />

          <div
            ref={viewportRef}
            dir="ltr"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onClickCapture={handleClickCapture}
            className={[
              "flex gap-4 overflow-x-auto",
              "scrollbar-none",
              "touch-pan-x",
              "overscroll-x-contain",
              "select-none",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            ].join(" ")}
          >
            {data.products.map((product) => (
              <div
                key={product.id}
                className={[
                  "w-[75%] shrink-0",
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
