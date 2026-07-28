export type TransactionItem = {
  id: string;
  client: string;
  plan: string;
  amount: string;
  date: string;
  method: string;
  status: "Paid" | "Pending" | "Failed";
};
