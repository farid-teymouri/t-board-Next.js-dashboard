"use client";

import { Download, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { EcommerceProductsDictionary } from "@/i18n/dictionaries";

type EcommerceProductsHeaderActionsProps = {
  dictionary: EcommerceProductsDictionary["header"];
};

export function EcommerceProductsHeaderActions({
  dictionary,
}: EcommerceProductsHeaderActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center">
      <Button variant="default">
        <Plus />
        {dictionary.addProduct}
      </Button>

      <Button variant="secondary">
        <Download />
        {dictionary.exportReport}
      </Button>
    </div>
  );
}
