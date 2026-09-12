"use client";

import type { ChartPeriodOption } from "./types";
import { Button } from "@/components/ui/button";
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
    <div className="flex shrink-0 items-center gap-1 rounded-lg border p-1">
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <Button
            key={option.value}
            type="button"
            variant={isActive ? "default" : "ghost"}
            disabled={isActive}
            size="sm"
            onClick={() => onChange?.(option.value)}
            className="h-8 rounded-md px-3 text-xs font-medium"
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
