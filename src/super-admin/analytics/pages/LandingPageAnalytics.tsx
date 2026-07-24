import { useState } from "react";
import { MousePointer, Layers, Award } from "lucide-react";
import {
  landingPageFunnel,
  topPerformingServices,
  ctaPerformance,
  sectionAnalytics
} from "../mockData";
import { AnalyticsHeader } from "../components/AnalyticsHeader";

export function LandingPageAnalytics() {
  const [dateRange, setDateRange] = useState("Last 30 Days");

  return (
    <>
      <AnalyticsHeader
        title="Landing Page Analytics"
        subtitle="Funnel conversion · Section engagement · Service interest & CTA performance"
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* 1. Landing Page Funnel */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Landing Page Conversion Funnel
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>
              Visitor progression from initial view to completed form submission
            </div>
          </div>
          <span className="tag t-green" style={{ fontSize: 12, padding: "4px 12px", fontWeight: 700 }}>
            Overall Conversion: 4.85%
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {landingPageFunnel.map((fn, idx) => {
            const widthPct = Math.max(100 - idx * 11, 25);
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
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
                    justifyContent: "space-between"
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Section Analytics Grid */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Layers size={20} color="var(--primary)" />
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Section Analytics
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>Engagement and views across landing page sections</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {sectionAnalytics.map((sec, idx) => (
            <div
              key={idx}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                padding: 16
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0f1e35", marginBottom: 8 }}>
                {sec.section}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: "#64748b" }}>Views:</span>
                <span style={{ fontWeight: 700, color: "#1a1a1a" }}>{sec.views.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#64748b" }}>Avg Time Spent:</span>
                <span style={{ fontWeight: 700, color: "var(--primary)" }}>{sec.avgTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Service Interest & CTA Performance Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Service Interest Leaderboard */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Service Interest
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Visitor views and interest level by service</div>
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
                  <th>Interest Score</th>
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
                    <td><span className="tag t-blue">{srv.conversion}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Performance Matrix */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                CTA Performance
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Click-through rate by primary call-to-action buttons</div>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
