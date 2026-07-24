import { useState } from "react";
import { recentEvents } from "../mockData";
import { AnalyticsHeader } from "../components/AnalyticsHeader";

export function EventsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [filterEvent, setFilterEvent] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredEvents = filterEvent === "All"
    ? recentEvents
    : recentEvents.filter(e => e.event.toLowerCase().includes(filterEvent.toLowerCase()));

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <AnalyticsHeader
        title="Events Log"
        subtitle="Recent user interactions · Event categories · Device and location context"
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
              Recent Events Table
            </div>
            <span className="tag t-blue" style={{ fontSize: 11, padding: "2px 8px" }}>
              {filteredEvents.length} Events Logged
            </span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
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
                <th>Section</th>
                <th>Device</th>
                <th>Browser</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.map((evt) => (
                <tr key={evt.id}>
                  <td style={{ color: "#64748b", fontSize: 12 }}>{evt.time}</td>
                  <td>
                    <span className={`tag ${evt.status === 'success' ? 't-green' : evt.status === 'warning' ? 't-orange' : 't-blue'}`}>
                      {evt.event}
                    </span>
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

        {/* Pagination Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Showing Page {currentPage} of {totalPages || 1} ({filteredEvents.length} total items)
          </span>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
