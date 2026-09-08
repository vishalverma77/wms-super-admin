export type AnalyticsQuery = {
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  event?: string;
};

export type AnalyticsEventsData = {
  items: Array<{
    time: string;
    event: string;
    section: string;
    device: string;
    browser: string;
    country: string;
    page: string;
  }>;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AnalyticsEventsState = {
  data: AnalyticsEventsData | null;
  loading: boolean;
  error: string | null;
};
