export type ProductStatus = "active" | "draft" | "scheduled";

export type ProductSalesChannels = {
  onlineStore: boolean;
  pointOfSale: boolean;
  socialMarketplaces: boolean;
};

export type ProductStatusData = {
  status: ProductStatus;
  salesChannels: ProductSalesChannels;
};
