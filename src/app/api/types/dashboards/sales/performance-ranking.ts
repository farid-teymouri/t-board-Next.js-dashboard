export interface PerformanceRankingItem {
  id: number;
  name: string;
  category?: string;
  description?: string;
  value: number;
  progress: number;
  amount?: number;
}
export interface PerformanceRankingResponse {
  items: PerformanceRankingItem[];
  currency?: { code: string; label: string };
}
