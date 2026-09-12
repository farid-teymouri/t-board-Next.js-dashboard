"use client";

import { CalendarDays, ChevronDown, RefreshCw } from "lucide-react";
import { Plus } from "@deemlol/next-icons";
import { Button } from "@/components/ui/button";
import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

type EcommerceHeaderActionsProps = {
  dictionary: EcommerceDashboardDictionary["header"];
};

export function EcommerceHeaderActions({
  dictionary,
}: EcommerceHeaderActionsProps) {
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
        {dictionary.addProduct}
      </Button>
    </div>
  );
}
