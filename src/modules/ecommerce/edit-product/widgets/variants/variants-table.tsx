"use client";
import { useState, useRef } from "react";
import { formatNumber, parseNumber, toPersianDigits } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import type { ProductVariant } from "./types";
import { Input } from "@/components/ui/input";

type VariantsTableDictionary = {
  variant: string;
  price: string;
  sku: string;
  quantity: string;
};

type VariantsTableProps = {
  variants: ProductVariant[];
  dictionary: VariantsTableDictionary;
  locale: "fa" | "en";
  onVariantChange: (
    variantId: string,
    field: "price" | "sku" | "quantity",
    value: number | string,
  ) => void;
};

export function VariantsTable({
  variants,
  dictionary,
  locale,
  onVariantChange,
}: VariantsTableProps) {
  const [draftValues, setDraftValues] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const getDraftValue = (
    variantId: string,
    field: "price" | "quantity",
    value: number,
  ) => {
    const key = `${variantId}-${field}`;

    return draftValues[key] ?? formatNumber(value, locale);
  };

  const updateDraftValue = (
    variantId: string,
    field: "price" | "quantity",
    value: string,
    cursorPosition: number | null,
  ) => {
    const key = `${variantId}-${field}`;

    const normalizedValue = locale === "fa" ? toPersianDigits(value) : value;

    const digitsBeforeCursor = normalizedValue
      .slice(0, cursorPosition ?? normalizedValue.length)
      .replace(/\D/g, "").length;

    const numericValue = parseNumber(normalizedValue);
    const formattedValue =
      normalizedValue === "" ? "" : formatNumber(numericValue, locale);

    setDraftValues((current) => ({
      ...current,
      [key]: formattedValue,
    }));

    onVariantChange(
      variantId,
      field,
      normalizedValue === "" ? 0 : numericValue,
    );

    requestAnimationFrame(() => {
      const input = inputRefs.current[key];

      if (!input) return;

      let position = 0;
      let digitCount = 0;

      while (
        position < formattedValue.length &&
        digitCount < digitsBeforeCursor
      ) {
        if (/\d/.test(formattedValue[position])) {
          digitCount++;
        }

        position++;
      }

      input.setSelectionRange(position, position);
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="w-[42%] px-4 py-3 text-start font-medium">
              {dictionary.variant}
            </th>

            <th className="w-[24%] px-4 py-3 text-start font-medium">
              {dictionary.price}
            </th>

            <th className="w-[22%] px-4 py-3 text-start font-medium">
              {dictionary.sku}
            </th>

            <th className="w-[12%] px-4 py-3 text-start font-medium">
              {dictionary.quantity}
            </th>
          </tr>
        </thead>

        <tbody>
          {variants.map((variant) => (
            <tr key={variant.id} className="border-b last:border-b-0">
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {variant.options.map((option, index) => (
                    <Badge
                      key={`${variant.id}-${option}-${index}`}
                      variant="secondary"
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="relative">
                  <Input
                    ref={(element) => {
                      inputRefs.current[`${variant.id}-price`] = element;
                    }}
                    type="text"
                    inputMode="decimal"
                    value={getDraftValue(variant.id, "price", variant.price)}
                    onChange={(event) =>
                      updateDraftValue(
                        variant.id,
                        "price",
                        event.target.value,
                        event.target.selectionStart,
                      )
                    }
                    onBlur={() => {
                      setDraftValues((current) => {
                        const next = { ...current };

                        delete next[`${variant.id}-price`];

                        return next;
                      });
                    }}
                    className="h-9 pe-12"
                  />

                  <span className="absolute inset-y-0 inset-e-0 border rounded-e-lg flex items-center bg-background px-2 text-sm text-muted-foreground">
                    {locale === "fa" ? "تومان" : "IRT"}
                  </span>
                </div>
              </td>

              <td className="px-4 py-3">
                <Input
                  type="text"
                  value={variant.sku}
                  onChange={(event) =>
                    onVariantChange(variant.id, "sku", event.target.value)
                  }
                  className="h-9"
                />
              </td>

              <td className="px-4 py-3">
                <Input
                  ref={(element) => {
                    inputRefs.current[`${variant.id}-quantity`] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  value={getDraftValue(
                    variant.id,
                    "quantity",
                    variant.quantity,
                  )}
                  onChange={(event) =>
                    updateDraftValue(
                      variant.id,
                      "quantity",
                      event.target.value,
                      event.target.selectionStart,
                    )
                  }
                  onBlur={() => {
                    setDraftValues((current) => {
                      const next = { ...current };

                      delete next[`${variant.id}-quantity`];

                      return next;
                    });
                  }}
                  className="h-9"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
