export type AnalyticsRangeLabel = "Today" | "Yesterday" | "Last 7 Days" | "Last 30 Days" | "Last 90 Days";

type DateRangeParams = {
  fromDate: string;
  toDate: string;
};

const COUNTRY_FLAGS: Record<string, string> = {
  india: "🇮🇳",
  usa: "🇺🇸",
  "united states": "🇺🇸",
  canada: "🇨🇦",
  germany: "🇩🇪",
  australia: "🇦🇺",
  "united kingdom": "🇬🇧",
  uk: "🇬🇧",
};

export function resolveAnalyticsDateRange(range: string): DateRangeParams {
  const today = new Date();
  const normalized = range as AnalyticsRangeLabel;

  if (normalized === "Today") {
    return buildRange(today, today);
  }

  if (normalized === "Yesterday") {
    const yesterday = shiftDays(today, -1);
    return buildRange(yesterday, yesterday);
  }

  if (normalized === "Last 7 Days") {
    return buildRange(shiftDays(today, -6), today);
  }

  if (normalized === "Last 90 Days") {
    return buildRange(shiftDays(today, -89), today);
  }

  return buildRange(shiftDays(today, -29), today);
}

export function formatCompactNumber(value?: number | null) {
  return new Intl.NumberFormat("en-US").format(Number(value || 0));
}

export function formatPercentage(value?: number | null, digits = 1) {
  return `${Number(value || 0).toFixed(digits)}%`;
}

export function formatDurationSeconds(value?: number | null) {
  const totalSeconds = Math.max(0, Math.round(Number(value || 0)));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes <= 0) {
    return `${seconds}s`;
  }

  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

export function getCountryFlag(country?: string | null) {
  const key = String(country || "").trim().toLowerCase();
  return COUNTRY_FLAGS[key] || "🌐";
}

function shiftDays(date: Date, days: number) {
  const shifted = new Date(date);
  shifted.setDate(shifted.getDate() + days);
  return shifted;
}

function buildRange(from: Date, to: Date): DateRangeParams {
  return {
    fromDate: toDateString(from),
    toDate: toDateString(to),
  };
}

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}
