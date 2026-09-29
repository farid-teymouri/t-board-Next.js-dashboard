import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { formatNumber } from "@/utils/formatters";

import type { ProductInformation } from "./types";

type ProductInformationReviewSummaryProps = {
  data: ProductInformation;
  dictionary: EcommerceProductDetailsDictionary["information"];
  locale: "fa" | "en";
};

const ratings = [5, 4, 3, 2, 1] as const;

export function ProductInformationReviewSummary({
  data,
  dictionary,
  locale,
}: ProductInformationReviewSummaryProps) {
  const maxReviews = Math.max(
    ...ratings.map((rating) => data.ratingDistribution[rating]),
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-5xl font-semibold tracking-tight">
          {formatNumber(data.rating, locale, "decimal")}
        </p>

        <div className="mt-2 flex justify-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`size-5 ${
                index < Math.floor(data.rating)
                  ? "fill-amber-500 text-amber-500"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {dictionary.reviews.basedOn.replace(
            "{count}",
            formatNumber(data.reviewCount, locale),
          )}
        </p>
      </div>

      <div className="space-y-3">
        {ratings.map((rating) => {
          const count = data.ratingDistribution[rating];
          const progress = maxReviews === 0 ? 0 : (count / maxReviews) * 100;

          return (
            <div key={rating} className="flex items-center gap-2 text-sm">
              <span className="w-3 text-muted-foreground">
                {formatNumber(rating, locale)}
              </span>

              <Star className="size-3.5 fill-amber-500 text-amber-500" />

              <Progress value={progress} className="flex-1" />

              <span className="w-7 text-end text-xs text-muted-foreground">
                {formatNumber(count, locale)}
              </span>
            </div>
          );
        })}
      </div>

      <Button className="w-full">
        {locale === "fa" ? "ثبت نظر" : "Write a Review"}
      </Button>
    </div>
  );
}
