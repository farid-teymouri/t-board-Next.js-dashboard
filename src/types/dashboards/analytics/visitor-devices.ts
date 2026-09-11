export interface VisitorDevicesResponse {
  totalVisitors: number;
  devices: { mobile: number; desktop: number; tablet: number };
}
