export type InventoryLocation = {
  id: string;
  name: {
    en: string;
    fa: string;
  };
};

export type InventoryData = {
  sku: string;
  barcode: string;
  trackQuantity: boolean;
  quantity: number;
  lowStockAlertAt: number;
  location: InventoryLocation;
  locations: InventoryLocation[];
};
