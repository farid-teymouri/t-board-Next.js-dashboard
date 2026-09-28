"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useDangerZone } from "../../hooks/use-danger-zone";

import { DangerZoneSkeleton } from "./danger-zone-skeleton";
import type { DangerZoneDictionary } from "./types";

type DangerZoneProps = {
  dictionary: DangerZoneDictionary;
  locale: "fa" | "en";
};

export function DangerZone({ dictionary, locale }: DangerZoneProps) {
  const { data, isLoading } = useDangerZone();

  if (isLoading) {
    return <DangerZoneSkeleton />;
  }

  const numberFormatter = new Intl.NumberFormat(locale);

  return (
    <Card className="shadow-[0_0_0_2px_var(--destructive)]">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-semibold text-destructive">
          {dictionary.title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {dictionary.description}
        </p>
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          {dictionary.salesAndReviews
            .replace(
              "{sales}",
              numberFormatter.format(data?.lifetimeSales ?? 0),
            )
            .replace("{reviews}", numberFormatter.format(data?.reviews ?? 0))}
        </p>
        <Button variant="destructive">
          <Trash2 />
          {dictionary.deleteProduct}
        </Button>
      </CardContent>
    </Card>
  );
}
