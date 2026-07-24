import { useState } from "react";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { deviceAnalytics } from "../mockData";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { ExportReportModal } from "../components/ExportReportModal";

export function DevicesPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <AnalyticsHeader
        title="Device & Platform Analytics"
        subtitle="Desktop vs. Mobile vs. Tablet usage · Average session duration · Conversion rates by screen size"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      {/* 3 Main Device Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 20 }}>
        {deviceAnalytics.map((dev, idx) => (
          <div key={idx} className="card" style={{ padding: 24, borderTop: "3px solid var(--primary)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "var(--primary-light)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {dev.device === "Desktop" ? <Laptop size={20} /> : dev.device === "Mobile" ? <Smartphone size={20} /> : <Tablet size={20} />}
                </div>
                <div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
                    {dev.device}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Share: {dev.percentage}%</div>
                </div>
              </div>

              <span className="tag t-blue" style={{ fontSize: 12, padding: "4px 10px" }}>
                {dev.percentage}% Traffic
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f2f2f2", paddingBottom: 8 }}>
                <span style={{ color: "#64748b" }}>Visitors:</span>
                <b style={{ color: "#0f1e35" }}>{dev.visitors}</b>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f2f2f2", paddingBottom: 8 }}>
                <span style={{ color: "#64748b" }}>Avg Session:</span>
                <b style={{ color: "var(--primary)" }}>{dev.avgSession}</b>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f2f2f2", paddingBottom: 8 }}>
                <span style={{ color: "#64748b" }}>Bounce Rate:</span>
                <b style={{ color: "#b45309" }}>{dev.bounceRate}</b>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Conversion Rate:</span>
                <b style={{ color: "#15803d" }}>{dev.conversionRate}</b>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
}
