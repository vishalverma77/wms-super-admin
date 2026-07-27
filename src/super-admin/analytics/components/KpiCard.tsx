import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  colorTheme?: "b" | "g" | "t" | "w" | "r";
  description?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  colorTheme = "b",
  description,
  isSelected = false,
  onClick
}: KpiCardProps) {
  return (
    <div
      onClick={onClick}
      className={`kc kc-${colorTheme}`}
      style={{
        cursor: onClick ? "pointer" : "default",
        borderColor: isSelected ? "var(--primary)" : "#f2f2f2",
        boxShadow: isSelected
          ? "0 0 0 2px var(--primary-light), 0 4px 12px rgba(58,193,239,0.15)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderRadius: "10px",
        minHeight: 110
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div className="kl" style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 0 }}>
          {label}
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--primary)"
          }}
        >
          <Icon size={18} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <div className="kn" style={{ fontSize: 26, fontWeight: 800, color: "#0f1e35", margin: 0 }}>
          {value}
        </div>
      </div>

      {description && (
        <span style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{description}</span>
      )}
    </div>
  );
}
