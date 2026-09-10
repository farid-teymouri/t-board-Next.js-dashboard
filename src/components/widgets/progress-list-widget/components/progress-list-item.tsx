import { cn } from "@/lib/utils";
import { formatCurrency, type Currency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import type {
  ProgressListItem as ProgressListItemData,
  ProgressListRank,
  ProgressListValueMode,
} from "../types";

type ProgressListItemProps = {
  item: ProgressListItemData;
  index: number;
  locale: "fa" | "en";
  valueMode: ProgressListValueMode;
  rank: ProgressListRank;
  showProgress: boolean;
  showMeta: boolean;
  valueSuffix?: string;
  currency?: Currency;
  progressColor?: string;
};

function formatValue({
  item,
  locale,
  valueMode,
  currency,
}: {
  item: ProgressListItemData;
  locale: "fa" | "en";
  valueMode: ProgressListValueMode;
  currency?: Currency;
}) {
  if (valueMode === "percentage") {
    return `${formatNumber(item.progress ?? 0, locale)}%`;
  }

  if (valueMode === "amount" && item.amount !== undefined && currency) {
    return formatCurrency(item.amount, {
      locale,
      currency,
    });
  }

  return formatNumber(item.value, locale);
}

export function ProgressListItem({
  item,
  index,
  locale,
  valueMode,
  rank,
  showProgress,
  showMeta,
  valueSuffix,
  currency,
  progressColor,
}: ProgressListItemProps) {
  const value = formatValue({
    item,
    locale,
    valueMode,
    currency,
  });

  const showRank = rank !== "hidden";
  const highlightRank = rank === "highlighted" && index === 0;

  return (
    <div className="space-y-2 py-2 first:pt-0 last:pb-0">
      <div className="flex items-start gap-3">
        {showRank && (
          <span
            className={cn(
              "relative size-6 shrink-0 rounded-full bg-accent",
              highlightRank &&
                "border border-green-600 bg-green-500/20 text-green-700 dark:border-green-800 dark:bg-green-600/20 dark:text-green-800",
            )}
          >
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium leading-none tabular-nums text-muted-foreground">
              {formatNumber(index + 1, locale)}
            </span>
          </span>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.name}</p>

              {showMeta && item.category && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.category} · {formatNumber(item.value, locale)}
                  {valueSuffix ? ` ${valueSuffix}` : ""}
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
        <div className={cn("flex items-center gap-3", showRank && "ms-8")}>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-sm bg-muted">
            <div
              className="absolute inset-y-0 inset-s-0 rounded-sm transition-[width] duration-500"
              style={{
                width: `${Math.min(Math.max(item.progress ?? 0, 0), 100)}%`,
                backgroundColor: progressColor,
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
}
