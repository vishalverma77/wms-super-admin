import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight, ArrowRight, MoreHorizontal, Package } from "lucide-react";
import { COLORS, withAlpha } from "../constants/colors";

export type StatsCardColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "purple";

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color?: StatsCardColor;
  trend?: string | {
    value: string;
    isPositive?: boolean;
  };
  actionText?: string;
  onAction?: () => void;
  onOptionsClick?: () => void;
  sparklineData?: number[];
  className?: string;
  style?: React.CSSProperties;
}

const COLOR_THEMES: Record<
  StatsCardColor,
  {
    main: string;
    light: string;
    border: string;
    sparklineGradStart: string;
    sparklineGradEnd: string;
  }
> = {
  primary: {
    main: COLORS.primary, // #4857D2
    light: withAlpha(COLORS.primary, 0.09), // #eff2fe
    border: "#dce3fb",
    sparklineGradStart: withAlpha(COLORS.primary, 0.28),
    sparklineGradEnd: withAlpha(COLORS.primary, 0.0),
  },
  secondary: {
    main: COLORS.secondary, // #98A9F9
    light: withAlpha(COLORS.secondary, 0.16),
    border: "#e2e8fc",
    sparklineGradStart: withAlpha(COLORS.secondary, 0.35),
    sparklineGradEnd: withAlpha(COLORS.secondary, 0.0),
  },
  success: {
    main: "#10b981",
    light: "#ecfdf5",
    border: "#d1fae5",
    sparklineGradStart: "rgba(16, 185, 129, 0.3)",
    sparklineGradEnd: "rgba(16, 185, 129, 0.0)",
  },
  warning: {
    main: "#f59e0b",
    light: "#fffbeb",
    border: "#fef3c7",
    sparklineGradStart: "rgba(245, 158, 11, 0.3)",
    sparklineGradEnd: "rgba(245, 158, 11, 0.0)",
  },
  danger: {
    main: "#ef4444",
    light: "#fef2f2",
    border: "#fee2e2",
    sparklineGradStart: "rgba(239, 68, 68, 0.3)",
    sparklineGradEnd: "rgba(239, 68, 68, 0.0)",
  },
  purple: {
    main: "#7c3aed",
    light: "#f5f3ff",
    border: "#ede9fe",
    sparklineGradStart: "rgba(124, 58, 237, 0.3)",
    sparklineGradEnd: "rgba(124, 58, 237, 0.0)",
  },
};

export function StatsCard({
  title,
  value,
  icon: Icon = Package,
  color = "primary",
  trend,
  actionText = "View items",
  onAction,
  onOptionsClick,
  sparklineData,
  className = "",
  style,
}: StatsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActionHovered, setIsActionHovered] = useState(false);
  const theme = COLOR_THEMES[color] || COLOR_THEMES.primary;

  // Format trend string/object
  const trendValue = typeof trend === "string" ? trend : trend?.value;
  const isPositive =
    typeof trend === "object" && trend?.isPositive !== undefined
      ? trend.isPositive
      : typeof trendValue === "string" && !trendValue.trim().startsWith("-");

  // Unique ID for linear gradient in SVG
  const gradientId = React.useId().replace(/:/g, "_");

  // Generate smooth SVG curve path from sparkline data if provided, or use exact screenshot wave
  const { linePath, areaPath } = React.useMemo(() => {
    if (sparklineData && sparklineData.length >= 2) {
      const width = 130;
      const height = 44;
      const min = Math.min(...sparklineData);
      const max = Math.max(...sparklineData);
      const range = max - min || 1;
      const stepX = width / (sparklineData.length - 1);

      const points = sparklineData.map((val, idx) => ({
        x: idx * stepX,
        y: height - ((val - min) / range) * (height - 12) - 6,
      }));

      // Build smooth cubic bezier curve
      let d = `M ${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const curr = points[i];
        const next = points[i + 1];
        const mx = (curr.x + next.x) / 2;
        d += ` C ${mx},${curr.y} ${mx},${next.y} ${next.x},${next.y}`;
      }

      const area = `${d} L ${width},${height} L 0,${height} Z`;
      return { linePath: d, areaPath: area };
    }

    // Default smooth exact wavy curve matching screenshot
    // Starts low at left, slight crest, gentle trough, climbs up to sharp rise at top-right
    const d = "M 0,38 C 22,38 32,29 48,30 C 64,31 74,36 90,32 C 104,28 114,19 122,21 C 127,22 130,13 134,8";
    const area = `${d} L 134,48 L 0,48 Z`;
    return { linePath: d, areaPath: area };
  }, [sparklineData]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`stats-card-exact ${className}`}
      style={{
        background: "#ffffff",
        border: `1px solid ${isHovered ? theme.main : theme.border}`,
        borderRadius: "14px",
        padding: "12px 14px",
        boxShadow: isHovered
          ? `0 6px 16px -2px ${withAlpha(theme.main, 0.12)}, 0 2px 6px rgba(15, 23, 42, 0.04)`
          : "0 1px 4px rgba(15, 23, 42, 0.03)",
        transform: isHovered ? "translateY(-1.5px)" : "translateY(0)",
        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "102px",
        position: "relative",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* ── Top Header Row: Icon + Title (Left) and More Options (Right) ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
          {/* Rounded Icon Box */}
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: theme.light,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.main,
              flexShrink: 0,
              transition: "transform 0.2s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            <Icon size={15} strokeWidth={2.4} />
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "#0f172a",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontFamily: '"Outfit", "DM Sans", sans-serif',
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </div>
        </div>

        {/* More Options Button */}
        <button
          type="button"
          onClick={onOptionsClick}
          aria-label="More options"
          style={{
            background: "none",
            border: "none",
            padding: "2px",
            color: "#94a3b8",
            cursor: "pointer",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
        >
          <MoreHorizontal size={15} />
        </button>
      </div>

      {/* ── Bottom Section: Value & Action (Left) + Sparkline Wave (Right) ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: "8px",
          gap: "6px",
        }}
      >
        {/* Left Column: Big Value + Trend Pill + View Items Link */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
          {/* Value + Trend Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "7px", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#0f172a",
                fontFamily: '"Outfit", sans-serif',
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {value}
            </span>

            {trendValue && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "2px",
                  padding: "1.5px 5px",
                  borderRadius: "5px",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: '"Outfit", sans-serif',
                  background: isPositive ? "#eafaf3" : "#fff1f2",
                  color: isPositive ? "#059669" : "#dc2626",
                  lineHeight: 1.1,
                }}
              >
                {isPositive ? (
                  <ArrowUpRight size={11} strokeWidth={2.6} />
                ) : (
                  <ArrowDownRight size={11} strokeWidth={2.6} />
                )}
                <span>{trendValue}</span>
              </span>
            )}
          </div>

          {/* Action Link below value */}
          {actionText && (
            <button
              type="button"
              onClick={onAction}
              onMouseEnter={() => setIsActionHovered(true)}
              onMouseLeave={() => setIsActionHovered(false)}
              style={{
                background: "none",
                border: "none",
                padding: "1px 0 0 0",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                color: isActionHovered ? theme.main : "#64748b",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: '"DM Sans", sans-serif',
                transition: "color 0.15s ease",
                textAlign: "left",
                marginTop: "1px",
              }}
            >
              <span>{actionText}</span>
              <ArrowRight
                size={11}
                strokeWidth={2.4}
                style={{
                  transform: isActionHovered ? "translateX(2px)" : "translateX(0)",
                  transition: "transform 0.18s ease",
                }}
              />
            </button>
          )}
        </div>

        {/* Right Column: Mini Sparkline Wave with gradient fade */}
        <div
          style={{
            width: "74px",
            height: "26px",
            flexShrink: 0,
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginBottom: "1px",
          }}
        >
          <svg
            viewBox="0 0 134 48"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            style={{ display: "block", overflow: "visible" }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.main} stopOpacity={0.28} />
                <stop offset="100%" stopColor={theme.main} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* Gradient Area Fill */}
            <path d={areaPath} fill={`url(#${gradientId})`} />

            {/* Glowing Smooth Curve Stroke */}
            <path
              d={linePath}
              fill="none"
              stroke={theme.main}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
