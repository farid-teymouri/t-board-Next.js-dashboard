"use client";

import { CalendarDays, ChevronDown, Download, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

type AnalyticsHeaderActionsProps = {
  dictionary: AnalyticsDashboardDictionary["header"];
};

export function AnalyticsHeaderActions({
  dictionary,
}: AnalyticsHeaderActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center">
      <Button variant="secondary">
        <CalendarDays />
        {dictionary.last30Days}
        <ChevronDown />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        aria-label={dictionary.refresh}
        className="text-chart-3"
      >
        <RefreshCw />
      </Button>

      <Button variant="default">
        <Download />
        {dictionary.exportReport}
      </Button>
    </div>
  );
}
