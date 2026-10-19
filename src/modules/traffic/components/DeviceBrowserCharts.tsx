import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { DeviceBrowserChartsProps } from "../types";
import { deviceBrowserChartStyles } from "../styles";

export function DeviceBrowserCharts({
  deviceData,
  browserData,
}: DeviceBrowserChartsProps) {
  return (
    <div className="resp-grid-half">
      {/* Device Category */}
      <div className="card" style={deviceBrowserChartStyles.card}>
        <h3 style={deviceBrowserChartStyles.title}>
          Device Category
        </h3>
        <div style={deviceBrowserChartStyles.chartContainer}>
          {deviceData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deviceData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="deviceBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7889f7" />
                    <stop offset="100%" stopColor="#4857D2" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={deviceBrowserChartStyles.axisTick}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={deviceBrowserChartStyles.axisTick}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={deviceBrowserChartStyles.tooltip}
                />
                <Bar
                  dataKey="visitors"
                  fill="url(#deviceBarGrad)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={deviceBrowserChartStyles.empty}>
              No device data
            </div>
          )}
        </div>
      </div>

      {/* Browser Distribution */}
      <div className="card" style={deviceBrowserChartStyles.card}>
        <h3 style={deviceBrowserChartStyles.title}>
          Browser Distribution
        </h3>
        <div style={deviceBrowserChartStyles.chartContainer}>
          {browserData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={browserData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="browserBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#98A9F9" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={deviceBrowserChartStyles.axisTick}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={deviceBrowserChartStyles.axisTick}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={deviceBrowserChartStyles.tooltip}
                />
                <Bar
                  dataKey="visitors"
                  fill="url(#browserBarGrad)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={deviceBrowserChartStyles.empty}>
              No browser data
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
