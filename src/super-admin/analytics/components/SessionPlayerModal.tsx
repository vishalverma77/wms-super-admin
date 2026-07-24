import { useState, useEffect } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Laptop,
  Smartphone,
  MousePointer
} from "lucide-react";

interface SessionPlayerModalProps {
  session: {
    id: string;
    session: string;
    duration: string;
    country: string;
    pages: number;
    device: string;
    browser: string;
    status: string;
    score: string;
  } | null;
  onClose: () => void;
}

export function SessionPlayerModal({ session, onClose }: SessionPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2 | 4>(1);
  const [progress, setProgress] = useState(15);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Landing Page Viewed", time: "00:05", page: "/" },
    { title: "Scrolled to Services Section", time: "00:42", page: "/" },
    { title: "Clicked AI Solutions Card", time: "01:15", page: "/services/ai-solutions" },
    { title: "Viewed AI Case Studies & Pricing", time: "02:10", page: "/services/ai-solutions#pricing" },
    { title: "Navigated to Contact Form", time: "03:05", page: "/contact-us" },
    { title: "Submitted Lead Form (Success)", time: "04:15", page: "/contact-us/thank-you" }
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const next = prev + 1 * playbackSpeed;
          const stepIndex = Math.min(
            Math.floor((next / 100) * steps.length),
            steps.length - 1
          );
          setCurrentStep(stepIndex);
          return next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  if (!session) return null;

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
          width: "min(960px, 96vw)",
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
                justifyContent: "center",
                fontWeight: 700
              }}
            >
              {session.device === "Mobile" ? <Smartphone size={18} /> : <Laptop size={18} />}
            </div>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Session Replay: {session.session}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", display: "flex", gap: 12, marginTop: 2 }}>
                <span>Duration: <b>{session.duration}</b></span>
                <span>Country: <b>{session.country}</b></span>
                <span>Browser: <b>{session.browser}</b></span>
                <span>UX Score: <b style={{ color: "#15803d" }}>{session.score}/10</b></span>
              </div>
            </div>
          </div>

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

        {/* Player Screen Body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 460, background: "#0f1e35" }}>
          {/* Simulated Browser Viewport */}
          <div style={{ display: "flex", flexDirection: "column", background: "#f8fafc", position: "relative" }}>
            {/* Address Bar */}
            <div
              style={{
                height: 36,
                background: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: 10,
                fontSize: 12,
                color: "#475569"
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
              </div>
              <div
                style={{
                  flex: 1,
                  background: "#fff",
                  borderRadius: 6,
                  padding: "3px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <span>https://dexo-glob.com{steps[currentStep].page}</span>
                <span className="tag t-green" style={{ fontSize: 10, padding: "1px 6px" }}>SSL Secure</span>
              </div>
            </div>

            {/* Screen Content Preview */}
            <div
              style={{
                flex: 1,
                padding: 24,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)"
              }}
            >
              {/* Floating Animated Cursor */}
              <div
                style={{
                  position: "absolute",
                  top: `${30 + (progress % 40)}%`,
                  left: `${20 + (progress % 50)}%`,
                  zIndex: 20,
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "rgba(58, 193, 239, 0.4)",
                    border: "2px solid var(--primary)",
                    boxShadow: "0 0 12px var(--primary)",
                    animation: "pulse 1.5s infinite"
                  }}
                />
                <MousePointer size={18} color="var(--primary)" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }} />
              </div>

              {/* Mock Page Content Box */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 600,
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  padding: 24,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="tag t-blue">{steps[currentStep].title}</span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>Timestamp: {steps[currentStep].time}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "Outfit, sans-serif", color: "#0f1e35" }}>
                  Enterprise Solutions & Global Analytics
                </div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
                  Simulated user interaction replay showing page scrolls, mouse hover heat, form clicks, and CTA conversions in real-time.
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button className="tbbtn" style={{ background: "var(--primary)", color: "#fff", border: 0 }}>
                    Active CTA Clicked
                  </button>
                  <button className="tbbtn">View Case Studies</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Session Timeline Feed */}
          <div
            style={{
              padding: 16,
              borderLeft: "1px solid #1e293b",
              display: "flex",
              flexDirection: "column",
              color: "#cbd5e1"
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14, color: "var(--primary)" }}>
              Event Log (6 Events)
            </div>

            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              {steps.map((st, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentStep(idx);
                    setProgress((idx / steps.length) * 100);
                  }}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 8,
                    background: currentStep === idx ? "rgba(58, 193, 239, 0.15)" : "rgba(255,255,255,0.04)",
                    border: currentStep === idx ? "1px solid var(--primary)" : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8" }}>
                    <span>{st.time}</span>
                    <span>Step {idx + 1}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: currentStep === idx ? "#fff" : "#cbd5e1", marginTop: 4 }}>
                    {st.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Player Controls Toolbar */}
        <div
          style={{
            padding: "14px 24px",
            background: "#0f1e35",
            borderTop: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#fff"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--primary)",
                border: 0,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </button>

            <button
              onClick={() => {
                setProgress(0);
                setCurrentStep(0);
                setIsPlaying(true);
              }}
              style={{ background: "transparent", border: 0, color: "#94a3b8", cursor: "pointer" }}
              title="Restart session"
            >
              <RotateCcw size={16} />
            </button>

            <div style={{ fontSize: 12, color: "#94a3b8" }}>
              Progress: <b style={{ color: "#fff" }}>{Math.round(progress)}%</b>
            </div>
          </div>

          {/* Progress Slider */}
          <div style={{ flex: 1, margin: "0 24px" }}>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--primary)", cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>Speed:</span>
            {([1, 2, 4] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  border: 0,
                  cursor: "pointer",
                  background: playbackSpeed === spd ? "var(--primary)" : "rgba(255,255,255,0.1)",
                  color: "#fff"
                }}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
