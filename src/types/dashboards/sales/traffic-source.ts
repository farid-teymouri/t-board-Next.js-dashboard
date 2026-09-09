export interface TrafficSource {
  id: number;
  name: string;
  category?: string;
  description?: string;
  value: number;
  progress: number;
}

export interface TrafficSourcesResponse {
  items: TrafficSource[];
}
