import { formatCurrency } from "@/utils/currency";
import type { Currency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import type { ProgressListItem, ProgressListTranslations } from "../../types";

type ProductsProgressListProps = {
  items: ProgressListItem[];
  locale: "fa" | "en";
  translations: ProgressListTranslations;
  currency?: Currency;
};

const categoryKeys = {
  Electronics: "electronics",
  Apparel: "apparel",
  Beauty: "beauty",
  Home: "home",
} as const;

const iconColors = [
  "bg-chart-2/20 text-chart-2",
  "bg-chart-3/20 text-chart-3",
  "bg-chart-4/20 text-chart-4",
  "bg-chart-5/20 text-chart-5",
];

export function ProductsProgressList({
  items,
  locale,
  translations,
  currency = "IRT",
}: ProductsProgressListProps) {
  return (
    <div className="flex h-full flex-col">
      {items.map((item, index) => {
        const categoryKey =
          item.category &&
          categoryKeys[item.category as keyof typeof categoryKeys];

        const category =
          translations.categories?.[categoryKey ?? ""] ?? item.category;

        return (
          <div key={item.id} className="space-y-3 py-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              {item.icon && (
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                    iconColors[index % iconColors.length]
                  }`}
                >
                  {item.icon}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>

                {item.category && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {category} · {formatNumber(item.value, locale)}{" "}
                    {translations.sold}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-sm bg-muted">
                <div
                  className="absolute inset-y-0 inset-s-0 rounded-sm bg-primary transition-[width] duration-500"
                  style={{
                    width: `${Math.min(Math.max(item.progress ?? 0, 0), 100)}%`,
                  }}
                />
              </div>

              {item.amount !== undefined && (
                <span className="shrink-0 text-xs font-medium tabular-nums">
                  {formatCurrency(item.amount, {
                    locale,
                    currency,
                  })}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
