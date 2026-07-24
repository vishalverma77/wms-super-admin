import { useState } from "react";
import { recentEvents } from "../mockData";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { ExportReportModal } from "../components/ExportReportModal";

export function EventsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [filterEvent, setFilterEvent] = useState("All");
  const [showExportModal, setShowExportModal] = useState(false);

  const filteredEvents = filterEvent === "All"
    ? recentEvents
    : recentEvents.filter(e => e.event.toLowerCase().includes(filterEvent.toLowerCase()));

  return (
    <>
      <AnalyticsHeader
        title="Live Events Stream & Log"
        subtitle="Real-time event tracking · User interaction log · Action categories"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
              Live Recent Events Table
            </div>
            <span className="tbp">
              <span className="tbd" />
              <span>LIVE LOG</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {["All", "Contact", "CTA", "Service", "Navigation"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterEvent(cat)}
                style={{
                  padding: "5px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: filterEvent === cat ? 700 : 500,
                  border: "1px solid #dbe4ef",
                  background: filterEvent === cat ? "var(--primary-light)" : "#fff",
                  color: filterEvent === cat ? "var(--primary)" : "#64748b",
                  cursor: "pointer"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Session ID</th>
                <th>Event Name</th>
                <th>Section</th>
                <th>Device</th>
                <th>Browser</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt) => (
                <tr key={evt.id}>
                  <td style={{ color: "#64748b", fontSize: 12 }}>{evt.time}</td>
                  <td style={{ fontWeight: 600, color: "var(--primary)" }}>{evt.sessionId}</td>
                  <td>
                    <span className={`tag ${evt.status === 'success' ? 't-green' : evt.status === 'warning' ? 't-orange' : 't-blue'}`}>
                      {evt.event}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{evt.section}</td>
                  <td>{evt.device}</td>
                  <td style={{ color: "#64748b" }}>{evt.browser}</td>
                  <td style={{ fontWeight: 600 }}>{evt.country}</td>
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
