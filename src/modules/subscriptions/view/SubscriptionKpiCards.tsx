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
    <div className="kgrid kg4">
      <div className="kc kc-b">
        <div className="kl">Total Subscribers</div>
        <div className="kn">{totalCount.toLocaleString()}</div>
      </div>
      <div className="kc kc-g">
        <div className="kl">Active Subscriptions</div>
        <div className="kn">{activeCount.toLocaleString()}</div>
      </div>
      <div className="kc kc-t">
        <div className="kl">Total Paid Cycles</div>
        <div className="kn">{paidCycles.toLocaleString()}</div>
      </div>
      <div className="kc kc-r">
        <div className="kl">Remaining Cycles</div>
        <div className="kn">{remainingCycles.toLocaleString()}</div>
      </div>
    </div>
  );
}
