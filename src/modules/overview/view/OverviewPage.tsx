import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Users, Eye, Activity, Clock, Target } from "lucide-react";

import { Header } from "../../../components/Header";
import { KpiCard } from "../../../components/KpiCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchOverviewRequest } from "../slice";
import {
  formatCompactNumber,
  formatDurationSeconds,
  formatPercentage,
  resolveAnalyticsDateRange,
} from "../../../utils";

export function OverviewPage() {
  const dispatch = useAppDispatch();
  const {
    data: dashboard,
    loading,
    error,
  } = useAppSelector((state) => state.overview);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const range = resolveAnalyticsDateRange(dateRange);
    dispatch(fetchOverviewRequest(range));
  }, [dispatch, dateRange, reloadToken]);

  if (loading && !dashboard) {
    return (
      <>
        <Header
          title="Overview Analytics"
          subtitle="General system metrics, user growth, sessions, and engagement."
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        <div
          className="card"
          style={{
            padding: 48,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 320,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              border: "3px solid #e2e8f0",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              marginBottom: 16,
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 600, color: "#64748b" }}>
            Loading analytics overview...
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        title="Overview Analytics"
        subtitle="General system metrics, user growth, sessions, and engagement."
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={() => setReloadToken((prev) => prev + 1)}
      />

      {error ? (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #f87171",
            color: "#991b1b",
            padding: 14,
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      ) : null}

      {/* KPI Cards */}
      <div className="kgrid kg4" style={{ marginBottom: 24 }}>
        <KpiCard
          label="Total Visitors"
          value={formatCompactNumber(dashboard?.totalVisitors)}
          description="Unique visitors in period"
          icon={Users}
          colorTheme="b"
        />
        <KpiCard
          label="Active Visitors"
          value={formatCompactNumber(dashboard?.activeVisitors)}
          description="Currently active / recent"
          icon={Activity}
          colorTheme="g"
        />
        <KpiCard
          label="Page Views"
          value={formatCompactNumber(dashboard?.pageViews)}
          description={`Sessions: ${formatCompactNumber(dashboard?.sessions)}`}
          icon={Eye}
          colorTheme="t"
        />
        <KpiCard
          label="Avg Session Duration"
          value={formatDurationSeconds(dashboard?.averageSessionDuration)}
          description={`Bounce Rate: ${formatPercentage(dashboard?.bounceRate)}`}
          icon={Clock}
          colorTheme="w"
        />
      </div>

      <div className="kgrid kg3" style={{ marginBottom: 24 }}>
        <KpiCard
          label="Conversion Rate"
          value={formatPercentage(dashboard?.conversionRate)}
          description="Goal completion ratio"
          icon={Target}
          colorTheme="g"
        />
        <KpiCard
          label="CTA Click Rate"
          value={formatPercentage(dashboard?.ctaClickRate)}
          description="Primary call-to-action clicks"
          icon={Target}
          colorTheme="b"
        />
        <KpiCard
          label="New vs Returning"
          value={`${formatCompactNumber(dashboard?.newVisitors)} / ${formatCompactNumber(dashboard?.returningVisitors)}`}
          description="New visitors / Returning visitors"
          icon={Users}
          colorTheme="t"
        />
      </div>

      {/* Visitor Trend Chart */}
      <div className="card" style={{ padding: "20px 24px", marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
              Visitor Trend
            </h3>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "0.85rem",
                color: "#64748b",
              }}
            >
              Daily unique visitor volume over selected range
            </p>
          </div>
        </div>

        <div style={{ width: "100%", height: 320 }}>
          {dashboard?.visitorTrend && dashboard.visitorTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dashboard.visitorTrend}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="visitorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#60a5fa" }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#visitorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div
              style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
              }}
            >
              {loading ? "Loading chart data..." : "No trend data available."}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
