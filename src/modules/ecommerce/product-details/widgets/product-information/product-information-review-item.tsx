"use client";

import { Star, ThumbsUp } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatNumber } from "@/utils/formatters";
import type { ProductReview } from "./types";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

type ProductInformationReviewItemProps = {
  review: ProductReview;
  dictionary: EcommerceProductDetailsDictionary["information"];
  locale: "fa" | "en";
  index: number;
};

const avatarChartClasses = [
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
  "bg-chart-1",
] as const;

export function ProductInformationReviewItem({
  review,
  dictionary,
  locale,
  index,
}: ProductInformationReviewItemProps) {
  const avatarChartClass =
    avatarChartClasses[index % avatarChartClasses.length];

  return (
    <div className="space-y-4 border-b pb-5 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback
              className={`font-medium text-white ${avatarChartClasses[index % avatarChartClasses.length]}`}
            >
              {review.user.initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">{review.user.name}</p>

              {review.verified && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-chart-3/15 text-chart-3"
                >
                  {dictionary.reviews.verified}
                </Badge>
              )}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {formatDate(review.date, locale)}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`size-4 ${
                index < review.rating
                  ? "fill-amber-500 text-amber-500"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-sm leading-6 text-muted-foreground">
        {review.content[locale]}
      </p>

      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
        <ThumbsUp className="size-3.5" />
        {dictionary.reviews.helpful}
        <span className="text-muted-foreground">
          ({formatNumber(review.helpfulCount, locale)})
        </span>
      </Button>
    </div>
  );
}
