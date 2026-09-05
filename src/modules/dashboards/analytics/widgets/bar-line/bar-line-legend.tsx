"use client";

interface BarLineLegendProps {
  translations: {
    sessions: string;
    newVisitors: string;
    returning: string;
  };
}

export function BarLineLegend({ translations }: BarLineLegendProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm bg-chart-3" />
        <span>{translations.sessions}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-chart-4" />
        <span>{translations.newVisitors}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-chart-5" />
        <span>{translations.returning}</span>
      </div>
    </div>
  );
}
