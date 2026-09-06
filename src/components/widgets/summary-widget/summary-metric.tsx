import type { SummaryMetric as SummaryMetricType } from "./types";

type SummaryMetricProps = SummaryMetricType;

export function SummaryMetric({ label, value }: SummaryMetricProps) {
  return (
    <div className="flex w-full max-w-[210px] flex-col items-center justify-center gap-2 rounded-lg bg-secondary/30 p-px py-2">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="block w-full text-center text-2xl font-semibold">{value}</p>
    </div>
  );
}
