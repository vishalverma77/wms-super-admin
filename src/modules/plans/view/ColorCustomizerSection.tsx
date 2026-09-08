import {
  Box,
  Typography,
  TextField,
  Grid,
  Chip,
  InputAdornment,
} from "@mui/material";
import { Palette as PaletteIcon } from "@mui/icons-material";
import type { ColorCustomizerSectionProps, InputChangeEvent } from "../types";
import { to6DigitHex } from "../utils";

export function ColorCustomizerSection({
  baseHex,
  lightColor,
  mainColor,
  darkColor,
  onBaseHexChange,
  onLightChange,
  onMainChange,
  onDarkChange,
}: ColorCustomizerSectionProps) {
  return (
    <Box className="plan-section-card-premium">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography className="plan-section-title-premium">
          <PaletteIcon sx={{ fontSize: 18, color: "#0284c7" }} /> Brand Color
          Customizer
        </Typography>
        <Chip
          label="API Synced"
          size="small"
          sx={{
            backgroundColor: "#f0f9ff",
            color: "#0284c7",
            fontWeight: 800,
            fontSize: "0.625rem",
            border: "1px solid #bae6fd",
          }}
        />
      </Box>

      {/* Base Hex Input */}
      <Box>
        <Typography variant="caption" className="plan-field-label">
          Primary Hex Accent Color (Auto-generates 3 gradient shades)
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <input
            type="color"
            value={to6DigitHex(baseHex)}
            onChange={(e) => onBaseHexChange(e.target.value)}
            style={{
              width: 44,
              height: 40,
              padding: 0,
              border: "2px solid #0284c7",
              borderRadius: 10,
              cursor: "pointer",
              backgroundColor: "transparent",
              flexShrink: 0,
            }}
          />
          <TextField
            fullWidth
            size="small"
            value={baseHex}
            onChange={(e: InputChangeEvent) => onBaseHexChange(e.target.value)}
            placeholder="#10b981 or #3b82f6"
            className="plan-textfield-premium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span
                    style={{
                      fontWeight: 900,
                      color: "#0284c7",
                      fontSize: "1rem",
                    }}
                  >
                    #
                  </span>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Three Shade Color Cards (Light, Main, Dark) */}
      <Typography variant="caption" className="plan-field-label" sx={{ mt: 1 }}>
        Three Color Gradient Stops:
      </Typography>

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {/* Box 1: Light Shade */}
        <Grid item xs={12} sm={4}>
          <Box
            className="color-shade-card-premium"
            style={{ borderTop: `3px solid ${lightColor}` }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box
                className="color-swatch-circle-premium"
                style={{ backgroundColor: lightColor }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: 800, color: "#334155" }}
              >
                1. Light Background
              </Typography>
            </Box>
            <TextField
              fullWidth
              size="small"
              value={lightColor}
              onChange={(e) => onLightChange(e.target.value)}
              className="plan-textfield-premium"
            />
          </Box>
        </Grid>

        {/* Box 2: Main Accent */}
        <Grid item xs={12} sm={4}>
          <Box
            className="color-shade-card-premium"
            style={{ borderTop: `3px solid ${mainColor}` }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box
                className="color-swatch-circle-premium"
                style={{ backgroundColor: mainColor }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: 800, color: "#334155" }}
              >
                2. Main Brand Color
              </Typography>
            </Box>
            <TextField
              fullWidth
              size="small"
              value={mainColor}
              onChange={(e) => onMainChange(e.target.value)}
              className="plan-textfield-premium"
            />
          </Box>
        </Grid>

        {/* Box 3: Dark Shade */}
        <Grid item xs={12} sm={4}>
          <Box
            className="color-shade-card-premium"
            style={{ borderTop: `3px solid ${darkColor}` }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box
                className="color-swatch-circle-premium"
                style={{ backgroundColor: darkColor }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: 800, color: "#334155" }}
              >
                3. Dark Accent Stop
              </Typography>
            </Box>
            <TextField
              fullWidth
              size="small"
              value={darkColor}
              onChange={(e) => onDarkChange(e.target.value)}
              className="plan-textfield-premium"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
