import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, FileText, Calendar, Clock, AlertCircle, CheckCircle, Download, X, Receipt, Search } from 'lucide-react';
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import { ROUTES } from '../../../core/constants/routes.constant';
import adminCaseService from '../../../core/services/adminCase.service';
import { toast } from 'react-toastify';

const card = 'bg-[#1A2832] border border-white/10 rounded-xl p-5 mb-4';
const lbl = 'text-xs text-[#8FA3B0] mb-0.5';
const val = 'text-sm text-white font-medium';

const priorityStyle = {
  'urgent priority': 'bg-red-500/20 text-red-400 border border-red-500/30',
  urgent:            'bg-red-500/20 text-red-400 border border-red-500/30',
  high:              'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  medium:            'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30',
  low:               'bg-green-500/20 text-green-300 border border-green-500/30',
};

const statusStyle = {
  'Insights Submitted': 'bg-yellow-400/20 text-yellow-300',
  'Report Ready':       'bg-green-500/20 text-green-300',
  'In Progress':        'bg-purple-500/20 text-purple-300',
  'Assigned':           'bg-blue-500/20 text-blue-300',
  'Pending':            'bg-gray-500/20 text-gray-300',
  'Submitted':          'bg-blue-500/20 text-blue-300',
  'Draft':              'bg-gray-500/20 text-gray-300',
};

const PaymentModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
    <div className="bg-[#1A2832] rounded-2xl w-full max-w-2xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
      <button onClick={onClose} className="absolute top-4 right-4 text-[#8FA3B0] hover:text-white"><X size={16} /></button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Receipt size={18} className="text-[#dc3545]" />
        <h2 className="text-lg font-bold text-white">Payment Details</h2>
      </div>
      <p className="text-xs text-[#8FA3B0] mb-6">Unless and until you don't make 50% of payment case will not be started.</p>

      {/* Payment Breakdown */}
      <p className="text-sm text-white mb-3">Payment Breakdown</p>
      <div className="space-y-3">
        {[
          { label: 'Total payment as per your case studied', amount: '1,00,000/-', bold: true },
          { label: 'Detective charge', amount: '70,000/-', bold: false },
          { label: 'Platform Charge', amount: '30,000/-', bold: false },
        ].map(({ label, amount, bold }) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <div className={`flex-1 border border-white/20 rounded-lg px-4 py-3 text-sm ${bold ? 'font-bold text-white' : 'text-white'}`}>{label}</div>
            <div className={`w-36 border border-white/20 rounded-lg px-4 py-3 text-sm text-right ${bold ? 'font-bold text-white' : 'text-white'}`}>{amount}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 my-4" />

      {/* Total to pay now */}
      <div className="flex items-center justify-between gap-4 bg-[#FF495917]">
        <div className="flex-1 border border-white/20 rounded-lg px-4 py-3 text-sm font-bold text-white">Total payment to pay now (50%)</div>
        <div className="w-36 border border-white/20 rounded-lg px-4 py-3 text-sm font-bold text-white text-right">50,000/-</div>
      </div>
      <p className="text-xs text-[#8FA3B0] mt-2 mb-6">50% payment should be paid now to start your Case</p>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="border border-white/20 text-white text-sm px-5 py-2 rounded-lg hover:bg-white/5 transition">Cancel</button>
        <button onClick={onClose} className="bg-[#dc3545] hover:bg-[#b82231] text-white text-sm font-semibold px-6 py-2 rounded-lg transition">Send</button>
      </div>
    </div>
  </div>
);

const AdminCaseDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [caseData, setCaseData] = useState(null);
  const [availableDetectives, setAvailableDetectives] = useState([]);
  const [selectedDetective, setSelectedDetective] = useState("");
  const [detectiveSearch, setDetectiveSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  
  const caseItem = state?.caseItem;

  // Fetch case details from backend
  useEffect(() => {
    const fetchCaseDetails = async () => {
      if (!caseItem?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await adminCaseService.getCaseById(caseItem.id);
        if (response.success) {
          setCaseData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch case details:', error);
        toast.error('Failed to load case details');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseItem?.id]);

  // Fetch available detectives
  useEffect(() => {
    const fetchAvailableDetectives = async () => {
      try {
        // Check cache first (valid for 5 minutes)
        const cachedDetectives = sessionStorage.getItem('availableDetectives');
        const cacheTimestamp = sessionStorage.getItem('availableDetectives_timestamp');
        
        if (cachedDetectives && cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp);
          if (age < 300000) { // 5 minutes
            setAvailableDetectives(JSON.parse(cachedDetectives));
            return;
          }
        }

        const response = await adminCaseService.getAvailableDetectives();
        if (response.success) {
          const detectives = response.data || [];
          setAvailableDetectives(detectives);
          
          // Cache the detectives list
          sessionStorage.setItem('availableDetectives', JSON.stringify(detectives));
          sessionStorage.setItem('availableDetectives_timestamp', Date.now().toString());
        }
      } catch (error) {
        console.error('Failed to fetch detectives:', error);
      }
    };

    fetchAvailableDetectives();
  }, []);

  // Handle assign detective
  const handleAssignDetective = async () => {
    if (!caseData || !selectedDetective) return;

    try {
      setActionLoading(true);
      const response = await adminCaseService.assignDetective(caseData.id, selectedDetective);
      if (response.success) {
        // Clear cache
        sessionStorage.removeItem('dashboardData');
        sessionStorage.removeItem('dashboardDataTimestamp');
        const keys = Object.keys(sessionStorage);
        keys.forEach(key => {
          if (key.startsWith('caseManagement_')) {
            sessionStorage.removeItem(key);
          }
        });

        // Refresh case data
        const updatedCase = await adminCaseService.getCaseById(caseData.id);
        if (updatedCase.success) {
          setCaseData(updatedCase.data);
        }

        setShowAssignModal(false);
        setSelectedDetective("");
        setDetectiveSearch("");
        toast.success('Detective assigned successfully!');
      }
    } catch (error) {
      console.error('Failed to assign detective:', error);
      toast.error(error.response?.data?.message || 'Failed to assign detective. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filter detectives based on search
  const filteredDetectives = availableDetectives.filter(detective => 
    detective.name.toLowerCase().includes(detectiveSearch.toLowerCase()) ||
    detective.email.toLowerCase().includes(detectiveSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-[#121F27] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="bg-[#121F27] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No case data found.</p>
          <button onClick={() => navigate(ROUTES.ADMIN_CASE_MANAGEMENT)} className="text-sm text-red-400 underline">Back to Cases</button>
        </div>
      </div>
    );
  }

  const data = caseData;

  return (
    <div className=" text-white min-h-screen px-4 sm:px-6 py-5 font-[Montserrat]">
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}

      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-[#8FA3B0] hover:text-white transition w-fit">
          <ArrowLeft size={15} /> Back
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          {!caseData?.detectiveInfo && (
            <button
              onClick={() => setShowAssignModal(true)}
              className="flex items-center gap-2 bg-[#dc3545] hover:bg-[#b82231] text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              <MdOutlinePersonAddAlt size={16} />
              Assign Detective
            </button>
          )}
          {/* Show Add Payment details button only if detective is assigned */}
          {caseData?.detectiveInfo && (
            <button 
              onClick={() => setShowPayment(true)} 
              className="flex items-center gap-2 bg-[#dc3545] hover:bg-[#b82231] text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              Add Payment details
            </button>
          )}
        </div>
      </div>

      {/* Case header */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs text-[#8FA3B0] border border-white/20 rounded px-2 py-1">Case {data.caseId}</span>
          <span className={`text-xs px-2 py-1 rounded font-semibold ${priorityStyle[data.priority] || 'bg-gray-500/20 text-gray-300'}`}>{data.priority}</span>
          <span className={`text-xs px-2 py-1 rounded ${statusStyle[data.statusLabel] || 'bg-gray-500/20 text-gray-300'}`}>{data.statusLabel}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">{data.investigationDetails?.purpose || 'Investigation Case'}</h1>
        <p className="text-sm text-[#8FA3B0]">{data.investigationDetails?.caseDescription || 'Case investigation in progress'}</p>
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
                <p className={val}>{data.contactInformation?.fullName || 'N/A'}</p>
              </div>
              <div>
                <p className={lbl}>Email</p>
                <p className={`${val} flex items-center gap-1`}><Mail size={12} className="text-white" />{data.contactInformation?.email || 'N/A'}</p>
              </div>
              <div>
                <p className={lbl}>Phone</p>
                <p className={`${val} flex items-center gap-1`}><Phone size={12} className="text-white" />{data.contactInformation?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className={lbl}>Address</p>
                <p className={`${val} flex items-start gap-1`}>
                  <MapPin size={12} className="text-white mt-0.5 flex-shrink-0" />
                  {data.contactInformation?.address || 'N/A'}, {data.contactInformation?.city || ''}, {data.contactInformation?.state || ''}
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
            <p className={lbl}>Investigation Type</p>
            <span className="inline-block text-xs border border-white/20 rounded px-3 py-1 text-white mb-4">{data.investigationDetails?.type || 'General'}</span>
            <div className="border-t border-white/5 pt-4">
              <p className="text-sm font-semibold text-white mb-3">Investigation Purpose</p>
              <p className={`${val} mb-3`}>{data.investigationDetails?.purpose || 'N/A'}</p>
              
              {data.investigationDetails?.specificQuestions && (
                <>
                  <p className={lbl}>Specific Questions</p>
                  <p className={`${val} mb-3`}>{data.investigationDetails.specificQuestions}</p>
                </>
              )}
              
              {data.investigationDetails?.expectedOutcome && (
                <>
                  <p className={lbl}>Expected Outcome</p>
                  <p className={val}>{data.investigationDetails.expectedOutcome}</p>
                </>
              )}
              
              {data.locationInformation && (
                <>
                  <p className={lbl}>Location</p>
                  <p className={`${val} flex items-center gap-1 mb-3`}>
                    <MapPin size={12} className="text-white" />
                    {data.locationInformation.address || ''}, {data.locationInformation.city || ''}, {data.locationInformation.state || ''}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Case Documents */}
          <div className={card}>
            <p className="text-sm font-semibold text-white mb-1">Case Documents</p>
            <p className="text-xs text-[#8FA3B0] mb-4">{data.documentCount || 0} file(s) attached</p>
            {data.caseDocuments && data.caseDocuments.length > 0 ? (
              data.caseDocuments.map((doc, i) => (
                <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < data.caseDocuments.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div className="flex items-center gap-3">
                    <FileText size={15} className="text-[#8FA3B0]" />
                    <div>
                      <p className="text-sm text-white">{doc.name}</p>
                      <p className="text-xs text-[#8FA3B0]">Uploaded: {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'N/A'} • {doc.size}</p>
                    </div>
                  </div>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <Download size={15} className="text-[#8FA3B0] cursor-pointer hover:text-white" />
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#8FA3B0]">No documents attached</p>
            )}
          </div>

          {/* Legal Consent */}
          {data.legalConsent?.agreementConfirmed && (
            <div className={card}>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={15} className="text-red-400" />
                <p className="text-sm font-semibold text-white">Legal Consent</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-[#dc3545] text-white px-3 py-1 rounded font-semibold">{data.legalConsent.status}</span>
                <span className="text-sm text-[#8FA3B0]">Client has provided legal consent for investigation</span>
              </div>
            </div>
          )}

          {/* Detective Insights */}
          {data.investigationInsights && (
            <div className={card}>
              <p className="text-sm font-semibold text-white mb-1">Detective Insights</p>
              <p className="text-xs text-[#8FA3B0] mb-4">Investigation findings and observations</p>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-white">{data.detectiveInfo?.name || 'Detective'}</p>
                  <p className="text-xs text-[#8FA3B0]">{data.insightsSubmittedAt ? new Date(data.insightsSubmittedAt).toLocaleString() : 'N/A'}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-[#8FA3B0]"><CheckCircle size={12} /> Submitted</span>
              </div>
              <p className="text-sm text-[#8FA3B0] mb-3">{data.investigationInsights}</p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div>
          {/* Case Summary */}
          <div className={card}>
            <p className="text-sm font-semibold text-white mb-4">Case Summary</p>
            {[
              { icon: <FileText size={13} className="text-[#8FA3B0]" />, label: 'Case Number', value: data.caseId },
              { icon: <User size={13} className="text-[#8FA3B0]" />,     label: 'Client',      value: data.clientInfo?.name || 'N/A' },
              { icon: <Calendar size={13} className="text-[#8FA3B0]" />, label: 'Created',     value: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'N/A' },
              { icon: <FileText size={13} className="text-[#8FA3B0]" />, label: 'Investigation Type', value: data.investigationDetails?.type || 'General' },
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
          {data.detectiveInfo && (
            <div className={card}>
              <p className="text-sm font-semibold text-white mb-4">Assigned Detective</p>
              <p className="text-sm font-bold text-white">{data.detectiveInfo.name}</p>
              <p className="text-xs text-[#8FA3B0] mb-3">{data.detectiveInfo.email}</p>
              {data.detectiveInfo.phone && (
                <p className="text-xs text-white mb-3">Phone: {data.detectiveInfo.phone}</p>
              )}
            </div>
          )}
        </div>

      </div>

      {/* ASSIGN DETECTIVE MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-4xl bg-[#1e2d35] rounded-2xl p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAssignModal(false);
                setSelectedDetective("");
                setDetectiveSearch("");
              }}
              className="absolute top-6 right-6 text-[#8FA3B0] hover:text-white transition"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Assign Detective to Case</h2>
              <p className="text-sm text-[#8FA3B0]">
                Select a detective to assign to this case
              </p>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <div className="flex items-center bg-[#0f1a1f] border border-[#2a3a44] rounded-lg px-4 py-3">
                <Search size={18} className="text-[#8FA3B0] mr-3" />
                <input
                  type="text"
                  value={detectiveSearch}
                  onChange={(e) => setDetectiveSearch(e.target.value)}
                  placeholder="Search detective"
                  className="bg-transparent outline-none w-full text-sm text-white placeholder-[#8FA3B0]"
                />
              </div>
            </div>

            {/* Detective Grid */}
            <div className="mb-6">
              {filteredDetectives.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#8FA3B0]">
                  No detectives found
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto pr-2">
                  {filteredDetectives.map((detective) => (
                    <div
                      key={detective.id}
                      onClick={() => setSelectedDetective(detective.id)}
                      className={`p-4 rounded-lg cursor-pointer transition border-2 ${
                        selectedDetective === detective.id
                          ? 'bg-[#2a3a44] border-[#dc3545]'
                          : 'bg-[#1a2832] border-[#2a3a44] hover:border-[#3a4a54]'
                      }`}
                    >
                      <p className="text-base text-white font-medium mb-1">
                        {detective.name}
                      </p>
                      {detective.email && (
                        <p className="text-xs text-[#8FA3B0]">{detective.email}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedDetective("");
                  setDetectiveSearch("");
                }}
                disabled={actionLoading}
                className="px-6 py-2.5 border border-[#3a4a54] rounded-lg text-sm text-white hover:bg-[#2a3a44] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignDetective}
                disabled={!selectedDetective || actionLoading}
                className="px-6 py-2.5 bg-[#dc3545] hover:bg-[#b82231] rounded-lg text-sm text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {actionLoading ? 'Assigning...' : 'Assign Case'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCaseDetailsPage;
 