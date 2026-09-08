import { useEffect, useState } from "react";
import { MousePointer, Layers, Award } from "lucide-react";
import { Header } from "../../../components/Header";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchLandingRequest } from "../slice";
import {
  formatCompactNumber,
  formatDurationSeconds,
  formatPercentage,
  resolveAnalyticsDateRange,
} from "../../../utils";

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
  const dispatch = useAppDispatch();
  const {
    data: landing,
    loading,
    error,
  } = useAppSelector((state) => state.landing);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [searchQuery, setSearchQuery] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const range = resolveAnalyticsDateRange(dateRange);
    dispatch(fetchLandingRequest(range));
  }, [dispatch, dateRange, reloadToken]);

  if (loading && !landing) {
    return (
      <>
        <Header
          title="Landing Page Analytics"
          subtitle="Performance, user engagement, and conversion funnel for your landing page."
          dateRange={dateRange}
          setDateRange={setDateRange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search sections, CTAs, services, paths..."
        />
        <div
          className="card"
          style={{
            padding: 48,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 320,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              border: "3px solid #e2e8f0",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              marginBottom: 16,
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 600, color: "#64748b" }}>
            Loading landing analytics...
          </span>
        </div>
      </>
    );
  }

  const landingViewed = landing?.landingFunnel.landingViewed || 0;
  const landingPageFunnel = [
    {
      stage: "Landing Page Viewed",
      visitors: landing?.landingFunnel.landingViewed || 0,
      percentage: 100,
    },
    {
      stage: "Scrolled 25%",
      visitors: landing?.landingFunnel.scroll25 || 0,
      percentage:
        landingViewed > 0
          ? ((landing?.landingFunnel.scroll25 || 0) / landingViewed) * 100
          : 0,
    },
    {
      stage: "Scrolled 50%",
      visitors: landing?.landingFunnel.scroll50 || 0,
      percentage:
        landingViewed > 0
          ? ((landing?.landingFunnel.scroll50 || 0) / landingViewed) * 100
          : 0,
    },
    {
      stage: "Scrolled 75%",
      visitors: landing?.landingFunnel.scroll75 || 0,
      percentage:
        landingViewed > 0
          ? ((landing?.landingFunnel.scroll75 || 0) / landingViewed) * 100
          : 0,
    },
    {
      stage: "Scrolled 100%",
      visitors: landing?.landingFunnel.scroll100 || 0,
      percentage:
        landingViewed > 0
          ? ((landing?.landingFunnel.scroll100 || 0) / landingViewed) * 100
          : 0,
    },
    {
      stage: "CTA Clicked",
      visitors: landing?.landingFunnel.ctaClick || 0,
      percentage:
        landingViewed > 0
          ? ((landing?.landingFunnel.ctaClick || 0) / landingViewed) * 100
          : 0,
    },
    {
      stage: "Form Started",
      visitors: landing?.landingFunnel.formStarted || 0,
      percentage:
        landingViewed > 0
          ? ((landing?.landingFunnel.formStarted || 0) / landingViewed) * 100
          : 0,
    },
    {
      stage: "Form Submitted",
      visitors: landing?.landingFunnel.formSubmitted || 0,
      percentage:
        landingViewed > 0
          ? ((landing?.landingFunnel.formSubmitted || 0) / landingViewed) * 100
          : 0,
    },
  ];

  const rawSectionAnalyticsList = Object.entries(
    landing?.sectionAnalytics || {},
  ).map(([key, value]) => ({
    section: humanizeKey(key),
    views: value.views,
    avgTime: formatDurationSeconds(value.averageTime),
    interactions: value.interactions,
  }));

  const sectionAnalyticsList = rawSectionAnalyticsList.filter((item) => {
    if (!searchQuery.trim()) return true;
    return item.section.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const rawCtaPerformanceList = Object.entries(landing?.ctaPerformance || {}).map(
    ([key, value]) => ({
      name: humanizeKey(key),
      views: value.views,
      clicks: value.clicks,
      ctr: formatPercentage(value.ctr),
      conversion: formatPercentage(value.conversion),
    }),
  );

  const ctaPerformanceList = rawCtaPerformanceList.filter((item) => {
    if (!searchQuery.trim()) return true;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const rawServiceInterestList = Object.entries(
    landing?.serviceInterest || {},
  ).map(([key, value]) => ({
    service: humanizeKey(key),
    views: value.views,
    clicks: value.clicks,
    ctr: formatPercentage(value.ctr),
  }));

  const serviceInterestList = rawServiceInterestList.filter((item) => {
    if (!searchQuery.trim()) return true;
    return item.service.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const mostViewedPages = (landing?.pagePerformance.mostViewedPages || []).filter(
    (page) => {
      if (!searchQuery.trim()) return true;
      return (
        page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        humanizePath(page.path).toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
  );

  const leastViewedPages = (landing?.pagePerformance.leastViewedPages || []).filter(
    (page) => {
      if (!searchQuery.trim()) return true;
      return (
        page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        humanizePath(page.path).toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
  );

  return (
    <>
      <Header
        title="Landing Page Analytics"
        subtitle="Performance, user engagement, and conversion funnel for your landing page."
        dateRange={dateRange}
        setDateRange={setDateRange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search sections, CTAs, services, paths..."
        onRefresh={() => setReloadToken((prev) => prev + 1)}
      />

      {error ? (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #f87171",
            color: "#991b1b",
            padding: 14,
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      ) : null}

      {/* Section Analytics Table */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e6eef2",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Layers size={18} color="var(--primary)" />
          <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
            Section Analytics
          </h3>
        </div>
        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Section</th>
                <th>Views</th>
                <th>Avg. Time Spent</th>
                <th>Interactions</th>
              </tr>
            </thead>
            <tbody>
              {sectionAnalyticsList.length > 0 ? (
                sectionAnalyticsList.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{row.section}</td>
                    <td>{formatCompactNumber(row.views)}</td>
                    <td>{row.avgTime}</td>
                    <td>
                      <span className="tag t-blue">
                        {formatCompactNumber(row.interactions)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      textAlign: "center",
                      color: "#94a3b8",
                      padding: 24,
                    }}
                  >
                    {loading
                      ? "Loading section data..."
                      : "No section analytics data."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Landing Page Conversion Funnel */}
      <div className="card" style={{ padding: "20px 24px", marginBottom: 24 }}>
        <h3
          style={{ margin: "0 0 16px", fontSize: "1.05rem", fontWeight: 700 }}
        >
          Conversion Funnel
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {landingPageFunnel.map((step, idx) => (
            <div
              key={idx}
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <span>{step.stage}</span>
                <span style={{ color: "#64748b" }}>
                  {formatCompactNumber(step.visitors)} (
                  {step.percentage.toFixed(1)}%)
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  background: "#f1f5f9",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, Math.max(0, step.percentage))}%`,
                    background:
                      idx === 0
                        ? "var(--primary)"
                        : idx === landingPageFunnel.length - 1
                          ? "#10b981"
                          : "#60a5fa",
                    borderRadius: 4,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Performance Tables */}
      <div className="resp-grid-half" style={{ marginBottom: 24 }}>
        <div className="card">
          <div
            style={{ padding: "16px 20px", borderBottom: "1px solid #e6eef2" }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: 700,
                color: "#15803d",
              }}
            >
              Most Viewed Pages
            </h3>
          </div>
          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Page Path</th>
                  <th>Views</th>
                  <th>Active Users</th>
                </tr>
              </thead>
              <tbody>
                {mostViewedPages.map((page, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>
                      {humanizePath(page.path)}
                    </td>
                    <td>{formatCompactNumber(page.views)}</td>
                    <td>
                      <span className="tag t-green">
                        {formatCompactNumber(page.activeUsers)}
                      </span>
                    </td>
                  </tr>
                ))}
                {mostViewedPages.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center", padding: 20, color: "#94a3b8" }}>
                      {searchQuery ? `No pages found matching "${searchQuery}".` : "No data"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div
            style={{ padding: "16px 20px", borderBottom: "1px solid #e6eef2" }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: 700,
                color: "#b45309",
              }}
            >
              Least Viewed Pages
            </h3>
          </div>
          <div className="twrap">
            <table>
              <thead>
                <tr>
                  <th>Page Path</th>
                  <th>Views</th>
                  <th>Active Users</th>
                </tr>
              </thead>
              <tbody>
                {leastViewedPages.map((page, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>
                      {humanizePath(page.path)}
                    </td>
                    <td>{formatCompactNumber(page.views)}</td>
                    <td>
                      <span className="tag t-orange">
                        {formatCompactNumber(page.activeUsers)}
                      </span>
                    </td>
                  </tr>
                ))}
                {leastViewedPages.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center", padding: 20, color: "#94a3b8" }}>
                      {searchQuery ? `No pages found matching "${searchQuery}".` : "No data"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Performance Table */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e6eef2",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <MousePointer size={18} color="var(--primary)" />
          <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
            CTA Button Performance
          </h3>
        </div>
        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Button Name</th>
                <th>Views</th>
                <th>Clicks</th>
                <th>CTR</th>
                <th>Conversion Rate</th>
              </tr>
            </thead>
            <tbody>
              {ctaPerformanceList.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{row.name}</td>
                  <td>{formatCompactNumber(row.views)}</td>
                  <td>{formatCompactNumber(row.clicks)}</td>
                  <td>
                    <span className="tag t-blue">{row.ctr}</span>
                  </td>
                  <td>
                    <span className="tag t-green">{row.conversion}</span>
                  </td>
                </tr>
              ))}
              {ctaPerformanceList.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 20, color: "#94a3b8" }}>
                    {searchQuery ? `No CTAs found matching "${searchQuery}".` : "No CTA performance data."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Interest Breakdown */}
      <div className="card">
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e6eef2",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Award size={18} color="var(--primary)" />
          <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
            Service Interest Breakdown
          </h3>
        </div>
        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>Click-Through Rate</th>
              </tr>
            </thead>
            <tbody>
              {serviceInterestList.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{row.service}</td>
                  <td>{formatCompactNumber(row.views)}</td>
                  <td>{formatCompactNumber(row.clicks)}</td>
                  <td>
                    <span className="tag t-blue">{row.ctr}</span>
                  </td>
                </tr>
              ))}
              {serviceInterestList.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: 20, color: "#94a3b8" }}>
                    {searchQuery ? `No services found matching "${searchQuery}".` : "No service interest data."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
