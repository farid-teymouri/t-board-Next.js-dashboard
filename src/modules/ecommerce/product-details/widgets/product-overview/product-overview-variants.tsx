"use client";

import { cn } from "@/lib/utils";

import type {
  ProductOverviewVariantOption,
  ProductOverviewVariantValue,
} from "./types";
import type { ProductOverviewVariants } from "./types";
type ProductOverviewVariantsProps = {
  locale: "fa" | "en";
  variants?: ProductOverviewVariants;
  isLoading: boolean;
  isError: boolean;
  selectedValues: Record<string, string>;
  onSelectionChange: (values: Record<string, string>) => void;
};

export function ProductOverviewVariants({
  locale,
  variants,
  isLoading,
  isError,
  selectedValues,
  onSelectionChange,
}: ProductOverviewVariantsProps) {
  if (isLoading || isError || !variants) {
    return null;
  }

  const options = variants.options;

  const handleSelect = (
    option: ProductOverviewVariantOption,
    value: ProductOverviewVariantValue,
  ) => {
    if (value.disabled) {
      return;
    }

    onSelectionChange({
      ...selectedValues,
      [option.id]: value.id,
    });
  };
  return (
    <div className="space-y-5">
      {variants.options.map((option) => {
        const selectedValue = selectedValues[option.id];

        return (
          <div key={option.id} className="space-y-3">
            <div className="text-sm font-medium">{option.name[locale]}</div>

            <div className="flex flex-wrap gap-4">
              {option.values.map((value) => {
                const isSelected = selectedValue === value.id;
                const isDisabled = value.disabled;

                if (option.type === "color") {
                  return (
                    <button
                      key={value.id}
                      type="button"
                      aria-label={value.label[locale]}
                      aria-pressed={isSelected}
                      disabled={isDisabled}
                      onClick={() => handleSelect(option, value)}
                      className={cn(
                        "flex flex-col items-center gap-1.5",
                        isDisabled && "cursor-not-allowed opacity-50",
                      )}
                    >
                      <span className="text-xs text-muted-foreground">
                        {value.label[locale]}
                      </span>
                      <span
                        className={cn(
                          "relative flex size-9 items-center justify-center rounded-full border-2 p-0.5 transition-colors",
                          isSelected ? "border-foreground" : "border-border",
                          !isDisabled &&
                            !isSelected &&
                            "hover:border-muted-foreground/50",
                        )}
                      >
                        <span
                          className={cn(
                            "size-full rounded-full border border-black/20 dark:border-white/20",
                            isDisabled && "opacity-50",
                          )}
                          style={{
                            backgroundColor: value.color,
                          }}
                        />

                        {isDisabled && (
                          <span className="absolute h-px w-8 rotate-45 bg-muted-foreground" />
                        )}
                      </span>
                    </button>
                  );
                }

                return (
                  <button
                    key={value.id}
                    type="button"
                    aria-pressed={isSelected}
                    disabled={isDisabled}
                    onClick={() => handleSelect(option, value)}
                    className={cn(
                      "rounded-md border px-2 py-1 text-sm transition-colors",
                      isSelected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background hover:bg-muted",
                      isDisabled &&
                        "cursor-not-allowed opacity-50 hover:bg-background",
                    )}
                  >
                    {value.label[locale]}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
