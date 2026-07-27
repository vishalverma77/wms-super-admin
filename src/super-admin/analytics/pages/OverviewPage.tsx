import { useEffect, useState } from "react";
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

import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { KpiCard } from "../components/KpiCard";
import { fetchAnalyticsOverview, type AnalyticsOverviewData } from "../analytics.api";
import {
  formatCompactNumber,
  formatDurationSeconds,
  formatPercentage,
  resolveAnalyticsDateRange,
} from "../analytics.utils";

export function OverviewPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [dashboard, setDashboard] = useState<AnalyticsOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      setLoading(true);
      setError(null);

      try {
        const range = resolveAnalyticsDateRange(dateRange);
        const data = await fetchAnalyticsOverview(range);

        if (isMounted) {
          setDashboard(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load analytics overview.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadOverview();

    return () => {
      isMounted = false;
    };
  }, [dateRange, reloadToken]);

  return (
    <>
      <AnalyticsHeader
        title="Analytics Overview"
        subtitle="Executive summary · Real-time traffic analytics & session insights"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={() => setReloadToken((value) => value + 1)}
      />

      {error && (
        <div className="card" style={{ padding: 16, marginBottom: 20, borderColor: "#fecaca", background: "#fff1f2", color: "#9f1239" }}>
          {error}
        </div>
      )}

      <div className="kgrid kg5" style={{ marginBottom: 24, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <KpiCard
          label="Total Visitors"
          value={loading ? "Loading..." : formatCompactNumber(dashboard?.totalVisitors)}
          icon={Users}
          colorTheme="b"
          description="Total visits"
        />
        <KpiCard
          label="Active Visitors"
          value={loading ? "Loading..." : formatCompactNumber(dashboard?.activeVisitors)}
          icon={Target}
          colorTheme="t"
          description="Currently active users"
        />
        <KpiCard
          label="Page Views"
          value={loading ? "Loading..." : formatCompactNumber(dashboard?.pageViews)}
          icon={Eye}
          colorTheme="b"
          description="Total views"
        />
        <KpiCard
          label="Avg Session Duration"
          value={loading ? "Loading..." : formatDurationSeconds(dashboard?.averageSessionDuration)}
          icon={Clock}
          colorTheme="g"
          description="Avg time on platform"
        />
        <KpiCard
          label="Bounce Rate"
          value={loading ? "Loading..." : formatPercentage(dashboard?.bounceRate)}
          icon={Activity}
          colorTheme="w"
          description="Single page sessions"
        />
      </div>

      <div className="kgrid kg4" style={{ marginBottom: 24, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="kl">New Visitors</div>
          <div className="kn">{loading ? "..." : formatCompactNumber(dashboard?.newVisitors)}</div>
        </div>
        <div className="card" style={{ padding: 18 }}>
          <div className="kl">Returning Visitors</div>
          <div className="kn">{loading ? "..." : formatCompactNumber(dashboard?.returningVisitors)}</div>
        </div>
        <div className="card" style={{ padding: 18 }}>
          <div className="kl">Conversion Rate</div>
          <div className="kn">{loading ? "..." : formatPercentage(dashboard?.conversionRate)}</div>
        </div>
        <div className="card" style={{ padding: 18 }}>
          <div className="kl">CTA Click Rate</div>
          <div className="kn">{loading ? "..." : formatPercentage(dashboard?.ctaClickRate)}</div>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Visitor Traffic Trend
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>
              Daily visitor trend for the selected date range
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboard?.visitorTrend || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3ac1ef" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3ac1ef" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
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
