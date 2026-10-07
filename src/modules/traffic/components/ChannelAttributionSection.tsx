import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Layers } from "lucide-react";
import { formatCompactNumber } from "../../../utils";
import { ChannelStatCard } from "./ChannelStatCard";
import type { ChannelAttributionSectionProps } from "../types";
import { channelAttributionStyles } from "../styles";

export function ChannelAttributionSection({
  trafficSources,
  totalVisitors,
  loading,
}: ChannelAttributionSectionProps) {
  return (
    <div className="card" style={channelAttributionStyles.card}>
      {/* Section Header */}
      <div style={channelAttributionStyles.header}>
        <div style={channelAttributionStyles.headerLeft}>
          <div style={channelAttributionStyles.headerIcon}>
            <Layers size={18} strokeWidth={2.4} />
          </div>
          <div>
            <h3 style={channelAttributionStyles.headerTitle}>
              Channel Attribution
            </h3>
            <p style={channelAttributionStyles.headerSubtitle}>
              Visitor volume, traffic share, and conversion performance by source
            </p>
          </div>
        </div>

        <span style={channelAttributionStyles.headerBadge}>
          {trafficSources.length} Channels Active
        </span>
      </div>

      <div style={channelAttributionStyles.content}>
        {/* Donut Chart with Center Metric */}
        <div style={channelAttributionStyles.donutContainer}>
          {trafficSources.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={64}
                    outerRadius={96}
                    paddingAngle={3}
                    cornerRadius={4}
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    cursor={false}
                    contentStyle={channelAttributionStyles.tooltip}
                    itemStyle={channelAttributionStyles.tooltipItem}
                    formatter={(val: unknown, name: unknown) => [
                      `${formatCompactNumber(Number(val) || 0)} visitors`,
                      String(name ?? ""),
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Donut Center Display */}
              <div style={channelAttributionStyles.donutCenter}>
                <div style={channelAttributionStyles.donutCount}>
                  {formatCompactNumber(totalVisitors)}
                </div>
                <div style={channelAttributionStyles.donutLabel}>
                  Visitors
                </div>
              </div>
            </>
          ) : (
            <div style={channelAttributionStyles.noData}>
              {loading ? "Loading pie chart..." : "No data"}
            </div>
          )}
        </div>

        {/* Channel Cards Grid */}
        <div style={channelAttributionStyles.cardsGrid}>
          {trafficSources.map((item, idx) => (
            <ChannelStatCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
