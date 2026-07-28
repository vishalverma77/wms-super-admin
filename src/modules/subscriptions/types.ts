export type SubscriberItem = {
  id: number;
  company: string;
  email: string;
  plan: string;
  since: string;
  status: "Active" | "Paused";
  seats: number;
};

export type EnterpriseContactItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  requestDate: string;
  status: "New" | "Contacted";
};
