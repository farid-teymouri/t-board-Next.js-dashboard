"use client";

import { Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";
import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { usePerformance } from "../../hooks/use-performance";

import { PerformanceSkeleton } from "./performance-skeleton";

type PerformanceProps = {
  dictionary: EcommerceEditProductDictionary["performance"];
  locale: "fa" | "en";
};

export function Performance({ locale, dictionary }: PerformanceProps) {
  const { data, isLoading } = usePerformance();

  if (isLoading || !data) {
    return <PerformanceSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-sm">
            {dictionary.unitsSold}
          </span>

          <span className="text-sm font-medium">
            {formatNumber(data.unitsSold, locale)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-sm">
            {dictionary.revenue}
          </span>

          <span className="text-sm font-medium">
            {formatCurrency(data.revenue.value, {
              locale,
              currency: data.revenue.currency,
            })}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-sm">
            {dictionary.conversion}
          </span>

          <span className="text-sm font-medium">
            {formatNumber(data.conversion, locale)}
            {locale === "fa" ? "٪" : "%"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-sm">
            {dictionary.averageRatings}
          </span>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center"
              aria-label={`${data.averageRating} out of 5`}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-4 fill-current text-amber-500"
                  aria-hidden="true"
                />
              ))}
            </div>

            <span className="text-sm font-medium">
              {formatNumber(data.averageRating, locale)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
