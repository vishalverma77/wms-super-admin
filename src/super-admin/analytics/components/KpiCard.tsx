import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  growth: string;
  isPositive: boolean;
  sparkline: { v: number }[];
  icon: LucideIcon;
  colorTheme?: "b" | "g" | "t" | "w" | "r";
  description?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function KpiCard({
  label,
  value,
  growth,
  isPositive,
  sparkline,
  icon: Icon,
  colorTheme = "b",
  description = "vs. previous period",
  isSelected = false,
  onClick
}: KpiCardProps) {
  const chartColor = isPositive ? "#15803d" : "#be123c";
  const gradId = `kpi-grad-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div
      onClick={onClick}
      className={`kc kc-${colorTheme}`}
      style={{
        cursor: onClick ? "pointer" : "default",
        borderColor: isSelected ? "var(--primary)" : "#f2f2f2",
        boxShadow: isSelected ? "0 0 0 2px var(--primary-light), 0 4px 12px rgba(58,193,239,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 130
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
        <div className="kl" style={{ fontSize: 11, marginBottom: 0 }}>
          {label}
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "var(--primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--primary)"
          }}
        >
          <Icon size={16} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "2px 0 6px" }}>
        <div className="kn" style={{ fontSize: 24, margin: 0 }}>
          {value}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            fontSize: 11,
            fontWeight: 700,
            color: isPositive ? "#15803d" : "#be123c",
            background: isPositive ? "#dcfce7" : "#fff1f2",
            padding: "2px 6px",
            borderRadius: 4
          }}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{growth}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <span style={{ fontSize: 11, color: "#7a7876" }}>{description}</span>

        {/* Tiny Sparkline */}
        <div style={{ width: 65, height: 26 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkline} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={chartColor}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#${gradId})`}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
