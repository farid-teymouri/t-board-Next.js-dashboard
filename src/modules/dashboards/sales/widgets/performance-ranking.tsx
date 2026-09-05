"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import type { PerformanceRankingResponse } from "@/app/api/types/dashboards/sales/performance-ranking";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type PerformanceRankingTranslations = {
  title: string;
  description: string;
  action: string;
  valueSuffix?: string;
};

type PerformanceRankingProps = {
  locale: "fa" | "en";
  translations: PerformanceRankingTranslations;
  apiUrl: string;
  queryKey: readonly unknown[];
  variant?: "classic" | "colorful";
  valueMode?: "amount" | "percentage";
  showProgress?: boolean;
  showMeta?: boolean;
  showRank?: boolean;
  highlightTopRank?: boolean;
};

const progressColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function formatNumber(value: number, locale: "fa" | "en") {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(
    value,
  );
}

function PerformanceRankingSkeleton({
  variant,
  showRank,
}: {
  variant: "classic" | "colorful";
  showRank: boolean;
}) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "space-y-3 py-4 first:pt-0 last:pb-0",
            variant === "colorful" && "rounded-xl p-3",
          )}
        >
          <div className="flex items-start gap-3">
            {showRank && (
              <Skeleton className="mt-1 size-6 shrink-0 rounded-full" />
            )}

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>

            <Skeleton className="h-4 w-16 shrink-0" />
          </div>

          <Skeleton
            className={cn(
              showRank && "ms-8 w-[calc(100%-2rem)]",
              !showRank && "w-full",
              variant === "classic" ? "h-1.5 rounded-sm" : "h-2.5 rounded-full",
            )}
          />
        </div>
      ))}
    </div>
  );
}

function PerformanceRankingError() {
  return (
    <div className="flex min-h-[280px] items-center justify-center text-sm text-muted-foreground">
      Unable to load data.
    </div>
  );
}

export function PerformanceRanking({
  locale,
  translations,
  apiUrl,
  queryKey,
  variant = "classic",
  valueMode = "amount",
  showProgress = true,
  showMeta = true,
  showRank = true,
  highlightTopRank = false,
}: PerformanceRankingProps) {
  const { data, isPending, isError } = useQuery<PerformanceRankingResponse>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch performance ranking data");
      }

      return response.json() as Promise<PerformanceRankingResponse>;
    },
  });

  const formatter = (value: number) => formatNumber(value, locale);

  return (
    <Card className="flex h-full flex-col gap-6">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="min-w-0 space-y-1">
          <h3 className="font-display text-base font-medium group-data-[size=sm]/card:text-sm">
            {translations.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {translations.description}
          </p>
        </div>

        <Link
          href="#"
          className="shrink-0 text-sm font-medium text-primary underline-offset-auto transition-colors hover:underline"
        >
          {translations.action}
        </Link>
      </CardHeader>

      <CardContent>
        {isPending ? (
          <PerformanceRankingSkeleton variant={variant} showRank={showRank} />
        ) : isError || !data ? (
          <PerformanceRankingError />
        ) : (
          <div className="flex flex-col">
            {data.items.map((item, index) => {
              const progressColor =
                progressColors[index % progressColors.length];

              const value =
                valueMode === "percentage"
                  ? `${formatter(item.progress)}%`
                  : item.amount !== undefined
                    ? `${formatter(item.amount)}${
                        data.currency?.label ? ` ${data.currency.label}` : ""
                      }`
                    : formatter(item.value);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "space-y-2 py-2 first:pt-0 last:pb-0",
                    variant === "colorful" && "rounded-xl p-3",
                  )}
                >
                  <div className="flex items-start gap-3">
                    {showRank && (
                      <span
                        className={cn(
                          "relative size-6 shrink-0 rounded-full bg-accent",
                          highlightTopRank &&
                            index === 0 &&
                            "border border-green-600 bg-green-500/20 text-green-700 dark:border-green-800 dark:bg-green-600/20 dark:text-green-800",
                        )}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium leading-none tabular-nums text-muted-foreground">
                          {formatter(index + 1)}
                        </span>
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {item.name}
                          </p>

                          {showMeta && item.category && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {item.category} · {formatter(item.value)}
                              {translations.valueSuffix
                                ? ` ${translations.valueSuffix}`
                                : ""}
                            </p>
                          )}
                        </div>

                        {!showProgress && (
                          <span className="shrink-0 text-sm font-medium tabular-nums">
                            {value}
                          </span>
                        )}
                      </div>

                      {showMeta && item.description && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {showProgress && (
                    <div
                      className={cn(
                        "flex items-center gap-3",
                        showRank && "ms-8",
                      )}
                    >
                      <div
                        className={cn(
                          "relative flex-1 overflow-hidden bg-muted",
                          variant === "classic"
                            ? "h-1.5 rounded-sm"
                            : "h-2.5 rounded-full",
                        )}
                      >
                        <div
                          className={cn(
                            "absolute inset-y-0 inset-s-0 transition-[width] duration-500",
                            variant === "classic"
                              ? "rounded-sm bg-primary"
                              : "rounded-full",
                          )}
                          style={{
                            width: `${Math.min(
                              Math.max(item.progress, 0),
                              100,
                            )}%`,
                            ...(variant === "colorful"
                              ? {
                                  backgroundColor: progressColor,
                                }
                              : {}),
                          }}
                        />
                      </div>

                      <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
                        {value}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
