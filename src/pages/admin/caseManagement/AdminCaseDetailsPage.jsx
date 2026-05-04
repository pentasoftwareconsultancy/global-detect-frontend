import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, FileText, Calendar, Clock, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { ROUTES } from '../../../core/constants/routes.constant';

const card = 'bg-[#1A2832] border border-white/10 rounded-xl p-5 mb-4';
const lbl = 'text-xs text-[#8FA3B0] mb-0.5';
const val = 'text-sm text-white font-medium';

// Extended data per case id
const CASE_DETAILS = {
  C001: {
    caseNumber: '#C001', priority: 'urgent priority', status: 'Insights Submitted',
    title: 'Corporate Embezzlement Investigation',
    description: 'Suspected financial irregularities in company accounts. Need thorough investigation of transactions from the past 6 months.',
    contact: { name: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-0101', address: '123 Main St, New York, NY 10001' },
    investigationType: 'Financial',
    incident: { date: '2026-01-15', time: '09:00', location: '123 Wall Street, New York, NY', description: 'Suspected financial irregularities in company accounts.', additionalInfo: 'Need thorough investigation of transactions from the past 6 months.' },
    documents: [{ name: 'Financial_Records_Q4.pdf', date: '1/15/2026' }, { name: 'Bank_Statements.xlsx', date: '1/15/2026' }],
    legalConsent: true,
    created: '1/5/2026',
    detective: { name: 'Detective Emma Watson', specialization: 'Corporate Fraud', location: '123 Wall Street, New York, NY', locationUpdated: '9:30:00 AM' },
    insight: { detective: 'Detective Emma Watson', datetime: '1/28/2026, 4:30:00 PM', submitted: true, text: 'Initial investigation reveals suspicious wire transfers totaling $250,000 to offshore accounts. Found discrepancies in ledger entries during October-December period. Recommend forensic accounting audit.', attachment: 'Investigation_Report_Draft.pdf' },
  },
  C002: {
    caseNumber: '#C002', priority: 'medium', status: 'In Progress',
    title: 'Background Check Investigation',
    description: 'Comprehensive background check required for corporate executive.',
    contact: { name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1-555-0102', address: '456 Elm St, Los Angeles, CA 90001' },
    investigationType: 'Background Check',
    incident: { date: '2026-01-20', time: '10:00', location: 'Los Angeles, CA', description: 'Background check for corporate executive.', additionalInfo: 'Requires full employment and criminal history.' },
    documents: [{ name: 'Request_Form.pdf', date: '1/20/2026' }],
    legalConsent: true,
    created: '1/20/2026',
    detective: { name: 'Detective James Bond', specialization: 'Personal Investigation', location: '456 Elm St, Los Angeles, CA', locationUpdated: '10:00:00 AM' },
    insight: null,
  },
  C003: {
    caseNumber: '#C003', priority: 'high', status: 'Report Ready',
    title: 'Asset Recovery Investigation',
    description: 'Locate and recover stolen assets including jewelry and documents.',
    contact: { name: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-0101', address: '123 Main St, New York, NY 10001' },
    investigationType: 'Asset Recovery',
    incident: { date: '2026-01-10', time: '11:00', location: 'Downtown Warehouse District, NY', description: 'Stolen assets including jewelry and documents.', additionalInfo: 'Last known location: downtown warehouse district.' },
    documents: [{ name: 'Asset_List.pdf', date: '1/10/2026' }],
    legalConsent: true,
    created: '1/10/2026',
    detective: { name: 'Detective Emma Watson', specialization: 'Corporate Fraud', location: 'Downtown Warehouse, NY', locationUpdated: '11:00:00 AM' },
    insight: { detective: 'Detective Emma Watson', datetime: '1/25/2026, 2:00:00 PM', submitted: true, text: 'Successfully located assets in storage unit #247. All items match provided inventory list.', attachment: 'Asset_Recovery_Report.pdf' },
  },
  C004: {
    caseNumber: '#C004', priority: 'medium', status: 'Pending',
    title: 'Insurance Fraud Investigation',
    description: 'Suspected fraudulent insurance claim investigation.',
    contact: { name: 'Michael Chen', email: 'michael.chen@email.com', phone: '+1-555-0103', address: '789 Oak Ave, Chicago, IL 60601' },
    investigationType: 'Insurance Fraud',
    incident: { date: '2026-01-25', time: '14:00', location: 'Chicago, IL', description: 'Suspected fraudulent insurance claim.', additionalInfo: 'Claim filed after alleged vehicle theft.' },
    documents: [{ name: 'Insurance_Claim.pdf', date: '1/25/2026' }],
    legalConsent: true,
    created: '1/25/2026',
    detective: null,
    insight: null,
  },
  C005: {
    caseNumber: '#C005', priority: 'urgent priority', status: 'Assigned',
    title: 'Missing Person Investigation',
    description: 'Locate individual who has been missing for 3 days. Last seen at downtown metro station.',
    contact: { name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1-555-0102', address: '456 Elm St, Los Angeles, CA 90001' },
    investigationType: 'Missing Person',
    incident: { date: '2026-01-30', time: '08:00', location: 'Downtown metro station', description: 'Locate individual who has been missing for 3 days. Last seen at downtown metro station.', additionalInfo: 'Last seen at downtown metro station.' },
    documents: [{ name: 'Missing_Person_Details.pdf', date: '1/30/2026' }],
    legalConsent: true,
    created: '1/30/2026',
    detective: { name: 'Detective Olivia Martinez', specialization: 'Missing Persons', location: '789 Michigan Ave, Chicago, IL', locationUpdated: '9:40:00 AM' },
    insight: null,
  },
  C006: {
    caseNumber: '#C006', priority: 'high', status: 'Pending',
    title: 'Workplace Investigation',
    description: 'Internal workplace misconduct investigation.',
    contact: { name: 'Emily Davis', email: 'emily.davis@email.com', phone: '+1-555-0104', address: '321 Pine St, Houston, TX 77001' },
    investigationType: 'Workplace Investigation',
    incident: { date: '2026-02-05', time: '09:00', location: 'Houston, TX', description: 'Internal workplace misconduct.', additionalInfo: 'Multiple employee complaints filed.' },
    documents: [{ name: 'Complaint_Form.pdf', date: '2/5/2026' }],
    legalConsent: true,
    created: '2/5/2026',
    detective: null,
    insight: null,
  },
  C007: {
    caseNumber: '#C007', priority: 'urgent', status: 'Pending',
    title: 'Corporate Investigation',
    description: 'Corporate espionage and data theft investigation.',
    contact: { name: 'David Brown', email: 'david.brown@email.com', phone: '+1-555-0105', address: '654 Maple Dr, Seattle, WA 98101' },
    investigationType: 'Corporate Investigation',
    incident: { date: '2026-02-04', time: '10:00', location: 'Seattle, WA', description: 'Corporate espionage and data theft.', additionalInfo: 'Sensitive data leaked to competitor.' },
    documents: [{ name: 'Incident_Report.pdf', date: '2/4/2026' }],
    legalConsent: true,
    created: '2/4/2026',
    detective: null,
    insight: null,
  },
  C008: {
    caseNumber: '#C008', priority: 'medium', status: 'Pending',
    title: 'Personal Investigation',
    description: 'Personal background and activity investigation.',
    contact: { name: 'Emily Davis', email: 'emily.davis@email.com', phone: '+1-555-0104', address: '321 Pine St, Houston, TX 77001' },
    investigationType: 'Personal Investigation',
    incident: { date: '2026-02-08', time: '11:00', location: 'Houston, TX', description: 'Personal background and activity investigation.', additionalInfo: 'Client suspects infidelity.' },
    documents: [{ name: 'Request_Form.pdf', date: '2/8/2026' }],
    legalConsent: true,
    created: '2/8/2026',
    detective: null,
    insight: null,
  },
};

const priorityStyle = {
  'urgent priority': 'bg-red-500/20 text-red-400 border border-red-500/30',
  urgent:            'bg-red-500/20 text-red-400 border border-red-500/30',
  high:              'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  medium:            'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30',
};

const statusStyle = {
  'Insights Submitted': 'bg-yellow-400/20 text-yellow-300',
  'Report Ready':       'bg-green-500/20 text-green-300',
  'In Progress':        'bg-purple-500/20 text-purple-300',
  'Assigned':           'bg-blue-500/20 text-blue-300',
  'Pending':            'bg-gray-500/20 text-gray-300',
};

const AdminCaseDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const caseItem = state?.caseItem;
  const data = caseItem ? (CASE_DETAILS[caseItem.id] || null) : null;

  if (!data) return (
    <div className="bg-[#121F27] text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 mb-4">No case data found.</p>
        <button onClick={() => navigate(ROUTES.ADMIN_ALL_CASE_MANAGEMENT)} className="text-sm text-red-400 underline">Back to Cases</button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#121F27] text-white min-h-screen px-4 sm:px-6 py-5 font-[Montserrat]">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-[#8FA3B0] hover:text-white transition">
          <ArrowLeft size={15} /> Back
        </button>
        <button className="flex items-center gap-2 bg-[#dc3545] hover:bg-[#b82231] text-white text-xs font-semibold px-4 py-2 rounded-lg transition">
          Add Payment details
        </button>
      </div>

      {/* Case header */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs text-[#8FA3B0] border border-white/20 rounded px-2 py-1">Case {data.caseNumber}</span>
          <span className={`text-xs px-2 py-1 rounded font-semibold ${priorityStyle[data.priority] || 'bg-gray-500/20 text-gray-300'}`}>{data.priority}</span>
          <span className={`text-xs px-2 py-1 rounded ${statusStyle[data.status] || 'bg-gray-500/20 text-gray-300'}`}>{data.status}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">{data.title}</h1>
        <p className="text-sm text-[#8FA3B0]">{data.description}</p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT */}
        <div className="lg:col-span-2">

          {/* Contact Information */}
          <div className={card}>
            <div className="flex items-center gap-2 mb-1">
              <User size={15} className="text-white" />
              <p className="text-sm font-semibold text-white">Contact Information</p>
            </div>
            <p className="text-xs text-[#8FA3B0] mb-4">Client details from investigation request</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className={lbl}>Full Name</p>
                <p className={val}>{data.contact.name}</p>
              </div>
              <div>
                <p className={lbl}>Email</p>
                <p className={`${val} flex items-center gap-1`}><Mail size={12} className="text-white" />{data.contact.email}</p>
              </div>
              <div>
                <p className={lbl}>Phone</p>
                <p className={`${val} flex items-center gap-1`}><Phone size={12} className="text-white" />{data.contact.phone}</p>
              </div>
              <div>
                <p className={lbl}>Address</p>
                <p className={`${val} flex items-start gap-1`}><MapPin size={12} className="text-white mt-0.5 flex-shrink-0" />{data.contact.address}</p>
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
            <p className={lbl}>Investigation Type</p>
            <span className="inline-block text-xs border border-white/20 rounded px-3 py-1 text-white mb-4">{data.investigationType}</span>
            <div className="border-t border-white/5 pt-4">
              <p className="text-sm font-semibold text-white mb-3">Incident Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <p className={lbl}>Date</p>
                  <p className={`${val} flex items-center gap-1`}><Calendar size={12} className="text-white" />{data.incident.date}</p>
                </div>
                <div>
                  <p className={lbl}>Time</p>
                  <p className={`${val} flex items-center gap-1`}><Clock size={12} className="text-white" />{data.incident.time}</p>
                </div>
              </div>
              <p className={lbl}>Location</p>
              <p className={`${val} flex items-center gap-1 mb-3`}><MapPin size={12} className="text-white" />{data.incident.location}</p>
              <p className={lbl}>Description</p>
              <p className={`${val} mb-3`}>{data.incident.description}</p>
              <p className={lbl}>Additional Information</p>
              <p className={val}>{data.incident.additionalInfo}</p>
            </div>
          </div>

          {/* Case Documents */}
          <div className={card}>
            <p className="text-sm font-semibold text-white mb-1">Case Documents</p>
            <p className="text-xs text-[#8FA3B0] mb-4">{data.documents.length} file(s) attached</p>
            {data.documents.map((doc, i) => (
              <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < data.documents.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
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
          {data.legalConsent && (
            <div className={card}>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={15} className="text-red-400" />
                <p className="text-sm font-semibold text-white">Legal Consent</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-[#dc3545] text-white px-3 py-1 rounded font-semibold">Consent Given</span>
                <span className="text-sm text-[#8FA3B0]">Client has provided legal consent for investigation</span>
              </div>
            </div>
          )}

          {/* Detective Insights */}
          {data.insight && (
            <div>
              <p className="text-sm font-semibold text-white mb-3">Detective Insights</p>
              <div className={card}>
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={15} className="text-[#8FA3B0]" />
                  <p className="text-sm font-semibold text-white">Investigation Details</p>
                </div>
                <p className="text-xs text-[#8FA3B0] mb-4">Type and specifics of the investigation</p>
                <p className={lbl}>Investigation Type</p>
                <span className="inline-block text-xs border border-white/20 rounded px-3 py-1 text-white mb-4">{data.investigationType}</span>
                <div className="border-t border-white/5 pt-4">
                  <p className="text-sm font-semibold text-white mb-3">Incident Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className={lbl}>Date</p>
                      <p className={`${val} flex items-center gap-1`}><Calendar size={12} className="text-[#8FA3B0]" />{data.incident.date}</p>
                    </div>
                    <div>
                      <p className={lbl}>Time</p>
                      <p className={`${val} flex items-center gap-1`}><Clock size={12} className="text-[#8FA3B0]" />{data.incident.time}</p>
                    </div>
                  </div>
                  <p className={lbl}>Location</p>
                  <p className={`${val} flex items-center gap-1 mb-3`}><MapPin size={12} className="text-[#8FA3B0]" />{data.incident.location}</p>
                  <p className={lbl}>Description</p>
                  <p className={`${val} mb-3`}>{data.incident.description}</p>
                  <p className={lbl}>Additional Information</p>
                  <p className={val}>{data.incident.additionalInfo}</p>
                </div>
              </div>

              {/* Case Documents (insight section) */}
              <div className={card}>
                <p className="text-sm font-semibold text-white mb-1">Case Documents</p>
                <p className="text-xs text-[#8FA3B0] mb-4">{data.documents.length} file(s) attached</p>
                {data.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < data.documents.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
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

              {/* Detective Insights card */}
              <div className={card}>
                <p className="text-sm font-semibold text-white mb-1">Detective Insights</p>
                <p className="text-xs text-[#8FA3B0] mb-4">Investigation findings and observations</p>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{data.insight.detective}</p>
                    <p className="text-xs text-[#8FA3B0]">{data.insight.datetime}</p>
                  </div>
                  {data.insight.submitted && (
                    <span className="flex items-center gap-1 text-xs text-[#8FA3B0]"><CheckCircle size={12} /> Submitted</span>
                  )}
                </div>
                <p className="text-sm text-[#8FA3B0] mb-3">{data.insight.text}</p>
                <p className="text-xs text-[#8FA3B0] mb-1">Attachments:</p>
                <div className="flex items-center gap-2">
                  <FileText size={13} className="text-[#8FA3B0]" />
                  <span className="text-sm text-white">{data.insight.attachment}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div>
          {/* Case Summary */}
          <div className={card}>
            <p className="text-sm font-semibold text-white mb-4">Case Summary</p>
            {[
              { icon: <FileText size={13} className="text-[#8FA3B0]" />, label: 'Case Number', value: data.caseNumber },
              { icon: <User size={13} className="text-[#8FA3B0]" />,     label: 'Client',      value: data.contact.name },
              { icon: <Calendar size={13} className="text-[#8FA3B0]" />, label: 'Created',     value: data.created },
              { icon: <FileText size={13} className="text-[#8FA3B0]" />, label: 'Investigation Type', value: data.investigationType },
            ].map((item, i, arr) => (
              <div key={i}>
                <div className="flex items-start gap-2 py-2">
                  {item.icon}
                  <div>
                    <p className={lbl}>{item.label}</p>
                    <p className={val}>{item.value}</p>
                  </div>
                </div>
                {i < arr.length - 1 && <div className="border-t border-white/5" />}
              </div>
            ))}
          </div>

          {/* Assigned Detective */}
          {data.detective && (
            <div className={card}>
              <p className="text-sm font-semibold text-white mb-4">Assigned Detective</p>
              <p className="text-sm font-bold text-white">{data.detective.name}</p>
              <p className="text-xs text-[#8FA3B0] mb-3">{data.detective.specialization}</p>
              <div className="flex items-start gap-1">
                <MapPin size={13} className="text-[#dc3545] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white">Current Location</p>
                  <p className="text-xs text-[#8FA3B0]">{data.detective.location}</p>
                  <p className="text-xs text-[#8FA3B0]">Updated: {data.detective.locationUpdated}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminCaseDetailsPage;
