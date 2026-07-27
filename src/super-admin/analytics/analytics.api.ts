import axios from "axios";

import { ENDPOINTS } from "../../api/endpoints";

export type AnalyticsQuery = {
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  event?: string;
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

export type AnalyticsLandingData = {
  sectionAnalytics: Record<string, { views: number; averageTime: number; interactions: number }>;
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
  ctaPerformance: Record<string, { views: number; clicks: number; ctr: number; conversion: number }>;
  serviceInterest: Record<string, { views: number; clicks: number; ctr: number }>;
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

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(url: string, params?: AnalyticsQuery): Promise<T> {
  const response = await axios.get<ApiEnvelope<T>>(url, {
    params,
    headers: getAuthHeaders(),
  });

  return response.data.data ?? (response.data as T);
}

export function fetchAnalyticsOverview(params?: AnalyticsQuery) {
  return request<AnalyticsOverviewData>(ENDPOINTS.analytics.overview, params);
}

export function fetchAnalyticsLanding(params?: AnalyticsQuery) {
  return request<AnalyticsLandingData>(ENDPOINTS.analytics.landing, params);
}

export function fetchAnalyticsTraffic(params?: AnalyticsQuery) {
  return request<AnalyticsTrafficData>(ENDPOINTS.analytics.traffic, params);
}

export function fetchAnalyticsEvents(params?: AnalyticsQuery) {
  return request<AnalyticsEventsData>(ENDPOINTS.analytics.events, params);
}
