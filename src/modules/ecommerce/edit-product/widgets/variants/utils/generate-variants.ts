import type {
  ProductVariant,
  VariantOption,
  VariantOptionValue,
} from "../types";

export function generateVariants(
  options: VariantOption[],
  baseSku: string,
): ProductVariant[] {
  const validOptions = options.filter((option) => option.values.length > 0);

  if (validOptions.length === 0) {
    return [];
  }

  const combinations = validOptions.reduce<VariantOptionValue[][]>(
    (combinations, option) => {
      if (combinations.length === 0) {
        return option.values.map((value) => [value]);
      }

      return combinations.flatMap((combination) =>
        option.values.map((value) => [...combination, value]),
      );
    },
    [],
  );

  return combinations.map((combination, index) => ({
    id: `variant-${index + 1}`,
    options: combination.map((value) => value.label),
    price: 0,
    sku: `${baseSku}-${index + 1}`,
    quantity: 0,
  }));
}
