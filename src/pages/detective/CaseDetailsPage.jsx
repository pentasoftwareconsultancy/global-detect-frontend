import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, FileText, Download, Calendar, Clock, MapPin, User, Mail, Phone, Home, AlertCircle, CheckCircle } from 'lucide-react';
import { ROUTES } from '../../core/constants/routes.constant';
import InsightFormModal from '../../components/detective/InsightFormModal';

const card = { background: '#1C2B35', borderRadius: '14px', padding: '24px', marginBottom: '16px' };
const lbl = { fontSize: '12px', color: '#9ca3af', marginBottom: '2px' };
const val = { fontSize: '14px', color: '#ffffff', fontWeight: '500' };
const divider = { borderBottom: '1px solid rgba(255,255,255,0.08)', margin: '14px 0' };

// Extended mock data keyed by case id
const CASE_DATA = {
  1: {
    caseNumber: '#C001',
    priority: 'urgent priority',
    insightStatus: 'Insights Submitted',
    title: 'Corporate Embezzlement Investigation',
    description: 'Suspected financial irregularities in company accounts. Need thorough investigation of transactions from the past 6 months.',
    contact: { name: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-0101', address: '123 Main St\nNew York, NY 10001' },
    investigationType: 'Financial',
    incident: { date: '2026-01-15', time: '09:00', location: '123 Wall Street, New York, NY', description: 'Suspected financial irregularities in company accounts.', additionalInfo: 'Need thorough investigation of transactions from the past 6 months.' },
    documents: [
      { name: 'Financial_Records_Q4.pdf', date: '1/15/2026' },
      { name: 'Bank_Statements.xlsx', date: '1/15/2026' },
    ],
    insight: {
      detective: 'Detective Emma Watson',
      datetime: '1/28/2026, 4:30:00 PM',
      submitted: true,
      changesRequested: true,
      adminFeedback: {
        message: 'Good initial work, but need more details before we can proceed with the final report. Please address the specific points below.',
        changes: [
          { title: 'Evidence Collection', desc: 'Please provide copies of the actual wire transfer receipts and transaction logs. Screenshots are not sufficient for legal proceedings.' },
          { title: 'Timeline', desc: 'Need exact dates and times for each suspicious transaction. Current timeline is too vague.' },
          { title: 'Witness Interviews', desc: 'Have you interviewed the accounting department staff? Their statements are crucial for building the case.' },
          { title: 'Recommendations', desc: 'Include estimated timeline for forensic audit and potential legal implications for the client.' },
        ],
        reviewedBy: 'Reviewed by Admin on 1/30/2026, 9:00:00 AM',
      },
      text: 'Initial investigation reveals suspicious wire transfers totaling $250,000 to offshore accounts. Found discrepancies in ledger entries during October-December period. Recommend forensic accounting audit.',
      attachment: 'Investigation_Report_Draft.pdf',
    },
    legalConsent: true,
    created: '1/15/2026',
    insightsSummary: { date: '1/25/2026', text: 'Successfully located assets in storage unit #247. Secured items and documented condition. All items match provided inventory list.' },
  },
  2: {
    caseNumber: '#C002',
    priority: 'high',
    insightStatus: 'Report Ready',
    title: 'Asset Recovery Investigation',
    description: 'Locate and recover stolen assets including jewelry and documents. Last known location: downtown warehouse district.',
    contact: { name: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-0202', address: '456 Elm St\nNew York, NY 10002' },
    investigationType: 'Asset Recovery',
    incident: { date: '2026-01-20', time: '11:00', location: 'Downtown Warehouse District, New York, NY', description: 'Stolen assets including jewelry and documents.', additionalInfo: 'Last known location: downtown warehouse district.' },
    documents: [
      { name: 'Asset_List.pdf', date: '1/20/2026' },
    ],
    insight: {
      detective: 'Detective Emma Watson',
      datetime: '1/25/2026, 2:00:00 PM',
      submitted: true,
      changesRequested: false,
      adminFeedback: null,
      text: 'Successfully located assets in storage unit #247. Secured items and documented condition. All items match provided inventory list.',
      attachment: 'Asset_Recovery_Report.pdf',
    },
    legalConsent: true,
    created: '1/20/2026',
    insightsSummary: { date: '1/25/2026', text: 'Successfully located assets in storage unit #247. All items match provided inventory list.' },
  },
};

const CaseDetailsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const caseItem = state?.caseItem;
  const data = caseItem ? (CASE_DATA[caseItem.id] || null) : null;
  const [showInsightForm, setShowInsightForm] = useState(false);

  if (!data) {
    return (
      <div className="bg-[#121F27] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No case data found.</p>
          <button onClick={() => navigate(ROUTES.DETECTIVE_DASHBOARD)} className="text-sm text-red-400 underline">Go back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121F27] text-white min-h-screen px-3 sm:px-6 py-4 sm:py-6 pr-3 sm:pr-6">
      {showInsightForm && <InsightFormModal onClose={() => setShowInsightForm(false)} />}

      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <button onClick={() => navigate(ROUTES.DETECTIVE_DASHBOARD)} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-2 sm:mb-0">
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={() => setShowInsightForm(true)} className="flex items-center gap-2 bg-[#dc3545] text-white text-sm font-medium px-4 py-2 rounded-lg">
          <Eye size={15} /> Open Insight Form
        </button>
      </div>

      {/* Case header */}
      <div className="mb-5" style={{ background: '#1C2B35', borderRadius: '0px', padding: '24px', marginBottom: '16px'  }}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-sm text-gray-300 border border-gray-500 rounded px-2 py-1">Case {data.caseNumber}</span>
          <span style={{ background: '#dc3545', borderRadius: '6px', padding: '2px 10px', fontSize: '12px', fontWeight: '600' }}>{data.priority}</span>
          <span className="text-sm text-gray-300 border border-gray-500 rounded px-2 py-1">{data.insightStatus}</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">{data.title}</h1>
        <p className="text-sm text-gray-400">{data.description}</p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT col */}
        <div className="lg:col-span-2">

          {/* Contact Information */}
          <div style={card}>
            <div className="flex items-center gap-2 mb-1">
              <User size={16} className="text-gray-400" />
              <span className="font-semibold text-base">Contact Information</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Client details from investigation request</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p style={lbl}>Full Name</p>
                <p style={val}>{data.contact.name}</p>
              </div>
              <div>
                <p style={lbl}>Email</p>
                <div className="flex items-center gap-1">
                  <Mail size={13} className="text-gray-400" />
                  <p style={val}>{data.contact.email}</p>
                </div>
              </div>
              <div>
                <p style={lbl}>Phone</p>
                <div className="flex items-center gap-1">
                  <Phone size={13} className="text-gray-400" />
                  <p style={val}>{data.contact.phone}</p>
                </div>
              </div>
              <div>
                <p style={lbl}>Address</p>
                <div className="flex items-start gap-1">
                  <Home size={13} className="text-gray-400 mt-0.5" />
                  <p style={{ ...val, whiteSpace: 'pre-line' }}>{data.contact.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investigation Details */}
          <div style={card}>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className="text-gray-400" />
              <span className="font-semibold text-base">Investigation Details</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Type and specifics of the investigation</p>
            <p style={lbl}>Investigation Type</p>
            <span style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '2px 12px', fontSize: '13px', color: '#fff', display: 'inline-block', marginBottom: '16px' }}>{data.investigationType}</span>
            <div style={divider} />
            <p className="text-sm font-semibold mb-3">Incident Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <div>
                <p style={lbl}>Date</p>
                <div className="flex items-center gap-1"><Calendar size={13} className="text-gray-400" /><p style={val}>{data.incident.date}</p></div>
              </div>
              <div>
                <p style={lbl}>Time</p>
                <div className="flex items-center gap-1"><Clock size={13} className="text-gray-400" /><p style={val}>{data.incident.time}</p></div>
              </div>
            </div>
            <p style={lbl}>Location</p>
            <div className="flex items-center gap-1 mb-3"><MapPin size={13} className="text-gray-400" /><p style={val}>{data.incident.location}</p></div>
            <p style={lbl}>Description</p>
            <p style={{ ...val, marginBottom: '12px' }}>{data.incident.description}</p>
            <p style={lbl}>Additional Information</p>
            <p style={val}>{data.incident.additionalInfo}</p>
          </div>

          {/* Case Documents */}
          <div style={card}>
            <p className="font-semibold text-base mb-1">Case Documents</p>
            <p className="text-xs text-gray-400 mb-4">{data.documents.length} file(s) attached</p>
            {data.documents.map((file, i) => (
              <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < data.documents.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-white">{file.name}</p>
                    <p className="text-xs text-gray-400">Uploaded: {file.date}</p>
                  </div>
                </div>
                <Download size={16} className="text-gray-400 cursor-pointer hover:text-white" />
              </div>
            ))}
          </div>

          {/* Detective Insights - simple, left col */}
          <div style={card}>
            <p className="font-semibold text-base mb-1">Detective Insights</p>
            <p className="text-xs text-gray-400 mb-4">Investigation findings and observations</p>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-white">{data.insight.detective}</p>
                <p className="text-xs text-gray-400">{data.insight.datetime}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {data.insight.submitted && (
                  <span className="flex items-center gap-1 text-xs text-gray-300"><CheckCircle size={13} /> Submitted</span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-3">{data.insight.text}</p>
            <p style={lbl}>Attachments:</p>
            <div className="flex items-center gap-2">
              <FileText size={13} className="text-gray-400" />
              <span className="text-sm text-gray-300">{data.insight.attachment}</span>
            </div>
          </div>

          {/* Legal Consent */}
          {data.legalConsent && (
            <div style={card}>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={16} className="text-red-400" />
                <span className="font-semibold text-base">Legal Consent</span>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ background: '#FF4959', borderRadius: '6px', padding: '2px 10px', fontSize: '12px', color: '#fff', fontWeight: '600' }}>Consent Given</span>
                <span className="text-sm text-gray-300">Client has provided legal consent for investigation</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT col */}
        <div>
          {/* Case Summary */}
          <div style={card}>
            <p className="font-semibold text-base mb-4">Case Summary</p>
            {[
              { icon: <FileText size={14} className="text-gray-400" />, label: 'Case Number', value: data.caseNumber },
              { icon: <User size={14} className="text-gray-400" />, label: 'Client', value: data.contact.name },
              { icon: <Calendar size={14} className="text-gray-400" />, label: 'Created', value: data.created },
              { icon: <FileText size={14} className="text-gray-400" />, label: 'Investigation Type', value: data.investigationType },
            ].map((item, i, arr) => (
              <div key={i}>
                <div className="flex items-start gap-2 py-2">
                  {item.icon}
                  <div>
                    <p style={lbl}>{item.label}</p>
                    <p style={val}>{item.value}</p>
                  </div>
                </div>
                {i < arr.length - 1 && <div style={divider} />}
              </div>
            ))}
          </div>

          {/* Insights Summary */}
          <div style={card}>
            <p className="font-semibold text-base mb-1">Insights Summary</p>
            <p className="text-xs text-gray-400 mb-4">1 insight submitted</p>
            <div className="flex items-start gap-2">
              <Calendar size={14} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-1">{data.insightsSummary.date}</p>
                <p className="text-xs text-gray-300">{data.insightsSummary.text}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Full-width Detective Insights with Admin Feedback */}
      {data.insight.adminFeedback && (
        <div style={{ ...card, marginTop: '4px' }}>
          <p className="font-semibold text-base mb-1">Detective Insights</p>
          <p className="text-xs text-gray-400 mb-4">Investigation findings and observations</p>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white">{data.insight.detective}</p>
              <p className="text-xs text-gray-400">{data.insight.datetime}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              {data.insight.submitted && (
                <span className="flex items-center gap-1 text-xs text-gray-300"><CheckCircle size={13} /> Submitted</span>
              )}
              <span style={{ background: '#dc3545', borderRadius: '6px', padding: '2px 10px', fontSize: '11px', color: '#fff' }}>Changes Requested</span>
            </div>
          </div>
          <div style={{ background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.3)', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={15} className="text-red-400" />
              <span className="text-sm font-semibold text-red-400">Admin Feedback</span>
            </div>
            <p className="text-xs text-gray-300 mb-3">{data.insight.adminFeedback.message}</p>
            <p className="text-xs text-gray-400 mb-2">Required Changes:</p>
            {data.insight.adminFeedback.changes.map((item, i) => (
              <div key={i} style={{ background: '#121F27', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px' }}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle size={13} className="text-red-400" />
                  <span className="text-sm font-medium text-white">{item.title}</span>
                </div>
                <p className="text-xs text-gray-300">{item.desc}</p>
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-2">{data.insight.adminFeedback.reviewedBy}</p>
          </div>
          <p className="text-sm text-gray-300 mb-3">{data.insight.text}</p>
          <p style={lbl}>Attachments:</p>
          <div className="flex items-center gap-2">
            <FileText size={13} className="text-gray-400" />
            <span className="text-sm text-gray-300">{data.insight.attachment}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default CaseDetailsPage;
