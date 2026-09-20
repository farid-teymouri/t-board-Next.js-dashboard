"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { EcommerceCheckoutDictionary } from "@/i18n/dictionaries";

type EcommerceCheckoutHeaderActionsProps = {
  dictionary: EcommerceCheckoutDictionary["header"];
};

export function EcommerceCheckoutHeaderActions({
  dictionary,
}: EcommerceCheckoutHeaderActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center">
      <Button variant="secondary">
        <ArrowLeft />
        {dictionary.backToCart}
      </Button>
    </div>
  );
}
