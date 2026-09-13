"use client";

import { CalendarDays, ChevronDown, Download, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

type SalesHeaderActionsProps = {
  dictionary: SalesDashboardDictionary["header"];
};

export function SalesHeaderActions({ dictionary }: SalesHeaderActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center">
      <Button variant="secondary">
        <CalendarDays />
        {dictionary.last30Days}
        <ChevronDown />
      </Button>
      <Button variant="secondary">
        <Download />
        {dictionary.export}
      </Button>
      <Button variant="default">
        <Plus />
        {dictionary.newImport}
      </Button>
    </div>
  );
}
