export interface TrafficChannelsResponse {
  totalVisitors: number;
  channels: {
    organicSearch: number;
    direct: number;
    social: number;
    referral: number;
    paid: number;
  };
}
