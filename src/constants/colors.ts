/**
 * ============================================================================
 * Centralized Design System Colors & Master Palette Tokens
 * ============================================================================
 * SINGLE SOURCE OF TRUTH FOR ALL COLORS IN THE PROJECT.
 * 
 * To change the entire app's color palette, simply modify MASTER_THEME below!
 * The changes will automatically propagate across all CSS variables,
 * React components, MUI pickers, charts, and layout surfaces.
 */

// ----------------------------------------------------------------------------
// 🎨 MASTER PALETTE CONFIGURATION (EDIT HERE TO CHANGE GLOBALLY)
// ----------------------------------------------------------------------------
export const MASTER_THEME = {
  // Main Brand Palette Combination requested
  primary: "#4857D2", // Primary Brand color (Deep Royal Indigo)
  secondary: "#98A9F9", // Secondary Accent (Soft Lavender Periwinkle)

  // Primary Shades & Interactive States
  primaryHover: "#3b47b8",
  primaryActive: "#303b9e",
  primaryLight: "rgba(72, 87, 210, 0.08)",
  primaryFocusRing: "rgba(72, 87, 210, 0.22)",
  primaryTint: "#f0f2fd",
  primaryBorder: "#c5cdfa",

  // Secondary Shades & Interactive States
  secondaryHover: "#8295f5",
  secondaryActive: "#6d83f0",
  secondaryLight: "rgba(152, 169, 249, 0.15)",
  secondaryBorder: "#d8e0fc",

  // Gradients
  gradient: "linear-gradient(90deg, #7889f7 0%, #5d6fef 50%, #4857D2 100%)",
  gradientHover: "linear-gradient(90deg, #8899f8 0%, #6a7cf0 50%, #3b47b8 100%)",
  gradientSoft: "linear-gradient(135deg, #f6f8ff 0%, #edf1ff 100%)",
  gradientSubtle: "linear-gradient(135deg, rgba(72, 87, 210, 0.08) 0%, rgba(152, 169, 249, 0.15) 100%)",
  gradientCard: "linear-gradient(135deg, #ffffff 0%, #f6f8ff 40%, #edf1ff 75%, #e0e7ff 100%)",

  // App Shell, Backgrounds & Containers
  bg: "#f8faff",
  bg2: "#f0f3fc",
  bg3: "#e4e9f7",
  surface: "#ffffff",
  surfaceHover: "#f8fafc",
  surfaceActive: "#f1f5f9",
  sidebarBg: "#f8faff",
  sidebarActive: "#4857D2",
  navy: "#0f172a", // Slate Navy for high-contrast dark accents
  navy2: "#1e293b",
} as const;

// ----------------------------------------------------------------------------
// 1. BRAND & CORE THEME PALETTE
// ----------------------------------------------------------------------------
export const BRAND_COLORS = {
  primary: MASTER_THEME.primary,
  primaryHover: MASTER_THEME.primaryHover,
  primaryActive: MASTER_THEME.primaryActive,
  primaryLight: MASTER_THEME.primaryLight,
  primaryFocusRing: MASTER_THEME.primaryFocusRing,
  primaryBorder: MASTER_THEME.primaryBorder,
  primaryTint: MASTER_THEME.primaryTint,

  secondary: MASTER_THEME.secondary,
  secondaryHover: MASTER_THEME.secondaryHover,
  secondaryActive: MASTER_THEME.secondaryActive,
  secondaryLight: MASTER_THEME.secondaryLight,
  secondaryBorder: MASTER_THEME.secondaryBorder,

  gradient: MASTER_THEME.gradient,
  gradientHover: MASTER_THEME.gradientHover,
  gradientSoft: MASTER_THEME.gradientSoft,
  gradientSubtle: MASTER_THEME.gradientSubtle,
  gradientCard: MASTER_THEME.gradientCard,

  // Legacy mappings for backward compatibility
  teal: MASTER_THEME.primary,
  tealLight: MASTER_THEME.primaryTint,
  tealBorder: MASTER_THEME.primaryBorder,
  tealDark: MASTER_THEME.primaryActive,

  navy: MASTER_THEME.navy,
  navy2: MASTER_THEME.navy2,
  navyLight: "#334155",

  sky: MASTER_THEME.secondary,
  skyLight: "#f0f4ff",
  skyBorder: MASTER_THEME.secondaryBorder,
} as const;

// ----------------------------------------------------------------------------
// 2. BACKGROUNDS & SURFACES
// ----------------------------------------------------------------------------
export const SURFACE_COLORS = {
  bg: MASTER_THEME.bg,
  bg2: MASTER_THEME.bg2,
  bg3: MASTER_THEME.bg3,
  surface: MASTER_THEME.surface,
  surfaceHover: MASTER_THEME.surfaceHover,
  surfaceActive: MASTER_THEME.surfaceActive,
  white: "#ffffff",
  whiteSoft: "#fcfdff",
  sidebarBg: MASTER_THEME.sidebarBg,
  sidebarActive: MASTER_THEME.sidebarActive,
  overlay: "rgba(15, 23, 42, 0.45)",
  iconBox: MASTER_THEME.primary,
} as const;

// ----------------------------------------------------------------------------
// 3. NEUTRAL & GRAYSCALE SCALES
// ----------------------------------------------------------------------------
export const NEUTRALS = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
  950: "#020617",
} as const;

// ----------------------------------------------------------------------------
// 4. TYPOGRAPHY / TEXT HIERARCHY
// ----------------------------------------------------------------------------
export const TEXT_COLORS = {
  primary: "#1a1a1a",
  secondary: "#4a4a4a",
  muted: "#7a7876",
  placeholder: "#a8a5a0",
  dark: "#0f172a",
  inverse: "#ffffff",
  disabled: "#94a3b8",
  brand: MASTER_THEME.primary,
} as const;

// ----------------------------------------------------------------------------
// 5. BORDERS & DIVIDERS
// ----------------------------------------------------------------------------
export const BORDER_COLORS = {
  subtle: "#eef0f8",
  default: "#e2e6f3",
  input: "#e2e8f0",
  inputHover: "#cbd5e1",
  inputFocus: MASTER_THEME.primary,
  divider: "rgba(0, 0, 0, 0.06)",
  error: "#ef4444",
} as const;

// ----------------------------------------------------------------------------
// 6. SEMANTIC STATUS & ALERT PALETTES
// ----------------------------------------------------------------------------
export const STATUS_COLORS = {
  success: {
    main: "#15803d",
    light: "#f0fdf4",
    border: "#dcfce7",
    text: "#15803d",
    dark: "#14532d",
    badgeBg: "#f0fff5",
    badgeColor: "#047857",
    badgeBorder: "#f0fff5",
  },
  warning: {
    main: "#b45309",
    light: "#fffbeb",
    border: "#fef3c7",
    text: "#b45309",
    dark: "#78350f",
    badgeBg: "#fff3e9",
    badgeColor: "#de943b",
    badgeBorder: "#fff3e9",
  },
  danger: {
    main: "#be123c",
    light: "#fff1f2",
    border: "#fecdd3",
    text: "#be123c",
    dark: "#881337",
    red: "#ef4444",
    badgeBg: "#fef2f2",
    badgeColor: "#b91c1c",
    badgeBorder: "#fee2e2",
  },
  info: {
    main: MASTER_THEME.primary,
    light: MASTER_THEME.primaryTint,
    border: MASTER_THEME.primaryBorder,
    text: MASTER_THEME.primary,
    dark: MASTER_THEME.primaryActive,
    badgeBg: "#eef0fc",
    badgeColor: MASTER_THEME.primary,
    badgeBorder: MASTER_THEME.primaryBorder,
  },
  purple: {
    main: MASTER_THEME.primary,
    light: MASTER_THEME.primaryTint,
    border: MASTER_THEME.primaryBorder,
    text: MASTER_THEME.primary,
    badgeBg: MASTER_THEME.primaryTint,
    badgeColor: MASTER_THEME.primary,
    badgeBorder: MASTER_THEME.primaryBorder,
  },
  pink: {
    main: "#e22c81",
    light: "#fff5fc",
    border: "#fbcfe8",
    text: "#be185d",
    badgeBg: "#fff5fc",
    badgeColor: "#e22c81",
    badgeBorder: "#fff5fc",
  },
} as const;

// ----------------------------------------------------------------------------
// 7. CONSOLIDATED COLORS OBJECT
// ----------------------------------------------------------------------------
export const COLORS = {
  ...BRAND_COLORS,
  ...SURFACE_COLORS,
  primary: MASTER_THEME.primary,
  secondary: MASTER_THEME.secondary,
  gradient: MASTER_THEME.gradient,
  gradientHover: MASTER_THEME.gradientHover,
  gradientSoft: MASTER_THEME.gradientSoft,
  gradientSubtle: MASTER_THEME.gradientSubtle,
  gradientCard: MASTER_THEME.gradientCard,
  text: TEXT_COLORS.primary,
  textSecondary: TEXT_COLORS.secondary,
  textMuted: TEXT_COLORS.muted,
  textPlaceholder: TEXT_COLORS.placeholder,
  textDark: TEXT_COLORS.dark,
  textInverse: TEXT_COLORS.inverse,
  textBrand: TEXT_COLORS.brand,
  border: BORDER_COLORS.subtle,
  border2: BORDER_COLORS.default,
  borderInput: BORDER_COLORS.input,
  borderFocus: BORDER_COLORS.inputFocus,
  neutrals: NEUTRALS,
  status: STATUS_COLORS,
  success: STATUS_COLORS.success,
  warning: STATUS_COLORS.warning,
  danger: STATUS_COLORS.danger,
  info: STATUS_COLORS.info,
  purple: STATUS_COLORS.purple,
  pink: STATUS_COLORS.pink,
} as const;

// ----------------------------------------------------------------------------
// 8. CSS VARIABLE MAPPINGS (Direct CSS variable names without fallback duplication)
// ----------------------------------------------------------------------------
export const CSS_VARS = {
  primary: "var(--primary)",
  primaryHover: "var(--primary-hover)",
  primaryActive: "var(--primary-active)",
  primaryLight: "var(--primary-light)",
  primaryFocusRing: "var(--primary-focus-ring)",
  primaryTint: "var(--primary-tint)",
  primaryBorder: "var(--primary-border)",
  secondary: "var(--secondary)",
  secondaryHover: "var(--secondary-hover)",
  secondaryActive: "var(--secondary-active)",
  secondaryLight: "var(--secondary-light)",
  secondaryBorder: "var(--secondary-border)",
  primaryGradient: "var(--primary-gradient)",
  primaryGradientHover: "var(--primary-gradient-hover)",
  navy: "var(--navy)",
  navy2: "var(--navy2)",
  bg: "var(--bg)",
  bg2: "var(--bg2)",
  bg3: "var(--bg3)",
  white: "var(--white)",
  surface: "var(--surface)",
  card: "var(--card)",
  stroke: "var(--stroke)",
  bdr: "var(--bdr)",
  bdr2: "var(--bdr2)",
  boc: "var(--boc)",
  tx: "var(--tx)",
  tx1: "var(--tx1)",
  tx2: "var(--tx2)",
  tx3: "var(--tx3)",
  tx4: "var(--tx4)",
  iconBox: "var(--icon-box)",
  label: "var(--label)",
  teal: "var(--teal)",
  tealLight: "var(--teal-l)",
  tealBorder: "var(--teal-b)",
  red: "var(--red)",
  redLight: "var(--red-l)",
  redBorder: "var(--red-b)",
  amber: "var(--amb)",
  amberLight: "var(--amb-l)",
  amberBorder: "var(--amb-b)",
  green: "var(--grn)",
  greenLight: "var(--grn-l)",
  greenBorder: "var(--grn-b)",
  blue: "var(--blu)",
  blueLight: "var(--blu-l)",
  blueBorder: "var(--blu-b)",
  purple: "var(--pur)",
  purpleLight: "var(--pur-l)",
  purpleBorder: "var(--pur-b)",
} as const;

// ----------------------------------------------------------------------------
// 9. AUTOMATIC CSS VARIABLE INJECTION & HELPER FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Injects and synchronizes all CSS root variables with the JS theme configuration.
 * Call this function anytime you want to dynamically change colors at runtime!
 */
export function applyThemeVariables(theme: typeof MASTER_THEME = MASTER_THEME) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // Primary Brand Tokens
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--pri", theme.primary);
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--primary-hover", theme.primaryHover);
  root.style.setProperty("--color-primary-strong", theme.primaryHover);
  root.style.setProperty("--primary-active", theme.primaryActive);
  root.style.setProperty("--primary-light", theme.primaryLight);
  root.style.setProperty("--color-primary-soft", theme.primaryTint);
  root.style.setProperty("--primary-focus-ring", theme.primaryFocusRing);
  root.style.setProperty("--primary-tint", theme.primaryTint);
  root.style.setProperty("--primary-border", theme.primaryBorder);

  // Secondary Brand Tokens
  root.style.setProperty("--secondary", theme.secondary);
  root.style.setProperty("--secondary-hover", theme.secondaryHover);
  root.style.setProperty("--secondary-active", theme.secondaryActive);
  root.style.setProperty("--secondary-light", theme.secondaryLight);
  root.style.setProperty("--secondary-border", theme.secondaryBorder);

  // Gradients
  root.style.setProperty("--primary-gradient", theme.gradient);
  root.style.setProperty("--primary-gradient-hover", theme.gradientHover);
  root.style.setProperty("--primary-gradient-soft", theme.gradientSoft);
  root.style.setProperty("--primary-gradient-subtle", theme.gradientSubtle);
  root.style.setProperty("--primary-gradient-card", theme.gradientCard);

  // Surfaces & Backgrounds
  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--bg2", theme.bg2);
  root.style.setProperty("--bg3", theme.bg3);
  root.style.setProperty("--color-background", theme.bg);
  root.style.setProperty("--surface", theme.surface);
  root.style.setProperty("--color-surface", theme.surface);
  root.style.setProperty("--card", theme.surface);
  root.style.setProperty("--sidebar-bg", theme.sidebarBg);
  root.style.setProperty("--sidebar-active", theme.gradient);
  root.style.setProperty("--navy", theme.navy);
  root.style.setProperty("--navy2", theme.navy2);
  root.style.setProperty("--color-navy", theme.navy);

  // Brand UI Elements & Legacy Aliases
  root.style.setProperty("--icon-box", theme.primary);
  root.style.setProperty("--label", theme.primary);
  root.style.setProperty("--teal", theme.primary);
  root.style.setProperty("--teal-l", theme.primaryTint);
  root.style.setProperty("--teal-b", theme.primaryBorder);
  root.style.setProperty("--blue", theme.primary);
  root.style.setProperty("--blu", theme.primary);
  root.style.setProperty("--blu-l", theme.primaryTint);
  root.style.setProperty("--blu-b", theme.primaryBorder);
  root.style.setProperty("--pur", theme.primary);
  root.style.setProperty("--pur-l", theme.primaryTint);
  root.style.setProperty("--pur-b", theme.primaryBorder);
}

// Automatically sync CSS variables on initial load in browser
if (typeof window !== "undefined") {
  applyThemeVariables();
}

/**
 * Converts a hex color string to rgba with specified opacity
 * @param hex - Hex color string (e.g. "#4857D2" or "#fff")
 * @param alpha - Opacity from 0 to 1
 */
export function withAlpha(hex: string, alpha: number): string {
  let cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Returns the status theme token for a given status string
 */
export function getStatusTheme(status: "success" | "warning" | "danger" | "info" | "purple") {
  return STATUS_COLORS[status] || STATUS_COLORS.info;
}

export type MasterThemeType = typeof MASTER_THEME;
export type ColorsType = typeof COLORS;
export type ColorKey = keyof typeof COLORS;
export type CssVarKey = keyof typeof CSS_VARS;
export type StatusKey = keyof typeof STATUS_COLORS;
