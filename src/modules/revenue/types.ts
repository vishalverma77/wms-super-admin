export type TransactionItem = {
  id: string;
  client: string;
  plan: string;
  amount: string | number;
  date: string;
  method: string;
  status: "Paid" | "Pending" | "Failed" | string;
  email?: string;
  currency?: string;
};

export type RevenueStats = {
  mrr: number;
  arr: number;
  pendingAmount: number;
  pendingCount: number;
  failedAmount: number;
  failedCount: number;
  totalTransactions: number;
};
