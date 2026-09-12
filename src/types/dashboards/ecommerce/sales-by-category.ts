export interface SalesByCategoryResponse {
  netSales: number;

  categories: {
    apparel: number;
    electronics: number;
    homeLiving: number;
    beauty: number;
    other: number;
  };
}
