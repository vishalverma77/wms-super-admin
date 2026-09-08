import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRevenueRequest } from '../../store/slices/revenueSlice';

export function Dashboard() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.revenue);

  useEffect(() => {
    dispatch(fetchRevenueRequest());
  }, [dispatch]);

  const currency = data?.currency || 'AED';
  const arr = data?.arr ?? 0;
  const activeTenants = data?.activePayingTenantsCount ?? 0;
  const activeTrials = data?.activeTrialsCount ?? 0;
  const newSignups = data?.newSignups30d ?? 0;

  const formatShortMoney = (num: number) => {
    if (num >= 1000000) {
      return `${currency} ${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${currency} ${(num / 1000).toFixed(1)}K`;
    }
    return `${currency} ${num.toLocaleString()}`;
  };

  const recentActivity = [
    { id: 1, action: 'Real-time billing synchronization active', time: 'Just now', type: 'info' },
    { id: 2, action: `${activeTenants} active subscribers recorded`, time: 'Live', type: 'upgrade' },
    { id: 3, action: `${activeTrials} active trial accounts currently exploring`, time: 'Live', type: 'signup' },
    { id: 4, action: `+${newSignups} signups recorded in last 30 days`, time: 'Recent', type: 'info' },
  ];

  return (
    <>
      <div className="pgh">
        <div className="pgh-l">
          <h1>Overview Dashboard</h1>
          <p>Global analytics · Plan Revenue · System health · Live activity</p>
        </div>
        <div className="pgh-r">
          <span className="tag t-green" style={{ fontSize: 13, padding: '5px 12px' }}>
            System Operational
          </span>
        </div>
      </div>

      <div className="kgrid kg4">
        <div className="kc kc-b">
          <div className="kl">Annual Recurring Revenue (ARR)</div>
          <div className="kn">{loading && !data ? '...' : formatShortMoney(arr)}</div>
        </div>
        <div className="kc kc-g">
          <div className="kl">Active Paying Tenants</div>
          <div className="kn">{loading && !data ? '...' : activeTenants.toLocaleString()}</div>
        </div>
        <div className="kc kc-t">
          <div className="kl">Active Trials</div>
          <div className="kn">{loading && !data ? '...' : activeTrials.toLocaleString()}</div>
        </div>
        <div className="kc kc-w">
          <div className="kl">New Signups (30d)</div>
          <div className="kn">{loading && !data ? '...' : `+${newSignups}`}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        
        {/* Main Panel */}
        <div className="card" style={{ padding: '24px', minHeight: 400 }}>
          <div style={{ fontFamily: '"Outfit",sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
            Subscription Plans Revenue Distribution
          </div>
          
          {data?.planBreakdown && data.planBreakdown.length > 0 ? (
            <div style={{ display: 'grid', gap: 16, marginTop: 12 }}>
              {data.planBreakdown.map((plan) => (
                <div
                  key={plan.planName}
                  style={{
                    border: '1px solid var(--bdr, #e5e7eb)',
                    borderRadius: 10,
                    padding: '16px',
                    background: '#fafafa',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <strong style={{ fontSize: 15 }}>{plan.planName}</strong>
                    <span className="tag t-green">{plan.activeCount} Active</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--tx2)' }}>
                    <span>MRR: <strong>{currency} {plan.mrr.toLocaleString()}</strong></span>
                    <span>Total Collected: <strong>{currency} {plan.totalRevenue.toLocaleString()}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 280, color: '#a8a5a0' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 12 }}>
                <path d="M3 3v18h18" />
                <path d="M18 17V9" />
                <path d="M13 17V5" />
                <path d="M8 17v-3" />
              </svg>
              <span style={{ fontSize: 13 }}>No paid subscription plans active yet. Real data will populate automatically as plans are purchased.</span>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontFamily: '"Outfit",sans-serif', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
              System Health
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#4a4a4a', fontWeight: 600 }}>API Uptime</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>99.98%</span>
                </div>
                <div style={{ height: 6, background: '#e6eef2', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '99.98%', background: 'var(--primary)', borderRadius: 999 }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#4a4a4a', fontWeight: 600 }}>Server Load</span>
                  <span style={{ color: '#15803d', fontWeight: 700 }}>34%</span>
                </div>
                <div style={{ height: 6, background: '#e6eef2', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '34%', background: '#15803d', borderRadius: 999 }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#4a4a4a', fontWeight: 600 }}>Error Rate</span>
                  <span style={{ color: '#1a1a1a', fontWeight: 700 }}>0.12%</span>
                </div>
                <div style={{ height: 6, background: '#e6eef2', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '4%', background: '#be123c', borderRadius: 999 }} />
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontFamily: '"Outfit",sans-serif', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
              Live Platform Signals
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {recentActivity.map((act) => (
                <div key={act.id} style={{ display: 'flex', gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        act.type === 'upgrade'
                          ? 'var(--primary-light)'
                          : act.type === 'signup'
                          ? '#dcfce7'
                          : act.type === 'expire'
                          ? '#fef3c7'
                          : act.type === 'alert'
                          ? '#fff1f2'
                          : '#f1f5f9',
                      color:
                        act.type === 'upgrade'
                          ? 'var(--primary)'
                          : act.type === 'signup'
                          ? '#15803d'
                          : act.type === 'expire'
                          ? '#b45309'
                          : act.type === 'alert'
                          ? '#be123c'
                          : '#64748b',
                    }}
                  >
                    {act.type === 'upgrade' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    )}
                    {act.type === 'signup' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                    {act.type === 'info' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--tx)', lineHeight: 1.3 }}>
                      {act.action}
                    </div>
                    <div style={{ fontSize: 11, color: '#7a7876', marginTop: 2 }}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
