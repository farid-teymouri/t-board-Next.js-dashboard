"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useRelatedProducts } from "../../hooks/use-related-products";
import { RelatedProductCard } from "./related-product-card";
import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";
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

  const scrollByCard = (direction: "prev" | "next") => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const card = viewport.querySelector<HTMLElement>(
      "[data-related-product-card]",
    );

    const amount = card ? card.offsetWidth + 16 : viewport.clientWidth * 0.8;

    viewport.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      moved: false,
    };

    setIsDragging(true);

    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport || !dragState.current.isDragging) {
      return;
    }

    const deltaX = event.clientX - dragState.current.startX;

    if (Math.abs(deltaX) > 5) {
      dragState.current.moved = true;
    }

    viewport.scrollLeft = dragState.current.startScrollLeft - deltaX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    dragState.current.isDragging = false;

    setIsDragging(false);

    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current.moved) {
      event.preventDefault();
      event.stopPropagation();

      dragState.current.moved = false;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-6 ">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">{dictionary.title}</h2>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={dictionary.previous}
              onClick={() => scrollByCard("prev")}
            >
              {locale === "fa" ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={dictionary.next}
              onClick={() => scrollByCard("next")}
            >
              {locale === "fa" ? (
                <ChevronLeft className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="relative">
          {/* Left highlight */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-linear-to-r from-card via-card/30 to-transparent" />

          {/* Right highlight */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-linear-to-l from-card via-card/30 to-transparent" />

          <div
            ref={viewportRef}
            dir="ltr"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClickCapture={handleClickCapture}
            className={[
              "flex gap-4 overflow-x-auto scroll-smooth",
              "scrollbar-none",
              "select-none",
              "touch-pan-y",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            ].join(" ")}
          >
            {data.products.map((product) => (
              <div
                key={product.id}
                data-related-product-card
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
