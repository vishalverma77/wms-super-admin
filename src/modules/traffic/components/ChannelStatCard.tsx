import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { formatCompactNumber } from "../../../utils";
import type { ChannelStatCardProps } from "../types";
import { getChannelIcon } from "../utils";
import { channelStatCardStyles } from "../styles";

function renderChannelIcon(name: string) {
  const Icon = getChannelIcon(name);
  return React.createElement(Icon, { size: 16, strokeWidth: 2.4 });
}

export function ChannelStatCard({ item }: ChannelStatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const widthPercent = Math.max(Number(item.percentage) || 0, item.value > 0 ? 3 : 0);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={channelStatCardStyles.card(isHovered, item.color)}
    >
      {/* Top Brand Stripe */}
      <div style={channelStatCardStyles.topStripe(item.color, isHovered)} />

      {/* Top Header Row */}
      <div style={channelStatCardStyles.headerRow}>
        <div style={channelStatCardStyles.headerLeft}>
          <div style={channelStatCardStyles.iconBox(item.color, isHovered)}>
            {renderChannelIcon(item.name)}
          </div>
          <span style={channelStatCardStyles.name}>
            {item.name}
          </span>
        </div>

        <span style={channelStatCardStyles.percentageBadge(item.color)}>
          {item.percentage}%
        </span>
      </div>

      {/* Middle Metric */}
      <div>
        <div style={channelStatCardStyles.metricRow}>
          <span style={channelStatCardStyles.value}>
            {formatCompactNumber(item.value)}
          </span>
          <span style={channelStatCardStyles.unit}>
            visitors
          </span>
        </div>

        <div style={channelStatCardStyles.progressTrack}>
          <div style={channelStatCardStyles.progressBar(item.color, widthPercent)} />
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={channelStatCardStyles.footer}>
        {item.conversions > 0 ? (
          <span style={channelStatCardStyles.conversionBadgeActive}>
            <CheckCircle2 size={11} strokeWidth={2.4} />
            {formatCompactNumber(item.conversions)} conversions ({item.convRate}%)
          </span>
        ) : (
          <span style={channelStatCardStyles.conversionBadgeMuted}>
            0 conversions (0%)
          </span>
        )}
      </div>
    </div>
  );
}
