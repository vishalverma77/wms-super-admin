import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import type {
  EditPlanDialogProps,
  FormSubmitEvent,
  InputChangeEvent,
} from "../types";
import { PlanRatesSection } from "./PlanRatesSection";
import { ColorCustomizerSection } from "./ColorCustomizerSection";
import { PlanDetailsSection } from "./PlanDetailsSection";
import {
  generateColorShades,
  combineColorShades,
  createGradientString,
  parsePlanColor,
  isValidHex,
} from "../utils";
import "./index.css";

export function EditPlanDialog({
  selectedGroupedPlan,
  updating,
  onClose,
  onSave,
}: EditPlanDialogProps) {
  const isDialogOpen = Boolean(selectedGroupedPlan);

  const [name, setName] = useState<string>(selectedGroupedPlan?.name || "");
  const [monthlyRate, setMonthlyRate] = useState<number | string>(
    selectedGroupedPlan?.monthlyRate || "",
  );
  const [yearlyDiscount, setYearlyDiscount] = useState<number | string>(
    selectedGroupedPlan?.yearlyDiscount || 0,
  );
  const [yearlyRate, setYearlyRate] = useState<number | string>(
    selectedGroupedPlan?.yearlyRate || "",
  );

  // Color state
  const initialColors = parsePlanColor(
    selectedGroupedPlan?.gradientColor ||
      selectedGroupedPlan?.cardColor ||
      selectedGroupedPlan?.color,
    selectedGroupedPlan?.tier || selectedGroupedPlan?.name,
  );
  const [baseHex, setBaseHex] = useState<string>(initialColors.main);
  const [lightColor, setLightColor] = useState<string>(initialColors.light);
  const [mainColor, setMainColor] = useState<string>(initialColors.main);
  const [darkColor, setDarkColor] = useState<string>(initialColors.dark);
  const [isPopular, setIsPopular] = useState<boolean>(
    Boolean(selectedGroupedPlan?.isPopular),
  );

  useEffect(() => {
    if (selectedGroupedPlan) {
      setName(selectedGroupedPlan.name || "");
      setMonthlyRate(selectedGroupedPlan.monthlyRate ?? "");
      setYearlyDiscount(selectedGroupedPlan.yearlyDiscount ?? 0);
      setYearlyRate(selectedGroupedPlan.yearlyRate ?? "");

      const parsed = parsePlanColor(
        selectedGroupedPlan.gradientColor ||
          selectedGroupedPlan.cardColor ||
          selectedGroupedPlan.color,
        selectedGroupedPlan.tier || selectedGroupedPlan.name,
      );
      setBaseHex(parsed.main);
      setLightColor(parsed.light);
      setMainColor(parsed.main);
      setDarkColor(parsed.dark);
      setIsPopular(Boolean(selectedGroupedPlan.isPopular));
    }
  }, [selectedGroupedPlan]);

  const handleBaseHexChange = (val: string) => {
    setBaseHex(val);
    if (isValidHex(val)) {
      const generated = generateColorShades(val);
      setLightColor(generated.light);
      setMainColor(generated.main);
      setDarkColor(generated.dark);
    }
  };

  const handleMonthlyChange = (e: InputChangeEvent) => {
    const val = e.target.value;
    setMonthlyRate(val);
    if (val === "") {
      setYearlyRate("");
      return;
    }
    const m = Number(val) || 0;
    const d = Number(yearlyDiscount) || 0;
    const calculatedYearly = m * 12 * (1 - d / 100);
    setYearlyRate(calculatedYearly > 0 ? calculatedYearly.toFixed(2) : "0.00");
  };

  const handleDiscountChange = (e: InputChangeEvent) => {
    const val = e.target.value;
    setYearlyDiscount(val);
    const m = Number(monthlyRate) || 0;
    const d = Number(val) || 0;
    const calculatedYearly = m * 12 * (1 - d / 100);
    setYearlyRate(calculatedYearly > 0 ? calculatedYearly.toFixed(2) : "0.00");
  };

  const combinedCode = combineColorShades({
    light: lightColor,
    main: mainColor,
    dark: darkColor,
  });

  const generatedGradient = createGradientString({
    light: lightColor,
    main: mainColor,
    dark: darkColor,
  });

  const handleSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();
    if (!selectedGroupedPlan || !name.trim()) return;

    const targetId =
      selectedGroupedPlan.monthlyPlanItem?.id ||
      selectedGroupedPlan.yearlyPlanItem?.id ||
      selectedGroupedPlan.id;

    onSave({
      id: targetId,
      name: name.trim(),
      monthlyRate: Number(monthlyRate) || 0,
      yearlyDiscount: Number(yearlyDiscount) || 0,
      yearlyRate: Number(yearlyRate) || 0,
      color: mainColor,
      cardColor: combinedCode,
      gradientColor: generatedGradient,
      isPopular,
    });
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "plan-dialog-paper-premium",
        sx: {
          m: { xs: 1, sm: 2, md: 3 },
          width: { xs: "calc(100% - 16px)", sm: "calc(100% - 32px)" },
          maxWidth: "760px !important",
          borderRadius: { xs: "16px", sm: "24px" },
          overflow: "hidden",
        },
      }}
    >
      {selectedGroupedPlan && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            height: "100%",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2, sm: 3 },
              py: 1.75,
              borderBottom: "1px solid #f1f5f9",
              backgroundColor: "#ffffff",
              flexShrink: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#0f1e35",
                fontSize: { xs: "1rem", sm: "1.15rem" },
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              Edit {selectedGroupedPlan.name} Plan
            </Typography>
            <IconButton
              onClick={onClose}
              size="small"
              aria-label="close"
              sx={{
                color: "#64748b",
                "&:hover": {
                  backgroundColor: "#f1f5f9",
                  color: "#0f1e35",
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Dialog Content */}
          <DialogContent className="plan-dialog-content">
            <PlanRatesSection
              name={name}
              monthlyRate={monthlyRate}
              yearlyDiscount={yearlyDiscount}
              yearlyRate={yearlyRate}
              onNameChange={setName}
              onMonthlyChange={handleMonthlyChange}
              onDiscountChange={handleDiscountChange}
            />

            <ColorCustomizerSection
              baseHex={baseHex}
              lightColor={lightColor}
              mainColor={mainColor}
              darkColor={darkColor}
              onBaseHexChange={handleBaseHexChange}
              onLightChange={setLightColor}
              onMainChange={setMainColor}
              onDarkChange={setDarkColor}
            />

            <PlanDetailsSection plan={selectedGroupedPlan} />
          </DialogContent>

          {/* Footer Actions */}
          <DialogActions className="plan-dialog-footer-premium">
            <Button
              onClick={onClose}
              variant="outlined"
              size="small"
              className="plan-dialog-cancel-btn-premium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={updating}
              startIcon={
                updating ? <CircularProgress size={14} color="inherit" /> : null
              }
              className="plan-dialog-save-btn-premium"
            >
              {updating ? "Saving..." : "Save Plan"}
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
}
