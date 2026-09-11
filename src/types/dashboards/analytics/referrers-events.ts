export interface AnalyticsReferrer {
  id: string;
  domain: string;
  category: string;
  value: number;
}

export type AnalyticsRecentEventType = "success" | "info" | "warning";

export interface AnalyticsRecentEvent {
  id: string;
  type: AnalyticsRecentEventType;
  label: string;
  emphasized?: string;
  suffix?: string;
  meta: string;
}

export interface AnalyticsReferrersEventsResponse {
  topReferrers: AnalyticsReferrer[];
  recentEvents: AnalyticsRecentEvent[];
}
