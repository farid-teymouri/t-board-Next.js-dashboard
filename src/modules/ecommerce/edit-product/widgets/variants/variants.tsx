"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  ProductVariant,
  VariantOption,
  VariantOptionType,
  VariantsDictionary,
} from "./types";
import { formatNumber } from "@/utils/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useVariants } from "../../hooks/use-variants";

import { VariantsForm } from "./variants-form";
import { VariantsSkeleton } from "./variants-skeleton";

type VariantsProps = {
  dictionary: VariantsDictionary;
  locale: "fa" | "en";
};

export function Variants({ dictionary, locale }: VariantsProps) {
  const { data, isLoading, isError } = useVariants(locale);
  const [options, setOptions] = useState<VariantOption[] | null>(null);
  const [variants, setVariants] = useState<ProductVariant[] | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{dictionary.title}</CardTitle>
          <CardDescription>{dictionary.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <VariantsSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{dictionary.title}</CardTitle>
          <CardDescription>{dictionary.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-destructive">Failed to load variants.</p>
        </CardContent>
      </Card>
    );
  }

  const handleAddOption = (type: VariantOptionType) => {
    setOptions((currentOptions) => [
      ...(currentOptions ?? data.options),
      {
        id: `option-${Date.now()}`,
        name: `${dictionary.option.defaultName} ${formatNumber(
          (currentOptions ?? data.options).length + 1,
          locale,
        )}`,
        type,
        values: [],
      },
    ]);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1.5">
          <CardTitle>{dictionary.title}</CardTitle>

          <CardDescription>{dictionary.description}</CardDescription>
        </div>

        <Popover>
          <PopoverTrigger className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90">
            <Plus />
            {dictionary.addOption}
          </PopoverTrigger>

          <PopoverPositioner>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-1">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleAddOption("color")}
                >
                  {dictionary.optionTypes.color}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleAddOption("text")}
                >
                  {dictionary.optionTypes.text}
                </Button>
              </div>
            </PopoverContent>
          </PopoverPositioner>
        </Popover>
      </CardHeader>

      <CardContent>
        <VariantsForm
          options={options ?? data.options}
          variants={variants ?? data.variants}
          baseSku={data.baseSku}
          locale={locale}
          dictionary={dictionary}
          onOptionsChange={setOptions}
          onVariantsChange={setVariants}
        />
      </CardContent>
    </Card>
  );
}
