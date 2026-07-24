import { useState } from "react";
import { Flame, Maximize2 } from "lucide-react";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { HeatmapViewerModal } from "../components/HeatmapViewerModal";
import { ExportReportModal } from "../components/ExportReportModal";

export function HeatmapsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [showFullHeatmap, setShowFullHeatmap] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <AnalyticsHeader
        title="Heatmaps & Click Density Analysis"
        subtitle="Visualizing user click clusters · Scroll depth reach · Attention duration hot spots"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      {/* Main Heatmap Preview Card */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Landing Page Click & Scroll Heatmap Preview
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Aggregate visual overlay of 142,850 visitor click hotspots across hero, services, and CTA buttons
            </div>
          </div>

          <button
            onClick={() => setShowFullHeatmap(true)}
            style={{
              height: 40,
              padding: "0 18px",
              borderRadius: 8,
              border: "1px solid var(--primary)",
              background: "var(--primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(58,193,239,0.3)"
            }}
          >
            <Maximize2 size={16} />
            <span>Open Full Heatmap</span>
          </button>
        </div>

        {/* Heatmap Graphic Preview Canvas */}
        <div
          onClick={() => setShowFullHeatmap(true)}
          style={{
            height: 380,
            borderRadius: 14,
            background: "linear-gradient(135deg, #0f1e35 0%, #1e293b 100%)",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
          }}
        >
          {/* Simulated Floating Heat Hotspots */}
          <div style={{ position: "absolute", top: "35%", left: "30%", width: 90, height: 90, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.9) 0%, rgba(249,115,22,0.6) 40%, transparent 80%)", filter: "blur(4px)" }} />
          <div style={{ position: "absolute", top: "35%", left: "55%", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.85) 0%, rgba(249,115,22,0.5) 40%, transparent 80%)", filter: "blur(4px)" }} />
          <div style={{ position: "absolute", top: "65%", left: "25%", width: 110, height: 110, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,193,239,0.85) 0%, rgba(40,143,135,0.6) 50%, transparent 80%)", filter: "blur(4px)" }} />

          <div
            style={{
              zIndex: 10,
              background: "rgba(15, 30, 53, 0.85)",
              padding: "20px 32px",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              textAlign: "center",
              color: "#fff"
            }}
          >
            <Flame size={36} color="var(--primary)" style={{ marginBottom: 8 }} />
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800 }}>
              Interactive Heatmap Overlay Active
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, marginBottom: 14 }}>
              Click to launch full-screen interactive heatmap analyzer with section filters
            </div>
            <span className="tag t-blue" style={{ fontSize: 12, padding: "6px 14px" }}>
              Click to Open Full View
            </span>
          </div>
        </div>
      </div>

      <HeatmapViewerModal isOpen={showFullHeatmap} onClose={() => setShowFullHeatmap(false)} />
      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
}
