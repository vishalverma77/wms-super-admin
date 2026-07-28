export type RecentActivityItem = {
  id: number;
  action: string;
  time: string;
  type: "upgrade" | "signup" | "expire" | "alert" | "info";
};
