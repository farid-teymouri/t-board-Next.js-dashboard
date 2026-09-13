import { formatNumber } from "@/utils/formatters";

import type { SegmentedProgressSegment } from "../types";

type SegmentedProgressLegendProps = {
  segments: SegmentedProgressSegment[];
  locale: "fa" | "en";
};

export function SegmentedProgressLegend({
  segments,
  locale,
}: SegmentedProgressLegendProps) {
  return (
    <div className="space-y-3">
      {segments.map((segment) => (
        <div
          key={segment.id}
          className="flex items-center justify-between gap-4 text-sm"
        >
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`size-2.5 shrink-0 rounded-full ${segment.className}`}
            />

            <span className="truncate text-muted-foreground">
              {segment.label}
            </span>
          </div>

          <span className="shrink-0 font-medium tabular-nums">
            {formatNumber(segment.value, locale)}
          </span>
        </div>
      ))}
    </div>
  );
}
