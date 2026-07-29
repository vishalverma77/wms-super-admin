// Utility functions for plan card color customization & 3-shade gradient generator

export interface ColorShades {
  light: string;
  main: string;
  dark: string;
}

// Default presets for plan tiers if no backend custom color exists
export const DEFAULT_TIER_COLORS: Record<string, ColorShades> = {
  starter: {
    light: "#e0f2fe",
    main: "#3b82f6",
    dark: "#1d4ed8",
  },
  growth: {
    light: "#f3e8ff",
    main: "#8b5cf6",
    dark: "#6366f1",
  },
  enterprise: {
    light: "#fef3c7",
    main: "#f59e0b",
    dark: "#d97706",
  },
};

/**
 * Validates a 3-char or 6-char hex string
 */
export function isValidHex(hex: string): boolean {
  return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test((hex || "").trim());
}

/**
 * Ensures a valid 6-digit hex string formatted for HTML color inputs (#rrggbb)
 */
export function to6DigitHex(hex?: string): string {
  if (!hex || typeof hex !== "string" || !isValidHex(hex)) {
    return "#0ea5e9";
  }
  let clean = hex.trim().replace("#", "");
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return `#${clean}`;
}

/**
 * Converts Hex string to {r, g, b}
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleanHex = hex.trim().replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (cleanHex.length !== 6) return null;
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Converts {r, g, b} to Hex string
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Blends a color towards white (lighten) or black (darken)
 */
function blendColor(hex: string, factor: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const target = factor > 0 ? 255 : 0;
  const absFactor = Math.abs(factor);

  const r = rgb.r + (target - rgb.r) * absFactor;
  const g = rgb.g + (target - rgb.g) * absFactor;
  const b = rgb.b + (target - rgb.b) * absFactor;

  return rgbToHex(r, g, b);
}

/**
 * Given a base hex color, automatically generates Light, Main, and Dark shades.
 */
export function generateColorShades(baseHex: string): ColorShades {
  if (!isValidHex(baseHex)) {
    return {
      light: "#f1f5f9",
      main: "#64748b",
      dark: "#334155",
    };
  }

  const cleanHex = baseHex.trim().startsWith("#")
    ? baseHex.trim()
    : `#${baseHex.trim()}`;

  const light = blendColor(cleanHex, 0.85);
  const dark = blendColor(cleanHex, -0.35);

  return {
    light,
    main: cleanHex,
    dark,
  };
}

/**
 * Combines 3 color shades into a single string format: "#LIGHT,#MAIN,#DARK"
 */
export function combineColorShades(shades: ColorShades): string {
  return `${shades.light.trim()},${shades.main.trim()},${shades.dark.trim()}`;
}

/**
 * Formats 3 color shades into a standard CSS linear-gradient string for backend
 */
export function createGradientString(shades: ColorShades): string {
  return `linear-gradient(135deg, ${shades.main.trim()} 0%, ${shades.dark.trim()} 100%)`;
}

/**
 * Parses a combined color string, hex string, or CSS linear-gradient string.
 */
export function parsePlanColor(
  colorStr?: string,
  tier?: string,
): ColorShades {
  const tierKey = (tier || "starter").toString().trim().toLowerCase();
  const fallback =
    DEFAULT_TIER_COLORS[tierKey] ||
    (tierKey.includes("growth") || tierKey.includes("pro")
      ? DEFAULT_TIER_COLORS.growth
      : tierKey.includes("enterprise")
      ? DEFAULT_TIER_COLORS.enterprise
      : DEFAULT_TIER_COLORS.starter);

  if (!colorStr || typeof colorStr !== "string") {
    return fallback;
  }

  if (colorStr.includes("linear-gradient")) {
    const hexMatches = colorStr.match(/#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})\b/g);
    if (hexMatches && hexMatches.length >= 1) {
      const main = hexMatches[0];
      const dark = hexMatches.length >= 2 ? hexMatches[1] : blendColor(main, -0.35);
      const light = blendColor(main, 0.85);
      return { light, main, dark };
    }
  }

  const parts = colorStr.split(",").map((s) => s.trim());

  if (parts.length === 3 && isValidHex(parts[0]) && isValidHex(parts[1]) && isValidHex(parts[2])) {
    return {
      light: parts[0],
      main: parts[1],
      dark: parts[2],
    };
  }

  if (isValidHex(parts[0])) {
    return generateColorShades(parts[0]);
  }

  return fallback;
}
