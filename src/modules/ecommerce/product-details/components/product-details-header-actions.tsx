"use client";

import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

type EcommerceProductDetailsHeaderActionsProps = {
  dictionary: EcommerceProductDetailsDictionary["header"];
};

export function EcommerceProductDetailsHeaderActions({
  dictionary,
}: EcommerceProductDetailsHeaderActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center">
      <Link href="/ecommerce/products">
        <Button variant="secondary">
          <ArrowLeft />
          {dictionary.backToProducts}
        </Button>
      </Link>

      <Link href="">
        <Button variant="default">
          <Pencil />
          {dictionary.editProduct}
        </Button>
      </Link>
    </div>
  );
}
