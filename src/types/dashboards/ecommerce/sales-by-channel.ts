export interface SalesByChannelItem {
  id: number;
  name: string;
  value: number;
  progress: number;
}

export interface SalesByChannelResponse {
  items: SalesByChannelItem[];
}
