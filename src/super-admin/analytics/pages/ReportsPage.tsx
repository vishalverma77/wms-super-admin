import { useState } from "react";
import { FileText, FileSpreadsheet, Table, Mail } from "lucide-react";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { ExportReportModal } from "../components/ExportReportModal";

export function ReportsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <AnalyticsHeader
        title="Analytics Reports & Export Center"
        subtitle="Automated PDF/Excel generation · Scheduled email delivery · Executive summaries"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      {/* Export Format Action Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        <div
          onClick={() => setShowExportModal(true)}
          className="card"
          style={{ padding: 20, cursor: "pointer", borderTop: "3px solid var(--primary)" }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <FileText size={22} />
          </div>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
            Export PDF Report
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
            High-resolution formatted PDF with charts & executive KPIs
          </div>
        </div>

        <div
          onClick={() => setShowExportModal(true)}
          className="card"
          style={{ padding: 20, cursor: "pointer", borderTop: "3px solid #15803d" }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#dcfce7", color: "#15803d", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <FileSpreadsheet size={22} />
          </div>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
            Export Excel Workbook
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
            Multi-tab spreadsheet containing raw data tables & pivot metrics
          </div>
        </div>

        <div
          onClick={() => setShowExportModal(true)}
          className="card"
          style={{ padding: 20, cursor: "pointer", borderTop: "3px solid #b45309" }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <Table size={22} />
          </div>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
            Export Raw CSV
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
            Comma-separated format for easy BI tool import
          </div>
        </div>

        <div
          onClick={() => setShowExportModal(true)}
          className="card"
          style={{ padding: 20, cursor: "pointer", borderTop: "3px solid #6366f1" }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#e0e7ff", color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <Mail size={22} />
          </div>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
            Schedule Email Reports
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
            Automate weekly or monthly PDF reports to leadership
          </div>
        </div>
      </div>

      {/* Scheduled Reports Table */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
            Active Scheduled Analytics Reports
          </div>
          <button className="tbbtn" onClick={() => setShowExportModal(true)}>
            + Create New Schedule
          </button>
        </div>

        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Report Title</th>
                <th>Frequency</th>
                <th>Recipients</th>
                <th>Format</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: "#0f1e35" }}>Executive Weekly Analytics Digest</td>
                <td><span className="tag t-blue">Weekly (Mondays 8:00 AM)</span></td>
                <td style={{ color: "#64748b" }}>admin@dexo-glob.com, cto@dexo-glob.com</td>
                <td><span className="tag t-green">PDF</span></td>
                <td><span className="tag t-green">Active</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: "#0f1e35" }}>Monthly Conversion & Lead Funnel Report</td>
                <td><span className="tag t-blue">Monthly (1st of month)</span></td>
                <td style={{ color: "#64748b" }}>marketing@dexo-glob.com</td>
                <td><span className="tag t-green">Excel</span></td>
                <td><span className="tag t-green">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
}
