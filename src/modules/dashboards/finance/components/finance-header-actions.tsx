"use client";

import { CalendarDays, ChevronDown, RefreshCw } from "lucide-react";
import { Plus } from "@deemlol/next-icons";
import { Button } from "@/components/ui/button";
import type { FinanceDashboardDictionary } from "@/i18n/dictionaries";

type FinanceHeaderActionsProps = {
  dictionary: FinanceDashboardDictionary["header"];
};

export function FinanceHeaderActions({
  dictionary,
}: FinanceHeaderActionsProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
        <Plus />
        {dictionary.addTransacton}
      </Button>
    </div>
  );
}
