"use client";

import type { ChartPeriodOption } from "./types";

interface ComposedChartPeriodProps {
  options: ChartPeriodOption[];
  value: ChartPeriodOption["value"];
  onChange?: (value: ChartPeriodOption["value"]) => void;
}

export function ComposedChartPeriod({
  options,
  value,
  onChange,
}: ComposedChartPeriodProps) {
  if (options.length < 2) {
    return null;
  }

  return (
    <div className="flex shrink-0 items-center gap-1 rounded-lg border p-0.5">
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange?.(option.value)}
            className={[
              "h-7 rounded-md px-3 text-xs font-medium transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
