import { useState } from "react";
import {
  TrendingDown,
  Award,
  MousePointer
} from "lucide-react";

import {
  landingPageFunnel,
  topPerformingServices,
  ctaPerformance
} from "../mockData";

import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { ExportReportModal } from "../components/ExportReportModal";

export function LandingPageAnalytics() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <AnalyticsHeader
        title="Landing Page Analytics & Funnel"
        subtitle="Conversion funnel drop-off · CTA button efficiency · Service conversion leaderboards"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      {/* 8-Stage Conversion Funnel Visualizer */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Landing Page Conversion Funnel (8 Stages)
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Step-by-step visitor progression from initial view to completed form submission
            </div>
          </div>
          <span className="tag t-green" style={{ fontSize: 12, padding: "4px 12px" }}>
            Overall Conversion Rate: 4.85%
          </span>
        </div>

        {/* Funnel Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {landingPageFunnel.map((fn, idx) => {
            const widthPct = Math.max(100 - idx * 11, 20);
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                }}
              >
                <div
                  style={{
                    width: `${widthPct}%`,
                    padding: "12px 20px",
                    borderRadius: 10,
                    background: idx === landingPageFunnel.length - 1 ? "#dcfce7" : idx % 2 === 0 ? "var(--primary-light)" : "#f8fafc",
                    border: idx === landingPageFunnel.length - 1 ? "1px solid #15803d" : "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: idx === landingPageFunnel.length - 1 ? "#15803d" : "var(--primary)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 800
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#0f1e35" }}>
                      {fn.stage}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>
                      {fn.visitors.toLocaleString()} visitors
                    </span>

                    <span className="tag t-blue" style={{ fontSize: 11 }}>
                      {fn.percentage}
                    </span>

                    {idx > 0 && (
                      <span className="tag t-red" style={{ fontSize: 11, display: "flex", gap: 3, alignItems: "center" }}>
                        <TrendingDown size={11} /> {fn.dropOff} Drop-off
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Performing Services Leaderboard & CTA Performance Table Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        
        {/* Top Performing Services Leaderboard */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Top Performing Services Leaderboard
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Ranked by views, lead generation & conversion rate</div>
            </div>
            <Award size={20} color="var(--primary)" />
          </div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Service Name</th>
                  <th>Views</th>
                  <th>Leads</th>
                  <th>Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingServices.map((srv) => (
                  <tr key={srv.rank}>
                    <td>
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: srv.rank === 1 ? "#fef3c7" : srv.rank === 2 ? "#e6eef2" : "#f1f5f9",
                          color: srv.rank === 1 ? "#b45309" : "#475569",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 11
                        }}
                      >
                        #{srv.rank}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: "#0f1e35" }}>{srv.name}</div>
                      <div style={{ fontSize: 10, color: "#94a3b8" }}>{srv.category}</div>
                    </td>
                    <td>{srv.views}</td>
                    <td><span className="tag t-green">{srv.leads}</span></td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>{srv.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Performance Data Table */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                CTA Performance Matrix
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Click-through rate & conversion by primary CTA buttons</div>
            </div>
            <MousePointer size={20} color="var(--primary)" />
          </div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>CTA Button</th>
                  <th>Views</th>
                  <th>Clicks</th>
                  <th>CTR %</th>
                  <th>Conversion</th>
                </tr>
              </thead>
              <tbody>
                {ctaPerformance.map((cta, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: "#0f1e35" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)" }} />
                        {cta.cta}
                      </div>
                    </td>
                    <td>{cta.views}</td>
                    <td style={{ fontWeight: 600 }}>{cta.clicks}</td>
                    <td><span className="tag t-blue">{cta.ctr}</span></td>
                    <td style={{ fontWeight: 700, color: "#15803d" }}>{cta.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
}
