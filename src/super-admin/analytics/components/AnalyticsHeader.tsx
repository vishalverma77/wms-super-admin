import { useState } from "react";
import {
  Search,
  Calendar,
  RefreshCw,
  Bell,
  ChevronDown,
  Sparkles,
  Check
} from "lucide-react";

interface AnalyticsHeaderProps {
  title: string;
  subtitle: string;
  onRefresh?: () => void;
  dateRange: string;
  setDateRange: (range: string) => void;
}

export function AnalyticsHeader({
  title,
  subtitle,
  onRefresh,
  dateRange,
  setDateRange
}: AnalyticsHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dateOptions = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days"
  ];

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setToastMessage("Refreshing analytics data...");
    if (onRefresh) onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage("Analytics data updated live");
      setTimeout(() => setToastMessage(null), 2500);
    }, 800);
  };

  return (
    <div className="pgh" style={{ flexDirection: "column", gap: 16, alignItems: "stretch" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 24,
            zIndex: 9999,
            background: "#0f1e35",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: 8,
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid var(--primary)"
          }}
        >
          <Sparkles size={16} color="var(--primary)" />
          {toastMessage}
        </div>
      )}

      {/* Main Top Row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div className="pgh-l" style={{ minWidth: 0, flex: "1 1 200px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h1>{title}</h1>
          </div>
          <p>{subtitle}</p>
        </div>

        {/* Global Toolbar Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", maxWidth: "100%" }}>
          {/* Search Input */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flex: "1 1 180px",
              maxWidth: 260,
              minWidth: 140,
              height: 38,
              background: "#fff",
              border: "1px solid #dbe4ef",
              borderRadius: 8,
              padding: "0 10px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
            }}
          >
            <Search size={15} color="#64748b" style={{ flexShrink: 0, marginRight: 8 }} />
            <input
              type="text"
              placeholder="Search analytics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                border: 0,
                outline: 0,
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "DM Sans, sans-serif",
                color: "#1a1a1a",
                background: "transparent"
              }}
            />
          </div>

          {/* Date Range Picker Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              style={{
                height: 38,
                padding: "0 12px",
                background: "#fff",
                border: "1px solid #dbe4ef",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                fontWeight: 600,
                color: "#4a4a4a",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
              }}
            >
              <Calendar size={14} color="var(--primary)" />
              <span>{dateRange}</span>
              <ChevronDown size={14} color="#64748b" />
            </button>

            {showDatePicker && (
              <div
                style={{
                  position: "absolute",
                  top: "105%",
                  right: 0,
                  zIndex: 200,
                  width: 170,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  padding: "6px 0",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {dateOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setDateRange(opt);
                      setShowDatePicker(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 14px",
                      fontSize: 12,
                      fontWeight: dateRange === opt ? 700 : 500,
                      color: dateRange === opt ? "var(--primary)" : "#334155",
                      background: dateRange === opt ? "var(--primary-light)" : "transparent",
                      border: 0,
                      textAlign: "left",
                      cursor: "pointer"
                    }}
                  >
                    <span>{opt}</span>
                    {dateRange === opt && <Check size={13} color="var(--primary)" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefreshClick}
            title="Refresh analytics data"
            style={{
              height: 38,
              width: 38,
              borderRadius: 8,
              border: "1px solid #dbe4ef",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#4a4a4a",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              transition: "transform 0.2s"
            }}
          >
            <RefreshCw
              size={15}
              style={{
                animation: isRefreshing ? "spin 0.8s linear infinite" : "none"
              }}
            />
          </button>

          {/* Notification Icon */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                height: 38,
                width: 38,
                borderRadius: 8,
                border: "1px solid #dbe4ef",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#4a4a4a",
                position: "relative"
              }}
            >
              <Bell size={16} />
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#be123c",
                  border: "2px solid #fff"
                }}
              />
            </button>

            {showNotifications && (
              <div
                style={{
                  position: "absolute",
                  top: "105%",
                  right: 0,
                  zIndex: 200,
                  width: 280,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  padding: 14
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 13, color: "#0f1e35", marginBottom: 10 }}>
                  Analytics Alerts (3)
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12 }}>
                  <div style={{ padding: "8px 10px", background: "var(--primary-light)", borderRadius: 6 }}>
                    <div style={{ fontWeight: 600, color: "#1a1a1a" }}>Traffic Spike (+24%)</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>Organic Google traffic surge detected</div>
                  </div>
                  <div style={{ padding: "8px 10px", background: "#fff4e8", borderRadius: 6 }}>
                    <div style={{ fontWeight: 600, color: "#b45309" }}>Funnel Alert</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>Visitor drop-off tracked at step 3</div>
                  </div>
                  <div style={{ padding: "8px 10px", background: "#e8f8ef", borderRadius: 6 }}>
                    <div style={{ fontWeight: 600, color: "#15803d" }}>Goal Reached</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>Monthly active session target achieved</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 38,
              padding: "0 10px",
              background: "#fff",
              border: "1px solid #dbe4ef",
              borderRadius: 8
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "var(--primary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700
              }}
            >
              SA
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0f1e35" }}>Super Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
