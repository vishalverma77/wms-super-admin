import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Header } from "../../../components/Header";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTrafficRequest } from "../slice";
import {
  formatCompactNumber,
  formatDurationSeconds,
  getCountryFlag,
  resolveAnalyticsDateRange,
} from "../../../utils";

export function TrafficSourcesPage() {
  const dispatch = useAppDispatch();
  const {
    data: traffic,
    loading,
    error,
  } = useAppSelector((state) => state.traffic);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const range = resolveAnalyticsDateRange(dateRange);
    dispatch(fetchTrafficRequest(range));
  }, [dispatch, dateRange, reloadToken]);

  if (loading && !traffic) {
    return (
      <>
        <Header
          title="Traffic Sources Analytics"
          subtitle="Channel attribution, geographic distribution, and device breakdowns."
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
            Loading traffic analytics...
          </span>
        </div>
      </>
    );
  }

  const trafficSources = useMemo(() => {
    const colorMap: Record<string, string> = {
      direct: "#3b82f6",
      organicSearch: "#10b981",
      referral: "#f59e0b",
      social: "#8b5cf6",
      paid: "#ef4444",
      email: "#06b6d4",
    };

    return Object.entries(traffic?.trafficSources || {}).map(
      ([key, value]) => ({
        name: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
        value: value.visitors,
        conversions: value.conversions,
        color: colorMap[key] || "#94a3b8",
      }),
    );
  }, [traffic]);

  const deviceData = useMemo(() => {
    return Object.entries(traffic?.devices || {}).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      visitors: value,
    }));
  }, [traffic]);

  const browserData = useMemo(() => {
    return Object.entries(traffic?.browsers || {}).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      visitors: value,
    }));
  }, [traffic]);

  return (
    <>
      <Header
        title="Traffic Sources Analytics"
        subtitle="Channel attribution, geographic distribution, and device breakdowns."
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

      {/* Traffic Channel Distribution */}
      <div className="card" style={{ padding: "20px 24px", marginBottom: 24 }}>
        <h3
          style={{ margin: "0 0 20px", fontSize: "1.05rem", fontWeight: 700 }}
        >
          Channel Attribution
        </h3>
        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: 220, height: 220, flexShrink: 0 }}>
            {trafficSources.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderColor: "#334155",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                }}
              >
                {loading ? "Loading pie chart..." : "No data"}
              </div>
            )}
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 260,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            {trafficSources.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "10px 14px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  background: "#f8fafc",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: item.color,
                    }}
                  />
                  <span
                    style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}
                  >
                    {item.name}
                  </span>
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 700, color: "#0f1e35" }}
                >
                  {formatCompactNumber(item.value)}
                </div>
                <div style={{ fontSize: 11, color: "#16a34a" }}>
                  {formatCompactNumber(item.conversions)} conversions
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Country Breakdown */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div
          style={{ padding: "16px 20px", borderBottom: "1px solid #e6eef2" }}
        >
          <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
            Geographic Distribution (Countries)
          </h3>
        </div>
        <div className="twrap">
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Visitors</th>
                <th>Conversions</th>
                <th>Avg. Session Duration</th>
              </tr>
            </thead>
            <tbody>
              {(traffic?.countries || []).map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>
                    <span style={{ marginRight: 8, fontSize: "1.1rem" }}>
                      {getCountryFlag(row.country)}
                    </span>
                    {row.country}
                  </td>
                  <td>{formatCompactNumber(row.visitors)}</td>
                  <td>
                    <span className="tag t-green">
                      {formatCompactNumber(row.conversions)}
                    </span>
                  </td>
                  <td>{formatDurationSeconds(row.averageSession)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device & Browser Breakdowns */}
      <div className="resp-grid-half">
        <div className="card" style={{ padding: "20px 24px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "1rem", fontWeight: 700 }}>
            Device Category
          </h3>
          <div style={{ width: "100%", height: 220 }}>
            {deviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={deviceData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderColor: "#334155",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="visitors"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                }}
              >
                No device data
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ padding: "20px 24px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "1rem", fontWeight: 700 }}>
            Browser Distribution
          </h3>
          <div style={{ width: "100%", height: 220 }}>
            {browserData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={browserData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderColor: "#334155",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="visitors"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                }}
              >
                No browser data
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
