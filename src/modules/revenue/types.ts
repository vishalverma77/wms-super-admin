export type TransactionItem = {
  id: string;
  client: string;
  plan: string;
  amount: string | number;
  formattedAmount?: string;
  date: string;
  method: string;
  status: "Paid" | "Pending" | "Failed" | "Active" | "Cancelled" | string;
  rawStatus?: string;
  email?: string;
  currency?: string;
  paidCount?: number;
  billingCycle?: string;
};

export type PlanBreakdownItem = {
  planName: string;
  activeCount: number;
  totalRevenue: number;
  mrr: number;
};

export type RevenueData = {
  mrr: number;
  arr: number;
  totalRevenue: number;
  pendingRevenue: number;
  failedRevenue: number;
  activeSubscribersCount: number;
  activePayingTenantsCount: number;
  activeTrialsCount: number;
  newSignups30d: number;
  totalSubscriptionsCount: number;
  currency: string;
  planBreakdown: PlanBreakdownItem[];
  transactions: TransactionItem[];
};

export type RevenueState = {
  data: RevenueData | null;
  loading: boolean;
  error: string | null;
};
