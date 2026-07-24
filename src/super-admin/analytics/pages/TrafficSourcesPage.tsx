import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { trafficSources, countryAnalytics, deviceAnalytics, browserAnalytics } from "../mockData";
import { AnalyticsHeader } from "../components/AnalyticsHeader";

export function TrafficSourcesPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");

  return (
    <>
      <AnalyticsHeader
        title="Traffic Sources & Audience"
        subtitle="Acquisition channels · Geographic origins · Devices & Browsers summary"
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* 1. Traffic Channels Distribution Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Donut Chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 4, color: "#1a1a1a" }}>
            Acquisition Channel Share
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
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f1e35", border: 0, borderRadius: 8, color: "#fff", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume Bar Chart */}
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

      {/* 2. Countries Table & Devices / Browsers Summary Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        
        {/* Clean Countries Table */}
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
                {countryAnalytics.map((c, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: "#0f1e35" }}>
                      <span style={{ marginRight: 8 }}>{c.flag}</span>
                      {c.country}
                    </td>
                    <td>{c.visitors.toLocaleString()}</td>
                    <td><span className="tag t-blue">{c.trafficPct}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Devices & Browsers Summary Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Devices Summary */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a", marginBottom: 4 }}>
              Devices Summary
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Traffic breakdown by device category</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {deviceAnalytics.map((dev, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#0f1e35" }}>{dev.device}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{dev.visitors} visitors</span>
                    <span className="tag t-blue" style={{ fontSize: 11 }}>{dev.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browsers Summary */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a", marginBottom: 4 }}>
              Browsers Summary
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Top web browsers used by visitors</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {browserAnalytics.map((b, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#0f1e35" }}>{b.browser}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{b.visitors} visitors</span>
                    <span className="tag t-green" style={{ fontSize: 11 }}>{b.usage}</span>
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
