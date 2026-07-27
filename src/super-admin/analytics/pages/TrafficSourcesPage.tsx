import { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { fetchAnalyticsTraffic, type AnalyticsTrafficData } from "../analytics.api";
import {
  formatCompactNumber,
  formatDurationSeconds,
  formatPercentage,
  getCountryFlag,
  resolveAnalyticsDateRange,
} from "../analytics.utils";

export function TrafficSourcesPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [traffic, setTraffic] = useState<AnalyticsTrafficData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadTraffic = async () => {
      setLoading(true);
      setError(null);

      try {
        const range = resolveAnalyticsDateRange(dateRange);
        const data = await fetchAnalyticsTraffic(range);
        if (isMounted) {
          setTraffic(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load traffic analytics.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadTraffic();

    return () => {
      isMounted = false;
    };
  }, [dateRange, reloadToken]);

  const trafficSources = useMemo(() => {
    const colorMap: Record<string, string> = {
      google: "#3ac1ef",
      linkedin: "#0077b5",
      facebook: "#1877f2",
      instagram: "#e4405f",
      referral: "#b45309",
      direct: "#288f87",
      email: "#be123c",
    };

    return Object.entries(traffic?.trafficSources || {}).map(([name, data]) => ({
      name: name === "direct" ? "Direct" : name.charAt(0).toUpperCase() + name.slice(1),
      visitors: data.visitors,
      conversions: data.conversions,
      color: colorMap[name] || "#64748b",
    }));
  }, [traffic]);

  const totalVisitors = trafficSources.reduce((sum, item) => sum + item.visitors, 0);

  const countryAnalytics = (traffic?.countries || []).map((country) => ({
    country: country.country,
    visitors: country.visitors,
    conversions: country.conversions,
    avgSession: formatDurationSeconds(country.averageSession),
    trafficPct: totalVisitors > 0 ? formatPercentage((country.visitors / totalVisitors) * 100) : "0.0%",
    flag: getCountryFlag(country.country),
  }));

  const deviceAnalytics = Object.entries(traffic?.devices || {}).map(([device, visitors]) => ({
    device: device.charAt(0).toUpperCase() + device.slice(1),
    visitors,
    percentage: totalVisitors > 0 ? Math.round((visitors / totalVisitors) * 100) : 0,
  }));

  const browserAnalytics = Object.entries(traffic?.browsers || {}).map(([browser, visitors]) => ({
    browser: browser.charAt(0).toUpperCase() + browser.slice(1),
    visitors,
    usage: totalVisitors > 0 ? formatPercentage((visitors / totalVisitors) * 100) : "0.0%",
  }));

  return (
    <>
      <AnalyticsHeader
        title="Traffic Sources & Audience"
        subtitle="Acquisition channels · Geographic origins · Devices & Browsers summary"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={() => setReloadToken((value) => value + 1)}
      />

      {error && (
        <div className="card" style={{ padding: 16, marginBottom: 20, borderColor: "#fecaca", background: "#fff1f2", color: "#9f1239" }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
              Acquisition Channel Share
            </div>
            <span className="tag t-gray" style={{ fontSize: 11 }}>
              {loading ? "Loading..." : `${formatCompactNumber(totalVisitors)} total visitors`}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Share of incoming traffic by channel</div>

          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="visitors"
                >
                  {trafficSources.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f1e35", border: 0, borderRadius: 8, color: "#fff", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 4, color: "#1a1a1a" }}>
            Visitor Volume by Channel
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Visitor count across channels</div>

          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSources} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0f1e35", border: 0, borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Bar dataKey="visitors" fill="#3ac1ef" radius={[4, 4, 0, 0]} name="Visitors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a", marginBottom: 4 }}>
            Countries Breakdown
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Top visitor locations by country</div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Visitors</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {countryAnalytics.map((country, idx) => (
                  <tr key={`${country.country}-${idx}`}>
                    <td style={{ fontWeight: 700, color: "#0f1e35" }}>
                      <span style={{ marginRight: 8 }}>{country.flag}</span>
                      {country.country}
                    </td>
                    <td>{formatCompactNumber(country.visitors)}</td>
                    <td>
                      <span className="tag t-blue">{country.trafficPct}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a", marginBottom: 4 }}>
              Devices Summary
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Traffic breakdown by device category</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {deviceAnalytics.map((device) => (
                <div key={device.device} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#0f1e35" }}>{device.device}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{formatCompactNumber(device.visitors)} visitors</span>
                    <span className="tag t-blue" style={{ fontSize: 11 }}>{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a", marginBottom: 4 }}>
              Browsers Summary
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Top web browsers used by visitors</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {browserAnalytics.map((browser) => (
                <div key={browser.browser} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#0f1e35" }}>{browser.browser}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{formatCompactNumber(browser.visitors)} visitors</span>
                    <span className="tag t-green" style={{ fontSize: 11 }}>{browser.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
