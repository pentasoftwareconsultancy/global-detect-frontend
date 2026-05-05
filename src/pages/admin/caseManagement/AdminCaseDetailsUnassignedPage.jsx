import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Mail, Phone, MapPin,
  FileText, Calendar, Clock, AlertCircle, Download
} from 'lucide-react';
import { ROUTES } from '../../../core/constants/routes.constant';
import { casesData } from '../../../components/admin/caseManagement/caseManagementData';

const EXTENDED = {
  C004: {
    contact: { name: 'Michael Chen',  email: 'michael.chen@email.com', phone: '+1-555-0103', address: '789 Oak Ave\nChicago, IL 60601' },
    incident: { date: '2026-01-25', time: '14:00', location: 'Chicago, IL', description: 'Suspected fraudulent insurance claim.', additionalInfo: 'Claim filed after alleged vehicle theft.' },
    documents: [{ name: 'Insurance_Claim.pdf', date: '1/25/2026' }],
  },
  C005: {
    contact: { name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1-555-0102', address: '456 Elm St\nLos Angeles, CA 90001' },
    incident: { date: '2026-01-30', time: '08:00', location: 'Downtown metro station', description: 'Locate individual who has been missing for 3 days. Last seen at downtown metro station.', additionalInfo: 'Last seen at downtown metro station.' },
    documents: [{ name: 'Missing_Person_Details.pdf', date: '1/30/2026' }],
  },
  C006: {
    contact: { name: 'Emily Davis',   email: 'emily.davis@email.com',  phone: '+1-555-0104', address: '321 Pine St\nHouston, TX 77001' },
    incident: { date: '2026-02-05', time: '09:00', location: 'Houston, TX', description: 'Internal workplace misconduct.', additionalInfo: 'Multiple employee complaints filed.' },
    documents: [{ name: 'Complaint_Form.pdf', date: '2/5/2026' }],
  },
  C007: {
    contact: { name: 'David Brown',   email: 'david.brown@email.com',  phone: '+1-555-0105', address: '654 Maple Dr\nSeattle, WA 98101' },
    incident: { date: '2026-02-04', time: '10:00', location: 'Seattle, WA', description: 'Corporate espionage and data theft.', additionalInfo: 'Sensitive data leaked to competitor.' },
    documents: [{ name: 'Incident_Report.pdf', date: '2/4/2026' }],
  },
  C008: {
    contact: { name: 'Emily Davis',   email: 'emily.davis@email.com',  phone: '+1-555-0104', address: '321 Pine St\nHouston, TX 77001' },
    incident: { date: '2026-02-08', time: '11:00', location: 'Houston, TX', description: 'Personal background and activity investigation.', additionalInfo: 'Client suspects infidelity.' },
    documents: [{ name: 'Request_Form.pdf', date: '2/8/2026' }],
  },
};

const ALL_DETECTIVES = [
  'Detective Emma Watson', 'Detective James Bond', 'Detective Olivia Martinez',
  'Detective Suraj Mohite', 'Detective Aditi Jadhav', 'Detective Aditya Pathak', 'Detective Rutuja Katke',
];

// derive available detectives from localStorage cases (same source as AllCaseManagement)
const getAvailableDetectives = () => {
  try {
    const saved = localStorage.getItem('cases');
    const cases = saved ? JSON.parse(saved) : casesData;
    const assigned = cases.map(c => c.detective).filter(Boolean);
    return ALL_DETECTIVES.filter(d => !assigned.includes(d));
  } catch { return ALL_DETECTIVES; }
};

const priorityBadge = (p) => {
  if (!p) return 'bg-gray-500/20 text-gray-300';
  const s = p.toLowerCase();
  if (s.includes('urgent')) return 'bg-red-500/20 text-red-400 border border-red-500/30';
  if (s === 'high')         return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
  return 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30';
};

const AdminCaseDetailsUnassignedPage = () => {
  const { state } = useLocation();
  const navigate   = useNavigate();
  const item       = state?.caseItem;
  const ext        = item ? (EXTENDED[item.id] ?? {}) : {};

  const [showModal, setShowModal]   = useState(false);
  const [selected, setSelected]     = useState('');
  const [modalSearch, setModalSearch] = useState('');
  const availableDetectives = getAvailableDetectives();

  if (!item) return (
    <div className="bg-[#121F27] text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#8FA3B0] mb-4">No case data found.</p>
        <button onClick={() => navigate(ROUTES.ADMIN_ALL_CASE_MANAGEMENT)} className="text-sm text-red-400 underline">
          Back to Cases
        </button>
      </div>
    </div>
  );

  const contact  = ext.contact  ?? { name: item.client, email: '—', phone: '—', address: '—' };
  const incident = ext.incident ?? { date: item.date, time: '—', location: '—', description: '—', additionalInfo: '—' };
  const docs     = ext.documents ?? [];

  const lbl = 'text-xs text-[#8FA3B0] mb-0.5';
  const val = 'text-sm text-white font-medium';
  const card = 'bg-[#1A2832] border border-white/10 rounded-xl p-5 mb-4';

  return (
    <div className="bg-[#121F27] text-white min-h-screen px-4 sm:px-6 py-5 font-[Montserrat]">

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-[#8FA3B0] hover:text-white transition"
        >
          <ArrowLeft size={15} /> Back
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#dc3545] hover:bg-[#b82231] text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
        >
          Assign Detective
        </button>
      </div>

      {/* ── CASE HEADER ── */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs text-[#8FA3B0] border border-white/20 rounded px-2 py-1">
            Case #{item.id}
          </span>
          <span className={`text-xs px-2 py-1 rounded font-semibold ${priorityBadge(item.priority)}`}>
            {item.priority}
          </span>
          <span className="text-xs px-2 py-1 rounded bg-gray-500/20 text-gray-300">
            {item.status}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
          {item.type} Investigation
        </h1>
        <p className="text-sm text-[#8FA3B0]">
          {incident.description}
        </p>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT — 2/3 */}
        <div className="lg:col-span-2">

          {/* Contact Information */}
          <div className={card}>
            <div className="flex items-center gap-2 mb-1">
              <User size={15} className="text-white" />
              <p className="text-sm font-semibold text-white">Contact Information</p>
            </div>
            <p className="text-xs text-[#8FA3B0] mb-5">Client details from investigation request</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className={lbl}>Full Name</p>
                <p className={val}>{contact.name}</p>
              </div>
              <div>
                <p className={lbl}>Email</p>
                <p className={`${val} flex items-center gap-1`}>
                  <Mail size={12} className="text-white" />{contact.email}
                </p>
              </div>
              <div>
                <p className={lbl}>Phone</p>
                <p className={`${val} flex items-center gap-1`}>
                  <Phone size={12} className="text-white" />{contact.phone}
                </p>
              </div>
              <div>
                <p className={lbl}>Address</p>
                <p className={`${val} flex items-start gap-1`}>
                  <MapPin size={12} className="text-white mt-0.5 flex-shrink-0" />
                  <span style={{ whiteSpace: 'pre-line' }}>{contact.address}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Investigation Details */}
          <div className={card}>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={15} className="text-white" />
              <p className="text-sm font-semibold text-white">Investigation Details</p>
            </div>
            <p className="text-xs text-[#8FA3B0] mb-4">Type and specifics of the investigation</p>

            <p className="text-xs text-[#8FA3B0] mb-1">Investigation Type</p>
            <span className="inline-block text-xs border border-white/20 rounded px-3 py-1 text-white mb-5">
              {item.type}
            </span>

            <div className="border-t border-white/5 pt-4">
              <p className="text-sm font-semibold text-white mb-4">Incident Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className={lbl}>Date</p>
                  <p className={`${val} flex items-center gap-1`}>
                    <Calendar size={12} className="text-white" />{incident.date}
                  </p>
                </div>
                <div>
                  <p className={lbl}>Time</p>
                  <p className={`${val} flex items-center gap-1`}>
                    <Clock size={12} className="text-white" />{incident.time}
                  </p>
                </div>
              </div>
              <p className={lbl}>Location</p>
              <p className={`${val} flex items-center gap-1 mb-4`}>
                <MapPin size={12} className="text-white" />{incident.location}
              </p>
              <p className={lbl}>Description</p>
              <p className={`${val} mb-4`}>{incident.description}</p>
              <p className={lbl}>Additional Information</p>
              <p className={val}>{incident.additionalInfo}</p>
            </div>
          </div>

          {/* Case Documents */}
          <div className={card}>
            <p className="text-sm font-semibold text-white mb-1">Case Documents</p>
            <p className="text-xs text-[#8FA3B0] mb-4">{docs.length} file(s) attached</p>
            {docs.length === 0 && <p className="text-xs text-[#8FA3B0]">No documents attached.</p>}
            {docs.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: i < docs.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              >
                <div className="flex items-center gap-3">
                  <FileText size={15} className="text-[#8FA3B0]" />
                  <div>
                    <p className="text-sm text-white">{doc.name}</p>
                    <p className="text-xs text-[#8FA3B0]">Uploaded: {doc.date}</p>
                  </div>
                </div>
                <Download size={15} className="text-[#8FA3B0] cursor-pointer hover:text-white" />
              </div>
            ))}
          </div>

          {/* Legal Consent */}
          <div className={card}>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={15} className="text-red-400" />
              <p className="text-sm font-semibold text-white">Legal Consent</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-[#dc3545] text-white px-3 py-1 rounded font-semibold">
                Consent Given
              </span>
              <span className="text-sm text-[#8FA3B0]">
                Client has provided legal consent for investigation
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT — 1/3 Case Summary only */}
        <div>
          <div className={card}>
            <p className="text-sm font-semibold text-white mb-4">Case Summary</p>
            {[
              { icon: <FileText size={13} className="text-[#8FA3B0]" />, label: 'Case Number',        value: `#${item.id}` },
              { icon: <User     size={13} className="text-[#8FA3B0]" />, label: 'Client',             value: contact.name },
              { icon: <Calendar size={13} className="text-[#8FA3B0]" />, label: 'Created',            value: item.date },
              { icon: <FileText size={13} className="text-[#8FA3B0]" />, label: 'Investigation Type', value: item.type },
            ].map((row, i, arr) => (
              <div key={i}>
                <div className="flex items-start gap-2 py-2">
                  {row.icon}
                  <div>
                    <p className={lbl}>{row.label}</p>
                    <p className={val}>{row.value}</p>
                  </div>
                </div>
                {i < arr.length - 1 && <div className="border-t border-white/5" />}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── ASSIGN DETECTIVE MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[90%] max-w-3xl bg-[#1A2832] border border-white/10 rounded-2xl p-6 relative">

            <button onClick={() => { setShowModal(false); setSelected(''); setModalSearch(''); }} className="absolute top-4 right-4 text-[#8FA3B0] hover:text-white text-lg leading-none">✕</button>

            <h2 className="text-base font-bold text-white mb-1">Assign Detective to Case</h2>
            <p className="text-xs text-[#8FA3B0] mb-4">Select a detective to assign to this case</p>

            <div className="flex items-center gap-3 bg-[#0f1a22] border border-white/10 rounded-xl px-4 py-3 mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8FA3B0" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                value={modalSearch}
                onChange={e => setModalSearch(e.target.value)}
                placeholder="Search detective"
                className="bg-transparent outline-none w-full text-sm text-white placeholder-[#8FA3B0]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {availableDetectives
                .filter(d => d.toLowerCase().includes(modalSearch.toLowerCase()))
                .map(det => (
                  <div
                    key={det}
                    onClick={() => setSelected(det)}
                    className="relative flex items-center justify-between px-4 py-5 rounded-xl border cursor-pointer transition text-sm font-medium"
                    style={{
                      background: selected === det ? '#6B1E2A' : '#1C2B35',
                      borderColor: selected === det ? '#dc3545' : 'rgba(255,255,255,0.08)',
                      color: '#fff',
                    }}
                  >
                    <span>{det}</span>
                    {selected === det && (
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </div>
                ))}
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => { setShowModal(false); setSelected(''); setModalSearch(''); }} className="px-5 py-2 border border-white/20 rounded-lg text-sm text-white hover:bg-white/5 transition">Cancel</button>
              <button
                onClick={() => {
                  if (!selected) return;
                  // persist to localStorage so AllCaseManagement reflects the change
                  try {
                    const saved = localStorage.getItem('cases');
                    const cases = saved ? JSON.parse(saved) : casesData;
                    const updated = cases.map(c =>
                      c.id === item.id ? { ...c, detective: selected, status: 'Assigned' } : c
                    );
                    localStorage.setItem('cases', JSON.stringify(updated));
                  } catch {}
                  setShowModal(false);
                  navigate(ROUTES.ADMIN_ALL_CASE_MANAGEMENT);
                }}
                className="px-5 py-2 bg-[#dc3545] hover:bg-[#b82231] rounded-lg text-sm text-white font-semibold transition"
              >
                Assign Case
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCaseDetailsUnassignedPage;
