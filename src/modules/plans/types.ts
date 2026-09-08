import type React from "react";

export type PlanType = "Monthly" | "Annually" | string;

export interface PlanLimits {
  maxWarehouses: number;
  maxUsers: number;
  maxSuppliers: number;
  maxSkus: number;
  maxPurchaseOrdersPerMonth: number;
  maxSalesOrdersPerMonth: number;
  maxLabelPrintsPerMonth?: number;
  maxStorageTransfersPerMonth?: number;
  maxClients?: number;
}

export interface PlanModules {
  moduleInventoryManagement: boolean;
  moduleGrnPutaway: boolean;
  moduleLabelPrinting: boolean;
  moduleBasicReports: boolean;
  moduleTransferOrders: boolean;
  moduleStockTransfers: boolean;
  moduleDispatchManagement: boolean;
  moduleReturns: boolean;
  moduleCycleCounts: boolean;
  moduleProduction: boolean;
}

export interface PlanTiers {
  reportsTier: string;
  financeTier: string;
}

export interface RazorpayPlanIds {
  monthly: string | null;
  yearly: string | null;
}

export interface PlanPricing {
  monthlyRate: number;
  yearlyRate: number;
  yearlyDiscount: number;
}

export interface PlanItem {
  id: string;
  name: string;
  tier: string;
  description: string;
  monthlyRate: number | string;
  yearlyDiscount: number | string;
  yearlyRate: number | string;
  razorpayMonthlyPlanId: string | null;
  razorpayYearlyPlanId: string | null;
  razorpayPlanIds?: RazorpayPlanIds;
  limits: PlanLimits;
  modules: PlanModules;
  tiers: PlanTiers;
  pricing?: PlanPricing;
  color?: string;
  cardColor?: string;
  gradientColor?: string;
  isPopular?: boolean;
  popular?: boolean;
  price: number;
  type: PlanType;
  createdAt: string;
  updatedAt: string;
  isCurrentPlan?: boolean;
}

export interface PlansState {
  plans: PlanItem[];
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateSuccess: boolean;
}

export interface UpdatePlanPayload {
  id: string;
  name: string;
  monthlyRate: number | string;
  yearlyDiscount: number | string;
  yearlyRate: number | string;
  color?: string;
  cardColor?: string;
  gradientColor?: string;
  isPopular?: boolean;
  reportsTier?: string;
  financeTier?: string;
}

export interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export type FetchPlansApiResponse = PlanItem[] | { data: PlanItem[] };
export type UpdatePlanApiResponse = PlanItem | { data: PlanItem };

export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type BillingCycle = "monthly" | "yearly";

export interface GroupedPlan {
  id: string;
  name: string;
  tier: string;
  description: string;
  monthlyPlanItem?: PlanItem;
  yearlyPlanItem?: PlanItem;
  monthlyRate: number;
  yearlyRate: number;
  yearlyDiscount: number;
  razorpayMonthlyPlanId: string | null;
  razorpayYearlyPlanId: string | null;
  razorpayPlanIds?: RazorpayPlanIds;
  limits: PlanLimits;
  modules: PlanModules;
  tiers: PlanTiers;
  pricing?: PlanPricing;
  color?: string;
  cardColor?: string;
  gradientColor?: string;
  isPopular?: boolean;
  isCurrentPlan?: boolean;
}

export interface PlanCardListProps {
  groupedPlans: GroupedPlan[];
  onSelectPlan: (plan: GroupedPlan) => void;
  onTogglePopular: (plan: GroupedPlan, isPopular: boolean) => void;
}

export interface EditPlanDialogProps {
  selectedGroupedPlan: GroupedPlan | null;
  updating: boolean;
  onClose: () => void;
  onSave: (payload: UpdatePlanPayload) => void;
}

export interface PlanDetailsSectionProps {
  plan: GroupedPlan | null;
}

export interface PlanRatesSectionProps {
  name: string;
  monthlyRate: number | string;
  yearlyDiscount: number | string;
  yearlyRate: number | string;
  onNameChange: (val: string) => void;
  onMonthlyChange: (e: InputChangeEvent) => void;
  onDiscountChange: (e: InputChangeEvent) => void;
}

export interface ColorCustomizerSectionProps {
  baseHex: string;
  lightColor: string;
  mainColor: string;
  darkColor: string;
  onBaseHexChange: (val: string) => void;
  onLightChange: (val: string) => void;
  onMainChange: (val: string) => void;
  onDarkChange: (val: string) => void;
}

export interface ModuleStatusItem {
  name: string;
  active: boolean;
}
