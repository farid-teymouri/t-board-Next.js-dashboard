"use client";

interface BarLineTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
    payload?: {
      monthLabel?: string;
    };
  }>;
  locale: "en" | "fa";
  translations: {
    sessions: string;
    newVisitors: string;
    returning: string;
  };
}

function formatValue(value: number, locale: "en" | "fa") {
  const formatted =
    value >= 1000
      ? `${(value / 1000).toFixed(1).replace(".0", "")}${locale === "fa" ? " هزار" : "k"}`
      : value.toString();

  if (locale === "fa") {
    return formatted.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
  }

  return formatted;
}

export function BarLineTooltip({
  active,
  payload,
  locale,
  translations,
}: BarLineTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const sessions = payload.find((item) => item.dataKey === "sessions")?.value;

  const newVisitors = payload.find(
    (item) => item.dataKey === "newVisitors",
  )?.value;

  const returning = payload.find((item) => item.dataKey === "returning")?.value;

  const monthLabel = payload[0]?.payload?.monthLabel;

  return (
    <div className="min-w-[190px] overflow-hidden rounded-lg border bg-background p-0 shadow-xl">
      <div className="border-b bg-muted/50 px-3 py-2 text-sm font-medium">
        {monthLabel}
      </div>

      <div className="space-y-2 px-3 py-3">
        <div className="flex items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-chart-3" />
            <span className="text-muted-foreground">
              {translations.sessions}
            </span>
          </div>

          <span className="font-medium tabular-nums">
            {typeof sessions === "number" ? formatValue(sessions, locale) : "-"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-chart-4" />
            <span className="text-muted-foreground">
              {translations.newVisitors}
            </span>
          </div>

          <span className="font-medium tabular-nums">
            {typeof newVisitors === "number"
              ? formatValue(newVisitors, locale)
              : "-"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-chart-5" />
            <span className="text-muted-foreground">
              {translations.returning}
            </span>
          </div>

          <span className="font-medium tabular-nums">
            {typeof returning === "number"
              ? formatValue(returning, locale)
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
