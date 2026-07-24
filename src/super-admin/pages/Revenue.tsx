const transactions = [
  { id: 'INV-1021', client: 'Acme Corp', plan: 'Basic', amount: '$499.00', date: '2026-07-21', method: 'Card', status: 'Paid' },
  { id: 'INV-1022', client: 'Nexus LLC', plan: 'Basic', amount: '$99.00', date: '2026-07-20', method: 'Card', status: 'Paid' },
  { id: 'INV-1023', client: 'Global Tech', plan: 'Enterprise', amount: '$1,299.00', date: '2026-07-19', method: 'Bank', status: 'Pending' },
  { id: 'INV-1024', client: 'Zenith Apps', plan: 'Pro', amount: '$299.00', date: '2026-07-18', method: 'Card', status: 'Paid' },
  { id: 'INV-1025', client: 'Pixel Works', plan: 'Pro', amount: '$299.00', date: '2026-07-17', method: 'Card', status: 'Paid' },
  { id: 'INV-1026', client: 'Bright Digital', plan: 'Enterprise', amount: '$1,299.00', date: '2026-07-15', method: 'Bank', status: 'Failed' },
];

export function Revenue() {
  return (
    <>
      <div className="pgh">
        <div className="pgh-l">
          <h1>Revenue</h1>
          <p>MRR · ARR · Invoice tracking · Payment flow</p>
        </div>
      </div>

      <div className="kgrid kg4">
        <div className="kc kc-g">
          <div className="kl">Monthly Recurring Revenue</div>
          <div className="kn">$52,680</div>
        </div>
        <div className="kc kc-b">
          <div className="kl">Annual Run Rate</div>
          <div className="kn">$632,160</div>
        </div>
        <div className="kc kc-w">
          <div className="kl">Pending Invoices</div>
          <div className="kn">$4,350</div>
        </div>
        <div className="kc kc-r">
          <div className="kl">Failed Payments</div>
          <div className="kn">$1,299</div>
        </div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="twrap" style={{ flex: 1, overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client</th>
                <th>Plan</th>
                <th>Date</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--blu)', fontFamily: 'monospace', fontSize: 12 }}>
                      {tx.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%',
                        background: 'var(--blu-l, #e6f8ff)',
                        color: 'var(--blu)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 10, flexShrink: 0,
                      }}>
                        {tx.client.split(' ').map(w => w[0]).join('')}
                      </div>
                      <span style={{ fontWeight: 600 }}>{tx.client}</span>
                    </div>
                  </td>
                  <td><span className="tag t-blue">{tx.plan}</span></td>
                  <td style={{ color: 'var(--tx3)' }}>{tx.date}</td>
                  <td style={{ color: 'var(--tx3)' }}>{tx.method}</td>
                  <td><strong>{tx.amount}</strong></td>
                  <td>
                    <span className={`tag ${tx.status === 'Paid' ? 't-green' :
                        tx.status === 'Pending' ? 't-orange' : 't-gray'
                      }`}>
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
