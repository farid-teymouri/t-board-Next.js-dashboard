"use client";

import { ShoppingCart, Star, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currency/formatter";
import { formatNumber } from "@/utils/formatters";
import type {
  EcommerceProduct,
  ProductBadge,
  ProductImageVariant,
} from "@/types/ecommerce/products";

export interface ProductCardDictionary {
  badges: {
    new: string;
    bestseller: string;
    sale: string;
  };
  rating: {
    ariaLabel: string;
  };
  status: {
    inStock: string;
    outOfStock: string;
    remaining: string;
  };
  accessibility: {
    selectProduct: string;
    addToCart: string;
  };
}

interface ProductCardProps {
  product: EcommerceProduct;
  locale: "fa" | "en";
  dictionary: ProductCardDictionary;
  selected: boolean;
  onSelect: (productId: string) => void;
}

const chartColors: Record<ProductImageVariant, string> = {
  "chart-2": "var(--chart-2)",
  "chart-3": "var(--chart-3)",
  "chart-4": "var(--chart-4)",
  "chart-5": "var(--chart-5)",
};

function ProductRating({
  rating,
  reviewCount,
  locale,
  dictionary,
}: {
  rating: number;
  reviewCount: number;
  locale: "fa" | "en";
  dictionary: ProductCardDictionary["rating"];
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className="flex items-center gap-1"
        aria-label={dictionary.ariaLabel.replace("{rating}", String(rating))}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "size-5",
              star <= Math.floor(rating)
                ? "fill-chart-5 text-chart-5"
                : "text-muted-foreground/30",
            )}
          />
        ))}
      </div>

      <span className="text-muted-foreground">
        ({formatNumber(reviewCount, locale)})
      </span>
    </div>
  );
}

function ProductStatus({
  product,
  locale,
  dictionary,
}: {
  product: EcommerceProduct;
  locale: "fa" | "en";
  dictionary: ProductCardDictionary["status"];
}) {
  if (product.status === "out-of-stock") {
    return (
      <Badge variant="destructive" className="gap-1">
        {dictionary.outOfStock}
      </Badge>
    );
  }

  if (product.status === "low-stock") {
    return (
      <Badge className="gap-1 bg-chart-5 text-foreground hover:bg-chart-5">
        <TriangleAlert className="size-3.5" />
        {dictionary.remaining.replace(
          "{count}",
          formatNumber(product.stock, locale),
        )}
      </Badge>
    );
  }

  return (
    <Badge className="gap-1 bg-chart-3/10 text-chart-3 hover:bg-chart-3">
      {dictionary.inStock}
    </Badge>
  );
}

const badgeLabels: Record<ProductBadge, keyof ProductCardDictionary["badges"]> =
  {
    new: "new",
    bestseller: "bestseller",
    "on-sale": "sale",
  };

export function ProductCard({
  product,
  locale,
  dictionary,
  selected,
  onSelect,
}: ProductCardProps) {
  const isOutOfStock = product.status === "out-of-stock";

  return (
    <Card
      className={cn(
        "group relative overflow-hidden p-0 transition-colors",
        selected && "border-primary ring-1 ring-primary",
        isOutOfStock && "opacity-60",
      )}
    >
      <div className="relative">
        <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.badges.map((badge) => (
              <Badge
                key={badge}
                className={cn(
                  "border-0 text-white",
                  badge === "on-sale"
                    ? "bg-destructive hover:bg-destructive"
                    : "bg-chart-3 hover:bg-chart-3",
                )}
              >
                {badge === "on-sale" && product.previousPrice
                  ? `-${Math.round(
                      ((product.previousPrice - product.price) /
                        product.previousPrice) *
                        100,
                    )}%`
                  : dictionary.badges[badgeLabels[badge]]}
              </Badge>
            ))}
          </div>

          {!isOutOfStock && (
            <label className="relative flex size-5 cursor-pointer items-center justify-center">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => onSelect(product.id)}
                className="peer sr-only"
                aria-label={dictionary.accessibility.selectProduct.replace(
                  "{name}",
                  product.name,
                )}
              />

              <span
                className="
              size-5 rounded border-2
              border-muted-foreground
              hover:border-foreground
              transition-colors
              peer-checked:border-primary
              peer-checked:bg-primary
            "
              />
            </label>
          )}
        </div>

        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <div
            className="absolute inset-0"
            style={{
              color: chartColors[product.image.primary],
              backgroundColor: `color-mix(in oklab, ${chartColors[product.image.primary]} 15%, transparent)`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="block size-full"
            >
              <path d="M15 8h.01" />
              <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" />
              <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
              <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
            </svg>
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/85">
              <span className="rounded-md border border-destructive/90 bg-background/90 px-3 py-1.5 text-sm font-semibold tracking-wider">
                {dictionary.status.outOfStock}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">{product.category}</p>

          <h3 className="line-clamp-2 min-h-10 text-sm font-medium">
            {product.name}
          </h3>

          <ProductRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            locale={locale}
            dictionary={dictionary.rating}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm font-semibold">
              {formatCurrency(product.price, {
                locale,
                currency: product.currency,
              })}
            </span>

            {product.previousPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.previousPrice, {
                  locale,
                  currency: product.currency,
                })}
              </span>
            )}
          </div>

          <ProductStatus
            product={product}
            locale={locale}
            dictionary={dictionary.status}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={isOutOfStock}
            aria-label={dictionary.accessibility.addToCart.replace(
              "{name}",
              product.name,
            )}
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </Card>
  );
}
