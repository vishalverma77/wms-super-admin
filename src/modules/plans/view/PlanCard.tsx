import {
  Grid,
  Card,
  Box,
  Typography,
  Chip,
  Button,
  Checkbox,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warehouse as WarehouseIcon,
  People as PeopleIcon,
  Inventory2 as SkuIcon,
  LocalShipping as SupplierIcon,
  Assignment as OrderIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import type { PlanCardListProps, GroupedPlan } from "../types";
import { parsePlanColor } from "../utils";
import "./index.css";

const formatQuota = (val?: number) =>
  val === undefined || val === null || val === 0
    ? "Unlimited"
    : Number(val).toLocaleString("en-IN");

export function PlanCard({
  groupedPlans,
  onSelectPlan,
  onTogglePopular,
}: PlanCardListProps) {
  return (
    <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems="stretch">
      {groupedPlans.map((plan: GroupedPlan, index: number) => {
        const tierLower = (plan.tier || plan.name).toLowerCase();
        const isEnterprise = tierLower.includes("enterprise");
        const isGrowth =
          tierLower.includes("growth") || tierLower.includes("pro");
        const isStarter =
          tierLower.includes("starter") || (!isEnterprise && !isGrowth);

        // Letter Avatar
        const letter = plan.name ? plan.name.charAt(0).toUpperCase() : "P";

        // Hardcoded card styles based on index
        let cardBackground = "";
        let shades = { light: "", main: "", dark: "" };

        if (index === 0) {
          cardBackground =
            "linear-gradient(135deg, #FFFFFF 0%, #F3FBFF 35%, #E6F7FF 70%, #D6F1FF 100%)";
          shades = {
            light: "#F3FBFF",
            main: "#0284c7",
            dark: "#0369a1",
          };
        } else if (index === 1) {
          cardBackground =
            "linear-gradient(135deg, #FFFFFF 0%, #F3FFF8 30%, #E0FCEB 65%, #C8F5D8 100%)";
          shades = {
            light: "#F3FFF8",
            main: "#16a34a",
            dark: "#15803d",
          };
        } else if (index === 2) {
          cardBackground =
            "linear-gradient(135deg, #FFFFFF 0%, #FAF8FF 30%, #F0E9FF 65%, #E5DBFF 100%)";
          shades = {
            light: "#FAF8FF",
            main: "#7c3aed",
            dark: "#6d28d9",
          };
        } else {
          // If plan length > 2 then next card should be in primary color of theme (Blue)
          cardBackground =
            "linear-gradient(135deg, #FFFFFF 0%, #F3FBFF 35%, #E6F7FF 70%, #D6F1FF 100%)";
          shades = {
            light: "#F3FBFF",
            main: "#0284c7",
            dark: "#0369a1",
          };
        }

        // Popular state
        const isPopular = Boolean(plan.isPopular);

        // Pricing calculation based on active billingCycle
        const monthlyRateNum = Number(plan.monthlyRate) || 0;
        const yearlyRateNum = Number(plan.yearlyRate) || 0;
        const discountNum = Number(plan.yearlyDiscount) || 0;

        // Quotas list matching 2-column screenshot
        const quotas = [
          {
            label: "Warehouses",
            val: formatQuota(plan.limits?.maxWarehouses),
            Icon: WarehouseIcon,
          },
          {
            label: "Users",
            val: formatQuota(plan.limits?.maxUsers),
            Icon: PeopleIcon,
          },
          {
            label: "SKUs",
            val: formatQuota(plan.limits?.maxSkus),
            Icon: SkuIcon,
          },
          {
            label: "Suppliers",
            val: formatQuota(plan.limits?.maxSuppliers),
            Icon: SupplierIcon,
          },
          {
            label: "POs/mo",
            val: formatQuota(plan.limits?.maxPurchaseOrdersPerMonth),
            Icon: OrderIcon,
          },
        ];

        // All 10 features matching screenshot grid layout
        const features = [
          {
            name: "Inventory Management",
            active: plan.modules?.moduleInventoryManagement,
          },
          { name: "GRN & Putaway", active: plan.modules?.moduleGrnPutaway },
          { name: "Label Printing", active: plan.modules?.moduleLabelPrinting },
          { name: "Basic Reports", active: plan.modules?.moduleBasicReports },
          {
            name: "Transfer Orders",
            active: plan.modules?.moduleTransferOrders,
          },
          {
            name: "Stock Transfers",
            active: plan.modules?.moduleStockTransfers,
          },
          {
            name: "Dispatch Management",
            active: plan.modules?.moduleDispatchManagement,
          },
          { name: "Returns & QC", active: plan.modules?.moduleReturns },
          { name: "Cycle Counts", active: plan.modules?.moduleCycleCounts },
          { name: "Production", active: plan.modules?.moduleProduction },
        ];

        return (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              elevation={0}
              className={`exact-plan-card ${isPopular ? "popular-highlight" : ""}`}
              style={{
                borderColor: isPopular ? shades.main : `${shades.main}40`,
                background: cardBackground,
                boxShadow: isPopular
                  ? `0 12px 28px ${shades.main}25`
                  : undefined,
              }}
            >
              {/* Top Center MOST POPULAR Banner */}
              {isPopular && (
                <Box
                  className="top-center-popular-banner"
                  style={{
                    backgroundColor: shades.main,
                  }}
                >
                  MOST POPULAR
                </Box>
              )}

              {/* Solid Full-Color Corner Triangle Badge with Centered Checkbox */}
              <Box
                className="card-corner-solid-triangle"
                style={{
                  backgroundColor: shades.dark || shades.main,
                }}
              >
                <Tooltip
                  title={
                    isPopular
                      ? "Popular Plan (Click to uncheck)"
                      : "Click to mark as Most Popular"
                  }
                >
                  <Checkbox
                    size="small"
                    checked={isPopular}
                    onChange={(e) => {
                      e.stopPropagation();
                      onTogglePopular(plan, e.target.checked);
                    }}
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      zIndex: 4,
                      p: 0.25,
                      color: "rgba(255, 255, 255, 0.85)",
                      "&.Mui-checked": {
                        color: "#ffffff",
                      },
                    }}
                  />
                </Tooltip>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.75,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Header: Avatar, Name, Tag, Description */}
                <Box
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <Box
                    className="plan-letter-avatar"
                    style={{
                      backgroundColor: shades.main,
                      color: "#ffffff",
                      boxShadow: `0 4px 12px ${shades.main}40`,
                    }}
                  >
                    {letter}
                  </Box>

                  <Box sx={{ minWidth: 0, flex: 1, pr: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography className="exact-plan-title">
                        {plan.name}
                      </Typography>
                      <Chip
                        label={(plan.tier || plan.name).toUpperCase()}
                        size="small"
                        className="exact-plan-tag"
                        style={{
                          backgroundColor: `${shades.main}18`,
                          color: shades.dark || shades.main,
                          borderColor: `${shades.main}40`,
                        }}
                      />
                    </Box>

                    <Typography className="exact-plan-description">
                      {plan.description ||
                        (isStarter
                          ? "Entry-level subscription plan for small warehouses"
                          : isGrowth
                            ? "Mid-tier subscription plan for growing logistics businesses"
                            : "Full-featured enterprise plan for large multi-warehouse operations")}
                    </Typography>
                  </Box>
                </Box>

                {/* Pricing Block: Showing both /month and /year in same card */}
                <Box className="exact-price-block">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}
                    >
                      <Typography
                        className="exact-price-amount"
                        style={{ color: shades.dark || shades.main }}
                      >
                        $
                        {monthlyRateNum > 0
                          ? monthlyRateNum.toLocaleString("en-IN")
                          : "0"}
                      </Typography>
                      <Typography className="exact-price-period">
                        /month
                      </Typography>
                    </Box>

                    {yearlyRateNum > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#64748b",
                            fontWeight: 700,
                            fontSize: "0.775rem",
                          }}
                        >
                          (${yearlyRateNum.toLocaleString("en-IN")} /year)
                        </Typography>
                        {discountNum > 0 && (
                          <Typography className="exact-price-discount">
                            {discountNum}% Off
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Quota Specs Pills (2-column layout matching screenshot) */}
                <Grid container spacing={1} className="exact-quota-grid">
                  {quotas.map(({ label, val, Icon }, i) => (
                    <Grid item xs={6} key={i}>
                      <Box className="exact-quota-pill">
                        <Icon sx={{ fontSize: 15, color: shades.main }} />
                        <span>
                          <strong className="quota-val-text">{val}</strong>{" "}
                          {label}
                        </span>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* Module Checklist (2-column grid matching screenshot) */}
                <Grid container spacing={1} className="exact-feature-grid">
                  {features.map((feature, i) => (
                    <Grid item xs={6} key={i}>
                      <Box
                        className={`exact-feature-item ${feature.active ? "active" : "inactive"}`}
                      >
                        {feature.active ? (
                          <CheckCircleIcon
                            sx={{ fontSize: 16, color: shades.main }}
                          />
                        ) : (
                          <CancelIcon sx={{ fontSize: 16, color: "#cbd5e1" }} />
                        )}
                        <span className="feature-name-text">
                          {feature.name}
                        </span>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Bottom Action Button */}
              <Box sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                  onClick={() => onSelectPlan(plan)}
                  className="exact-action-btn"
                  style={{
                    backgroundColor: shades.main,
                    color: "#ffffff",
                    boxShadow: `0 6px 18px ${shades.main}40`,
                  }}
                >
                  Edit {plan.name} Details
                </Button>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
