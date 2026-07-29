import { Box, Typography, Grid } from "@mui/material";
import {
  Check as CheckIcon,
  Close as CrossIcon,
  Analytics as AnalyticsIcon,
  Extension as ExtensionIcon,
  Payment as PaymentIcon,
  Warehouse as WarehouseIcon,
  People as PeopleIcon,
  Inventory2 as SkuIcon,
  LocalShipping as SupplierIcon,
  Receipt as PoIcon,
  ShoppingCart as SoIcon,
} from "@mui/icons-material";
import type { PlanDetailsSectionProps } from "../types";

export function PlanDetailsSection({ plan }: PlanDetailsSectionProps) {
  if (!plan) return null;

  const fmtQ = (val?: number) =>
    val === undefined || val === null || val === 0
      ? "Unlimited"
      : val.toLocaleString("en-IN");

  const quotas = [
    {
      label: "Max Warehouses",
      val: fmtQ(plan.limits?.maxWarehouses),
      Icon: WarehouseIcon,
    },
    { label: "Max Users", val: fmtQ(plan.limits?.maxUsers), Icon: PeopleIcon },
    { label: "Max SKUs", val: fmtQ(plan.limits?.maxSkus), Icon: SkuIcon },
    {
      label: "Max Suppliers",
      val: fmtQ(plan.limits?.maxSuppliers),
      Icon: SupplierIcon,
    },
    {
      label: "Max POs / Month",
      val: fmtQ(plan.limits?.maxPurchaseOrdersPerMonth),
      Icon: PoIcon,
    },
    {
      label: "Max SOs / Month",
      val: fmtQ(plan.limits?.maxSalesOrdersPerMonth),
      Icon: SoIcon,
    },
  ];

  const modules = [
    {
      name: "Inventory Management",
      active: plan.modules?.moduleInventoryManagement,
    },
    { name: "GRN & Putaway", active: plan.modules?.moduleGrnPutaway },
    { name: "Label Printing", active: plan.modules?.moduleLabelPrinting },
    { name: "Basic Reports", active: plan.modules?.moduleBasicReports },
    { name: "Transfer Orders", active: plan.modules?.moduleTransferOrders },
    { name: "Stock Transfers", active: plan.modules?.moduleStockTransfers },
    {
      name: "Dispatch Management",
      active: plan.modules?.moduleDispatchManagement,
    },
    { name: "Returns Management", active: plan.modules?.moduleReturns },
    { name: "Cycle Counts", active: plan.modules?.moduleCycleCounts },
    { name: "Production Module", active: plan.modules?.moduleProduction },
  ];

  return (
    <>
      {/* Quotas Card */}
      <Box className="plan-section-card-premium">
        <Typography className="plan-section-title-premium">
          <AnalyticsIcon sx={{ fontSize: 18, color: "#0284c7" }} /> Resource
          Quotas & System Limits
        </Typography>

        <Grid container spacing={{ xs: 1, sm: 1.5 }}>
          {quotas.map(({ label, val, Icon }, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box className="plan-quota-card-premium">
                <Box className="plan-quota-icon-box-premium">
                  <Icon sx={{ fontSize: 16 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography className="plan-quota-label-premium">
                    {label}
                  </Typography>
                  <Typography className="plan-quota-value-premium">
                    {val}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Module Permissions & System IDs */}
      <Box className="plan-section-card-premium">
        <Typography className="plan-section-title-premium">
          <ExtensionIcon sx={{ fontSize: 18, color: "#0284c7" }} /> Included
          Module Permissions
        </Typography>

        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 0.6, sm: 0.85 } }}
        >
          {modules.map((m, i) => (
            <Box
              key={i}
              className={`plan-module-badge-premium ${m.active ? "active" : "inactive"}`}
            >
              {m.active ? (
                <CheckIcon sx={{ fontSize: 14, color: "#16a34a" }} />
              ) : (
                <CrossIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
              )}
              {m.name}
            </Box>
          ))}
        </Box>

        <Typography className="plan-section-title-premium" sx={{ mt: 1.5 }}>
          <PaymentIcon sx={{ fontSize: 18, color: "#0284c7" }} /> System &
          Payment Identifiers
        </Typography>

        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {/* Feature Tiers */}
          <Grid item xs={12} sm={6}>
            <Typography className="plan-field-label">Feature Tiers</Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f8fafc",
                  p: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#475569" }}
                >
                  Reports Tier
                </Typography>
                <span className="plan-code-badge-premium" style={{ margin: 0 }}>
                  {plan.tiers?.reportsTier || "Basic"}
                </span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f8fafc",
                  p: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#475569" }}
                >
                  Finance Tier
                </Typography>
                <span className="plan-code-badge-premium" style={{ margin: 0 }}>
                  {plan.tiers?.financeTier || "Basic"}
                </span>
              </Box>
            </Box>
          </Grid>

          {/* Razorpay Identifiers */}
          <Grid item xs={12} sm={6}>
            <Typography className="plan-field-label">
              Razorpay Identifiers
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f8fafc",
                  p: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#475569" }}
                >
                  Monthly Plan ID
                </Typography>
                <span className="plan-code-badge-premium" style={{ margin: 0 }}>
                  {plan.razorpayPlanIds?.monthly ||
                    plan.razorpayMonthlyPlanId ||
                    "Not Configured"}
                </span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f8fafc",
                  p: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#475569" }}
                >
                  Yearly Plan ID
                </Typography>
                <span className="plan-code-badge-premium" style={{ margin: 0 }}>
                  {plan.razorpayPlanIds?.yearly ||
                    plan.razorpayYearlyPlanId ||
                    "Not Configured"}
                </span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
