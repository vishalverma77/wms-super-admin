import { Users, CheckCircle2, RotateCw, Clock } from "lucide-react";
import { StatsCard } from "../../../components/StatsCard";

type SubscriptionKpiCardsProps = {
  totalCount: number;
  activeCount: number;
  paidCycles: number;
  remainingCycles: number;
};

export function SubscriptionKpiCards({
  totalCount,
  activeCount,
  paidCycles,
  remainingCycles,
}: SubscriptionKpiCardsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "12px",
        marginBottom: "16px",
      }}
    >
      <StatsCard
        title="TOTAL SUBSCRIBERS"
        value={totalCount.toLocaleString()}
        icon={Users}
        color="primary"
        trend="+14%"
        actionText="All subscribers"
      />
      <StatsCard
        title="ACTIVE SUBSCRIPTIONS"
        value={activeCount.toLocaleString()}
        icon={CheckCircle2}
        color="primary"
        trend="+9%"
        actionText="Active plans"
      />
      <StatsCard
        title="TOTAL PAID CYCLES"
        value={paidCycles.toLocaleString()}
        icon={RotateCw}
        color="primary"
        trend="+24%"
        actionText="Billing cycles"
      />
      <StatsCard
        title="REMAINING CYCLES"
        value={remainingCycles.toLocaleString()}
        icon={Clock}
        color="primary"
        trend="-2%"
        actionText="Upcoming terms"
      />
    </div>
  );
}
