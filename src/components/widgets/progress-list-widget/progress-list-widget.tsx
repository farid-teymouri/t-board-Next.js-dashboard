"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ProgressListWidgetEmpty } from "./components/progress-list-widget-empty";
import { ProgressListWidgetError } from "./components/progress-list-widget-error";
import { ProgressListWidgetSkeleton } from "./components/progress-list-widget-skeleton";
import { ClassicProgressList } from "./components/variants/classic";
import { ColorfulProgressList } from "./components/variants/colorful";
import { FunnelProgressList } from "./components/variants/funnel";

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

  const content = isLoading ? (
    <ProgressListWidgetSkeleton variant={variant} rank={rank} />
  ) : isError ? (
    <ProgressListWidgetError />
  ) : items.length === 0 ? (
    <ProgressListWidgetEmpty />
  ) : (
    <>
      {variant === "classic" && (
        <ClassicProgressList
          items={items}
          locale={locale}
          valueMode={valueMode}
          rank={rank}
          showProgress={showProgress}
          showMeta={showMeta}
          valueSuffix={translations.valueSuffix}
          currency={currency}
        />
      )}

      {variant === "colorful" && (
        <ColorfulProgressList
          items={items}
          locale={locale}
          valueMode={valueMode}
          rank={rank}
          showProgress={showProgress}
          showMeta={showMeta}
          valueSuffix={translations.valueSuffix}
          currency={currency}
        />
      )}

      {variant === "funnel" && (
        <FunnelProgressList
          items={items}
          locale={locale}
          translations={translations}
        />
      )}
    </>
  );

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

        {action ??
          (translations.action && (
            <Link
              href="#"
              className="shrink-0 text-sm font-medium text-primary underline-offset-auto transition-colors hover:underline"
            >
              {translations.action}
            </Link>
          ))}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">{content}</CardContent>
    </Card>
  );
}
