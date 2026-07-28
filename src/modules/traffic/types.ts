export type AnalyticsQuery = {
  fromDate?: string;
  toDate?: string;
};

export type AnalyticsTrafficData = {
  trafficSources: Record<string, { visitors: number; conversions: number }>;
  countries: Array<{
    country: string;
    visitors: number;
    conversions: number;
    averageSession: number;
  }>;
  devices: Record<string, number>;
  browsers: Record<string, number>;
};

export type AnalyticsTrafficState = {
  data: AnalyticsTrafficData | null;
  loading: boolean;
  error: string | null;
};
