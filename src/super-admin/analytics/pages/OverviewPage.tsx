import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import {
  Users,
  Eye,
  Activity,
  Clock,
  Target
} from "lucide-react";

import {
  kpiData,
  visitorAnalyticsTrend
} from "../mockData";

import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { KpiCard } from "../components/KpiCard";

export function OverviewPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [timeFilter, setTimeFilter] = useState<"24H" | "7D" | "30D" | "90D">("30D");

  const activeTrendData = visitorAnalyticsTrend[timeFilter];

  return (
    <>
      <AnalyticsHeader
        title="Analytics Overview"
        subtitle="Executive summary · Real-time traffic analytics & session insights"
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Core KPI Cards Grid */}
      <div className="kgrid kg5" style={{ marginBottom: 24, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <KpiCard
          label={kpiData.totalVisitors.label}
          value={kpiData.totalVisitors.value}
          icon={Users}
          colorTheme="b"
          description="Total visits"
        />
        <KpiCard
          label={kpiData.uniqueVisitors.label}
          value={kpiData.uniqueVisitors.value}
          icon={Target}
          colorTheme="t"
          description="Unique session IDs"
        />
        <KpiCard
          label={kpiData.pageViews.label}
          value={kpiData.pageViews.value}
          icon={Eye}
          colorTheme="b"
          description="Total views"
        />
        <KpiCard
          label={kpiData.avgSessionDuration.label}
          value={kpiData.avgSessionDuration.value}
          icon={Clock}
          colorTheme="g"
          description="Avg time on platform"
        />
        <KpiCard
          label={kpiData.bounceRate.label}
          value={kpiData.bounceRate.value}
          icon={Activity}
          colorTheme="w"
          description="Single page sessions"
        />
      </div>

      {/* Single Clean Traffic Trend Chart */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Visitor Traffic Trend
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>
              Daily total visitors and session volume
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, background: "#f1f5f9", padding: 3, borderRadius: 8 }}>
            {(["24H", "7D", "30D", "90D"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeFilter(tf)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  border: 0,
                  background: timeFilter === tf ? "#ffffff" : "transparent",
                  color: timeFilter === tf ? "var(--primary)" : "#64748b",
                  boxShadow: timeFilter === tf ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  cursor: "pointer"
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: "100%", height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3ac1ef" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3ac1ef" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#0f1e35",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 12,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#3ac1ef"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVisitors)"
                name="Visitors"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
