import type { Currency } from "@/utils/currency";

export type RecentOrderStatus =
  | "delivered"
  | "shipped"
  | "processing"
  | "refunded";

export type RecentOrder = {
  id: string;
  orderNumber: string;

  customer: {
    name: string;
    itemCount: number;
    itemsLabel: string;
  };

  date: string;

  total: {
    value: number;
    currency: Currency;
  };

  status: {
    value: RecentOrderStatus;
    label: string;
  };
};

export type RecentOrdersResponse = {
  columns: {
    order: string;
    customer: string;
    date: string;
    total: string;
    status: string;
  };

  data: RecentOrder[];
};
