import { withAlpha } from "../../constants/colors";

export const trafficPageStyles = {
  loadingCard: {
    padding: 48,
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 320,
  },

  spinner: {
    width: 36,
    height: 36,
    border: "3px solid #e2e8f0",
    borderTopColor: "var(--primary)",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginBottom: 16,
  },

  loadingText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#64748b",
  },

  errorBanner: {
    background: "#fee2e2",
    border: "1px solid #f87171",
    color: "#991b1b",
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },

  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "14px",
    marginBottom: "24px",
  },
};

export const channelAttributionStyles = {
  card: {
    padding: "22px 24px",
    marginBottom: 24,
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    flexWrap: "wrap" as const,
    gap: 10,
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "var(--primary-light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--primary)",
  },

  headerTitle: {
    margin: 0,
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#0f172a",
    fontFamily: '"DM Sans", sans-serif',
  },

  headerSubtitle: {
    margin: "2px 0 0",
    fontSize: 12,
    color: "#64748b",
    fontWeight: 500,
  },

  headerBadge: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--primary)",
    background: "var(--primary-light)",
    padding: "4px 10px",
    borderRadius: 20,
  },

  content: {
    display: "flex",
    gap: 28,
    alignItems: "center",
    flexWrap: "wrap" as const,
  },

  donutContainer: {
    width: 230,
    height: 230,
    flexShrink: 0,
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  donutCenter: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center" as const,
    pointerEvents: "none" as const,
  },

  donutCount: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#0f172a",
    fontFamily: '"Outfit", sans-serif',
    lineHeight: 1,
    letterSpacing: "-0.02em",
  },

  donutLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#64748b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
    marginTop: "4px",
  },

  cardsGrid: {
    flex: 1,
    minWidth: 280,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 14,
  },

  noData: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
  },

  tooltip: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderRadius: 10,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    color: "#fff",
    padding: "10px 14px",
  },

  tooltipItem: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
  },
};

export const channelStatCardStyles = {
  card: (isHovered: boolean, color: string) => ({
    background: "#ffffff",
    border: `1px solid ${isHovered ? color : "#e8ecf8"}`,
    borderRadius: "14px",
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    gap: "12px",
    boxShadow: isHovered
      ? `0 10px 24px -4px ${withAlpha(color, 0.2)}, 0 2px 6px rgba(15, 23, 42, 0.04)`
      : "0 1px 4px rgba(15, 23, 42, 0.04)",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
    position: "relative" as const,
    overflow: "hidden" as const,
  }),

  topStripe: (color: string, isHovered: boolean) => ({
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: color,
    opacity: isHovered ? 1 : 0.7,
    transition: "opacity 0.2s ease",
  }),

  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
  },

  iconBox: (color: string, isHovered: boolean) => ({
    width: "32px",
    height: "32px",
    borderRadius: "9px",
    background: withAlpha(color, 0.12),
    color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "transform 0.2s ease",
    transform: isHovered ? "scale(1.08)" : "scale(1)",
  }),

  name: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    whiteSpace: "nowrap" as const,
    overflow: "hidden" as const,
    textOverflow: "ellipsis" as const,
    letterSpacing: "-0.01em",
    fontFamily: '"DM Sans", sans-serif',
  },

  percentageBadge: (color: string) => ({
    fontSize: "11px",
    fontWeight: 700,
    color,
    background: withAlpha(color, 0.12),
    padding: "2.5px 8px",
    borderRadius: "12px",
    whiteSpace: "nowrap" as const,
    letterSpacing: "0.02em",
    fontFamily: '"Outfit", sans-serif',
  }),

  metricRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    marginBottom: "8px",
  },

  value: {
    fontSize: "24px",
    fontWeight: 800,
    color: "#0f172a",
    fontFamily: '"Outfit", sans-serif',
    lineHeight: 1,
    letterSpacing: "-0.02em",
  },

  unit: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#64748b",
  },

  progressTrack: {
    width: "100%",
    height: "5px",
    background: "#f1f5f9",
    borderRadius: "999px",
    overflow: "hidden" as const,
  },

  progressBar: (color: string, widthPercent: number) => ({
    width: `${widthPercent}%`,
    height: "100%",
    background: color,
    borderRadius: "999px",
    transition: "width 0.4s ease",
  }),

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "6px",
    borderTop: "1px solid #f8fafc",
  },

  conversionBadgeActive: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    fontWeight: 600,
    color: "#15803d",
    background: "#f0fdf4",
    border: "1px solid #dcfce7",
    padding: "2px 8px",
    borderRadius: "6px",
    fontFamily: '"DM Sans", sans-serif',
  },

  conversionBadgeMuted: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11px",
    fontWeight: 500,
    color: "#64748b",
    background: "#f8fafc",
    border: "1px solid #eef2f6",
    padding: "2px 8px",
    borderRadius: "6px",
    fontFamily: '"DM Sans", sans-serif',
  },
};

export const countryTableStyles = {
  card: {
    marginBottom: 24,
  },

  header: {
    padding: "16px 20px",
    borderBottom: "1px solid #e6eef2",
  },

  headerTitle: {
    margin: 0,
    fontSize: "1.05rem",
    fontWeight: 700,
  },

  countryCell: {
    fontWeight: 600,
  },

  countryFlag: {
    marginRight: 8,
    fontSize: "1.1rem",
  },

  emptyCell: {
    textAlign: "center" as const,
    padding: 24,
    color: "#94a3b8",
  },
};

export const deviceBrowserChartStyles = {
  card: {
    padding: "20px 24px",
  },

  title: {
    margin: "0 0 16px",
    fontSize: "1rem",
    fontWeight: 700,
  },

  chartContainer: {
    width: "100%",
    height: 220,
  },

  empty: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
  },

  axisTick: {
    fontSize: 12,
    fill: "#64748b",
  },

  tooltip: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderRadius: 8,
    color: "#fff",
  },
};
