"use client";

import { Plus, Trash2, X } from "lucide-react";
import { useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { generateVariants } from "./utils/generate-variants";
import { VariantsTable } from "./variants-table";
import { formatNumber, toPersianDigits } from "@/utils/formatters";
import type { ProductVariant, VariantOption, VariantOptionType } from "./types";

type VariantsFormProps = {
  options: VariantOption[];
  variants: ProductVariant[];
  baseSku: string;
  locale: "fa" | "en";
  dictionary: {
    option: {
      name: string;
      values: string;
      addValue: string;
      remove: string;
      defaultName: string;
      defaultValue: string;
    };
    table: {
      variant: string;
      price: string;
      sku: string;
      quantity: string;
    };
  };
  onOptionsChange: Dispatch<SetStateAction<VariantOption[] | null>>;
  onVariantsChange: Dispatch<SetStateAction<ProductVariant[] | null>>;
};

export function VariantsForm({
  options,
  variants,
  baseSku,
  locale,
  dictionary,
  onOptionsChange,
  onVariantsChange,
}: VariantsFormProps) {
  const updateOptions = (
    updater: (options: VariantOption[]) => VariantOption[],
  ) => {
    onOptionsChange((currentOptions) => {
      const current = currentOptions ?? options;

      return updater(current);
    });
  };

  const updateOptionName = (optionId: string, name: string) => {
    const normalizedName = locale === "fa" ? toPersianDigits(name) : name;

    updateOptions((currentOptions) =>
      currentOptions.map((option) =>
        option.id === optionId
          ? {
              ...option,
              name: normalizedName,
            }
          : option,
      ),
    );
  };

  const removeOption = (optionId: string) => {
    updateOptions((currentOptions) =>
      currentOptions.filter((option) => option.id !== optionId),
    );
  };

  const addValue = (optionId: string) => {
    updateOptions((currentOptions) =>
      currentOptions.map((option) => {
        if (option.id !== optionId) {
          return option;
        }

        const valueNumber = option.values.length + 1;

        return {
          ...option,
          values: [
            ...option.values,
            {
              id: `value-${Date.now()}`,
              label: `${dictionary.option.defaultValue} ${formatNumber(
                valueNumber,
                locale,
              )}`,
              ...(option.type === "color"
                ? {
                    color: "#94a3b8",
                  }
                : {}),
            },
          ],
        };
      }),
    );
  };

  const updateValue = (optionId: string, valueId: string, label: string) => {
    const normalizedLabel = locale === "fa" ? toPersianDigits(label) : label;

    updateOptions((currentOptions) =>
      currentOptions.map((option) => {
        if (option.id !== optionId) return option;

        return {
          ...option,
          values: option.values.map((value) =>
            value.id === valueId ? { ...value, label: normalizedLabel } : value,
          ),
        };
      }),
    );
  };

  const updateValueColor = (
    optionId: string,
    valueId: string,
    color: string,
  ) => {
    updateOptions((currentOptions) =>
      currentOptions.map((option) => {
        if (option.id !== optionId) return option;

        return {
          ...option,
          values: option.values.map((value) =>
            value.id === valueId ? { ...value, color } : value,
          ),
        };
      }),
    );
  };

  const removeValue = (optionId: string, valueId: string) => {
    updateOptions((currentOptions) =>
      currentOptions.map((option) => {
        if (option.id !== optionId) {
          return option;
        }

        return {
          ...option,
          values: option.values.filter((value) => value.id !== valueId),
        };
      }),
    );
  };

  const generatedVariants = useMemo(
    () => generateVariants(options, baseSku),
    [options, baseSku],
  );

  const displayedVariants = useMemo(
    () =>
      generatedVariants.map((generatedVariant) => {
        const existingVariant = variants.find(
          (currentVariant) =>
            currentVariant.options.join(" / ") ===
            generatedVariant.options.join(" / "),
        );

        if (!existingVariant) {
          return generatedVariant;
        }

        return {
          ...generatedVariant,
          price: existingVariant.price,
          quantity: existingVariant.quantity,
          sku: existingVariant.sku,
        };
      }),
    [generatedVariants, variants],
  );

  const updateVariant = (
    variantId: string,
    field: "price" | "sku" | "quantity",
    value: number | string,
  ) => {
    onVariantsChange((currentVariants) => {
      const current = currentVariants ?? variants;

      const existingVariant = current.find(
        (variant) => variant.id === variantId,
      );

      if (existingVariant) {
        return current.map((variant) =>
          variant.id === variantId ? { ...variant, [field]: value } : variant,
        );
      }

      const generatedVariant = generatedVariants.find(
        (variant) => variant.id === variantId,
      );

      if (!generatedVariant) {
        return current;
      }

      return [
        ...current,
        {
          ...generatedVariant,
          [field]: value,
        },
      ];
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {options.map((option) => (
          <div
            key={option.id}
            className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-[180px_minmax(0,1fr)_auto]"
          >
            <Input
              value={option.name}
              onChange={(event) =>
                updateOptionName(option.id, event.target.value)
              }
              placeholder={dictionary.option.name}
            />

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {option.values.map((value) => (
                  <div
                    key={value.id}
                    className="flex items-center gap-2 rounded-md border bg-muted/40 px-2 py-1"
                  >
                    {option.type === "color" && (
                      <span className="relative block size-6 shrink-0">
                        <span
                          className="pointer-events-none block size-6 rounded-md border shadow-xs"
                          style={{ backgroundColor: value.color }}
                        />

                        <input
                          type="color"
                          value={value.color ?? "#94a3b8"}
                          onChange={(event) =>
                            updateValueColor(
                              option.id,
                              value.id,
                              event.target.value,
                            )
                          }
                          className="absolute inset-0 size-6 cursor-pointer opacity-0"
                          aria-label={value.label}
                        />
                      </span>
                    )}
                    <Input
                      value={value.label}
                      onChange={(event) =>
                        updateValue(option.id, value.id, event.target.value)
                      }
                      className="h-7 w-26 border-0 bg-muted! px-2 shadow-none focus-visible:ring-0 rounded-md!"
                    />

                    <button
                      type="button"
                      onClick={() => removeValue(option.id, value.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={`${dictionary.option.remove} ${value.label}`}
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addValue(option.id)}
                >
                  <Plus />
                  {dictionary.option.addValue}
                </Button>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeOption(option.id)}
              className="text-muted-foreground hover:text-destructive"
              aria-label={`${dictionary.option.remove} ${option.name}`}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>

      {options.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No options added yet.
        </div>
      )}

      {displayedVariants.length > 0 && (
        <VariantsTable
          variants={displayedVariants}
          dictionary={dictionary.table}
          locale={locale}
          onVariantChange={updateVariant}
        />
      )}
    </div>
  );
}
