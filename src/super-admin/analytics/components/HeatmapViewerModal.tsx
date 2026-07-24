import { useState } from "react";
import { X, Flame, MousePointer, Eye, Layers, Monitor, Smartphone } from "lucide-react";

interface HeatmapViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: string;
}

export function HeatmapViewerModal({ isOpen, onClose, initialSection = "Hero" }: HeatmapViewerModalProps) {
  const [heatmapMode, setHeatmapMode] = useState<"click" | "scroll" | "attention">("click");
  const [selectedSection, setSelectedSection] = useState(initialSection);
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile">("desktop");

  if (!isOpen) return null;

  const sections = ["Hero", "Services", "Tech Stack", "Testimonials", "Contact", "Footer"];

  const hotspots = [
    { id: 1, label: "Get Started CTA", clicks: 7294, top: "42%", left: "32%", intensity: "high" },
    { id: 2, label: "Book Consultation CTA", clicks: 4992, top: "42%", left: "54%", intensity: "high" },
    { id: 3, label: "AI Service Card", clicks: 8140, top: "68%", left: "25%", intensity: "high" },
    { id: 4, label: "Web Dev Card", clicks: 6144, top: "68%", left: "50%", intensity: "medium" },
    { id: 5, label: "Mobile Dev Card", clicks: 4074, top: "68%", left: "75%", intensity: "medium" },
    { id: 6, label: "Navigation Services", clicks: 12450, top: "12%", left: "45%", intensity: "high" }
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(15, 30, 53, 0.75)",
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
          width: "min(1080px, 96vw)",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 16,
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          overflow: "hidden",
          background: "#fff"
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--bg)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "var(--primary-light)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Flame size={20} />
            </div>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Full Page Interactive Heatmap Analysis
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Visualizing visitor click density, scroll reach, and attention hotspots across landing page sections
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
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
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Toolbar Switchers */}
        <div
          style={{
            padding: "12px 24px",
            borderBottom: "1px solid #f2f2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            background: "#fff"
          }}
        >
          {/* Mode Switcher (Click / Scroll / Attention) */}
          <div style={{ display: "flex", gap: 6, background: "var(--bg)", padding: 4, borderRadius: 8, border: "1px solid #e2e8f0" }}>
            <button
              onClick={() => setHeatmapMode("click")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 6,
                border: 0,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                background: heatmapMode === "click" ? "var(--primary)" : "transparent",
                color: heatmapMode === "click" ? "#fff" : "#475569"
              }}
            >
              <MousePointer size={14} /> Click Heatmap
            </button>
            <button
              onClick={() => setHeatmapMode("scroll")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 6,
                border: 0,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                background: heatmapMode === "scroll" ? "var(--primary)" : "transparent",
                color: heatmapMode === "scroll" ? "#fff" : "#475569"
              }}
            >
              <Layers size={14} /> Scroll Reach
            </button>
            <button
              onClick={() => setHeatmapMode("attention")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 6,
                border: 0,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                background: heatmapMode === "attention" ? "var(--primary)" : "transparent",
                color: heatmapMode === "attention" ? "#fff" : "#475569"
              }}
            >
              <Eye size={14} /> Attention Map
            </button>
          </div>

          {/* Section Selector Pills */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: selectedSection === sec ? 700 : 500,
                  border: selectedSection === sec ? "1px solid var(--primary)" : "1px solid #dbe4ef",
                  background: selectedSection === sec ? "var(--primary-light)" : "#fff",
                  color: selectedSection === sec ? "var(--primary)" : "#475569",
                  cursor: "pointer"
                }}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Device Toggle */}
          <div style={{ display: "flex", gap: 4 }}>
            <button
              onClick={() => setDeviceType("desktop")}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "1px solid #e2e8f0",
                background: deviceType === "desktop" ? "var(--primary-light)" : "#fff",
                color: deviceType === "desktop" ? "var(--primary)" : "#64748b",
                cursor: "pointer"
              }}
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setDeviceType("mobile")}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "1px solid #e2e8f0",
                background: deviceType === "mobile" ? "var(--primary-light)" : "#fff",
                color: deviceType === "mobile" ? "var(--primary)" : "#64748b",
                cursor: "pointer"
              }}
            >
              <Smartphone size={16} />
            </button>
          </div>
        </div>

        {/* Heatmap Canvas Area */}
        <div
          style={{
            flex: 1,
            minHeight: 480,
            overflowY: "auto",
            position: "relative",
            background: "#0f1e35",
            padding: 24,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: deviceType === "desktop" ? "100%" : "380px",
              maxWidth: 900,
              minHeight: 600,
              background: "#ffffff",
              borderRadius: 12,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              transition: "all 0.3s ease"
            }}
          >
            {/* Header Mock */}
            <div style={{ height: 48, background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "var(--primary)" }}>DEXOGLOB WMS</span>
              <span style={{ fontSize: 11, color: "#64748b" }}>Section: {selectedSection}</span>
            </div>

            {/* Simulated Section Content */}
            <div style={{ padding: 40, position: "relative" }}>
              <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#0f1e35", marginBottom: 12 }}>
                Build & Scale Enterprise Operations with Next-Gen WMS AI
              </div>
              <div style={{ fontSize: 14, color: "#475569", maxWidth: 600, marginBottom: 24 }}>
                Transform your logistics with automated inventory tracking, real-time analytics, and high-conversion landing solutions.
              </div>
              <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
                <button style={{ padding: "12px 24px", background: "var(--primary)", color: "#fff", border: 0, borderRadius: 8, fontWeight: 700 }}>
                  Get Started Now
                </button>
                <button style={{ padding: "12px 24px", background: "var(--primary-light)", color: "var(--primary)", border: "1px solid var(--primary)", borderRadius: 8, fontWeight: 700 }}>
                  Book Consultation
                </button>
              </div>

              {/* Cards Grid */}
              <div style={{ display: "grid", gridTemplateColumns: deviceType === "desktop" ? "repeat(3, 1fr)" : "1fr", gap: 16, marginTop: 40 }}>
                <div style={{ padding: 20, border: "1px solid #e2e8f0", borderRadius: 10, background: "#fff" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>AI Solutions</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Demand forecasting & automated routing</div>
                </div>
                <div style={{ padding: 20, border: "1px solid #e2e8f0", borderRadius: 10, background: "#fff" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>Web Development</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Custom enterprise warehouse portals</div>
                </div>
                <div style={{ padding: 20, border: "1px solid #e2e8f0", borderRadius: 10, background: "#fff" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>Mobile Logistics</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Barcode scanner & fleet manager apps</div>
                </div>
              </div>
            </div>

            {/* Heatmap Overlay Layer (Click Mode) */}
            {heatmapMode === "click" && (
              <>
                {hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    style={{
                      position: "absolute",
                      top: spot.top,
                      left: spot.left,
                      transform: "translate(-50%, -50%)",
                      width: spot.intensity === "high" ? 70 : 50,
                      height: spot.intensity === "high" ? 70 : 50,
                      borderRadius: "50%",
                      background: spot.intensity === "high" ? "radial-gradient(circle, rgba(239,68,68,0.85) 0%, rgba(249,115,22,0.6) 40%, rgba(234,179,8,0.2) 70%, transparent 100%)" : "radial-gradient(circle, rgba(58,193,239,0.85) 0%, rgba(40,143,135,0.5) 50%, transparent 100%)",
                      pointerEvents: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 800,
                      boxShadow: "0 0 20px rgba(239,68,68,0.5)",
                      cursor: "pointer"
                    }}
                    title={`${spot.label}: ${spot.clicks} clicks`}
                  >
                    {spot.clicks}
                  </div>
                ))}
              </>
            )}

            {/* Scroll Reach Overlay */}
            {heatmapMode === "scroll" && (
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", flexDirection: "column" }}>
                <div style={{ height: "30%", background: "rgba(16, 185, 129, 0.25)", borderBottom: "2px dashed #10b981", padding: 8, fontSize: 11, fontWeight: 700, color: "#065f46" }}>
                  100% Visitors Reached (Top fold)
                </div>
                <div style={{ height: "30%", background: "rgba(59, 130, 246, 0.2)", borderBottom: "2px dashed #3b82f6", padding: 8, fontSize: 11, fontWeight: 700, color: "#1e40af" }}>
                  75% Visitors Reached
                </div>
                <div style={{ height: "40%", background: "rgba(239, 68, 68, 0.15)", padding: 8, fontSize: 11, fontWeight: 700, color: "#991b1b" }}>
                  30% Visitors Reached (Bottom section drop-off)
                </div>
              </div>
            )}

            {/* Attention Map Overlay */}
            {heatmapMode === "attention" && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(15, 30, 53, 0.4)", pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "25%", left: "20%", width: 340, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 60%, transparent 100%)", mixBlendMode: "overlay" }} />
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div style={{ padding: "14px 24px", background: "var(--bg)", borderTop: "1px solid #f2f2f2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Showing <b>{heatmapMode.toUpperCase()}</b> data for <b>{selectedSection}</b> section on <b>{deviceType.toUpperCase()}</b>
          </div>
          <button className="tbbtn" onClick={onClose}>
            Close Heatmap Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
