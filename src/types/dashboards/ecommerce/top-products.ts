export type TopProductIcon = "headphones" | "shirt" | "sparkles" | "flower";

export interface TopProduct {
  id: number;
  name: string;
  translationKey:
    | "auroraWirelessBuds"
    | "linenOversizedTee"
    | "hydraGlowSerum"
    | "matteCeramicPlanter";
  category: string;
  value: number;
  progress: number;
  amount: number;
  icon: TopProductIcon;
}

export interface TopProductsResponse {
  items: TopProduct[];
}
