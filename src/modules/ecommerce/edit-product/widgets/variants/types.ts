export type VariantOptionType = "text" | "color";

export type VariantOptionValue = {
  id: string;
  label: string;
  color?: string;
};

export type VariantOption = {
  id: string;
  name: string;
  type: VariantOptionType;
  values: VariantOptionValue[];
};

export type ProductVariant = {
  id: string;
  options: string[];
  price: number;
  sku: string;
  quantity: number;
};

export type VariantsData = {
  baseSku: string;
  options: VariantOption[];
  variants: ProductVariant[];
};

export type VariantsDictionary = {
  title: string;
  description: string;
  addOption: string;
  optionTypes: {
    color: string;
    text: string;
  };
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
