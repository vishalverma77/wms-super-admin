import { Header } from "../../../components/Header";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTrialUsersRequest } from "../slice";

interface MappedTrialUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  started: string;
  expiry: string;
  daysLeft: number;
  status: string;
  contact: string;
  phone: string;
  employees: string | number;
  industry: string;
  country: string;
  warehouses: string | number;
  logins: number;
  lastLogin: string;
  notes: string;
}

// ── Trial Users List ──────────────────────────────────────────────────────────
export function TrialUsers() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.trialUsers);

  const [selectedUser, setSelectedUser] = useState<MappedTrialUser | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchTrialUsersRequest());
  }, [dispatch]);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (selectedUser) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedUser]);

  const mappedUsers: MappedTrialUser[] = users.map((u) => {
    const startedDate = new Date(u.trialStartsAt);
    const expiryDate = new Date(u.trialEndsAt);
    const daysLeft = Math.ceil(
      (expiryDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24),
    );

    return {
      id: u.id,
      name: u.company || u.name || "Unknown",
      email: u.email,
      plan: "Trial",
      started: startedDate.toLocaleDateString(),
      expiry: expiryDate.toLocaleDateString(),
      daysLeft: Math.max(0, daysLeft),
      status: u.status,
      contact: u.user?.fullName || u.name,
      phone: u.phone || u.user?.mobileNumber || "-",
      employees: "-",
      industry: "-",
      country: "-",
      warehouses: "-",
      logins: u.user?.activeTasks || 0,
      lastLogin: "-",
      notes: u.message || "",
    };
  });

  const filteredUsers = mappedUsers.filter((u) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.contact.toLowerCase().includes(q) ||
      u.status.toLowerCase().includes(q) ||
      u.plan.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q) ||
      u.notes.toLowerCase().includes(q)
    );
  });

  const active = mappedUsers.filter(
    (u) => u.status === "Trial Created" || u.status === "Active",
  ).length;
  const expiring = mappedUsers.filter(
    (u) => u.daysLeft > 0 && u.daysLeft <= 7,
  ).length;

  return (
    <>
      <Header
        title="Trial Users"
        subtitle="Monitor active trials · Expiry tracking · Conversion pipeline"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search trial users..."
      />

      <div className="kgrid kg4">
        <div className="kc kc-b">
          <div className="kl">Total Trials</div>
          <div className="kn">{mappedUsers.length}</div>
        </div>
        <div className="kc kc-g">
          <div className="kl">Currently Active</div>
          <div className="kn">{active}</div>
        </div>
        <div className="kc kc-w">
          <div className="kl">Expiring ≤ 7 days</div>
          <div className="kn">{expiring}</div>
        </div>
        <div className="kc kc-t">
          <div className="kl">Converted to Paid</div>
          <div className="kn">-</div>
        </div>
      </div>

      <div
        className="card"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#8e9fab" }}>
            Loading trial users...
          </div>
        ) : error ? (
          <div style={{ padding: 40, textAlign: "center", color: "#be123c" }}>
            {error}
          </div>
        ) : (
          <div className="twrap" style={{ flex: 1, overflowY: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Plan</th>
                  <th>Trial Started</th>
                  <th>Expiry Date</th>
                  <th>Days Left</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((row) => (
                  <tr
                    key={row.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedUser(row)}
                  >
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "var(--primary-light)",
                            color: "var(--primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 11,
                            flexShrink: 0,
                          }}
                        >
                          {row.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{row.name}</div>
                          <div style={{ fontSize: 11, color: "#7a7876" }}>
                            {row.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "#7a7876", fontSize: 12 }}>
                      {row.contact}
                    </td>
                    <td>
                      <span className="tag t-blue">{row.plan}</span>
                    </td>
                    <td style={{ color: "#7a7876" }}>{row.started}</td>
                    <td
                      style={{
                        fontWeight: 600,
                        color:
                          row.daysLeft === 0
                            ? "#a8a5a0"
                            : row.daysLeft <= 3
                              ? "#be123c"
                              : "#1a1a1a",
                      }}
                    >
                      {row.expiry}
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: 700,
                          color:
                            row.daysLeft === 0
                              ? "#a8a5a0"
                              : row.daysLeft <= 3
                                ? "#be123c"
                                : row.daysLeft <= 7
                                  ? "#b45309"
                                  : "#15803d",
                        }}
                      >
                        {row.daysLeft > 0 ? `${row.daysLeft}d` : "Expired"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`tag ${
                          ["Active", "Trial Created"].includes(row.status)
                            ? "t-green"
                            : row.status === "Expiring"
                              ? "t-orange"
                              : "t-gray"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: 40,
                        color: "#8e9fab",
                      }}
                    >
                      {searchQuery ? (
                        <div>
                          No trial users found matching &quot;{searchQuery}&quot;.
                        </div>
                      ) : (
                        "No trial users found."
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedUser && (
        <TrialUserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
}

// ── Trial User Detail Modal ───────────────────────────────────────────────────
function TrialUserDetailModal({
  user,
  onClose,
}: {
  user: MappedTrialUser;
  onClose: () => void;
}) {
  const timeline = [
    { date: user.started, action: "Trial started", by: "System" },
    { date: user.started, action: "Welcome email sent", by: "System" },
  ];
  if (user.daysLeft <= 7 && user.daysLeft > 0) {
    timeline.push({
      date: "Pending",
      action: "Expiry reminder queued",
      by: "System",
    });
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(15,30,53,0.5)",
        backdropFilter: "blur(4px)",
        padding: "12px",
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 840,
          maxHeight: "92vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="pgh"
          style={{
            margin: 0,
            padding: "16px 20px",
            borderRadius: "16px 16px 0 0",
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#fff",
            borderBottom: "1px solid #f2f2f2",
            boxShadow: "none",
            gap: 10,
          }}
        >
          <div className="pgh-l" style={{ minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "var(--primary)",
                  fontWeight: 700,
                }}
              >
                Trial Details
              </span>
              <span style={{ color: "#a8a5a0" }}>/</span>
              <span
                style={{
                  fontSize: 12,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.name}
              </span>
            </div>
            <h1
              style={{
                fontFamily: '"Outfit",sans-serif',
                margin: 0,
                fontSize: "clamp(18px, 4vw, 24px)",
                color: "var(--tx)",
                wordBreak: "break-word",
              }}
            >
              {user.name}
            </h1>
            <p
              style={{
                margin: 0,
                color: "#7a7876",
                fontSize: 12,
                marginTop: 2,
              }}
            >
              Trial User
            </p>
          </div>
          <div
            className="pgh-r"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <span
              className={`tag ${["Active", "Trial Created"].includes(user.status) ? "t-green" : "t-gray"}`}
              style={{ fontSize: 12, padding: "4px 10px" }}
            >
              {user.status}
            </span>
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: "#f2f2f2",
                border: "none",
                borderRadius: "50%",
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#4a4a4a",
                transition: "background 0.2s",
                flexShrink: 0,
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#e6eef2")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "#f2f2f2")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content Area */}
        <div
          style={{
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* KPI row */}
          <div className="kgrid kg4" style={{ marginBottom: 0 }}>
            <div className="kc kc-w">
              <div className="kl">Days Until Expiry</div>
              <div
                className="kn"
                style={{ color: user.daysLeft <= 3 ? "#be123c" : "#1a1a1a" }}
              >
                {user.daysLeft > 0 ? `${user.daysLeft}d` : "Expired"}
              </div>
            </div>
            <div className="kc kc-b">
              <div className="kl">Trial Started</div>
              <div className="kn" style={{ fontSize: 17 }}>
                {user.started}
              </div>
            </div>
            <div className="kc kc-r">
              <div className="kl">Expiry Date</div>
              <div
                className="kn"
                style={{
                  fontSize: 17,
                  color: user.daysLeft <= 3 ? "#be123c" : "#1a1a1a",
                }}
              >
                {user.expiry}
              </div>
            </div>
            <div className="kc kc-g">
              <div className="kl">Total Logins</div>
              <div className="kn">{user.logins}</div>
            </div>
          </div>

          <div className="resp-grid">
            {/* ── Left column ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Company info */}
              <div className="card" style={{ padding: "20px" }}>
                <div
                  style={{
                    fontFamily: '"Outfit",sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 16,
                  }}
                >
                  Company Details
                </div>
                <div className="resp-grid-half-18">
                  {[
                    { label: "Contact Person", value: user.contact },
                    { label: "Email", value: user.email },
                    { label: "Phone", value: user.phone },
                    { label: "Employees", value: String(user.employees) },
                    { label: "Industry", value: user.industry },
                    { label: "Country", value: user.country },
                    { label: "Warehouses", value: String(user.warehouses) },
                    { label: "Last Login", value: user.lastLogin },
                  ].map((item) => (
                    <div key={item.label}>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#7a7876",
                          textTransform: "uppercase",
                          marginBottom: 3,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
                {user.notes && (
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: "1px solid #f2f2f2",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: "#7a7876",
                        textTransform: "uppercase",
                        marginBottom: 6,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Notes
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#4a4a4a",
                        lineHeight: 1.6,
                      }}
                    >
                      {user.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right column: Timeline ── */}
            <div className="card" style={{ padding: "20px" }}>
              <div
                style={{
                  fontFamily: '"Outfit",sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  marginBottom: 18,
                }}
              >
                Activity Timeline
              </div>

              {/* Expiry progress bar */}
              <div
                style={{
                  marginBottom: 24,
                  padding: "14px",
                  background: "#f9fbfe",
                  borderRadius: 10,
                  border: "1px solid #f2f2f2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "#7a7876",
                    marginBottom: 8,
                  }}
                >
                  <span>Trial progress</span>
                  <span style={{ fontWeight: 600, color: "var(--tx)" }}>
                    {user.daysLeft > 0
                      ? `${user.daysLeft}d remaining`
                      : "Expired"}
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
                      width: `${Math.max(0, Math.min(100, 100 - (user.daysLeft / 30) * 100))}%`,
                      background:
                        user.daysLeft <= 3
                          ? "#be123c"
                          : user.daysLeft <= 7
                            ? "#b45309"
                            : "var(--primary)",
                      borderRadius: 999,
                      transition: "width 0.4s",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "#a8a5a0",
                    marginTop: 6,
                  }}
                >
                  <span>{user.started}</span>
                  <span>{user.expiry}</span>
                </div>
              </div>

              {/* Events */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {timeline.map((event, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 14,
                      paddingBottom: 20,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: "var(--primary)",
                          flexShrink: 0,
                          marginTop: 3,
                        }}
                      />
                      {idx < timeline.length - 1 && (
                        <div
                          style={{
                            width: 2,
                            flex: 1,
                            background: "#f2f2f2",
                            marginTop: 4,
                          }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>
                        {event.action}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#7a7876", marginTop: 3 }}
                      >
                        {event.date} · {event.by}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
