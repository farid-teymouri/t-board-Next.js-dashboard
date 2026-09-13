import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/formatters";

import type { MetricListSectionItem as MetricListSectionItemType } from "../types";

interface MetricListSectionItemProps extends MetricListSectionItemType {
  locale: "fa" | "en";
}

export function MetricListSectionItem({
  label,
  meta,
  value,
  valueDisplay,
  badge,
  icon: Icon,
  iconContent,
  iconClassName,
  locale,
}: MetricListSectionItemProps) {
  const formattedValue =
    value !== undefined ? formatNumber(value, locale) : undefined;

  return (
    <div className="flex items-center gap-3 py-3">
      {(Icon || iconContent) && (
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-md",
            iconClassName,
          )}
        >
          {Icon ? (
            <Icon className="size-5" />
          ) : (
            <span className="text-xs font-semibold">{iconContent}</span>
          )}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm">{label}</p>

        {meta && <p className="mt-1 text-xs text-muted-foreground">{meta}</p>}
      </div>

      {badge}

      {valueDisplay !== undefined && (
        <span className="shrink-0 text-sm font-semibold tracking-tight">
          {valueDisplay}
        </span>
      )}

      {valueDisplay === undefined && formattedValue !== undefined && (
        <span className="shrink-0 text-sm font-semibold tracking-tight">
          {formattedValue}
        </span>
      )}
    </div>
  );
}
