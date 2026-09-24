"use client";

import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import type {
  EcommerceProductsFilters,
  ProductStatus,
} from "@/types/ecommerce/products";

export interface ProductFiltersDictionary {
  title: string;
  categories: string;
  price: string;
  availability: string;
  rating: string;
  reset: string;
  statuses: {
    inStock: string;
    lowStock: string;
    outOfStock: string;
  };
  ratings: {
    four: string;
    three: string;
    two: string;
  };
}

interface ProductFiltersProps {
  filters?: EcommerceProductsFilters;
  selectedCategories: string[];
  priceRange: [number, number] | null;
  selectedStatuses: ProductStatus[];
  selectedRating: number | null;
  dictionary: ProductFiltersDictionary;
  locale: "fa" | "en";
  onCategoriesChange: (categories: string[]) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onStatusesChange: (statuses: ProductStatus[]) => void;
  onRatingChange: (rating: number | null) => void;
  onReset: () => void;
}
function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "size-3.5",
            star <= rating
              ? "fill-chart-5 text-chart-5"
              : "text-muted-foreground/30",
          )}
        />
      ))}
    </span>
  );
}
export function ProductFilters({
  filters,
  selectedCategories,
  priceRange,
  selectedStatuses,
  selectedRating,
  dictionary,
  locale,
  onCategoriesChange,
  onPriceRangeChange,
  onStatusesChange,
  onRatingChange,
  onReset,
}: ProductFiltersProps) {
  if (!filters) {
    return null;
  }

  const currentPriceRange = priceRange ?? [
    filters.price.min,
    filters.price.max,
  ];

  function toggleCategory(categoryId: string) {
    onCategoriesChange(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId],
    );
  }

  function toggleStatus(status: ProductStatus) {
    onStatusesChange(
      selectedStatuses.includes(status)
        ? selectedStatuses.filter((value) => value !== status)
        : [...selectedStatuses, status],
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{dictionary.title}</h2>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onReset}
              disabled={
                selectedCategories.length === 0 &&
                priceRange === null &&
                selectedStatuses.length === 0 &&
                selectedRating === null
              }
            >
              {dictionary.reset}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        <section className="space-y-3">
          <h3 className="text-sm font-medium">{dictionary.categories}</h3>

          <div className="space-y-1">
            {filters.categories.map((category) => {
              const selected = selectedCategories.includes(category.id);

              return (
                <label
                  key={category.id}
                  className={cn(
                    "flex h-9 w-full cursor-pointer items-center justify-between rounded-md px-2 text-sm transition-colors hover:bg-muted",
                    selected && "bg-muted font-medium",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleCategory(category.id)}
                      className="peer sr-only"
                    />

                    <span
                      className="
        flex size-4 items-center justify-center rounded border-2
        border-muted-foreground
        transition-colors
        peer-hover:border-foreground
        peer-checked:border-primary
        peer-checked:bg-primary
      "
                    >
                      <Check className="hidden size-3 text-primary-foreground peer-checked:block" />
                    </span>

                    <span>{category.name}</span>
                  </span>

                  <Badge variant="secondary">{category.count}</Badge>
                </label>
              );
            })}
          </div>
        </section>
        <section className="space-y-4">
          <h3 className="text-sm font-medium">{dictionary.price}</h3>

          <div className="space-y-4" dir="ltr">
            <Slider
              min={filters.price.min}
              max={filters.price.max}
              step={filters.price.step}
              value={currentPriceRange}
              onValueChange={(value) => {
                if (Array.isArray(value) && value.length === 2) {
                  onPriceRangeChange([value[0], value[1]]);
                }
              }}
            />

            <div className="flex justify-between text-sm gap-2">
              <span className="rounded-md border px-3 py-1">
                {formatPrice(currentPriceRange[0], locale)}
              </span>

              <span className="rounded-md border px-3 py-1">
                {formatPrice(currentPriceRange[1], locale)}
              </span>
            </div>
          </div>
        </section>
        <section className="space-y-3">
          <h3 className="text-sm font-medium">{dictionary.availability}</h3>

          <div className="space-y-1">
            {filters.availability.map((status) => {
              const selected = selectedStatuses.includes(status);

              return (
                <label
                  key={status}
                  className={cn(
                    "flex h-9 w-full cursor-pointer items-center justify-start gap-2 rounded-md px-2 text-sm transition-colors hover:bg-muted",
                    selected && "bg-muted font-medium",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleStatus(status)}
                    className="peer sr-only"
                  />

                  <span
                    className="
      flex size-4 items-center justify-center rounded border-2 
      border-muted-foreground
      transition-colors
      peer-hover:border-foreground
      peer-checked:border-primary
      peer-checked:bg-primary
    "
                  >
                    <Check className="hidden size-3 text-primary-foreground peer-checked:block" />
                  </span>

                  <span>{getStatusLabel(status, dictionary)}</span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="space-y-1">
          <h3 className="text-sm font-medium">{dictionary.rating}</h3>

          <div className="space-y-2">
            {filters.ratings
              .slice()
              .sort((a, b) => b - a)
              .map((rating) => {
                const selected = selectedRating === rating;

                return (
                  <Button
                    key={rating}
                    type="button"
                    variant="ghost"
                    className={cn(
                      "h-14 w-full justify-start gap-2 px-2 font-normal",
                      selected && "bg-muted font-medium",
                    )}
                    onClick={() => onRatingChange(selected ? null : rating)}
                  >
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-full border-2 transition-colors",
                        selected
                          ? "border-primary bg-primary"
                          : "border-muted-foreground bg-transparent",
                      )}
                    >
                      {selected && (
                        <span className="size-2 rounded-full bg-primary" />
                      )}
                    </span>

                    <span className="flex flex-col items-start gap-1">
                      <span className="text-xs text-muted-foreground ">
                        <span>{getRatingLabel(rating, dictionary)}</span>
                      </span>
                      <RatingStars rating={rating} />
                    </span>
                  </Button>
                );
              })}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

function formatPrice(value: number, locale: "fa" | "en") {
  return `${value.toLocaleString(locale)} ${locale === "fa" ? "تومان" : "IRT"}`;
}

function getStatusLabel(
  status: ProductStatus,
  dictionary: ProductFiltersDictionary,
) {
  switch (status) {
    case "in-stock":
      return dictionary.statuses.inStock;
    case "low-stock":
      return dictionary.statuses.lowStock;
    case "out-of-stock":
      return dictionary.statuses.outOfStock;
  }
}

function getRatingLabel(rating: number, dictionary: ProductFiltersDictionary) {
  switch (rating) {
    case 4:
      return dictionary.ratings.four;
    case 3:
      return dictionary.ratings.three;
    case 2:
      return dictionary.ratings.two;
    default:
      return `${rating}+`;
  }
}
