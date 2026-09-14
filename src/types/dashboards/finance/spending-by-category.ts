export type SpendingByCategoryItem = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export type SpendingByCategoryData = {
  total: {
    value: number;
    label: string;
  };
  items: SpendingByCategoryItem[];
};
