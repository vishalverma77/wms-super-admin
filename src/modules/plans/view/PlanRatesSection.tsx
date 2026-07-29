import { Box, Typography, TextField, Grid, InputAdornment } from "@mui/material";
import {
  Label as LabelIcon,
  Percent as PercentIcon,
  Tune as TuneIcon,
  LocalOffer as OfferIcon,
} from "@mui/icons-material";
import type { PlanRatesSectionProps, InputChangeEvent } from "../types";

export function PlanRatesSection({
  name,
  monthlyRate,
  yearlyDiscount,
  yearlyRate,
  onNameChange,
  onMonthlyChange,
  onDiscountChange,
}: PlanRatesSectionProps) {
  return (
    <Box className="plan-section-card-premium">
      <Typography className="plan-section-title-premium">
        <TuneIcon sx={{ fontSize: 18, color: "#0284c7" }} /> Rates & Pricing Configuration
      </Typography>

      <Box>
        <Typography variant="caption" className="plan-field-label">
          Plan Display Name
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={name}
          onChange={(e: InputChangeEvent) => onNameChange(e.target.value)}
          className="plan-textfield-premium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LabelIcon sx={{ fontSize: 16, color: "#64748b" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="caption" className="plan-field-label">
            Monthly Rate (₹)
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={monthlyRate}
            onChange={onMonthlyChange}
            className="plan-textfield-premium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="plan-currency-symbol">₹</span>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="caption" className="plan-field-label">
            Yearly Discount (%)
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={yearlyDiscount}
            onChange={onDiscountChange}
            className="plan-textfield-premium"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PercentIcon sx={{ fontSize: 14, color: "#64748b" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="caption" className="plan-field-label">
            Yearly Rate (₹) [Calculated]
          </Typography>
          <TextField
            fullWidth
            size="small"
            disabled
            value={yearlyRate}
            className="plan-textfield-disabled-premium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="plan-currency-symbol-disabled">₹</span>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Rate Summary Banner */}
      <Box className="plan-rate-banner-premium">
        <Box>
          <Typography className="plan-rate-banner-title-premium">
            Calculated Annual Billing
          </Typography>
          <Typography className="plan-rate-banner-amount-premium">
            ₹{yearlyRate || 0} / year
          </Typography>
        </Box>
        {Number(yearlyDiscount) > 0 && (
          <Box className="plan-rate-badge-premium">
            <OfferIcon sx={{ fontSize: 13 }} /> Saves {yearlyDiscount}%
          </Box>
        )}
      </Box>
    </Box>
  );
}
