import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import {
  ArrowRight,
  Layers,
  BarChart2
} from "lucide-react";

import {
  userJourneys,
  scrollAnalytics,
  sectionAnalytics,
  serviceInterest
} from "../mockData";

import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { ExportReportModal } from "../components/ExportReportModal";

export function UserBehaviourPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <AnalyticsHeader
        title="User Behaviour & Flow Analytics"
        subtitle="User navigation paths · Scroll reach depth · Section interaction duration · Service interest matrix"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      {/* Top 5 Common User Journey Flow Sequences */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Top 5 User Navigation Sequences (Conversion Paths)
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Most frequent page navigation flows leading to successful lead conversion
            </div>
          </div>
          <span className="tag t-green">Top 5 Journeys Active</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {userJourneys.map((uj) => (
            <div
              key={uj.id}
              style={{
                padding: "14px 18px",
                borderRadius: 10,
                background: "var(--bg)",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12
              }}
            >
              {/* Flow Steps */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {uj.steps.map((st, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: idx === uj.steps.length - 1 ? "#dcfce7" : "#fff",
                        color: idx === uj.steps.length - 1 ? "#15803d" : "#0f1e35",
                        border: idx === uj.steps.length - 1 ? "1px solid #15803d" : "1px solid #dbe4ef",
                        fontSize: 12,
                        fontWeight: 700
                      }}
                    >
                      {st}
                    </span>
                    {idx < uj.steps.length - 1 && <ArrowRight size={14} color="#94a3b8" />}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>
                  {uj.count} leads
                </span>
                <span className="tag t-blue" style={{ fontSize: 11 }}>
                  {uj.percentage} share
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: uj.trend.startsWith("+") ? "#15803d" : "#be123c" }}>
                  {uj.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Depth & Section Engagement Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        
        {/* Scroll Depth Reach */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Scroll Depth Reach Analysis
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Percentage of visitors scrolling to key page milestones</div>
            </div>
            <Layers size={20} color="var(--primary)" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {scrollAnalytics.map((sa, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: "#0f1e35" }}>{sa.level}</span>
                  <span style={{ color: "#64748b" }}>
                    <b>{sa.count}</b> ({sa.percentage}%)
                  </span>
                </div>

                <div style={{ height: 8, background: "#e6eef2", borderRadius: 999, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${sa.percentage}%`,
                      background: sa.color,
                      borderRadius: 999,
                      transition: "width 0.4s ease"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Interest Bar Chart */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Service Click Interest Matrix
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Total clicks per service card on landing page</div>
            </div>
            <BarChart2 size={20} color="var(--primary)" />
          </div>

          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceInterest} layout="vertical" margin={{ top: 5, right: 10, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis dataKey="service" type="category" stroke="#475569" fontSize={10} tickLine={false} width={110} />
                <Tooltip contentStyle={{ background: "#0f1e35", border: 0, borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Bar dataKey="clicks" fill="#3ac1ef" radius={[0, 4, 4, 0]} name="Clicks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section Analytics Table */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
              Landing Page Section Engagement Table
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Section views, time spent & lead generation impact</div>
          </div>
        </div>

        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Section Name</th>
                <th>Total Views</th>
                <th>Avg Time Spent</th>
                <th>Key Interactions / Top Element</th>
                <th>Conversion Impact</th>
              </tr>
            </thead>
            <tbody>
              {sectionAnalytics.map((sec, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "#0f1e35" }}>{sec.section} Section</td>
                  <td style={{ fontWeight: 600 }}>{sec.views}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 600 }}>{sec.avgTime}</td>
                  <td>{sec.ctaClicks ? `${sec.ctaClicks} CTA Clicks` : sec.mostClicked ? sec.mostClicked : sec.formsSubmitted ? `${sec.formsSubmitted} Submits` : sec.interactions ? sec.interactions : "Scroll view"}</td>
                  <td><span className="tag t-green">{sec.conversion || "N/A"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
}
