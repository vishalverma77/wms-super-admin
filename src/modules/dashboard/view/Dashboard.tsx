import { useState } from "react";
import { Header } from "../../../components/Header";
import type { RecentActivityItem } from "../types";

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const recentActivity: RecentActivityItem[] = [
    {
      id: 1,
      action: "Acme Corp upgraded to Pro",
      time: "10 mins ago",
      type: "upgrade",
    },
    {
      id: 2,
      action: "New sign up: Quantum AI",
      time: "1 hour ago",
      type: "signup",
    },
    {
      id: 3,
      action: "Zenith Apps trial expired",
      time: "3 hours ago",
      type: "expire",
    },
    {
      id: 4,
      action: "Payment failed for Global Tech",
      time: "5 hours ago",
      type: "alert",
    },
    {
      id: 5,
      action: "Nova Solutions added 5 users",
      time: "1 day ago",
      type: "info",
    },
  ];

  const filteredActivity = recentActivity.filter((act) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      act.action.toLowerCase().includes(q) ||
      act.time.toLowerCase().includes(q) ||
      act.type.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Header
        title="Overview Dashboard"
        subtitle="Global analytics · System health · Recent activity"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search dashboard activity..."
      />

      <div className="kgrid kg4">
        <div className="kc kc-b">
          <div className="kl">Annual Recurring Revenue</div>
          <div className="kn">$632K</div>
        </div>
        <div className="kc kc-g">
          <div className="kl">Active Paying Tenants</div>
          <div className="kn">1,325</div>
        </div>
        <div className="kc kc-t">
          <div className="kl">Active Trials</div>
          <div className="kn">84</div>
        </div>
        <div className="kc kc-w">
          <div className="kl">New Signups (30d)</div>
          <div className="kn">+142</div>
        </div>
      </div>

      <div className="resp-grid">
        {/* Main Panel */}
        <div
          className="card"
          style={{ padding: "clamp(14px, 3vw, 24px)", minHeight: 360 }}
        >
          <div
            style={{
              fontFamily: '"Outfit",sans-serif',
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            Revenue Growth
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 280,
              color: "#a8a5a0",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ marginBottom: 12 }}
            >
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
            <span style={{ fontSize: 13 }}>
              Chart rendering requires an external library (e.g. Recharts)
            </span>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                fontFamily: '"Outfit",sans-serif',
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 16,
              }}
            >
              System Health
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ color: "#4a4a4a", fontWeight: 600 }}>
                    API Uptime
                  </span>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                    99.98%
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "#e6eef2",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "99.98%",
                      background: "var(--primary)",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ color: "#4a4a4a", fontWeight: 600 }}>
                    Server Load
                  </span>
                  <span style={{ color: "#15803d", fontWeight: 700 }}>34%</span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "#e6eef2",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "34%",
                      background: "#15803d",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ color: "#4a4a4a", fontWeight: 600 }}>
                    Error Rate
                  </span>
                  <span style={{ color: "#1a1a1a", fontWeight: 700 }}>
                    0.12%
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "#e6eef2",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "4%",
                      background: "#be123c",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "20px" }}>
            <div
              style={{
                fontFamily: '"Outfit",sans-serif',
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 16,
              }}
            >
              Recent Activity
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {filteredActivity.map((act) => (
                <div key={act.id} style={{ display: "flex", gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        act.type === "upgrade"
                          ? "var(--primary-light)"
                          : act.type === "signup"
                            ? "#dcfce7"
                            : act.type === "expire"
                              ? "#fef3c7"
                              : act.type === "alert"
                                ? "#fff1f2"
                                : "#f1f5f9",
                      color:
                        act.type === "upgrade"
                          ? "var(--primary)"
                          : act.type === "signup"
                            ? "#15803d"
                            : act.type === "expire"
                              ? "#b45309"
                              : act.type === "alert"
                                ? "#be123c"
                                : "#64748b",
                    }}
                  >
                    {act.type === "upgrade" && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    )}
                    {act.type === "signup" && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                    {act.type === "expire" && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                    {act.type === "alert" && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    )}
                    {act.type === "info" && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "var(--tx)",
                        lineHeight: 1.3,
                      }}
                    >
                      {act.action}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#7a7876", marginTop: 2 }}
                    >
                      {act.time}
                    </div>
                  </div>
                </div>
              ))}
              {filteredActivity.length === 0 && (
                <div style={{ textAlign: "center", padding: 20, color: "#8e9fab", fontSize: 13 }}>
                  {searchQuery ? `No activity found matching "${searchQuery}".` : "No recent activity."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
