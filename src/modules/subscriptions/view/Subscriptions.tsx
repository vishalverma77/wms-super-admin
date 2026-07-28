import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchSubscriptionsRequest,
  fetchContactSalesRequest,
  markContactSalesContacted,
} from "../slice";
import { SubscriptionHeaderBanner } from "./SubscriptionHeaderBanner";
import { SubscriptionKpiCards } from "./SubscriptionKpiCards";
import { SubscriptionTable } from "./SubscriptionTable";
import { EnterpriseContactsModal } from "./EnterpriseContactsModal";

export function Subscriptions() {
  const dispatch = useAppDispatch();
  const { subscriptions, loading, error, contactSales } = useAppSelector(
    (state) => state.subscriptions,
  );

  const [showEnterpriseContacts, setShowEnterpriseContacts] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    dispatch(fetchSubscriptionsRequest());
    dispatch(fetchContactSalesRequest());
  }, [dispatch]);

  const newContactsCount = contactSales.filter(
    (c) => c.status?.toLowerCase() === "new" || c.status?.toLowerCase() === "pending" || c.status === "New",
  ).length;

  const handleMarkAsContacted = (id: string | number) => {
    dispatch(markContactSalesContacted(id));
  };

  const activeSubscriptionsCount = subscriptions.filter(
    (sub) => sub.status?.toLowerCase() === "active",
  ).length;

  const totalPaidCycles = subscriptions.reduce(
    (acc, sub) => acc + (sub.paidCount || 0),
    0,
  );

  const totalRemainingCycles = subscriptions.reduce(
    (acc, sub) => acc + (sub.remainingCount || 0),
    0,
  );

  return (
    <>
      <Header
        title="Subscriptions"
        subtitle="Plan overview · Subscriber management · Retention tracking"
      />

      {/* Show banner ONLY if contactSales length > 0 */}
      {isBannerVisible && contactSales.length > 0 && (
        <SubscriptionHeaderBanner
          newContactsCount={newContactsCount > 0 ? newContactsCount : contactSales.length}
          onOpenRequests={() => setShowEnterpriseContacts(true)}
          onCloseBanner={() => setIsBannerVisible(false)}
        />
      )}

      <SubscriptionKpiCards
        totalCount={subscriptions.length}
        activeCount={activeSubscriptionsCount}
        paidCycles={totalPaidCycles}
        remainingCycles={totalRemainingCycles}
      />

      <SubscriptionTable
        subscriptions={subscriptions}
        loading={loading}
        error={error}
        onRetry={() => dispatch(fetchSubscriptionsRequest())}
      />

      <EnterpriseContactsModal
        open={showEnterpriseContacts}
        onClose={() => setShowEnterpriseContacts(false)}
        contacts={contactSales}
        newContactsCount={newContactsCount}
        onMarkContacted={handleMarkAsContacted}
      />
    </>
  );
}
