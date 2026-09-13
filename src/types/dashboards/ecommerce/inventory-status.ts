export type InventoryStatusItem = {
  id: string;
  label: string;
  value: number;
};

export type InventoryStatusResponse = {
  total: number;
  items: InventoryStatusItem[];
  belowReorderThreshold: number;
};
