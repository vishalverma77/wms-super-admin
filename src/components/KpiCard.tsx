import type { LucideIcon } from "lucide-react";
import { StatsCard, type StatsCardColor } from "./StatsCard";

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  colorTheme?: "b" | "g" | "t" | "w" | "r";
  description?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const THEME_MAP: Record<"b" | "g" | "t" | "w" | "r", StatsCardColor> = {
  b: "primary",
  g: "success",
  t: "secondary",
  w: "warning",
  r: "danger",
};

export function KpiCard({
  label,
  value,
  icon,
  colorTheme = "b",
  description,
  isSelected = false,
  onClick,
}: KpiCardProps) {
  return (
    <div onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      <StatsCard
        title={label.toUpperCase()}
        value={value}
        icon={icon}
        color={THEME_MAP[colorTheme] || "primary"}
        actionText={description || "View details"}
        trend="+12%"
        style={
          isSelected
            ? {
                borderColor: "var(--primary)",
                boxShadow: "0 0 0 2px var(--primary)",
              }
            : undefined
        }
      />
    </div>
  );
}

