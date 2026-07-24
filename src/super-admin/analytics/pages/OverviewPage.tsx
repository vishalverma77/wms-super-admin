import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from "recharts";
import {
  Users,
  Eye,
  Activity,
  Clock,
  Laptop,
  Globe,
  Zap,
  Target,
  MousePointer,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

import {
  kpiData,
  visitorAnalyticsTrend,
  trafficSources,
  countryAnalytics,
  websitePerformance,
  browserAnalytics,
  realTimeVisitors
} from "../mockData";

import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { KpiCard } from "../components/KpiCard";
import { ExportReportModal } from "../components/ExportReportModal";
import { SessionPlayerModal } from "../components/SessionPlayerModal";

export function OverviewPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [metricToggle, setMetricToggle] = useState<"visitors" | "sessions" | "pageViews" | "conversions">("visitors");
  const [timeFilter, setTimeFilter] = useState<"24H" | "7D" | "30D" | "90D">("30D");
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const activeTrendData = visitorAnalyticsTrend[timeFilter];

  const getMetricColor = (m: string) => {
    switch (m) {
      case "visitors": return "#3ac1ef";
      case "sessions": return "#288f87";
      case "pageViews": return "#6366f1";
      case "conversions": return "#15803d";
      default: return "#3ac1ef";
    }
  };

  return (
    <>
      <AnalyticsHeader
        title="Analytics Overview"
        subtitle="Executive dashboard · Real-time visitor activity · Traffic channels · Conversion metrics"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      {/* Top 8 KPI Cards Grid */}
      <div className="kgrid kg4" style={{ marginBottom: 20 }}>
        <KpiCard
          label={kpiData.totalVisitors.label}
          value={kpiData.totalVisitors.value}
          growth={kpiData.totalVisitors.growth}
          isPositive={kpiData.totalVisitors.isPositive}
          sparkline={kpiData.totalVisitors.sparkline}
          icon={Users}
          colorTheme="b"
        />
        <KpiCard
          label={kpiData.uniqueVisitors.label}
          value={kpiData.uniqueVisitors.value}
          growth={kpiData.uniqueVisitors.growth}
          isPositive={kpiData.uniqueVisitors.isPositive}
          sparkline={kpiData.uniqueVisitors.sparkline}
          icon={Target}
          colorTheme="t"
        />
        <KpiCard
          label={kpiData.pageViews.label}
          value={kpiData.pageViews.value}
          growth={kpiData.pageViews.growth}
          isPositive={kpiData.pageViews.isPositive}
          sparkline={kpiData.pageViews.sparkline}
          icon={Eye}
          colorTheme="b"
        />
        <KpiCard
          label={kpiData.activeUsers.label}
          value={kpiData.activeUsers.value}
          growth={kpiData.activeUsers.growth}
          isPositive={kpiData.activeUsers.isPositive}
          sparkline={kpiData.activeUsers.sparkline}
          icon={Activity}
          colorTheme="g"
        />
        <KpiCard
          label={kpiData.avgSessionDuration.label}
          value={kpiData.avgSessionDuration.value}
          growth={kpiData.avgSessionDuration.growth}
          isPositive={kpiData.avgSessionDuration.isPositive}
          sparkline={kpiData.avgSessionDuration.sparkline}
          icon={Clock}
          colorTheme="b"
        />
        <KpiCard
          label={kpiData.bounceRate.label}
          value={kpiData.bounceRate.value}
          growth={kpiData.bounceRate.growth}
          isPositive={kpiData.bounceRate.isPositive}
          sparkline={kpiData.bounceRate.sparkline}
          icon={Zap}
          colorTheme="g"
        />
        <KpiCard
          label={kpiData.conversionRate.label}
          value={kpiData.conversionRate.value}
          growth={kpiData.conversionRate.growth}
          isPositive={kpiData.conversionRate.isPositive}
          sparkline={kpiData.conversionRate.sparkline}
          icon={TrendingUp}
          colorTheme="g"
        />
        <KpiCard
          label={kpiData.ctaClickRate.label}
          value={kpiData.ctaClickRate.value}
          growth={kpiData.ctaClickRate.growth}
          isPositive={kpiData.ctaClickRate.isPositive}
          sparkline={kpiData.ctaClickRate.sparkline}
          icon={MousePointer}
          colorTheme="w"
        />
      </div>

      {/* Main Visitor Analytics Interactive Line Chart & Real-Time Widget */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>
        
        {/* Visitor Analytics Large Interactive Chart */}
        <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Visitor Analytics & Traffic Trends
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Interactive volume comparison over selected timeframe
              </div>
            </div>

            {/* Controls Row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              {/* Metric Switcher */}
              <div style={{ display: "flex", gap: 4, background: "var(--bg)", padding: 3, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                {(["visitors", "sessions", "pageViews", "conversions"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetricToggle(m)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: metricToggle === m ? 700 : 500,
                      textTransform: "capitalize",
                      border: 0,
                      cursor: "pointer",
                      background: metricToggle === m ? "#fff" : "transparent",
                      color: metricToggle === m ? getMetricColor(m) : "#64748b",
                      boxShadow: metricToggle === m ? "0 1px 3px rgba(0,0,0,0.06)" : "none"
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Time Filters */}
              <div style={{ display: "flex", gap: 4 }}>
                {(["24H", "7D", "30D", "90D"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeFilter(tf)}
                    style={{
                      padding: "5px 9px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: timeFilter === tf ? 700 : 500,
                      border: "1px solid #e2e8f0",
                      background: timeFilter === tf ? "var(--primary-light)" : "#fff",
                      color: timeFilter === tf ? "var(--primary)" : "#64748b",
                      cursor: "pointer"
                    }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="mainMetricGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getMetricColor(metricToggle)} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={getMetricColor(metricToggle)} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#0f1e35",
                    border: 0,
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: 12,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={metricToggle}
                  stroke={getMetricColor(metricToggle)}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#mainMetricGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-Time Visitors Live Widget */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>
              Real-Time Visitors
            </div>
            <div className="tbp">
              <span className="tbd" />
              <span>LIVE PULSE</span>
            </div>
          </div>

          {/* Active Big Stat */}
          <div style={{ textAlign: "center", padding: "16px 0", background: "var(--primary-light)", borderRadius: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "var(--primary)", lineHeight: 1 }}>
              {realTimeVisitors.activeCount}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 4 }}>
              Active Users Right Now
            </div>
          </div>

          {/* Active Top Pages */}
          <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 10, textTransform: "uppercase" }}>
            Top Active Pages
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            {realTimeVisitors.activePages.map((page, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                <div style={{ minWidth: 0, flex: 1, paddingRight: 8 }}>
                  <div style={{ fontWeight: 600, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {page.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>{page.path}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="tag t-blue" style={{ fontSize: 11 }}>{page.active}</span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>{page.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources & Country Analytics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        
        {/* Traffic Sources Donut Chart */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>
                Traffic Sources Breakdown
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Distribution across search, social & campaigns</div>
            </div>
            <span className="tag t-green">7 Channels</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, alignItems: "center" }}>
            <div style={{ width: 180, height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="visitors"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#0f1e35", border: 0, borderRadius: 8, color: "#fff", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", maxHeight: 190 }}>
              {trafficSources.map((ts, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: ts.color }} />
                    <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{ts.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ color: "#64748b" }}>{ts.visitors.toLocaleString()}</span>
                    <span style={{ fontWeight: 700, color: "var(--tx)", minWidth: 42, textAlign: "right" }}>
                      {ts.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Countries Overview Table */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>
                Top Geolocation Analytics
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Country performance & average session time</div>
            </div>
            <Globe size={18} color="var(--primary)" />
          </div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Visitors</th>
                  <th>Conversions</th>
                  <th>Avg Session</th>
                  <th>Traffic %</th>
                </tr>
              </thead>
              <tbody>
                {countryAnalytics.slice(0, 5).map((c, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                        <span style={{ fontSize: 16 }}>{c.flag}</span>
                        <span>{c.country}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{c.visitors}</td>
                    <td><span className="tag t-green">{c.conversions}</span></td>
                    <td style={{ color: "#64748b" }}>{c.avgSession}</td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{c.trafficPct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Website Performance & Browser Analytics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        
        {/* Core Web Vitals Performance Cards */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>
                Website Performance & Core Web Vitals
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Google PageSpeed score & real user metrics</div>
            </div>
            <span className="tag t-green" style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <ShieldCheck size={13} /> 98 / 100
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {websitePerformance.slice(0, 3).map((wp, idx) => (
              <div key={idx} style={{ padding: 12, border: "1px solid #f2f2f2", borderRadius: 10, background: "var(--bg)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                  {wp.metric.split(" ")[0]}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#15803d", margin: "4px 0" }}>
                  {wp.value}
                </div>
                <div style={{ fontSize: 10, color: "#94a3b8" }}>Target: {wp.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Usage Breakdown */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>
                Browser & OS Analytics
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Audience browser share percentages</div>
            </div>
            <Laptop size={18} color="var(--primary)" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {browserAnalytics.slice(0, 3).map((b, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{b.browser} ({b.version})</span>
                  <span style={{ fontWeight: 700, color: "var(--primary)" }}>{b.usage}</span>
                </div>
                <div style={{ height: 6, background: "#e6eef2", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: b.usage, background: "var(--primary)", borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Report Modal */}
      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />

      {/* Session Player Modal */}
      {selectedSession && (
        <SessionPlayerModal session={selectedSession} onClose={() => setSelectedSession(null)} />
      )}
    </>
  );
}
