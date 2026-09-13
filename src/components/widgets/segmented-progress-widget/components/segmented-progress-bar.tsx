import type { SegmentedProgressSegment } from "../types";

type SegmentedProgressBarProps = {
  segments: SegmentedProgressSegment[];
  total: number;
};

export function SegmentedProgressBar({
  segments,
  total,
}: SegmentedProgressBarProps) {
  if (total <= 0) {
    return <div className="h-3 w-full overflow-hidden rounded-full bg-muted" />;
  }

  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
      {segments.map((segment) => {
        const percentage = (segment.value / total) * 100;

        return (
          <div
            key={segment.id}
            className={segment.className}
            style={{ width: `${percentage}%` }}
            title={`${segment.label}: ${segment.value}`}
          />
        );
      })}
    </div>
  );
}
