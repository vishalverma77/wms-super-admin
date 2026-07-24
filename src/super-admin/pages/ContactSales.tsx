import { useEffect, useState } from "react";

const initialEnquiries = [
  {
    id: 1,
    name: "Amit Kumar",
    company: "ABC Pvt Ltd",
    email: "amit.kumar@abc.com",
    phone: "9876543210",
    date: "24 May 2025, 10:30 AM",
    industry: "Manufacturing",
    companySize: "51 - 200 Employees",
    warehouseCount: "5",
    expectedUsers: "80",
    message:
      "We are looking for a Warehouse Management System with inventory, purchase, and reporting features.",
    source: "Contact Sales Form",
  },
  {
    id: 2,
    name: "Rahul Singh",
    company: "XYZ Solutions",
    email: "rahul@xyz.com",
    phone: "9123456780",
    date: "23 May 2025, 04:15 PM",
    industry: "Technology",
    companySize: "21 - 50 Employees",
    warehouseCount: "2",
    expectedUsers: "35",
    message: "Need pricing and implementation timeline for multiple locations.",
    source: "Contact Sales Form",
  },
  {
    id: 3,
    name: "Priya Sharma",
    company: "TechnoWare Ltd",
    email: "priya@technoware.com",
    phone: "9988776655",
    date: "22 May 2025, 11:20 AM",
    industry: "Retail",
    companySize: "201 - 500 Employees",
    warehouseCount: "8",
    expectedUsers: "120",
    message: "Interested in advanced stock tracking and approval workflows.",
    source: "Contact Sales Form",
  },
  {
    id: 4,
    name: "Neha Desai",
    company: "Desai Industries",
    email: "neha@desai.com",
    phone: "9871234560",
    date: "21 May 2025, 09:45 AM",
    industry: "Industrial",
    companySize: "51 - 200 Employees",
    warehouseCount: "4",
    expectedUsers: "65",
    message: "Please share a demo slot and enterprise subscription details.",
    source: "Contact Sales Form",
  },
  {
    id: 5,
    name: "Vikram Joshi",
    company: "Global Retail Co.",
    email: "vikram@globalretail.com",
    phone: "9001122334",
    date: "20 May 2025, 03:30 PM",
    industry: "Retail",
    companySize: "501 - 1000 Employees",
    warehouseCount: "12",
    expectedUsers: "220",
    message: "Looking for integrations with current ERP and barcode scanning.",
    source: "Contact Sales Form",
  },
  {
    id: 6,
    name: "Sanjay Kapoor",
    company: "Kapoor Enterprises",
    email: "sanjay@kapoor.com",
    phone: "9812345678",
    date: "19 May 2025, 02:05 PM",
    industry: "Distribution",
    companySize: "11 - 50 Employees",
    warehouseCount: "3",
    expectedUsers: "28",
    message: "Need help choosing the right plan for our warehouse team.",
    source: "Contact Sales Form",
  },
  {
    id: 7,
    name: "Meera Bansal",
    company: "Bansal Group",
    email: "meera@bansalgroup.com",
    phone: "9822334455",
    date: "18 May 2025, 11:50 AM",
    industry: "Logistics",
    companySize: "201 - 500 Employees",
    warehouseCount: "9",
    expectedUsers: "150",
    message: "We want to migrate from spreadsheets to a proper WMS.",
    source: "Contact Sales Form",
  },
  {
    id: 8,
    name: "Arjun Reddy",
    company: "Reddo Logistics",
    email: "arjun@reddo.com",
    phone: "9911223344",
    date: "17 May 2025, 10:15 AM",
    industry: "Logistics",
    companySize: "51 - 200 Employees",
    warehouseCount: "6",
    expectedUsers: "75",
    message: "Please contact us about implementation support and pricing.",
    source: "Contact Sales Form",
  },
];

type Enquiry = (typeof initialEnquiries)[number];

export function ContactSales() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedEnquiry ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedEnquiry]);

  return (
    <>
      <div className="pgh">
        <div className="pgh-l">
          <h1>Contact Sales</h1>
          <p>List of all users who have contacted for sales enquiry.</p>
        </div>
      </div>

      <div className="card contact-sales-card">
        <div className="contact-sales-toolbar">
          <label className="contact-sales-search">
            <input
              type="text"
              placeholder="Search by name, email or company..."
            />
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </label>
          <button className="contact-sales-filter">
            <svg viewBox="0 0 24 24">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />
            </svg>
            Filter
          </button>
          <button className="contact-sales-date">
            Select date range
            <svg viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </button>
        </div>

        <div className="twrap contact-sales-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.company}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                  <td>{row.date}</td>
                  <td>
                    <button
                      className="contact-sales-view"
                      onClick={() => setSelectedEnquiry(row)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="contact-sales-footer">
          <span>Showing 1 to 8 of 8 entries</span>
          <div className="contact-sales-pages">
            <button aria-label="Previous page">
              <svg viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="active">1</button>
            <button aria-label="Next page">
              <svg viewBox="0 0 24 24">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {selectedEnquiry && (
        <EnquiryDialog
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onDelete={() => {
            setEnquiries(enquiries.filter(e => e.id !== selectedEnquiry.id));
            setSelectedEnquiry(null);
          }}
          onSaveNote={(note) => {
            console.log("Saved note:", note);
          }}
          onSendEmail={(msg) => {
            console.log("Sent email:", msg);
          }}
        />
      )}
    </>
  );
}

function EnquiryDialog({
  enquiry,
  onClose,
  onDelete,
  onSaveNote,
  onSendEmail,
}: {
  enquiry: Enquiry;
  onClose: () => void;
  onDelete: () => void;
  onSaveNote: (note: string) => void;
  onSendEmail: (msg: string) => void;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  return (
    <>
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,30,53,0.5)', backdropFilter: 'blur(4px)', padding: 20 }} onClick={onClose}>
      <div className="card contact-sales-dialog" style={{ width: '100%', maxWidth: 760, maxHeight: '90vh', overflowY: 'auto', background: '#fff', borderRadius: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="pgh" style={{ margin: 0, padding: '24px', borderRadius: '16px 16px 0 0', borderBottom: '1px solid #f2f2f2', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 10, boxShadow: 'none' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>
                {enquiry.company.charAt(0)}
              </div>
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: 20, color: 'var(--tx)' }}>{enquiry.company}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#7a7876' }}>
                  <span>{enquiry.industry}</span>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#d1d5db' }} />
                  <span>{enquiry.companySize} employees</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4 }}>
            <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="layout-grid-half-gap32" style={{ padding: 24 }}>
          
          {/* Column 1: Customer Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <section>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, color: '#46536a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#7a7876' }}>Full Name</span>
                  <span style={{ fontWeight: 500, color: 'var(--tx)' }}>{enquiry.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#7a7876' }}>Email Address</span>
                  <a href={`mailto:${enquiry.email}`} style={{ fontWeight: 500, color: 'var(--primary)', textDecoration: 'none' }}>{enquiry.email}</a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#7a7876' }}>Phone Number</span>
                  <a href={`tel:${enquiry.phone}`} style={{ fontWeight: 500, color: 'var(--primary)', textDecoration: 'none' }}>{enquiry.phone}</a>
                </div>
              </div>
            </section>
            
            <section>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, color: '#46536a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Enquiry Metadata</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#7a7876' }}>Date Submitted</span>
                  <span style={{ fontWeight: 500, color: 'var(--tx)' }}>{enquiry.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#7a7876' }}>Source</span>
                  <span style={{ display: 'inline-block', padding: '4px 10px', background: '#f3f4f6', borderRadius: 20, fontSize: 12, fontWeight: 500, color: '#4b5563' }}>{enquiry.source}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Column 2: Enquiry Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <section>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, color: '#46536a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Requirements</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#7a7876' }}>Warehouse Count</span>
                  <span style={{ fontWeight: 500, color: 'var(--tx)' }}>{enquiry.warehouseCount} locations</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#7a7876' }}>Expected Users</span>
                  <span style={{ fontWeight: 500, color: 'var(--tx)' }}>{enquiry.expectedUsers} users</span>
                </div>
              </div>
            </section>

            <section>
              <h3 style={{ margin: '0 0 12px', fontSize: 14, color: '#46536a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message</h3>
              <div style={{ padding: 16, background: '#f9fbfe', border: '1px solid #edf1f6', borderRadius: 8, fontSize: 14, color: '#46536a', lineHeight: 1.6 }}>
                {enquiry.message}
              </div>
            </section>
          </div>

        </div>

        {/* Actions Footer */}
        <div style={{ padding: '20px 24px', background: '#f9fbfe', borderTop: '1px solid #edf1f6', display: 'flex', gap: 12, justifyContent: 'flex-end', borderRadius: '0 0 16px 16px' }}>
          <button onClick={() => setShowDeleteConfirm(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', background: '#fff', border: '1px solid #ffb3b3', borderRadius: 6, color: '#ef1f1f', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /></svg>
            Delete
          </button>
          <div style={{ flex: 1 }} />
          <button onClick={() => setShowNoteDialog(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', background: '#fff', border: '1px solid #dbe4ef', borderRadius: 6, color: '#46536a', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
            Add Note
          </button>
          <button onClick={() => setShowEmailDialog(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', background: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: 6, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            Reply Email
          </button>
        </div>

      </div>
    </div>
    
      {showDeleteConfirm && (
        <DeleteConfirmDialog onClose={() => setShowDeleteConfirm(false)} onConfirm={onDelete} />
      )}
      {showNoteDialog && (
        <AddNoteDialog onClose={() => setShowNoteDialog(false)} onSave={onSaveNote} />
      )}
      {showEmailDialog && (
        <ReplyEmailDialog enquiry={enquiry} onClose={() => setShowEmailDialog(false)} onSend={onSendEmail} />
      )}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DetailSection({
  icon,
  title,
  rows,
}: {
  icon: "customer" | "file" | "info";
  title: string;
  rows: string[][];
}) {
  return (
    <section className="contact-sales-section">
      <div className="contact-sales-section-title">
        <span className="contact-sales-section-icon">
          {icon === "customer" && (
            <svg viewBox="0 0 24 24">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M19 8v6M22 11h-6" />
            </svg>
          )}
          {icon === "file" && (
            <svg viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M9 15h6M9 11h2" />
            </svg>
          )}
          {icon === "info" && (
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          )}
        </span>
        <h3>{title}</h3>
      </div>
      <div className="contact-sales-fields">
        {rows.map(([label, value]) => (
          <div className="contact-sales-field" key={label}>
            <span>{label}</span>
            <b>:</b>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function DeleteConfirmDialog({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,30,53,0.5)', backdropFilter: 'blur(4px)', padding: 20 }} onClick={onClose}>
      <div className="card contact-sales-dialog" style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff1f2', color: '#ef1f1f', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
            </svg>
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: 18, color: 'var(--tx)' }}>Delete Enquiry?</h2>
          <p style={{ margin: 0, fontSize: 13, color: '#7a7876', lineHeight: 1.5 }}>Are you sure you want to delete this enquiry? This action cannot be undone.</p>
        </div>
        <div style={{ padding: '16px 24px', background: '#f9fbfe', borderTop: '1px solid #edf1f6', display: 'flex', justifyContent: 'stretch', gap: 12, borderRadius: '0 0 16px 16px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px 16px', background: '#fff', border: '1px solid #dbe4ef', borderRadius: 6, color: '#46536a', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }} style={{ flex: 1, padding: '10px 16px', background: '#ef1f1f', border: '1px solid #ef1f1f', borderRadius: 6, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

function AddNoteDialog({ onClose, onSave }: { onClose: () => void, onSave: (note: string) => void }) {
  const [note, setNote] = useState('');
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,30,53,0.5)', backdropFilter: 'blur(4px)', padding: 20 }} onClick={onClose}>
      <div className="card contact-sales-dialog" style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
        <div className="pgh" style={{ margin: 0, padding: '20px 24px', borderRadius: '16px 16px 0 0', borderBottom: '1px solid #f2f2f2', boxShadow: 'none' }}>
          <h2 style={{ margin: 0, fontSize: 18, color: 'var(--tx)' }}>Add Note</h2>
        </div>
        <div style={{ padding: 24 }}>
          <textarea autoFocus value={note} onChange={e => setNote(e.target.value)} placeholder="Type your note here..." style={{ width: '100%', minHeight: 120, padding: 12, border: '1px solid #dbe4ef', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', resize: 'vertical' }} />
        </div>
        <div style={{ padding: '16px 24px', background: '#f9fbfe', borderTop: '1px solid #edf1f6', display: 'flex', justifyContent: 'flex-end', gap: 12, borderRadius: '0 0 16px 16px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #dbe4ef', borderRadius: 6, color: '#46536a', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => { onSave(note); onClose(); }} style={{ padding: '8px 16px', background: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: 6, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Save Note</button>
        </div>
      </div>
    </div>
  );
}

function ReplyEmailDialog({ enquiry, onClose, onSend }: { enquiry: Enquiry, onClose: () => void, onSend: (msg: string) => void }) {
  const [message, setMessage] = useState('');
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,30,53,0.5)', backdropFilter: 'blur(4px)', padding: 20 }} onClick={onClose}>
      <div className="card contact-sales-dialog" style={{ width: '100%', maxWidth: 540, background: '#fff', borderRadius: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
        <div className="pgh" style={{ margin: 0, padding: '20px 24px', borderRadius: '16px 16px 0 0', borderBottom: '1px solid #f2f2f2', boxShadow: 'none' }}>
          <h2 style={{ margin: 0, fontSize: 18, color: 'var(--tx)' }}>Reply to {enquiry.name}</h2>
          <div style={{ fontSize: 13, color: '#7a7876', marginTop: 4 }}>To: {enquiry.email}</div>
        </div>
        <div style={{ padding: 24 }}>
          <textarea autoFocus value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your email response..." style={{ width: '100%', minHeight: 180, padding: 12, border: '1px solid #dbe4ef', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', resize: 'vertical' }} />
        </div>
        <div style={{ padding: '16px 24px', background: '#f9fbfe', borderTop: '1px solid #edf1f6', display: 'flex', justifyContent: 'flex-end', gap: 12, borderRadius: '0 0 16px 16px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #dbe4ef', borderRadius: 6, color: '#46536a', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => { onSend(message); onClose(); }} style={{ padding: '8px 16px', background: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: 6, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
