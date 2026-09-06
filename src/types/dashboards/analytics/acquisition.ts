export interface AnalyticsAcquisitionItem {
  month: number;
  sessions: number;
  newVisitors: number;
  returning: number;
}

export interface AnalyticsAcquisitionResponse {
  data: AnalyticsAcquisitionItem[];
}
