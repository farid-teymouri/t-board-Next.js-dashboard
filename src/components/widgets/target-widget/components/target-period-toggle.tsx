"use client";

import { Button } from "@/components/ui/button";
import type { TargetPeriod } from "../types";

type TargetPeriodToggleProps = {
  value: TargetPeriod;
  monthly: string;
  quarterly: string;
  onChange: (value: TargetPeriod) => void;
};

export function TargetPeriodToggle({
  value,
  monthly,
  quarterly,
  onChange,
}: TargetPeriodToggleProps) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-lg border p-0.5 py-1">
      <Button
        type="button"
        size="sm"
        variant={value === "monthly" ? "default" : "ghost"}
        disabled={value === "monthly"}
        onClick={() => onChange("monthly")}
      >
        {monthly}
      </Button>

      <Button
        type="button"
        size="sm"
        variant={value === "quarterly" ? "default" : "ghost"}
        disabled={value === "quarterly"}
        onClick={() => onChange("quarterly")}
      >
        {quarterly}
      </Button>
    </div>
  );
}
