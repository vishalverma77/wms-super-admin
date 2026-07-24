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
];

const pageTitles: Record<string, string> = {
  "/": "Overview Dashboard",
  "/trial-users": "Trial Users",
  "/subscriptions": "Subscriptions",
  "/revenue": "Revenue",
  "/contact-sales": "Contact Sales",
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
        <div id="topbar">
          {/* Mobile hamburger */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>

          <div id="tbt">{title}</div>
        </div>

        <div id="content">
          <div className="pg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
