import { useState } from "react";
import { contactFormAnalytics } from "../mockData";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { ExportReportModal } from "../components/ExportReportModal";

export function ConversionsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <AnalyticsHeader
        title="Form & Conversion Analytics"
        subtitle="Contact form performance · Form completion funnels · Field drop-off metrics · Lead conversion rates"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      {/* Top 4 Contact Form KPI Cards */}
      <div className="kgrid kg4" style={{ marginBottom: 20 }}>
        <div className="kc kc-b">
          <div className="kl">Forms Started</div>
          <div className="kn">{contactFormAnalytics.formsStarted}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Total form interactions</div>
        </div>

        <div className="kc kc-g">
          <div className="kl">Forms Submitted</div>
          <div className="kn">{contactFormAnalytics.formsSubmitted}</div>
          <div style={{ fontSize: 11, color: "#15803d", fontWeight: 700, marginTop: 4 }}>+12.4% vs last month</div>
        </div>

        <div className="kc kc-w">
          <div className="kl">Abandonment Rate</div>
          <div className="kn">{contactFormAnalytics.abandonmentRate}</div>
          <div style={{ fontSize: 11, color: "#b45309", marginTop: 4 }}>Form drops before submit</div>
        </div>

        <div className="kc kc-t">
          <div className="kl">Avg Completion Time</div>
          <div className="kn">{contactFormAnalytics.avgCompletionTime}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Fast user fill time</div>
        </div>
      </div>

      {/* Visual Form Field Completion Funnel */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Form Field Completion & Drop-Off Funnel
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Identifying which form fields cause friction and user abandonment
            </div>
          </div>
          <span className="tag t-orange">
            Highest Drop-off: {contactFormAnalytics.fieldDropOff}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {contactFormAnalytics.fieldFunnel.map((ff, idx) => {
            const pct = Math.round((ff.completed / 11428) * 100);
            return (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 160, fontSize: 13, fontWeight: 700, color: "#0f1e35" }}>
                  {ff.field}
                </div>

                <div style={{ flex: 1, height: 12, background: "#e6eef2", borderRadius: 999, overflow: "hidden", position: "relative" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: idx === contactFormAnalytics.fieldFunnel.length - 1 ? "#15803d" : "var(--primary)",
                      borderRadius: 999,
                      transition: "width 0.5s ease"
                    }}
                  />
                </div>

                <div style={{ width: 140, display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>
                    {ff.completed.toLocaleString()} ({pct}%)
                  </span>

                  {ff.dropOffCount > 0 && (
                    <span className="tag t-red" style={{ fontSize: 10 }}>
                      -{ff.dropOffPct}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
}
