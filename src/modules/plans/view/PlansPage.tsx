import { useEffect, useState } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Header } from "../../../components/Header";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchPlansRequest,
  updatePlanRequest,
  clearUpdateSuccess,
} from "../slice";
import type { PlanItem, GroupedPlan, UpdatePlanPayload } from "../types";
import { PlanCard } from "./PlanCard";
import { EditPlanDialog } from "./EditPlanDialog";
import { EmptyPlansView } from "./EmptyPlansView";

export function PlansPage() {
  const dispatch = useAppDispatch();
  const { plans, loading, error, updating, updateSuccess } = useAppSelector(
    (state) => state.plans,
  );

  const [selectedGroupedPlan, setSelectedGroupedPlan] =
    useState<GroupedPlan | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  useEffect(() => {
    dispatch(fetchPlansRequest());
  }, [dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      if (selectedGroupedPlan) {
        setSnackbarMsg("Plan updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setSelectedGroupedPlan(null);
      }
      dispatch(clearUpdateSuccess());
    }
  }, [updateSuccess, selectedGroupedPlan, dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbarMsg(error);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleSelectPlan = (plan: GroupedPlan): void => {
    setSelectedGroupedPlan(plan);
  };

  const handleCloseEdit = (): void => {
    setSelectedGroupedPlan(null);
  };

  const handleSaveEdit = (payload: UpdatePlanPayload): void => {
    dispatch(updatePlanRequest(payload));
  };

  const handleTogglePopular = (plan: GroupedPlan, isPopular: boolean): void => {
    const targetId =
      plan.monthlyPlanItem?.id || plan.yearlyPlanItem?.id || plan.id;

    if (isPopular) {
      groupedPlansList.forEach((otherPlan) => {
        if (otherPlan.isPopular && otherPlan.id !== plan.id) {
          const otherTargetId =
            otherPlan.monthlyPlanItem?.id ||
            otherPlan.yearlyPlanItem?.id ||
            otherPlan.id;
          dispatch(
            updatePlanRequest({
              id: otherTargetId,
              name: otherPlan.name,
              monthlyRate: otherPlan.monthlyRate,
              yearlyDiscount: otherPlan.yearlyDiscount,
              yearlyRate: otherPlan.yearlyRate,
              color: otherPlan.color,
              cardColor: otherPlan.cardColor,
              gradientColor: otherPlan.gradientColor,
              isPopular: false,
            }),
          );
        }
      });
    }

    dispatch(
      updatePlanRequest({
        id: targetId,
        name: plan.name,
        monthlyRate: plan.monthlyRate,
        yearlyDiscount: plan.yearlyDiscount,
        yearlyRate: plan.yearlyRate,
        color: plan.color,
        cardColor: plan.cardColor,
        gradientColor: plan.gradientColor,
        isPopular,
      }),
    );
  };

  // Group or map plans directly from API response
  const groupedPlansMap = new Map<string, GroupedPlan>();

  (plans || []).forEach((plan: PlanItem) => {
    const key = (plan.name || plan.tier || plan.id).trim().toLowerCase();
    const mRate = Number(plan.monthlyRate) || Number(plan.price) || 0;
    const yRate = Number(plan.yearlyRate) || 0;
    const yDisc = Number(plan.yearlyDiscount) || 0;

    let existing = groupedPlansMap.get(key);

    if (!existing) {
      existing = {
        id: plan.id,
        name: plan.name,
        tier: plan.tier || plan.name,
        description: plan.description || "",
        monthlyPlanItem: plan,
        yearlyPlanItem: plan,
        monthlyRate: mRate,
        yearlyRate: yRate,
        yearlyDiscount: yDisc,
        razorpayMonthlyPlanId: plan.razorpayMonthlyPlanId || null,
        razorpayYearlyPlanId: plan.razorpayYearlyPlanId || null,
        maxWarehouses: plan.maxWarehouses ?? 0,
        maxUsers: plan.maxUsers ?? 0,
        maxSuppliers: plan.maxSuppliers ?? 0,
        maxSkus: plan.maxSkus ?? 0,
        maxPurchaseOrdersPerMonth: plan.maxPurchaseOrdersPerMonth ?? 0,
        maxSalesOrdersPerMonth: plan.maxSalesOrdersPerMonth ?? 0,
        moduleInventoryManagement: Boolean(plan.moduleInventoryManagement),
        moduleGrnPutaway: Boolean(plan.moduleGrnPutaway),
        moduleLabelPrinting: Boolean(plan.moduleLabelPrinting),
        moduleBasicReports: Boolean(plan.moduleBasicReports),
        moduleTransferOrders: Boolean(plan.moduleTransferOrders),
        moduleStockTransfers: Boolean(plan.moduleStockTransfers),
        moduleDispatchManagement: Boolean(plan.moduleDispatchManagement),
        moduleReturns: Boolean(plan.moduleReturns),
        moduleCycleCounts: Boolean(plan.moduleCycleCounts),
        moduleProduction: Boolean(plan.moduleProduction),
        reportsTier: plan.reportsTier || "Basic",
        financeTier: plan.financeTier || "Basic",
        color: plan.color,
        cardColor: plan.cardColor || plan.color,
        gradientColor: plan.gradientColor,
        isPopular:
          typeof plan.isPopular === "boolean"
            ? plan.isPopular
            : Boolean(plan.popular),
      };
      groupedPlansMap.set(key, existing);
    } else {
      if (mRate > 0) existing.monthlyRate = mRate;
      if (yRate > 0) existing.yearlyRate = yRate;
      if (yDisc > 0) existing.yearlyDiscount = yDisc;
      if (plan.razorpayMonthlyPlanId)
        existing.razorpayMonthlyPlanId = plan.razorpayMonthlyPlanId;
      if (plan.razorpayYearlyPlanId)
        existing.razorpayYearlyPlanId = plan.razorpayYearlyPlanId;
      if (plan.cardColor || plan.color)
        existing.cardColor = plan.cardColor || plan.color;
      if (plan.gradientColor) existing.gradientColor = plan.gradientColor;
      if (plan.color) existing.color = plan.color;
      if (typeof plan.isPopular === "boolean")
        existing.isPopular = plan.isPopular;
    }
  });

  const groupedPlansList: GroupedPlan[] = Array.from(groupedPlansMap.values());

  const tierOrder: Record<string, number> = {
    starter: 1,
    growth: 2,
    pro: 2,
    enterprise: 3,
  };

  groupedPlansList.sort((a, b) => {
    const orderA = tierOrder[a.tier.toLowerCase()] || 99;
    const orderB = tierOrder[b.tier.toLowerCase()] || 99;
    return orderA - orderB;
  });

  // Strict UI guard: Ensure at most one plan can be popular at a time
  let foundPopular = false;
  groupedPlansList.forEach((plan) => {
    if (plan.isPopular) {
      if (foundPopular) {
        plan.isPopular = false;
      } else {
        foundPopular = true;
      }
    }
  });

  return (
    <>
      <Header
        title="Plan Management"
        subtitle="Manage subscription plans, rates, card color themes, and feature access."
      />

      <Container
        maxWidth="xl"
        disableGutters
        sx={{ width: "100%", maxWidth: "100%", px: 0 }}
      >
        {/* Fitted Container */}
        <Box sx={{ maxWidth: "1140px", mx: "auto", width: "100%" }}>
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                backgroundColor: "#fff1f2",
                color: "#be123c",
                border: "1px solid #fecdd3",
              }}
            >
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#3ac1ef" }} />
            </Box>
          ) : groupedPlansList.length === 0 ? (
            <EmptyPlansView />
          ) : (
            <PlanCard
              groupedPlans={groupedPlansList}
              onSelectPlan={handleSelectPlan}
              onTogglePopular={handleTogglePopular}
            />
          )}
        </Box>

        <EditPlanDialog
          selectedGroupedPlan={selectedGroupedPlan}
          updating={updating}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: { xs: 6, sm: 8 } }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{
              width: "100%",
              backgroundColor:
                snackbarSeverity === "error" ? "#ef4444" : "#0284c7",
              color: "#ffffff",
              fontWeight: 700,
            }}
          >
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
