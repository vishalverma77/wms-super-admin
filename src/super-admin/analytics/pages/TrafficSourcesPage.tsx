import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { trafficSources } from "../mockData";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { ExportReportModal } from "../components/ExportReportModal";

export function TrafficSourcesPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <AnalyticsHeader
        title="Traffic Sources & Acquisition Channels"
        subtitle="Search engines · Social platforms · Direct visits · Email marketing · Referral domains"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Donut Chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 4, color: "#1a1a1a" }}>
            Acquisition Channel Distribution
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Share of incoming traffic by source</div>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  innerRadius={70}
                  outerRadius={105}
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

        {/* Volume Comparison Bar Chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 4, color: "#1a1a1a" }}>
            Visitor Volume by Channel
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Comparing raw visitor count across sources</div>

          <div style={{ width: "100%", height: 260 }}>
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

      {/* Traffic Sources Detailed Data Table */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
            All Traffic Channels Performance Table
          </div>
          <span className="tag t-blue">7 Channels Active</span>
        </div>

        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Traffic Channel</th>
                <th>Visitors</th>
                <th>Conversions</th>
                <th>Conversion Rate</th>
                <th>Traffic Share</th>
              </tr>
            </thead>
            <tbody>
              {trafficSources.map((ts, idx) => {
                const convRate = ((ts.conversions / ts.visitors) * 100).toFixed(2) + "%";
                return (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700 }}>
                        <span style={{ width: 12, height: 12, borderRadius: "50%", background: ts.color }} />
                        <span>{ts.name}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{ts.visitors.toLocaleString()}</td>
                    <td><span className="tag t-green">{ts.conversions.toLocaleString()}</span></td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{convRate}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: "#e6eef2", borderRadius: 999, width: 80 }}>
                          <div style={{ height: "100%", width: `${ts.percentage}%`, background: ts.color, borderRadius: 999 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700 }}>{ts.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
}
