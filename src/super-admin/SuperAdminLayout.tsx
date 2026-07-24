import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/new-logo-dexo-glob.svg";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import "./styles/super-admin.css";

const navItems = [
  { section: "Super Admin" },
  {
    path: "/",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
  {
    path: "/trial-users",
    label: "Trial Users",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    path: "/subscriptions",
    label: "Subscriptions",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    path: "/revenue",
    label: "Revenue",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-7" />
        <path d="M15 7h4v4" />
      </svg>
    ),
  },
  { section: "Analytics" },
  {
    path: "/analytics/overview",
    label: "Overview",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    path: "/analytics/user-behaviour",
    label: "User Behaviour",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    )
  },
  {
    path: "/analytics/landing-page",
    label: "Landing Page",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    path: "/analytics/traffic-sources",
    label: "Traffic Sources",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    )
  },
  {
    path: "/analytics/conversions",
    label: "Conversions",
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    )
  },
  {
    path: "/analytics/devices",
    label: "Devices",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    path: "/analytics/countries",
    label: "Countries",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 000 20M2 12h20" />
      </svg>
    )
  },
  {
    path: "/analytics/events",
    label: "Events",
    icon: (
      <svg viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    path: "/analytics/heatmaps",
    label: "Heatmaps",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3.5z" />
      </svg>
    )
  },
  {
    path: "/analytics/session-recordings",
    label: "Session Recordings",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    )
  },
  {
    path: "/analytics/reports",
    label: "Reports",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  }
];

const pageTitles: Record<string, string> = {
  "/": "Overview Dashboard",
  "/trial-users": "Trial Users",
  "/subscriptions": "Subscriptions",
  "/revenue": "Revenue",
  "/contact-sales": "Contact Sales",
  "/analytics": "Analytics Overview",
  "/analytics/overview": "Analytics Overview",
  "/analytics/user-behaviour": "User Behaviour & Flow Analytics",
  "/analytics/landing-page": "Landing Page Analytics & Funnel",
  "/analytics/traffic-sources": "Traffic Sources & Acquisition",
  "/analytics/conversions": "Form & Conversion Analytics",
  "/analytics/devices": "Device & Platform Analytics",
  "/analytics/countries": "Geographic & Country Analytics",
  "/analytics/events": "Live Events Stream & Log",
  "/analytics/heatmaps": "Heatmaps & Click Density Analysis",
  "/analytics/session-recordings": "Session Recordings & Replay",
  "/analytics/reports": "Analytics Reports & Export Center"
};

export function SuperAdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const title = pageTitles[location.pathname] ?? "Super Admin";

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`sa-root${mobileOpen ? " sb-open" : ""}`}>
      {/* ── Sidebar ── */}
      <div
        id="sb"
        className={collapsed ? "collapsed" : ""}
        style={{ position: "relative" }}
      >
        <button
          className="collapse-btn"
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? (
            <svg viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          )}
        </button>

        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="sbh p_relative">
            <img className="sblogo" src={logo} alt="DexoGlob" />
          </div>

          <div className="sbu">
            <div className="sbav">SA</div>
            <div>
              <div className="sbun">Super Admin</div>
            </div>
          </div>

          <nav className="sbnav">
            {navItems.map((item, idx) => {
              if (item.section) {
                return (
                  <div key={`sec-${idx}`} className="sbsc">
                    {item.section}
                  </div>
                );
              }
              return (
                <NavLink
                  key={item.path}
                  to={item.path as string}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `si${isActive ? " on" : ""}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="sbft">
            <div className="sbout" onClick={handleLogout}>
              <svg viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      <div className="sa-backdrop" onClick={() => setMobileOpen(false)} />

      {/* ── Main ── */}
      <div id="main">
        {/* Topbar */}
        <div id="topbar">
          <button className="mobile-nav-toggle" onClick={() => setMobileOpen((v) => !v)}>
            <svg viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div id="tbt">{title}</div>

          <div className="tbp">
            <span className="tbd" />
            <span>LIVE NETWORK</span>
          </div>
        </div>

        {/* Content Area */}
        <div id="content">
          <div className="pg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
