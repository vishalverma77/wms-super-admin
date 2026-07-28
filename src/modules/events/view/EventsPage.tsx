import { useEffect, useMemo, useState } from "react";
import { Header } from "../../../components/Header";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchEventsRequest } from "../slice";
import { formatCompactNumber, resolveAnalyticsDateRange } from "../../../utils";

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
  const dispatch = useAppDispatch();
  const {
    data: events,
    loading,
    error,
  } = useAppSelector((state) => state.events);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [filterEvent, setFilterEvent] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [reloadToken, setReloadToken] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const range = resolveAnalyticsDateRange(dateRange);
    dispatch(fetchEventsRequest({ ...range, limit: 200, page: 1 }));
    setCurrentPage(1);
  }, [dispatch, dateRange, reloadToken]);

  if (loading && !events) {
    return (
      <>
        <Header
          title="Live Events Stream"
          subtitle="Granular event tracking logs, section interactions, and device metadata."
          dateRange={dateRange}
          setDateRange={setDateRange}
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
            Loading events stream...
          </span>
        </div>
      </>
    );
  }

  const enrichedEvents = useMemo(() => {
    return (events?.items || []).map((item) => ({
      ...item,
      sectionName: item.section || deriveSection(item.page, item.event),
    }));
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (filterEvent === "All") return enrichedEvents;
    return enrichedEvents.filter((e) => e.event === filterEvent);
  }, [enrichedEvents, filterEvent]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / itemsPerPage),
  );

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, currentPage]);

  return (
    <>
      <Header
        title="Live Events Stream"
        subtitle="Granular event tracking logs, section interactions, and device metadata."
        dateRange={dateRange}
        setDateRange={setDateRange}
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

      {/* Events Table Container */}
      <div
        className="card"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e6eef2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{ fontWeight: 700, fontSize: "1.05rem", color: "#0f1e35" }}
          >
            Event Logs{" "}
            <span style={{ fontSize: 13, fontWeight: 500, color: "#64748b" }}>
              ({formatCompactNumber(filteredEvents.length)} events recorded)
            </span>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>
              Filter Event:
            </span>
            <select
              value={filterEvent}
              onChange={(e) => {
                setFilterEvent(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                height: 34,
                padding: "0 10px",
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                fontSize: 12,
                fontWeight: 600,
                color: "#334155",
                background: "#fff",
              }}
            >
              <option value="All">All Events</option>
              <option value="page_view">page_view</option>
              <option value="scroll">scroll</option>
              <option value="cta_click">cta_click</option>
              <option value="form_start">form_start</option>
              <option value="form_submit">form_submit</option>
            </select>
          </div>
        </div>

        <div className="twrap" style={{ flex: 1 }}>
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event Name</th>
                <th>Section</th>
                <th>Page Path</th>
                <th>Device</th>
                <th>Browser</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((evt, idx) => (
                  <tr key={idx}>
                    <td style={{ fontSize: 12, color: "#64748b" }}>
                      {evt.time}
                    </td>
                    <td>
                      <span
                        className={`tag ${
                          evt.event.includes("click") ||
                          evt.event.includes("submit")
                            ? "t-green"
                            : evt.event.includes("scroll")
                              ? "t-orange"
                              : "t-blue"
                        }`}
                      >
                        {evt.event}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{evt.sectionName}</td>
                    <td style={{ fontSize: 12, color: "#334155" }}>
                      {evt.page}
                    </td>
                    <td style={{ fontSize: 12, color: "#64748b" }}>
                      {evt.device}
                    </td>
                    <td style={{ fontSize: 12, color: "#64748b" }}>
                      {evt.browser}
                    </td>
                    <td style={{ fontWeight: 600 }}>{evt.country}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: 32,
                      color: "#94a3b8",
                    }}
                  >
                    {loading
                      ? "Loading event logs..."
                      : "No events recorded for this selection."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #e6eef2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Showing Page {currentPage} of {totalPages}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                background: currentPage === 1 ? "#f1f5f9" : "#fff",
                color: currentPage === 1 ? "#94a3b8" : "#334155",
                fontSize: 12,
                fontWeight: 600,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                background: currentPage >= totalPages ? "#f1f5f9" : "#fff",
                color: currentPage >= totalPages ? "#94a3b8" : "#334155",
                fontSize: 12,
                fontWeight: 600,
                cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
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
