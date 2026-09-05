"use client";

interface BarLinePeriodProps {
  translations: {
    year: string;
    month: string;
    week: string;
  };
}

export function BarLinePeriod({ translations }: BarLinePeriodProps) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-lg border p-0.5 py-1">
      <button
        type="button"
        disabled
        className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground/50 hover:bg-secondary hover:text-foreground"
      >
        {translations.year}
      </button>

      <button
        type="button"
        className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
      >
        {translations.month}
      </button>

      <button
        type="button"
        disabled
        className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground/50 hover:bg-secondary hover:text-foreground"
      >
        {translations.week}
      </button>
    </div>
  );
}
