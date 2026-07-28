export type AnalyticsQuery = {
  fromDate?: string;
  toDate?: string;
};

export type AnalyticsOverviewData = {
  totalVisitors: number;
  activeVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  pageViews: number;
  sessions: number;
  averageSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  ctaClickRate: number;
  visitorTrend: Array<{
    date: string;
    visitors: number;
  }>;
};

export type AnalyticsOverviewState = {
  data: AnalyticsOverviewData | null;
  loading: boolean;
  error: string | null;
};
