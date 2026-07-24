import { useState, useEffect } from 'react';

const customersData = [
  { 
    id: 1, name: 'Acme Corp', domain: 'acmecorp.com', plan: 'Enterprise', status: 'Active', mrr: '$299', 
    users: 140, maxUsers: 'Unlimited', warehouses: 12, maxWarehouses: 'Unlimited', 
    joined: '2025-01-15', apiActive: true,
    modules: { inbound: true, outbound: true, production: true, cycleCount: true, approvalMatrix: true }
  },
  { 
    id: 2, name: 'Global Tech', domain: 'globaltech.io', plan: 'Pro', status: 'Active', mrr: '$49', 
    users: 35, maxUsers: 50, warehouses: 3, maxWarehouses: 5, 
    joined: '2025-03-22', apiActive: true,
    modules: { inbound: true, outbound: true, production: true, cycleCount: true, approvalMatrix: false }
  },
  { 
    id: 3, name: 'Nova Solutions', domain: 'nova.com', plan: 'Basic', status: 'Active', mrr: '$15', 
    users: 8, maxUsers: 10, warehouses: 1, maxWarehouses: 2, 
    joined: '2025-06-10', apiActive: false,
    modules: { inbound: true, outbound: true, production: false, cycleCount: false, approvalMatrix: false }
  },
  { 
    id: 4, name: 'Zenith Apps', domain: 'zenith.app', plan: 'Pro', status: 'Suspended', mrr: '$49', 
    users: 42, maxUsers: 50, warehouses: 5, maxWarehouses: 5, 
    joined: '2024-11-05', apiActive: false,
    modules: { inbound: true, outbound: true, production: true, cycleCount: true, approvalMatrix: false }
  },
];

export function Customers() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedCustomerId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedCustomerId]);

  return (
    <>
      <div className="pgh">
        <div className="pgh-l">
          <h1>Customers</h1>
          <p>WMS Tenant management · Feature Flags · Warehouse Limits</p>
        </div>
        <div className="pgh-r">
          <div className="tbp" style={{ padding: '8px 12px', background: '#fff' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a7876" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search tenants..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, width: 200 }} />
          </div>
        </div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="twrap" style={{ flex: 1, overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Domain</th>
                <th>Plan</th>
                <th>Users</th>
                <th>Warehouses</th>
                <th>API Integration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map(row => (
                <tr
                  key={row.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedCustomerId(row.id)}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '6px',
                        background: 'var(--primary-light)', color: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 11, flexShrink: 0,
                      }}>
                        {row.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600 }}>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ color: '#7a7876' }}>{row.domain}</td>
                  <td><span className="tag t-blue">{row.plan}</span></td>
                  <td style={{ fontWeight: 600 }}>{row.users} <span style={{color: '#a8a5a0', fontSize: 11, fontWeight: 400}}>/ {row.maxUsers}</span></td>
                  <td style={{ fontWeight: 600 }}>{row.warehouses} <span style={{color: '#a8a5a0', fontSize: 11, fontWeight: 400}}>/ {row.maxWarehouses}</span></td>
                  <td>
                    {row.apiActive ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#15803d', fontSize: 12, fontWeight: 600 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#15803d' }} /> Active
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#a8a5a0', fontSize: 12 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a8a5a0' }} /> Inactive
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`tag ${row.status === 'Active' ? 't-green' : row.status === 'Suspended' ? 't-orange' : 't-gray'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomerId && (
        <CustomerActionModal customerId={selectedCustomerId} onClose={() => setSelectedCustomerId(null)} />
      )}
    </>
  );
}

function CustomerActionModal({ customerId, onClose }: { customerId: number, onClose: () => void }) {
  const customer = customersData.find(c => c.id === customerId);
  const [impersonating, setImpersonating] = useState(false);
  const [modules, setModules] = useState(customer?.modules);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (customer) setModules(customer.modules);
  }, [customer]);

  if (!customer || !modules) return null;

  const handleImpersonate = () => {
    setImpersonating(true);
    setTimeout(() => { setImpersonating(false); alert(`Now impersonating ${customer.name}.`); }, 1000);
  };

  const toggleModule = (key: keyof typeof modules) => {
    setModules(prev => prev ? { ...prev, [key]: !prev[key] } : prev);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(15,30,53,0.5)', backdropFilter: 'blur(4px)', padding: 20
    }} onClick={onClose}>
      <div className="card" style={{
        width: '100%', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto',
        background: '#fff', borderRadius: 16, display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid #f2f2f2', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'sticky', top: 0, background: '#fff', zIndex: 10, borderRadius: '16px 16px 0 0' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <h2 style={{ fontFamily: '"Outfit",sans-serif', margin: 0, fontSize: 22, color: 'var(--tx)' }}>{customer.name}</h2>
              <span className={`tag ${customer.status === 'Active' ? 't-green' : customer.status === 'Suspended' ? 't-orange' : 't-gray'}`}>
                {customer.status}
              </span>
            </div>
            <p style={{ margin: 0, color: '#7a7876', fontSize: 13 }}>{customer.domain} · WMS Tenant since {customer.joined}</p>
          </div>
          <button onClick={onClose} style={{
            background: '#f2f2f2', border: 'none', borderRadius: '50%', width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4a4a4a',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
          
          {/* Left Column: WMS Features & Limits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* WMS Feature Flags */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#a8a5a0', letterSpacing: '0.04em', marginBottom: 12 }}>
                WMS Feature Flags (Overrides)
              </div>
              <div style={{ border: '1px solid #f2f2f2', borderRadius: 10, padding: 4 }}>
                {[
                  { key: 'inbound', label: 'Inbound / GRN', desc: 'Allow goods receipt and putaway.' },
                  { key: 'outbound', label: 'Outbound / Picking', desc: 'Allow order processing and dispatch.' },
                  { key: 'production', label: 'Production / BOM', desc: 'Allow assembly of items.' },
                  { key: 'cycleCount', label: 'Cycle Count', desc: 'Allow blind physical counting.' },
                  { key: 'approvalMatrix', label: 'PO Approval Matrix', desc: 'Advanced routing for purchase orders.' }
                ].map((mod, idx) => (
                  <div key={mod.key} style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    padding: '12px', borderBottom: idx < 4 ? '1px solid #f2f2f2' : 'none'
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--tx)' }}>{mod.label}</div>
                      <div style={{ fontSize: 11, color: '#7a7876', marginTop: 2 }}>{mod.desc}</div>
                    </div>
                    {/* Toggle Switch */}
                    <div 
                      onClick={() => toggleModule(mod.key as keyof typeof modules)}
                      style={{
                        width: 36, height: 20, borderRadius: 20, 
                        background: modules[mod.key as keyof typeof modules] ? 'var(--primary)' : '#e5e7eb',
                        position: 'relative', cursor: 'pointer', transition: '0.2s'
                      }}
                    >
                      <div style={{
                        width: 16, height: 16, borderRadius: '50%', background: '#fff',
                        position: 'absolute', top: 2, left: modules[mod.key as keyof typeof modules] ? 18 : 2,
                        transition: '0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Limits */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#a8a5a0', letterSpacing: '0.04em', marginBottom: 12 }}>
                WMS Resource Limits
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#f9fbfe', border: '1px solid #f2f2f2', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: 11, color: '#7a7876', marginBottom: 4 }}>Warehouses</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>{customer.warehouses}</span>
                    <span style={{ fontSize: 13, color: '#a8a5a0' }}>/ {customer.maxWarehouses}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#3ac1ef', marginTop: 6, fontWeight: 600, cursor: 'pointer' }}>Edit Limit</div>
                </div>
                <div style={{ background: '#f9fbfe', border: '1px solid #f2f2f2', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: 11, color: '#7a7876', marginBottom: 4 }}>Staff Users</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>{customer.users}</span>
                    <span style={{ fontSize: 13, color: '#a8a5a0' }}>/ {customer.maxUsers}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#3ac1ef', marginTop: 6, fontWeight: 600, cursor: 'pointer' }}>Edit Limit</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, borderLeft: '1px solid #f2f2f2', paddingLeft: 24 }}>
            
            {/* Quick Actions */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#a8a5a0', letterSpacing: '0.04em', marginBottom: 12 }}>
                Quick Actions
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <button onClick={handleImpersonate} disabled={impersonating} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8,
                  padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: '"DM Sans",sans-serif'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  {impersonating ? 'Logging in...' : 'Impersonate Admin'}
                </button>
                
                <button style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#fff', color: '#4a4a4a', border: '1px solid #e5e7eb', borderRadius: 8,
                  padding: '12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: '"DM Sans",sans-serif'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  Force Password Reset
                </button>

                <button style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#fff1f2', color: '#be123c', border: 'none', borderRadius: 8,
                  padding: '12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: '"DM Sans",sans-serif'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                  Suspend Tenant
                </button>
              </div>
            </div>

            {/* Billing Overview */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#a8a5a0', letterSpacing: '0.04em', marginBottom: 12 }}>
                Billing
              </div>
              <div style={{ background: '#f9fbfe', border: '1px solid #f2f2f2', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 13, color: '#7a7876', marginBottom: 4 }}>Monthly Recurring</div>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: '"Outfit",sans-serif', color: 'var(--primary)' }}>
                  {customer.mrr}
                </div>
                <div style={{ fontSize: 11, color: '#7a7876', marginTop: 8 }}>
                  Next invoice on Aug 1st.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
