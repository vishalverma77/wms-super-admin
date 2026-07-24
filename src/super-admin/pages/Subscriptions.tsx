import { useState } from 'react';

const subscribers = [
  { id: 1, company: 'Bright Digital', email: 'info@bright.digital', plan: 'Pro', since: '2026-01-12', status: 'Active', seats: 14 },
  { id: 2, company: 'Acme Corp', email: 'billing@acme.com', plan: 'Basic', since: '2025-11-03', status: 'Active', seats: 5 },
  { id: 3, company: 'Nova Solutions', email: 'hello@nova.com', plan: 'Enterprise', since: '2025-09-22', status: 'Active', seats: 42 },
  { id: 4, company: 'Pixel Works', email: 'hi@pixel.works', plan: 'Pro', since: '2026-03-08', status: 'Active', seats: 8 },
  { id: 5, company: 'NextGen LLC', email: 'admin@nextgen.com', plan: 'Basic', since: '2026-05-14', status: 'Paused', seats: 3 },
];

const initialEnterpriseContacts = [
  { id: 1, name: 'Alice Cooper', email: 'alice@globex.com', phone: '+1 (555) 019-2837', company: 'Globex Corp', requestDate: 'Jul 20, 2026', status: 'New' },
  { id: 2, name: 'Bob Marley', email: 'bob.m@starkind.com', phone: '+1 (555) 928-1122', company: 'Stark Industries', requestDate: 'Jul 21, 2026', status: 'New' },
  { id: 3, name: 'Charlie Sheen', email: 'charlie@wayne.com', phone: '+1 (555) 887-3344', company: 'Wayne Enterprises', requestDate: 'Jul 22, 2026', status: 'New' },
  { id: 4, name: 'Diana Prince', email: 'diana@amazon.com', phone: '+1 (555) 776-5566', company: 'Amazon', requestDate: 'Jul 23, 2026', status: 'New' },
];

export function Subscriptions() {
  const [showEnterpriseContacts, setShowEnterpriseContacts] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [contacts, setContacts] = useState(initialEnterpriseContacts);

  const newContactsCount = contacts.filter(c => c.status === 'New').length;

  const markAsContacted = (id: number) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, status: 'Contacted' } : c));
  };

  return (
    <>
      <style>
        {`
          .ent-banner {
            background: var(--color-primary-soft, #eaf8fd);
            border: 1px solid var(--color-primary, #3ac1ef);
            border-radius: var(--radius-md, 8px);
            padding: 16px 20px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: var(--shadow-sm);
            color: var(--color-primary-strong, #1597c6);
            gap: 16px;
          }
          .ent-banner-content {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .ent-banner-actions {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .ent-modal-card {
            background: var(--color-surface, #ffffff);
            border-radius: 12px;
            box-shadow: 0 24px 48px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 1000px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin: 16px;
          }
          .ent-modal-header {
            padding: 24px 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--color-border, #e6eef2);
            background: #f8fafc;
          }
          .ent-modal-body {
            padding: 0;
            overflow-y: auto;
            overflow-x: auto;
          }
          @media (max-width: 768px) {
            .ent-banner {
              flex-direction: column;
              align-items: flex-start;
            }
            .ent-banner-actions {
              width: 100%;
              justify-content: space-between;
            }
            .ent-modal-card {
              max-height: 95vh;
              margin: 12px;
            }
            .ent-modal-header {
              padding: 16px 20px;
            }
          }
        `}
      </style>
      <div className="pgh">
        <div className="pgh-l">
          <h1>Subscriptions</h1>
          <p>Plan overview · Subscriber management · Retention tracking</p>
        </div>
      </div>

      {isBannerVisible && newContactsCount > 0 && (
        <div className="ent-banner">
          <div className="ent-banner-content">
            <div style={{
              background: 'var(--color-primary, #3ac1ef)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary-strong, #1597c6)' }}>Enterprise Pro Plan Inquiries</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--color-muted)' }}>You have {newContactsCount} new contact requests from the landing page.</p>
            </div>
          </div>
          <div className="ent-banner-actions">
            <button 
              onClick={() => setShowEnterpriseContacts(true)}
              style={{
                background: 'var(--color-primary, #3ac1ef)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                boxShadow: '0 2px 4px rgba(58, 193, 239, 0.2)',
                transition: 'background 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-primary-strong, #1597c6)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-primary, #3ac1ef)'}
            >
              See All Requests
            </button>
            <button 
              onClick={() => setIsBannerVisible(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-primary-strong, #1597c6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                opacity: 0.7,
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="kgrid kg4">
        <div className="kc kc-b">
          <div className="kl">Total Subscribers</div>
          <div className="kn">1,325</div>
        </div>
        <div className="kc kc-g">
          <div className="kl">Net Retention</div>
          <div className="kn">104%</div>
        </div>
        <div className="kc kc-r">
          <div className="kl">Monthly Churn</div>
          <div className="kn">2.1%</div>
        </div>
        <div className="kc kc-t">
          <div className="kl">New This Month</div>
          <div className="kn">+47</div>
        </div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="twrap" style={{ flex: 1, overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Member Since</th>
                <th>Seats</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(row => (
                <tr key={row.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%',
                        background: 'var(--blu-l, #e6f8ff)',
                        color: 'var(--blu)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 10, flexShrink: 0,
                      }}>
                        {row.company.split(' ').map(w => w[0]).join('')}
                      </div>
                      <span style={{ fontWeight: 600 }}>{row.company}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--tx3)' }}>{row.email}</td>
                  <td><span className="tag t-blue">{row.plan}</span></td>
                  <td style={{ color: 'var(--tx3)' }}>{row.since}</td>
                  <td style={{ fontWeight: 600 }}>{row.seats}</td>
                  <td>
                    <span className={`tag ${row.status === 'Active' ? 't-green' : 't-orange'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEnterpriseContacts && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 30, 53, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '24px'
        }}>
          <div className="ent-modal-card" style={{ animation: 'modalFadeIn 0.2s ease-out' }}>
            <style>
              {`
                @keyframes modalFadeIn {
                  from { opacity: 0; transform: translateY(20px) scale(0.98); }
                  to { opacity: 1; transform: translateY(0) scale(1); }
                }
              `}
            </style>
            <div className="ent-modal-header">
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  Enterprise Pro Plan Requests
                  {newContactsCount > 0 && (
                    <span style={{ 
                      background: 'var(--color-primary-soft)', 
                      color: 'var(--color-primary-strong)', 
                      padding: '2px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.875rem', 
                      fontWeight: 600 
                    }}>
                      {newContactsCount} New
                    </span>
                  )}
                </h2>
                <p style={{ margin: '6px 0 0 0', color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                  List of leads that submitted the enterprise contact form from the landing page.
                </p>
              </div>
              <button 
                onClick={() => setShowEnterpriseContacts(false)}
                style={{
                  background: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-navy)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'var(--color-background)'; e.currentTarget.style.color = 'var(--color-muted)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="ent-modal-body twrap" style={{ flex: 1 }}>
              <table style={{ margin: 0, border: 'none', width: '100%' }}>
                <thead style={{ position: 'sticky', top: 0, background: 'var(--color-surface)', zIndex: 1, boxShadow: '0 1px 0 var(--color-border)' }}>
                  <tr>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontWeight: 600, color: 'var(--color-muted)' }}>Name</th>
                    <th style={{ textAlign: 'left', fontWeight: 600, color: 'var(--color-muted)' }}>Contact Info</th>
                    <th style={{ textAlign: 'left', fontWeight: 600, color: 'var(--color-muted)' }}>Company</th>
                    <th style={{ textAlign: 'left', fontWeight: 600, color: 'var(--color-muted)' }}>Request Date</th>
                    <th style={{ textAlign: 'left', fontWeight: 600, color: 'var(--color-muted)' }}>Status</th>
                    <th style={{ textAlign: 'right', paddingRight: '24px', fontWeight: 600, color: 'var(--color-muted)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact.id} style={{ transition: 'background 0.2s', borderBottom: '1px solid var(--color-border)' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-background)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'var(--color-primary-soft, #eaf8fd)',
                            color: 'var(--color-primary-strong, #1597c6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: 13, flexShrink: 0,
                          }}>
                            {contact.name.split(' ').map(w => w[0]).join('')}
                          </div>
                          <span style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.95rem' }}>{contact.name}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--color-muted)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            {contact.email}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            {contact.phone}
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 500, color: 'var(--color-text)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                          </svg>
                          {contact.company}
                        </div>
                      </td>
                      <td style={{ color: 'var(--color-muted)' }}>{contact.requestDate}</td>
                      <td>
                        <span style={{
                          background: contact.status === 'New' ? 'var(--color-primary-soft)' : 'var(--color-success-soft, #e8f8ef)',
                          color: contact.status === 'New' ? 'var(--color-primary-strong)' : 'var(--color-success, #10b981)',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {contact.status === 'Contacted' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                          {contact.status}
                        </span>
                      </td>
                      <td style={{ paddingRight: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button onClick={() => alert("Later I will do something")} style={{
                            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                            color: 'var(--color-text)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px',
                            transition: 'background 0.2s', boxShadow: 'var(--shadow-sm)'
                          }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-background)'} onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-surface)'}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            Email
                          </button>
                          {contact.status === 'New' && (
                            <button onClick={() => markAsContacted(contact.id)} style={{
                              background: 'var(--color-success, #10b981)', color: 'white', border: 'none',
                              padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px',
                              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)', transition: 'background 0.2s'
                            }} onMouseOver={(e) => e.currentTarget.style.background = '#059669'} onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-success, #10b981)'}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              Mark Contacted
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'flex-end', background: 'var(--color-background)' }}>
              <button 
                onClick={() => setShowEnterpriseContacts(false)}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-background)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-surface)'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

