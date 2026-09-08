export type RazorpaySubscriptionNotes = {
  customerName?: string;
  customerEmail?: string;
  companyName?: string;
  [key: string]: any;
};

export type RazorpaySubscription = {
  id: string;
  razorpaySubscriptionId: string;
  razorpayPlanId: string;
  userId: string | null;
  status: string;
  totalCount: number;
  paidCount: number;
  remainingCount: number;
  shortUrl?: string | null;
  startAt?: string | number | null;
  endAt?: string | number | null;
  chargeAt?: string | number | null;
  notes?: RazorpaySubscriptionNotes | null;
  createdAt: string;
  updatedAt: string;
};

export type EnterpriseContactItem = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  company: string;
  requestDate: string;
  status: "New" | "Contacted" | string;
};

export type SubscriptionsState = {
  subscriptions: RazorpaySubscription[];
  loading: boolean;
  error: string | null;
  contactSales: EnterpriseContactItem[];
  contactSalesLoading: boolean;
  contactSalesError: string | null;
};
