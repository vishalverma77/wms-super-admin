import { useState } from "react";
import { X, FileText, Table, FileSpreadsheet, Mail, Check, Download } from "lucide-react";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportReportModal({ isOpen, onClose }: ExportReportModalProps) {
  const [reportFormat, setReportFormat] = useState<"csv" | "excel" | "pdf">("pdf");
  const [emailTo, setEmailTo] = useState("admin@dexo-glob.com");
  const [scheduleFrequency, setScheduleFrequency] = useState("Weekly");
  const [isDone, setIsDone] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1800);
    }, 1000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(15, 30, 53, 0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}
    >
      <div
        className="card"
        style={{
          width: "min(520px, 94vw)",
          borderRadius: 16,
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          overflow: "hidden",
          background: "#fff"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--bg)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "var(--primary-light)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Download size={18} />
            </div>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Export Analytics Report
              </div>
              <div style={{ fontSize: 11, color: "#64748b" }}>
                Download high-resolution executive reports or schedule automated email deliveries
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "1px solid #e2e8f0",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#64748b"
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          {isDone ? (
            <div style={{ padding: "30px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#dcfce7", color: "#15803d", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={28} />
              </div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 18, fontWeight: 700, color: "#0f1e35" }}>
                Report Generated Successfully!
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>
                The {reportFormat.toUpperCase()} file was generated and sent to {emailTo}.
              </div>
            </div>
          ) : (
            <>
              {/* Export Format Selector */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#475569", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Select File Format
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  <button
                    onClick={() => setReportFormat("pdf")}
                    style={{
                      padding: "12px 10px",
                      borderRadius: 10,
                      border: reportFormat === "pdf" ? "2px solid var(--primary)" : "1px solid #dbe4ef",
                      background: reportFormat === "pdf" ? "var(--primary-light)" : "#fff",
                      color: reportFormat === "pdf" ? "var(--primary)" : "#475569",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer"
                    }}
                  >
                    <FileText size={20} />
                    <span>PDF Executive</span>
                  </button>

                  <button
                    onClick={() => setReportFormat("excel")}
                    style={{
                      padding: "12px 10px",
                      borderRadius: 10,
                      border: reportFormat === "excel" ? "2px solid var(--primary)" : "1px solid #dbe4ef",
                      background: reportFormat === "excel" ? "var(--primary-light)" : "#fff",
                      color: reportFormat === "excel" ? "var(--primary)" : "#475569",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer"
                    }}
                  >
                    <FileSpreadsheet size={20} />
                    <span>Excel Workbook</span>
                  </button>

                  <button
                    onClick={() => setReportFormat("csv")}
                    style={{
                      padding: "12px 10px",
                      borderRadius: 10,
                      border: reportFormat === "csv" ? "2px solid var(--primary)" : "1px solid #dbe4ef",
                      background: reportFormat === "csv" ? "var(--primary-light)" : "#fff",
                      color: reportFormat === "csv" ? "var(--primary)" : "#475569",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer"
                    }}
                  >
                    <Table size={20} />
                    <span>Raw CSV Data</span>
                  </button>
                </div>
              </div>

              {/* Delivery Email Input */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#475569", display: "block", marginBottom: 6 }}>
                  Send Copy To Email
                </label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #dbe4ef", borderRadius: 8, padding: "0 12px", height: 38, background: "#fff" }}>
                  <Mail size={16} color="#64748b" style={{ marginRight: 8 }} />
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    style={{ width: "100%", border: 0, outline: 0, fontSize: 13, fontWeight: 600, color: "#1a1a1a", fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>
              </div>

              {/* Recurring Schedule Option */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#475569", display: "block", marginBottom: 6 }}>
                  Automated Schedule
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  {["Daily", "Weekly", "Monthly", "Quarterly"].map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setScheduleFrequency(freq)}
                      style={{
                        flex: 1,
                        padding: "8px 0",
                        borderRadius: 6,
                        border: scheduleFrequency === freq ? "1px solid var(--primary)" : "1px solid #dbe4ef",
                        background: scheduleFrequency === freq ? "var(--primary-light)" : "#fff",
                        color: scheduleFrequency === freq ? "var(--primary)" : "#4a4a4a",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
                  onClick={() => handleExport()}
                  disabled={isExporting}
                  style={{
                    flex: 1,
                    height: 42,
                    borderRadius: 8,
                    border: "1px solid var(--primary)",
                    background: "var(--primary)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: isExporting ? "wait" : "pointer"
                  }}
                >
                  <Download size={16} />
                  <span>{isExporting ? "Generating..." : `Download ${reportFormat.toUpperCase()}`}</span>
                </button>

                <button
                  onClick={() => handleExport()}
                  disabled={isExporting}
                  style={{
                    flex: 1,
                    height: 42,
                    borderRadius: 8,
                    border: "1px solid #dbe4ef",
                    background: "var(--primary-light)",
                    color: "var(--primary)",
                    fontSize: 13,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: isExporting ? "wait" : "pointer"
                  }}
                >
                  <Mail size={16} />
                  <span>Schedule & Email</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
