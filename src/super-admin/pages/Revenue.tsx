import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRevenueRequest } from '../../store/slices/revenueSlice';

export function Revenue() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.revenue);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    dispatch(fetchRevenueRequest());
  }, [dispatch]);

  const currency = data?.currency || 'AED';
  const mrr = data?.mrr ?? 0;
  const arr = data?.arr ?? 0;
  const pendingRevenue = data?.pendingRevenue ?? 0;
  const failedRevenue = data?.failedRevenue ?? 0;
  const transactions = data?.transactions ?? [];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.email && tx.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === 'ALL' ||
      tx.status.toUpperCase() === statusFilter.toUpperCase() ||
      tx.rawStatus.toUpperCase() === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  const formatMoney = (amount: number) => {
    return `${currency} ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <>
      <div className="pgh">
        <div className="pgh-l">
          <h1>Revenue</h1>
          <p>Real-time MRR · ARR · Plan Subscriptions · Invoice Tracking</p>
        </div>
        <div className="pgh-r">
          <button
            className="btn btn-primary"
            onClick={() => dispatch(fetchRevenueRequest())}
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={loading ? 'spin' : ''}
            >
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: 'var(--red-l, #fef2f2)',
            color: 'var(--red, #ef4444)',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 13,
            fontWeight: 600,
            border: '1px solid rgba(239,68,68,0.2)',
          }}
        >
          {error}
        </div>
      )}

      <div className="kgrid kg4">
        <div className="kc kc-g">
          <div className="kl">Monthly Recurring Revenue</div>
          <div className="kn">{loading && !data ? '...' : formatMoney(mrr)}</div>
        </div>
        <div className="kc kc-b">
          <div className="kl">Annual Run Rate (ARR)</div>
          <div className="kn">{loading && !data ? '...' : formatMoney(arr)}</div>
        </div>
        <div className="kc kc-w">
          <div className="kl">Pending Invoices / Subs</div>
          <div className="kn">{loading && !data ? '...' : formatMoney(pendingRevenue)}</div>
        </div>
        <div className="kc kc-r">
          <div className="kl">Failed / Cancelled Unpaid</div>
          <div className="kn">{loading && !data ? '...' : formatMoney(failedRevenue)}</div>
        </div>
      </div>

      <div
        className="card"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          marginTop: 20,
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--bdr, #e5e7eb)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
              Subscription Transactions
            </h3>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                background: 'var(--color-primary-soft, #eaf8fd)',
                color: 'var(--color-primary-strong, #1597c6)',
                padding: '2px 8px',
                borderRadius: 12,
              }}
            >
              {filteredTransactions.length} records
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="text"
              placeholder="Search by ID, client, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                border: '1px solid var(--bdr, #d1d5db)',
                borderRadius: 6,
                width: 240,
              }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: 13,
                border: '1px solid var(--bdr, #d1d5db)',
                borderRadius: 6,
                background: 'white',
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="PAID">Paid / Active</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed / Cancelled</option>
            </select>
          </div>
        </div>

        <div className="twrap" style={{ flex: 1, overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Subscription / Invoice ID</th>
                <th>Client</th>
                <th>Plan</th>
                <th>Cycle</th>
                <th>Date</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && transactions.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--tx3)' }}>
                    Loading real revenue transactions...
                  </td>
                </tr>
              )}
              {!loading && filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--tx3)' }}>
                    No transactions found.
                  </td>
                </tr>
              )}
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <span
                      style={{
                        fontWeight: 700,
                        color: 'var(--blu, #2563eb)',
                        fontFamily: 'monospace',
                        fontSize: 12,
                      }}
                    >
                      {tx.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          background: 'var(--blu-l, #e6f8ff)',
                          color: 'var(--blu, #2563eb)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: 10,
                          flexShrink: 0,
                        }}
                      >
                        {tx.client
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{tx.client}</div>
                        {tx.email && (
                          <div style={{ fontSize: 11, color: 'var(--tx3, #6b7280)' }}>
                            {tx.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="tag t-blue">{tx.plan}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--tx2)' }}>
                      {tx.billingCycle}
                    </span>
                  </td>
                  <td style={{ color: 'var(--tx3)' }}>{tx.date}</td>
                  <td style={{ color: 'var(--tx3)' }}>{tx.method}</td>
                  <td>
                    <strong>{tx.formattedAmount}</strong>
                  </td>
                  <td>
                    <span
                      className={`tag ${
                        tx.status === 'Paid' || tx.status === 'Active'
                          ? 't-green'
                          : tx.status === 'Pending'
                          ? 't-orange'
                          : 't-gray'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
