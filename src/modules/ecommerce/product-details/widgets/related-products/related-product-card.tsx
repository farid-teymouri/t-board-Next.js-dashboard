"use client";

import { Star } from "lucide-react";

import { formatCurrency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import type { RelatedProduct } from "./types";

type RelatedProductCardProps = {
  product: RelatedProduct;
  locale: "fa" | "en";
};

const badgeStyles = {
  new: "bg-muted text-chart-2",
  bestseller: "bg-muted text-chart-3",
  discount: "bg-muted text-destructive",
} as const;

export function RelatedProductCard({
  product,
  locale,
}: RelatedProductCardProps) {
  return (
    <article
      className={[
        "group w-full shrink-0 overflow-hidden rounded-xl bg-muted",
        "cursor-grab active:cursor-grabbing",
        locale === "fa" ? "text-right" : "text-left",
      ].join(" ")}
      dir={locale === "fa" ? "rtl" : "ltr"}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        {product.badges.length > 0 ? (
          <div
            className={[
              "absolute top-3 z-10 flex flex-col gap-1.5",
              locale === "fa" ? "right-3" : "left-3",
            ].join(" ")}
          >
            {product.badges.map((badge) => (
              <span
                key={`${product.id}-${badge.type}`}
                className={[
                  "rounded-md px-2 py-1 text-xs font-medium",
                  badgeStyles[badge.type],
                ].join(" ")}
              >
                {badge.label[locale]}
              </span>
            ))}
          </div>
        ) : null}

        <img
          src={product.image}
          alt={product.name[locale]}
          draggable={false}
          className="pointer-events-none size-full select-none rounded-t-xl object-cover"
        />
      </div>

      <div className="flex h-full flex-col space-y-1.5 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          {product.category[locale]}
        </p>

        <h3 className="line-clamp-2 text-sm font-medium leading-5">
          {product.name[locale]}
        </h3>

        <p className="truncate text-xs leading-5 text-muted-foreground">
          {product.description[locale]}
        </p>

        <div className="flex items-center gap-2 text-xs">
          <div
            className="flex items-center gap-0.5"
            aria-label={formatNumber(product.rating, locale)}
          >
            {Array.from({ length: 5 }).map((_, index) => {
              const fillPercentage =
                Math.min(Math.max(product.rating - index, 0), 1) * 100;

              return (
                <span
                  key={index}
                  className="relative size-3.5 text-muted-foreground"
                >
                  <Star className="absolute inset-0 size-full" />

                  <span
                    className="absolute inset-y-0 start-0 overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                  >
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                  </span>
                </span>
              );
            })}
          </div>

          <span className="font-medium">
            {formatNumber(product.rating, locale)}
          </span>

          <span className="text-muted-foreground">
            ({formatNumber(product.reviews, locale)})
          </span>
        </div>

        <p className="text-sm font-semibold">
          {formatCurrency(product.price, {
            locale,
            currency: "IRT",
          })}
        </p>
      </div>
    </article>
  );
}
