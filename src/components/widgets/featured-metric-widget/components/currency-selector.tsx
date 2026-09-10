"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type CurrencyOption = {
  value: string;
  label: ReactNode;
};

type CurrencySelectorProps = {
  currencies: readonly CurrencyOption[];
  value: string;
  onChange: (value: string) => void;
};

export function CurrencySelector({
  currencies,
  value,
  onChange,
}: CurrencySelectorProps) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-lg border bg-muted/20 p-1">
      {currencies.map((currency) => {
        const isActive = currency.value === value;

        return (
          <Button
            key={currency.value}
            type="button"
            variant={isActive ? "default" : "ghost"}
            disabled={isActive}
            size="sm"
            onClick={() => onChange(currency.value)}
            className={`h-8 rounded-lg px-3 text-xs ${
              !isActive
                ? "cursor-pointer hover:bg-secondary hover:text-foreground"
                : ""
            }`}
          >
            {currency.label}
          </Button>
        );
      })}
    </div>
  );
}
