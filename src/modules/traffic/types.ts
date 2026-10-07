export type AnalyticsQuery = {
  fromDate?: string;
  toDate?: string;
};

export type TrafficSourceMetric = {
  visitors: number;
  conversions: number;
};

export interface CountryItem {
  country: string;
  visitors: number;
  conversions: number;
  averageSession: number;
}

export type AnalyticsTrafficData = {
  trafficSources: Record<string, TrafficSourceMetric>;
  countries: Array<CountryItem>;
  devices: Record<string, number>;
  browsers: Record<string, number>;
};

export type AnalyticsTrafficState = {
  data: AnalyticsTrafficData | null;
  loading: boolean;
  error: string | null;
};

export interface ChannelCardData {
  key?: string;
  name: string;
  value: number;
  conversions: number;
  color: string;
  percentage: number | string;
  convRate: string;
}

export interface TopChannelData extends ChannelCardData {
  percentage: string;
}

export interface ChannelStatCardProps {
  item: ChannelCardData;
}

export interface ChannelAttributionSectionProps {
  trafficSources: ChannelCardData[];
  totalVisitors: number;
  loading: boolean;
}

export interface CountryDistributionTableProps {
  countries: CountryItem[];
  searchQuery: string;
}

export interface ChartItem {
  name: string;
  visitors: number;
}

export interface DeviceBrowserChartsProps {
  deviceData: ChartItem[];
  browserData: ChartItem[];
}

export type ApiErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};
