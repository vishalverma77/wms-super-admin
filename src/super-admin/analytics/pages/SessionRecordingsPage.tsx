import { useState } from "react";
import { Play } from "lucide-react";
import { sessionRecordings } from "../mockData";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { SessionPlayerModal } from "../components/SessionPlayerModal";
import { ExportReportModal } from "../components/ExportReportModal";

export function SessionRecordingsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <AnalyticsHeader
        title="Session Recordings & Replay"
        subtitle="Full session playback · Mouse movement traces · Page click sequences · UX friction scores"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
            All Recorded User Sessions
          </div>
          <span className="tag t-green">7 Recordings Ready</span>
        </div>

        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Duration</th>
                <th>Country</th>
                <th>Pages Visited</th>
                <th>Device</th>
                <th>Browser</th>
                <th>Status</th>
                <th>Replay Action</th>
              </tr>
            </thead>
            <tbody>
              {sessionRecordings.map((rec) => (
                <tr key={rec.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: "#0f1e35" }}>{rec.session}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>ID: {rec.id}</div>
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--primary)" }}>{rec.duration}</td>
                  <td style={{ fontWeight: 600 }}>{rec.country}</td>
                  <td><span className="tag t-blue">{rec.pages} Pages</span></td>
                  <td>{rec.device}</td>
                  <td style={{ color: "#64748b" }}>{rec.browser}</td>
                  <td>
                    <span className={`tag ${rec.status === 'Completed' ? 't-green' : rec.status === 'Active' ? 't-blue' : 't-orange'}`}>
                      {rec.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedSession(rec)}
                      className="tbbtn"
                      style={{
                        background: "var(--primary)",
                        color: "#fff",
                        border: 0,
                        fontWeight: 700,
                        padding: "6px 14px"
                      }}
                    >
                      <Play size={13} style={{ fill: "currentColor" }} />
                      <span>Play Recording</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSession && (
        <SessionPlayerModal session={selectedSession} onClose={() => setSelectedSession(null)} />
      )}
      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
}
