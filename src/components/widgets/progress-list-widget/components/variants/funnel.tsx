import { formatCurrency } from "@/utils/currency";
import type { Currency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import type { ProgressListItem, ProgressListTranslations } from "../../types";

type FunnelProgressListProps = {
  items: ProgressListItem[];
  locale: "fa" | "en";
  translations: ProgressListTranslations;
  currency?: Currency;
};

const progressColors = [
  "var(--chart-3)",
  "var(--chart-2)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function formatPercentage(value: number, locale: "fa" | "en") {
  const precision = value >= 10 ? 1 : 2;
  const rounded = Number(value.toFixed(precision));

  return `${formatNumber(rounded, locale)}%`;
}

export function FunnelProgressList({
  items,
  locale,
  translations,
  currency,
}: FunnelProgressListProps) {
  const firstValue = items[0]?.value ?? 0;
  const lastValue = items[items.length - 1]?.value ?? 0;

  const conversionRate = firstValue > 0 ? (lastValue / firstValue) * 100 : 0;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-4">
        {items.map((item, index) => {
          const progress =
            item.progress ??
            (firstValue > 0 ? (item.value / firstValue) * 100 : 0);

          return (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="min-w-0 truncate text-sm font-medium">
                  {translations.stages?.[index] ?? item.name}
                </span>

                <span className="shrink-0 text-sm font-medium tabular-nums">
                  {formatCurrency(item.value, {
                    locale,
                    currency: currency ?? "IRT",
                  })}

                  <span className="ms-1 text-xs font-normal text-foreground/70">
                    · {formatPercentage(progress, locale)}
                  </span>
                </span>
              </div>

              <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute inset-y-0 inset-s-0 rounded-full transition-[width] duration-500"
                  style={{
                    width: `${Math.min(Math.max(progress, 0), 100)}%`,
                    backgroundColor:
                      progressColors[index % progressColors.length],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {translations.conversionLabel && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              {translations.conversionLabel}
            </span>

            <span className="shrink-0 rounded-full bg-chart-3/10 px-2.5 py-1 text-xs font-medium tabular-nums text-chart-3">
              {formatPercentage(conversionRate, locale)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
