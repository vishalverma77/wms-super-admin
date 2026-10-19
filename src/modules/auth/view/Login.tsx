import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo-dexo-glob.png"
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginRequest } from "../slice";
import { COLORS, withAlpha } from "../../../constants/colors";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ username, password }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side (Brand & Value Props) */}
        <div className="login-left">
          <div style={{ marginBottom: "24px" }}>
            <img src={logo} alt="Dexo Glob" style={{ height: "40px", objectFit: "contain" }} />
          </div>

          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.25,
              marginBottom: "32px",
              fontFamily: '"Outfit", sans-serif',
            }}
          >
            Digital Execution & Operations for <br />
            <span
              style={{
                background: "linear-gradient(90deg, #4857D2 0%, #6d7ef5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Global Logistics
            </span>
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              flex: 1,
            }}
          >
            {/* Value Prop 1 */}
            <div
              style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}
            >
              <div
                style={{
                  background: "#ffffff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: COLORS.primary,
                  border: "1px solid rgba(72, 87, 210, 0.16)",
                  boxShadow: `0 4px 12px ${withAlpha(COLORS.primary, 0.08)}`,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "0.95rem",
                    color: "#0f172a",
                    fontWeight: 700,
                  }}
                >
                  Secure & Reliable
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                  }}
                >
                  Enterprise-grade security to keep
                  <br />
                  your data protected
                </p>
              </div>
            </div>

            {/* Value Prop 2 */}
            <div
              style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}
            >
              <div
                style={{
                  background: "#ffffff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: COLORS.primary,
                  border: "1px solid rgba(72, 87, 210, 0.16)",
                  boxShadow: `0 4px 12px ${withAlpha(COLORS.primary, 0.08)}`,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "0.95rem",
                    color: "#0f172a",
                    fontWeight: 700,
                  }}
                >
                  Real-time Visibility
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                  }}
                >
                  Track operations and performance
                  <br />
                  in real time
                </p>
              </div>
            </div>

            {/* Value Prop 3 */}
            <div
              style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}
            >
              <div
                style={{
                  background: "#ffffff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: COLORS.primary,
                  border: "1px solid rgba(72, 87, 210, 0.16)",
                  boxShadow: `0 4px 12px ${withAlpha(COLORS.primary, 0.08)}`,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "0.95rem",
                    color: "#0f172a",
                    fontWeight: 700,
                  }}
                >
                  Built for Efficiency
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                  }}
                >
                  Streamline workflows and boost
                  <br />
                  warehouse productivity
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "auto", paddingTop: "20px" }}>
            <p
              style={{
                margin: 0,
                fontSize: "0.75rem",
                color: "#94a3b8",
                fontWeight: 600,
              }}
            >
              © Copyright 2026 SYNCGLOB | www.syncglob.com
            </p>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="login-right">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                background: COLORS.primaryTint,
                color: COLORS.primary,
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#0f172a",
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              Sign In
            </h2>
          </div>

          {error && (
            <div
              style={{
                padding: "12px",
                background: "#fff1f2",
                color: "#be123c",
                borderRadius: "6px",
                fontSize: "0.875rem",
                marginBottom: "16px",
                border: "1px solid #fecdd3",
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Role Field */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                Role
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  readOnly
                  value="Super Admin"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    color: "#334155",
                    fontSize: "0.875rem",
                    outline: "none",
                    fontWeight: 600,
                    cursor: "not-allowed",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                Username
              </label>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  style={{
                    width: "100%",
                    padding: "10px 14px 10px 38px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    color: "#0f172a",
                    fontSize: "0.875rem",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${withAlpha(COLORS.primary, 0.12)}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    padding: "10px 38px 10px 38px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    color: "#0f172a",
                    fontSize: "0.875rem",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${withAlpha(COLORS.primary, 0.12)}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "12px",
                width: "100%",
                background: loading
                  ? "#8e9fab"
                  : COLORS.gradient,
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "6px",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                boxShadow: loading ? "none" : `0 4px 14px ${withAlpha(COLORS.primary, 0.35)}`,
              }}
              onMouseOver={(e) => {
                if (!loading) e.currentTarget.style.background = COLORS.gradientHover;
              }}
              onMouseOut={(e) => {
                if (!loading)
                  e.currentTarget.style.background = COLORS.gradient;
              }}
            >
              {loading ? (
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
              )}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
