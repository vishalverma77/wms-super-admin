import { useState } from "react";
import { Globe, Search } from "lucide-react";
import { countryAnalytics } from "../mockData";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { ExportReportModal } from "../components/ExportReportModal";

export function CountriesPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [searchQuery, setSearchQuery] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);

  const filteredCountries = countryAnalytics.filter(c =>
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AnalyticsHeader
        title="Geographic & Country Analytics"
        subtitle="Global audience reach · International lead conversions · Regional engagement & latency"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => setShowExportModal(true)}
      />

      {/* World Map Visual Card Placeholder */}
      <div className="card" style={{ padding: 24, marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>
              Global Geographic Distribution Map
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Active visitor clusters across continents</div>
          </div>
          <span className="tag t-green">Global Network Active</span>
        </div>

        {/* Visual Map Canvas Box */}
        <div
          style={{
            height: 220,
            borderRadius: 12,
            background: "linear-gradient(135deg, #0f1e35 0%, #1e293b 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            position: "relative",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)"
          }}
        >
          <Globe size={48} color="var(--primary)" style={{ opacity: 0.6, marginBottom: 12 }} />
          <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 18, fontWeight: 700 }}>
            Interactive World Map View
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
            Top Regions: India (30.0%), USA (27.0%), Canada (12.0%), Germany (10.0%), Australia (8.0%), UK (7.0%)
          </div>
        </div>
      </div>

      {/* Top Countries Data Table */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 16, color: "#1a1a1a" }}>
            Top Country Performance Table
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, width: 220, height: 36, border: "1px solid #dbe4ef", borderRadius: 6, padding: "0 10px", background: "#fff" }}>
            <Search size={14} color="#64748b" />
            <input
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 0, outline: 0, fontSize: 12, width: "100%", background: "transparent" }}
            />
          </div>
        </div>

        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Visitors</th>
                <th>Conversions</th>
                <th>Avg Session</th>
                <th>Traffic %</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map((c, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700 }}>
                      <span style={{ fontSize: 18 }}>{c.flag}</span>
                      <span>{c.country}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.visitors}</td>
                  <td><span className="tag t-green">{c.conversions}</span></td>
                  <td style={{ color: "#64748b" }}>{c.avgSession}</td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{c.trafficPct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportReportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
    </>
  );
}
