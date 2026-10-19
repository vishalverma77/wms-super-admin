import { useEffect, useMemo, useState } from "react";
import { Users, Target, TrendingUp, Compass } from "lucide-react";
import { Header } from "../../../components/Header";
import { StatsCard } from "../../../components/StatsCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTrafficRequest } from "../slice";
import { formatCompactNumber, resolveAnalyticsDateRange } from "../../../utils";
import {
  formatChannelName,
  getChannelColor,
} from "../utils";
import type {
  ChannelCardData,
  TopChannelData,
  CountryItem,
  ChartItem,
} from "../types";
import { ChannelAttributionSection } from "../components/ChannelAttributionSection";
import { CountryDistributionTable } from "../components/CountryDistributionTable";
import { DeviceBrowserCharts } from "../components/DeviceBrowserCharts";
import { trafficPageStyles } from "../styles";

export function TrafficSourcesPage() {
  const dispatch = useAppDispatch();
  const {
    data: traffic,
    loading,
    error,
  } = useAppSelector((state) => state.traffic);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [searchQuery, setSearchQuery] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const range = resolveAnalyticsDateRange(dateRange);
    dispatch(fetchTrafficRequest(range));
  }, [dispatch, dateRange, reloadToken]);

  const rawTrafficSources = useMemo<ChannelCardData[]>(() => {
    return Object.entries(traffic?.trafficSources || {}).map(
      ([key, value], idx) => ({
        key,
        name: formatChannelName(key),
        value: value.visitors,
        conversions: value.conversions,
        color: getChannelColor(key, idx),
        percentage: 0,
        convRate: "0.0",
      }),
    );
  }, [traffic]);

  const trafficSources = useMemo<ChannelCardData[]>(() => {
    if (!searchQuery.trim()) return rawTrafficSources;
    const q = searchQuery.toLowerCase();
    return rawTrafficSources.filter((item) =>
      item.name.toLowerCase().includes(q),
    );
  }, [rawTrafficSources, searchQuery]);

  const totalVisitors = useMemo<number>(() => {
    return rawTrafficSources.reduce((acc, curr) => acc + curr.value, 0);
  }, [rawTrafficSources]);

  const totalConversions = useMemo<number>(() => {
    return rawTrafficSources.reduce((acc, curr) => acc + curr.conversions, 0);
  }, [rawTrafficSources]);

  const avgConversionRate = useMemo<string>(() => {
    if (totalVisitors === 0) return "0.0%";
    return `${((totalConversions / totalVisitors) * 100).toFixed(1)}%`;
  }, [totalVisitors, totalConversions]);

  const topChannel = useMemo<TopChannelData | null>(() => {
    if (rawTrafficSources.length === 0) return null;
    const sorted = [...rawTrafficSources].sort((a, b) => b.value - a.value);
    const top = sorted[0];
    const percentage =
      totalVisitors > 0
        ? ((top.value / totalVisitors) * 100).toFixed(1)
        : "0.0";
    return { ...top, percentage };
  }, [rawTrafficSources, totalVisitors]);

  const channelCardsData = useMemo<ChannelCardData[]>(() => {
    return trafficSources.map((item) => {
      const percentage =
        totalVisitors > 0
          ? Number(((item.value / totalVisitors) * 100).toFixed(1))
          : 0;
      const convRate =
        item.value > 0
          ? ((item.conversions / item.value) * 100).toFixed(1)
          : "0.0";
      return {
        ...item,
        percentage,
        convRate,
      };
    });
  }, [trafficSources, totalVisitors]);

  const filteredCountries = useMemo<CountryItem[]>(() => {
    const rawCountries = traffic?.countries || [];
    if (!searchQuery.trim()) return rawCountries;
    const q = searchQuery.toLowerCase();
    return rawCountries.filter((c) =>
      c.country.toLowerCase().includes(q),
    );
  }, [traffic?.countries, searchQuery]);

  const deviceData = useMemo<ChartItem[]>(() => {
    const list = Object.entries(traffic?.devices || {}).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      visitors: value,
    }));
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((item) => item.name.toLowerCase().includes(q));
  }, [traffic, searchQuery]);

  const browserData = useMemo<ChartItem[]>(() => {
    const list = Object.entries(traffic?.browsers || {}).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      visitors: value,
    }));
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((item) => item.name.toLowerCase().includes(q));
  }, [traffic, searchQuery]);

  if (loading && !traffic) {
    return (
      <>
        <Header
          title="Traffic Sources Analytics"
          subtitle="Channel attribution, geographic distribution, and device breakdowns."
          dateRange={dateRange}
          setDateRange={setDateRange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search traffic channels, countries, devices..."
        />
        <div className="card" style={trafficPageStyles.loadingCard}>
          <div style={trafficPageStyles.spinner} />
          <span style={trafficPageStyles.loadingText}>
            Loading traffic analytics...
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        title="Traffic Sources Analytics"
        subtitle="Channel attribution, geographic distribution, and device breakdowns."
        dateRange={dateRange}
        setDateRange={setDateRange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search traffic channels, countries, devices..."
        onRefresh={() => setReloadToken((prev) => prev + 1)}
      />

      {error ? (
        <div style={trafficPageStyles.errorBanner}>{error}</div>
      ) : null}

      {/* Top High-Level KPI Stats Cards */}
      <div style={trafficPageStyles.kpiGrid}>
        <StatsCard
          title="TOTAL VISITORS"
          value={formatCompactNumber(totalVisitors)}
          icon={Users}
          color="primary"
          trend="+14.2%"
          actionText="All channels tracked"
        />
        <StatsCard
          title="TOTAL CONVERSIONS"
          value={formatCompactNumber(totalConversions)}
          icon={Target}
          color="secondary"
          trend={totalConversions > 0 ? `${totalConversions} total` : "0 completed"}
          actionText="Funnel goal conversions"
        />
        <StatsCard
          title="AVG CONVERSION RATE"
          value={avgConversionRate}
          icon={TrendingUp}
          color="purple"
          trend="+2.1%"
          actionText="Visitor to conversion ratio"
        />
        <StatsCard
          title="TOP TRAFFIC SOURCE"
          value={topChannel ? topChannel.name : "N/A"}
          icon={Compass}
          color="primary"
          trend={topChannel ? `${topChannel.percentage}% share` : undefined}
          actionText={
            topChannel
              ? `${formatCompactNumber(topChannel.value)} visitors`
              : "Leading channel"
          }
        />
      </div>

      {/* Channel Attribution Section */}
      <ChannelAttributionSection
        trafficSources={channelCardsData}
        totalVisitors={totalVisitors}
        loading={loading}
      />

      {/* Geographic Distribution (Countries) Table */}
      <CountryDistributionTable
        countries={filteredCountries}
        searchQuery={searchQuery}
      />

      {/* Device & Browser Breakdowns */}
      <DeviceBrowserCharts
        deviceData={deviceData}
        browserData={browserData}
      />
    </>
  );
}
