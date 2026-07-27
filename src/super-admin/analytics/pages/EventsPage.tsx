import { useEffect, useMemo, useState } from "react";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { fetchAnalyticsEvents, type AnalyticsEventsData } from "../analytics.api";
import {
  formatCompactNumber,
  resolveAnalyticsDateRange,
} from "../analytics.utils";

function deriveSection(page: string, eventName: string) {
  const value = `${page} ${eventName}`.toLowerCase();

  if (value.includes("contact")) return "Contact";
  if (value.includes("service")) return "Services";
  if (value.includes("pricing")) return "Pricing";
  if (value.includes("hero") || value.includes("landing")) return "Hero";
  if (value.includes("nav") || value.includes("header")) return "Navigation";
  if (value.includes("footer")) return "Footer";
  return "Unknown";
}

export function EventsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [filterEvent, setFilterEvent] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<AnalyticsEventsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const range = resolveAnalyticsDateRange(dateRange);
        const data = await fetchAnalyticsEvents({ ...range, limit: 200, page: 1 });
        if (isMounted) {
          setEvents(data);
          setCurrentPage(1);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load analytics events.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, [dateRange, reloadToken]);

  const enrichedEvents = useMemo(() => {
    return (events?.items || []).map((item) => ({
      ...item,
      section: item.section || deriveSection(item.page, item.event),
    }));
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (filterEvent === "All") {
      return enrichedEvents;
    }

    return enrichedEvents.filter((event) => {
      const text = `${event.event} ${event.section} ${event.page}`.toLowerCase();
      if (filterEvent === "Contact") return text.includes("contact");
      if (filterEvent === "CTA") return text.includes("cta") || text.includes("click");
      if (filterEvent === "Service") return text.includes("service");
      if (filterEvent === "Navigation") return text.includes("nav") || text.includes("header");
      return true;
    });
  }, [enrichedEvents, filterEvent]);

  const eventCounts = useMemo(() => {
    const counts = new Map<string, number>();

    filteredEvents.forEach((event) => {
      counts.set(event.event, (counts.get(event.event) || 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([event, count]) => ({ event, count }))
      .sort((left, right) => right.count - left.count || left.event.localeCompare(right.event));
  }, [filteredEvents]);

  const eventFrequencyMap = useMemo(() => new Map(eventCounts.map((item) => [item.event, item.count])), [eventCounts]);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <AnalyticsHeader
        title="Events Log"
        subtitle="Recent user interactions · Event categories · Device and location context"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={() => setReloadToken((value) => value + 1)}
      />

      {error && (
        <div className="card" style={{ padding: 16, marginBottom: 20, borderColor: "#fecaca", background: "#fff1f2", color: "#9f1239" }}>
          {error}
        </div>
      )}

      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
              Recent Events Table
            </div>
            <span className="tag t-blue" style={{ fontSize: 11, padding: "2px 8px" }}>
              {loading ? "Loading..." : `${formatCompactNumber(filteredEvents.length)} Events Logged`}
            </span>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["All", "Contact", "CTA", "Service", "Navigation"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilterEvent(cat);
                  setCurrentPage(1);
                }}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: filterEvent === cat ? 700 : 500,
                  border: "1px solid #dbe4ef",
                  background: filterEvent === cat ? "var(--primary-light)" : "#fff",
                  color: filterEvent === cat ? "var(--primary)" : "#64748b",
                  cursor: "pointer"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Event Name</th>
                <th>Frequency</th>
                <th>Section</th>
                <th>Device</th>
                <th>Browser</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.map((evt) => (
                <tr key={`${evt.time}-${evt.event}-${evt.page}`}>
                  <td style={{ color: "#64748b", fontSize: 12 }}>{evt.time}</td>
                  <td>
                    <span className="tag t-blue">
                      {evt.event}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: "#0f1e35" }}>
                    {formatCompactNumber(eventFrequencyMap.get(evt.event) || 1)}
                  </td>
                  <td style={{ fontWeight: 600 }}>{evt.section}</td>
                  <td>{evt.device}</td>
                  <td style={{ color: "#64748b" }}>{evt.browser}</td>
                  <td style={{ fontWeight: 600 }}>{evt.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Showing Page {currentPage} of {totalPages || 1} ({filteredEvents.length} total items)
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: "1px solid #dbe4ef",
                background: "#fff",
                color: currentPage === 1 ? "#cbd5e1" : "#334155",
                cursor: currentPage === 1 ? "not-allowed" : "pointer"
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages || 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: "1px solid #dbe4ef",
                background: "#fff",
                color: currentPage === totalPages || totalPages === 0 ? "#cbd5e1" : "#334155",
                cursor: currentPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer"
              }}
            >
              Next
            </button>
          </div>
          </div>
        </div>
    </>
  );
}
