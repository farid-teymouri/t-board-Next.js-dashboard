"use client";

import { Download, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { EcommerceInvoicesDictionary } from "@/i18n/dictionaries";

type EcommerceInvoicesHeaderActionsProps = {
  dictionary: EcommerceInvoicesDictionary["header"];
};

export function EcommerceInvoicesHeaderActions({
  dictionary,
}: EcommerceInvoicesHeaderActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center">
      <Button variant="default">
        <Plus />
        {dictionary.createInvoice}
      </Button>

      <Button variant="secondary">
        <Download />
        {dictionary.exportReport}
      </Button>
    </div>
  );
}
