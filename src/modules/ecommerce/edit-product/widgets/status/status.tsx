"use client";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useProductStatus } from "../../hooks/use-product-status";

import { StatusForm } from "./status-form";
import { StatusSkeleton } from "./status-skeleton";

type StatusProps = {
  dictionary: EcommerceEditProductDictionary["status"];
};

export function Status({ dictionary }: StatusProps) {
  const { data, isLoading } = useProductStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <StatusSkeleton />
        ) : data ? (
          <StatusForm data={data} dictionary={dictionary} />
        ) : null}
      </CardContent>
    </Card>
  );
}
