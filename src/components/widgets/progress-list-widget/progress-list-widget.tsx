"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ProgressListItem } from "./components/progress-list-item";
import { ProgressListWidgetEmpty } from "./components/progress-list-widget-empty";
import { ProgressListWidgetError } from "./components/progress-list-widget-error";
import { ProgressListWidgetSkeleton } from "./components/progress-list-widget-skeleton";

import type { ProgressListWidgetProps } from "./types";

export function ProgressListWidget({
  translations,
  items,
  locale,
  variant = "classic",
  valueMode = "value",
  display = {
    rank: "visible",
    progress: true,
    meta: true,
  },
  action,
  currency,
  isLoading = false,
  isError = false,
}: ProgressListWidgetProps) {
  const rank = display.rank ?? "visible";
  const showProgress = display.progress ?? true;
  const showMeta = display.meta ?? true;

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

        {action ?? (
          <Link
            href="#"
            className="shrink-0 text-sm font-medium text-primary underline-offset-auto transition-colors hover:underline"
          >
            {translations.action}
          </Link>
        )}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <ProgressListWidgetSkeleton variant={variant} rank={rank} />
        ) : isError ? (
          <ProgressListWidgetError />
        ) : items.length === 0 ? (
          <ProgressListWidgetEmpty />
        ) : (
          <div className="flex flex-col">
            {items.map((item, index) => (
              <ProgressListItem
                key={item.id}
                item={item}
                index={index}
                locale={locale}
                variant={variant}
                valueMode={valueMode}
                rank={rank}
                showProgress={showProgress}
                showMeta={showMeta}
                valueSuffix={translations.valueSuffix}
                currency={currency}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
