export interface ConversionFunnelItem {
  id: number;
  name: string;
  value: number;
}

export interface ConversionFunnelResponse {
  items: ConversionFunnelItem[];
}
