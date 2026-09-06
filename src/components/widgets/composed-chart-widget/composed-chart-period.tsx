"use client";

import type { ChartPeriodOption } from "./types";

interface ComposedChartPeriodProps {
  options: ChartPeriodOption[];
  value: string;
  onChange?: (value: string) => void;
}

export function ComposedChartPeriod({
  options,
  value,
  onChange,
}: ComposedChartPeriodProps) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-lg border p-0.5">
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            onClick={() => onChange?.(option.value)}
            className={[
              "h-7 rounded-md px-3 text-xs font-medium transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
              option.disabled && "cursor-pointer opacity-50",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
