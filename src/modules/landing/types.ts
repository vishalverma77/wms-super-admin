export type AnalyticsQuery = {
  fromDate?: string;
  toDate?: string;
};

export type AnalyticsLandingData = {
  sectionAnalytics: Record<
    string,
    { views: number; averageTime: number; interactions: number }
  >;
  landingFunnel: {
    landingViewed: number;
    scroll25: number;
    scroll50: number;
    scroll75: number;
    scroll100: number;
    ctaClick: number;
    formStarted: number;
    formSubmitted: number;
    dropOff: Record<string, number>;
  };
  pagePerformance: {
    mostViewedPages: Array<{
      path: string;
      views: number;
      activeUsers: number;
    }>;
    leastViewedPages: Array<{
      path: string;
      views: number;
      activeUsers: number;
    }>;
  };
  sectionPerformance: {
    mostActiveSections: Array<{
      section: string;
      views: number;
      interactions: number;
      averageTime: number;
    }>;
    leastActiveSections: Array<{
      section: string;
      views: number;
      interactions: number;
      averageTime: number;
    }>;
  };
  ctaPerformance: Record<
    string,
    { views: number; clicks: number; ctr: number; conversion: number }
  >;
  serviceInterest: Record<
    string,
    { views: number; clicks: number; ctr: number }
  >;
};

export type AnalyticsLandingState = {
  data: AnalyticsLandingData | null;
  loading: boolean;
  error: string | null;
};
