export type QuickActionType =
  | "add-product"
  | "new-order"
  | "export-csv"
  | "discount"
  | "fulfil"
  | "collections";

export type QuickActionApiItem = {
  id: string;
  label: string;
  type: QuickActionType;
};

export type QuickActionsResponse = {
  eyebrow: string;
  title: string;
  customise: string;
  actions: QuickActionApiItem[];
};
