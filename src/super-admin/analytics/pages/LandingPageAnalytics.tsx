import { useEffect, useState } from "react";
import { MousePointer, Layers, Award } from "lucide-react";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { fetchAnalyticsLanding, type AnalyticsLandingData } from "../analytics.api";
import {
  formatCompactNumber,
  formatDurationSeconds,
  formatPercentage,
  resolveAnalyticsDateRange,
} from "../analytics.utils";

function humanizeKey(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

function humanizePath(path: string) {
  const value = String(path || "").trim();
  if (!value || value === "/") {
    return "Home";
  }

  return value
    .replace(/^\/+/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\//g, " / ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export function LandingPageAnalytics() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [landing, setLanding] = useState<AnalyticsLandingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadLanding = async () => {
      setLoading(true);
      setError(null);

      try {
        const range = resolveAnalyticsDateRange(dateRange);
        const data = await fetchAnalyticsLanding(range);
        if (isMounted) {
          setLanding(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load landing analytics.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadLanding();

    return () => {
      isMounted = false;
    };
  }, [dateRange, reloadToken]);

  const landingViewed = landing?.landingFunnel.landingViewed || 0;
  const landingPageFunnel = [
    { stage: "Landing Page Viewed", visitors: landing?.landingFunnel.landingViewed || 0, percentage: 100 },
    { stage: "Scrolled 25%", visitors: landing?.landingFunnel.scroll25 || 0, percentage: landingViewed > 0 ? (landing?.landingFunnel.scroll25 || 0) / landingViewed * 100 : 0 },
    { stage: "Scrolled 50%", visitors: landing?.landingFunnel.scroll50 || 0, percentage: landingViewed > 0 ? (landing?.landingFunnel.scroll50 || 0) / landingViewed * 100 : 0 },
    { stage: "Scrolled 75%", visitors: landing?.landingFunnel.scroll75 || 0, percentage: landingViewed > 0 ? (landing?.landingFunnel.scroll75 || 0) / landingViewed * 100 : 0 },
    { stage: "Scrolled 100%", visitors: landing?.landingFunnel.scroll100 || 0, percentage: landingViewed > 0 ? (landing?.landingFunnel.scroll100 || 0) / landingViewed * 100 : 0 },
    { stage: "CTA Clicked", visitors: landing?.landingFunnel.ctaClick || 0, percentage: landingViewed > 0 ? (landing?.landingFunnel.ctaClick || 0) / landingViewed * 100 : 0 },
    { stage: "Contact Form Started", visitors: landing?.landingFunnel.formStarted || 0, percentage: landingViewed > 0 ? (landing?.landingFunnel.formStarted || 0) / landingViewed * 100 : 0 },
    { stage: "Form Submitted", visitors: landing?.landingFunnel.formSubmitted || 0, percentage: landingViewed > 0 ? (landing?.landingFunnel.formSubmitted || 0) / landingViewed * 100 : 0 },
  ];
  const landingFunnelBaseVisitors = landingPageFunnel[0]?.visitors || 0;
  const landingFunnelFallbackWidths = [100, 88, 76, 64, 52, 42, 34, 28];

  const mostViewedPages = landing?.pagePerformance.mostViewedPages || [];
  const leastViewedPages = landing?.pagePerformance.leastViewedPages || [];
  const mostActiveSections = landing?.sectionPerformance.mostActiveSections || [];
  const leastActiveSections = landing?.sectionPerformance.leastActiveSections || [];

  const topPerformingServices = Object.entries(landing?.serviceInterest || {})
    .map(([name, data]) => ({
      name: humanizeKey(name),
      category: "Google Analytics event",
      views: data.views,
      clicks: data.clicks,
      conversion: data.ctr,
    }))
    .sort((left, right) => right.clicks - left.clicks)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const ctaPerformance = Object.entries(landing?.ctaPerformance || {})
    .map(([cta, data]) => ({
      cta: humanizeKey(cta),
      views: data.views,
      clicks: data.clicks,
      ctr: data.ctr,
      conversion: data.conversion,
    }))
    .sort((left, right) => right.clicks - left.clicks);

  return (
    <>
      <AnalyticsHeader
        title="Landing Page Views"
        subtitle="Funnel conversion · Section engagement · Page views & CTA performance"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={() => setReloadToken((value) => value + 1)}
      />

      {error && (
        <div className="card" style={{ padding: 16, marginBottom: 20, borderColor: "#fecaca", background: "#fff1f2", color: "#9f1239" }}>
          {error}
        </div>
      )}

      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Landing Page Scroll Funnel
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>
              How far visitors scroll through the landing page and where they drop off
            </div>
          </div>
          <span className="tag t-green" style={{ fontSize: 12, padding: "4px 12px", fontWeight: 700 }}>
            Total Landing Views: {loading ? "..." : formatCompactNumber(landingViewed)}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {landingPageFunnel.map((fn, idx) => {
            const widthPct = landingFunnelBaseVisitors > 0
              ? idx === 0
                ? 100
                : Math.max((fn.visitors / landingFunnelBaseVisitors) * 100, 24)
              : landingFunnelFallbackWidths[idx] ?? Math.max(24, 100 - idx * 12);
            const isTopStep = idx === 0;
            const isBottomStep = idx === landingPageFunnel.length - 1;

            return (
              <div
                key={fn.stage}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(widthPct, 100)}%`,
                    minWidth: 0,
                    padding: "14px 18px",
                    borderRadius: 12,
                    background: isTopStep
                      ? "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)"
                      : isBottomStep
                        ? "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)"
                        : "#ffffff",
                    border: isBottomStep ? "1px solid #16a34a" : "1px solid #dbe4f0",
                    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: isBottomStep ? "#15803d" : "var(--primary)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 13, color: "#0f1e35", lineHeight: 1.2 }}>
                        {fn.stage}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                        {formatPercentage(fn.percentage)} of landing visitors
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1a" }}>
                      {formatCompactNumber(fn.visitors)} visitors
                    </span>
                    <span className="tag t-blue" style={{ fontSize: 11, fontWeight: 700 }}>
                      {formatPercentage(fn.percentage)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24, marginBottom: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Most Viewed Pages
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Pages getting the highest view counts</div>
            </div>
            <Layers size={20} color="var(--primary)" />
          </div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                {mostViewedPages.map((page) => (
                  <tr key={page.path}>
                    <td style={{ fontWeight: 700, color: "#0f1e35" }}>{humanizePath(page.path)}</td>
                    <td>{formatCompactNumber(page.views)}</td>
                    <td>{formatCompactNumber(page.activeUsers)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Least Viewed Pages
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Pages with the lowest view counts</div>
            </div>
            <Layers size={20} color="var(--primary)" />
          </div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                {leastViewedPages.map((page) => (
                  <tr key={page.path}>
                    <td style={{ fontWeight: 700, color: "#0f1e35" }}>{humanizePath(page.path)}</td>
                    <td>{formatCompactNumber(page.views)}</td>
                    <td>{formatCompactNumber(page.activeUsers)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Most Active Sections
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Sections with the most interactions</div>
            </div>
            <Award size={20} color="var(--primary)" />
          </div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Views</th>
                  <th>Interactions</th>
                  <th>Avg Time</th>
                </tr>
              </thead>
              <tbody>
                {mostActiveSections.map((section) => (
                  <tr key={section.section}>
                    <td style={{ fontWeight: 700, color: "#0f1e35" }}>{section.section}</td>
                    <td>{formatCompactNumber(section.views)}</td>
                    <td>{formatCompactNumber(section.interactions)}</td>
                    <td>{formatDurationSeconds(section.averageTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Least Active Sections
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Sections with the fewest interactions</div>
            </div>
            <Award size={20} color="var(--primary)" />
          </div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Views</th>
                  <th>Interactions</th>
                  <th>Avg Time</th>
                </tr>
              </thead>
              <tbody>
                {leastActiveSections.map((section) => (
                  <tr key={section.section}>
                    <td style={{ fontWeight: 700, color: "#0f1e35" }}>{section.section}</td>
                    <td>{formatCompactNumber(section.views)}</td>
                    <td>{formatCompactNumber(section.interactions)}</td>
                    <td>{formatDurationSeconds(section.averageTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                Service Interest
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Visitor views and interest level by service</div>
            </div>
            <Award size={20} color="var(--primary)" />
          </div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Service Name</th>
                  <th>Views</th>
                  <th>Interest Score</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingServices.map((srv) => (
                  <tr key={srv.rank}>
                    <td>
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: srv.rank === 1 ? "#fef3c7" : srv.rank === 2 ? "#e6eef2" : "#f1f5f9",
                          color: srv.rank === 1 ? "#b45309" : "#475569",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 11
                        }}
                      >
                        #{srv.rank}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: "#0f1e35" }}>{srv.name}</div>
                      <div style={{ fontSize: 10, color: "#94a3b8" }}>{srv.category}</div>
                    </td>
                    <td>{formatCompactNumber(srv.views)}</td>
                    <td><span className="tag t-blue">{formatPercentage(srv.conversion)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
                CTA Performance
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Click-through rate by primary call-to-action buttons</div>
            </div>
            <MousePointer size={20} color="var(--primary)" />
          </div>

          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>CTA Button</th>
                  <th>Views</th>
                  <th>Clicks</th>
                  <th>CTR %</th>
                </tr>
              </thead>
              <tbody>
                {ctaPerformance.map((cta) => (
                  <tr key={cta.cta}>
                    <td style={{ fontWeight: 700, color: "#0f1e35" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)" }} />
                        {cta.cta}
                      </div>
                    </td>
                    <td>{formatCompactNumber(cta.views)}</td>
                    <td style={{ fontWeight: 600 }}>{formatCompactNumber(cta.clicks)}</td>
                    <td><span className="tag t-blue">{formatPercentage(cta.ctr)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
