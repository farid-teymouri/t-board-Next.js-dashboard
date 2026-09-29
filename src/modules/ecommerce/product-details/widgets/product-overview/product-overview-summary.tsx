"use client";

import { useState } from "react";

import { Check, ChevronRight, Heart, Star } from "lucide-react";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { formatCurrency } from "@/utils/currency/formatter";

import type { ProductOverview } from "./types";

type ProductOverviewSummaryProps = {
  data: ProductOverview;
  dictionary: EcommerceProductDetailsDictionary["overview"];
  locale: "fa" | "en";
  price: number;
  originalPrice?: number;
};

export function ProductOverviewSummary({
  data,
  dictionary,
  locale,
  price,
  originalPrice: selectedOriginalPrice,
}: ProductOverviewSummaryProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const currentPrice = formatCurrency(price, {
    locale,
    currency: data.currency,
  });

  const originalPrice = selectedOriginalPrice
    ? formatCurrency(selectedOriginalPrice, {
        locale,
        currency: data.currency,
      })
    : null;

  const savings = selectedOriginalPrice ? selectedOriginalPrice - price : 0;

  const formattedSavings = savings
    ? formatCurrency(savings, {
        locale,
        currency: data.currency,
      })
    : null;

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <a className="transition-colors hover:text-foreground cursor-pointer">
          {data.brand[locale]}
        </a>

        <ChevronRight className="size-3.5 shrink-0 rtl:rotate-180" />

        <a className="transition-colors hover:text-foreground cursor-pointer">
          {data.category[locale]}
        </a>
      </div>

      {/* Product title + Favorite */}
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {data.name[locale]}
        </h2>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9 p-5"
                aria-label={
                  isFavorite
                    ? dictionary.favorite.remove
                    : dictionary.favorite.add
                }
                onClick={() => setIsFavorite((value) => !value)}
              >
                <Heart
                  className={
                    isFavorite
                      ? "size-6 fill-destructive text-destructive"
                      : "size-6"
                  }
                />
              </Button>
            }
          />

          <TooltipContent>
            {isFavorite ? dictionary.favorite.remove : dictionary.favorite.add}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <div className="flex items-center gap-0.5 text-muted-foreground">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-4" />
            ))}
          </div>

          <div
            className="absolute inset-y-0 inset-s-0 flex items-center gap-0.5 overflow-hidden text-amber-500"
            style={{ width: `${(data.rating / 5) * 100}%` }}
            aria-hidden="true"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-4 shrink-0 fill-current" />
            ))}
          </div>
        </div>

        <span className="text-sm font-medium">{data.rating}</span>

        <a className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer hover:underline underline-offset-4">
          {data.reviewCount} {dictionary.content.rating.reviews}
        </a>
      </div>

      {/* Pricing */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-2xl font-bold tracking-tight">
          {currentPrice}
        </span>

        {originalPrice && (
          <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/70">
            {originalPrice}
          </span>
        )}

        {formattedSavings && savings > 0 && (
          <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
            {locale === "fa"
              ? `${formattedSavings} ${dictionary.save}`
              : `${dictionary.save} ${formattedSavings}`}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-medium text-chart-3 dark:text-chart-3">
          <Check className="size-3.5" />

          <span>{locale === "fa" ? "موجود" : "In stock"}</span>
        </div>

        <span className="text-muted-foreground">—</span>

        <span className="text-muted-foreground">
          {locale === "fa"
            ? `${data.availableQuantity} عدد موجود`
            : `${data.availableQuantity} available`}
        </span>
      </div>

      <div className="pt-1">
        <p className="text-sm leading-6 text-muted-foreground">
          {data.description[locale]}
        </p>
      </div>
    </div>
  );
}
