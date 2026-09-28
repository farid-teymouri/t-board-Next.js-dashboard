"use client";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useInventory } from "../../hooks/use-inventory";

import { InventoryForm } from "./inventory-form";
import { InventorySkeleton } from "./inventory-skeleton";

type InventoryProps = {
  dictionary: EcommerceEditProductDictionary["inventory"];
  locale: "fa" | "en";
};

export function Inventory({ dictionary, locale }: InventoryProps) {
  const { data, isLoading } = useInventory();

  if (isLoading || !data) {
    return <InventorySkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <InventoryForm data={data} dictionary={dictionary} locale={locale} />
      </CardContent>
    </Card>
  );
}
