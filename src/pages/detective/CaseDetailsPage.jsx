import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, FileText, Download, Calendar, Clock, MapPin, User, Mail, Phone, Home, AlertCircle, CheckCircle } from 'lucide-react';
import { ROUTES } from '../../core/constants/routes.constant';
import InsightFormModal from '../../components/detective/InsightFormModal';
import * as detectiveDashboardService from '../../core/services/detectiveDashboard.service';
import { toast } from 'react-toastify';
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";

const card = { background: '#1C2B35', borderRadius: '14px', padding: 'clamp(14px, 4vw, 24px)', marginBottom: '16px' , border: '1px solid rgba(255,255,255,0.08)' };
const lbl = { fontSize: '12px', color: '#9ca3af', marginBottom: '2px' };
const val = { fontSize: '14px', color: '#ffffff', fontWeight: '500' };
const divider = { borderBottom: '1px solid rgba(255,255,255,0.08)', margin: '6px 0' };

// Helper function to parse admin feedback
const parseAdminFeedback = (feedback) => {
  if (!feedback) return null;
  
  try {
    const parsed = JSON.parse(feedback);
    
    // Check if it's a comprehensive report (has both detective insights and admin report)
    if (parsed.detectiveInsights && parsed.adminReport) {
      return null; // This is a final report, not admin feedback
    }
    
    // Check if it's detective insights (has status, summary, etc.)
    if (parsed.status || parsed.summary || parsed.keyFindings) {
      return null; // This is detective insights, not admin feedback
    }
    
    // Check if it's structured admin feedback
    if (parsed.message || parsed.changes || parsed.reviewedBy) {
      return parsed; // This is admin feedback
    }
    
    return null;
  } catch (e) {
    // Not JSON, check if it's plain text admin feedback
    if (typeof feedback === 'string' && feedback.trim().length > 0) {
      // If it looks like plain text feedback (not JSON), return it
      return {
        message: feedback,
        changes: [],
        reviewedBy: null
      };
    }
    return null;
  }
};

const CaseDetailsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const caseId = state?.caseId;
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInsightForm, setShowInsightForm] = useState(false);

  useEffect(() => {
    if (caseId) {
      fetchCaseDetails();
    } else {
      setLoading(false);
    }
  }, [caseId]);

  const fetchCaseDetails = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const response = await detectiveDashboardService.getCaseDetails(caseId);
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
      if (!silent) toast.error('Failed to load case details');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#121F27] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Loading case details...</p>
        </div>
      </div>
    );
  }

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

  // Parse admin feedback
  const adminFeedback = parseAdminFeedback(data.adminFeedback);
  
  // Debug logging
  console.log('=== Admin Feedback Debug ===');
  console.log('Raw adminFeedback:', data.adminFeedback);
  console.log('Parsed adminFeedback:', adminFeedback);
  console.log('Type:', typeof data.adminFeedback);

  return (
    <div className="bg-[#121F27] text-white min-h-screen px-3 sm:px-6 py-4 sm:py-6 pr-3 sm:pr-6 montserrat">
      {showInsightForm && (
        <InsightFormModal 
          onClose={() => setShowInsightForm(false)} 
          caseId={caseId}
          onSuccess={fetchCaseDetails}
        />
      )}

      {/* Case header */}
      <div className="mb-5" style={{ background: '#1C2B35', borderRadius: '0px', padding: 'clamp(14px, 4vw, 24px)', marginBottom: '16px' , border: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <button onClick={() => navigate(ROUTES.DETECTIVE_DASHBOARD)} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={() => setShowInsightForm(true)} className="flex items-center gap-2 bg-[#dc3545] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#b82231] transition">
            <Eye size={15} /> Open Insight Form
          </button>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-sm text-gray-300 border border-gray-500 rounded px-2 py-1">Case {data.caseNumber || 'N/A'}</span>
          <span style={{ background: '#dc3545', borderRadius: '6px', padding: '2px 10px', fontSize: '12px', fontWeight: '600' }}>{data.priority || 'N/A'}</span>
          <span className="text-sm text-gray-300 border border-gray-500 rounded px-2 py-1">{data.status || 'N/A'}</span>
        </div>
        <h1 className="text-lg sm:text-2xl font-bold text-white mb-1 break-words">{data.title || 'Investigation Case'}</h1>
        <p className="text-sm text-gray-400">{data.description || 'Case investigation in progress'}</p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT col */}
        <div className="lg:col-span-2">

          {/* Contact Information */}
          <div style={card}>
            <div className="flex items-center gap-2 mb-1">
              <User size={16} className="white" />
              <span className="font-semibold text-base">Contact Information</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Client details from investigation request</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p style={lbl}>Full Name</p>
                <p style={val}>{data.client?.name || 'N/A'}</p>
              </div>
              <div>
                <p style={lbl}>Email</p>
                <div className="flex items-center gap-1">
                  <Mail size={13} className="white" />
                  <p style={val}>{data.client?.email || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p style={lbl}>Phone</p>
                <div className="flex items-center gap-1">
                  <Phone size={13} className="text-white" />
                  <p style={val}>{data.client?.phone || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p style={lbl}>Address</p>
                <div className="flex items-start gap-1">
                  <Home size={13} className="text-white mt-0.5" />
                  <p style={{ ...val, whiteSpace: 'pre-line' }}>
                    {data.client?.address || 'N/A'}
                    {data.client?.city && `, ${data.client.city}`}
                    {data.client?.state && `, ${data.client.state}`}
                    {data.client?.country && `, ${data.client.country}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Investigation Details */}
          <div style={card}>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className="text-white" />
              <span className="font-semibold text-base">Investigation Details</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Type and specifics of the investigation</p>
            <p style={lbl}>Investigation Type</p>
            <span style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', padding: '2px 12px', fontSize: '13px', color: '#fff', display: 'inline-block', marginBottom: '16px' }}>
              {data.investigation?.type || 'N/A'}
            </span>
            <div style={divider} />
            <p className="text-sm font-semibold mb-3">Investigation Purpose</p>
            <p style={{ ...val, marginBottom: '12px' }}>{data.investigation?.purpose || 'N/A'}</p>
            {data.investigation?.specificQuestions && (
              <>
                <p style={lbl}>Specific Questions</p>
                <p style={{ ...val, marginBottom: '12px' }}>{data.investigation.specificQuestions}</p>
              </>
            )}
            {data.investigation?.expectedOutcome && (
              <>
                <p style={lbl}>Expected Outcome</p>
                <p style={val}>{data.investigation.expectedOutcome}</p>
              </>
            )}
            {data.location && (
              <>
                <div style={divider} />
                <p className="text-sm font-semibold mb-3">Location Information</p>
                <p style={lbl}>Investigation Location</p>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin size={13} className="text-gray-400" />
                  <p style={val}>
                    {data.location.address || ''}
                    {data.location.city && `, ${data.location.city}`}
                    {data.location.state && `, ${data.location.state}`}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Case Documents */}
          <div style={card}>
            <p className="font-semibold text-base mb-1">Case Documents</p>
            <p className="text-xs text-gray-400 mb-4">{data.evidence?.length || 0} file(s) attached</p>
            {data.evidence && data.evidence.length > 0 ? (
              data.evidence.map((file, i) => (
                <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < data.evidence.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-white">{file.name}</p>
                      <p className="text-xs text-gray-400">
                        {file.type && `Type: ${file.type} • `}
                        {file.size && `Size: ${file.size}`}
                      </p>
                    </div>
                  </div>
                  {file.url && (
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      <Download size={16} className="text-gray-400 cursor-pointer hover:text-white" />
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No documents attached</p>
            )}
          </div>

          {/* Legal Consent */}
          <div style={card}>
            <div className="flex items-center gap-2 mb-3">
              <FaRegCheckCircle size={16} className="text-red-400" />
              <span className="font-semibold text-base">Legal Consent</span>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ background: '#FF4959', borderRadius: '6px', padding: '2px 10px', fontSize: '12px', color: '#fff', fontWeight: '600' }}>Consent Given</span>
              <span className="text-sm text-gray-300">Client has provided legal consent for investigation</span>
            </div>
          </div>
        </div>

        {/* RIGHT col */}
        <div>
          {/* Case Summary */}
          <div style={card}>
            <p className="font-semibold text-base mb-4">Case Summary</p>
            {[
              { icon: <FileText size={14} className="text-gray-400" />, label: 'Case Number', value: data.caseNumber || 'N/A' },
              { icon: <User size={14} className="text-gray-400" />, label: 'Client', value: data.client?.name || 'N/A' },
              { icon: <Calendar size={14} className="text-gray-400" />, label: 'Assigned At', value: data.assignedAt ? new Date(data.assignedAt).toLocaleDateString() : 'N/A' },
              { icon: <FileText size={14} className="text-gray-400" />, label: 'Investigation Type', value: data.investigation?.type || 'N/A' },
            ].map((item, i, arr) => (
              <div key={i}>
                <div className="flex items-start gap-2 py-1">
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
          {data.insightsSubmittedAt && (
            <div style={card}>
              <p className="font-semibold text-base mb-1">Insights Summary</p>
              <p className="text-xs text-gray-400 mb-4">Investigation insights submitted</p>
              <div className="flex items-start gap-2">
                <Calendar size={14} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 mb-1">{new Date(data.insightsSubmittedAt).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-300">Insights have been submitted for review</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Full-width Admin Feedback Section */}
      {adminFeedback && (
        <div style={{ ...card, marginTop: '4px', padding: 'clamp(14px, 4vw, 24px)' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-base mb-1">Admin Feedback</p>
              <p className="text-xs text-gray-400">Review the feedback and make necessary changes</p>
            </div>
            <span className="flex items-center gap-1" style={{ background: '#dc3545', borderRadius: '6px', padding: '2px 10px', fontSize: '11px', color: '#fff' }}>
              <AlertCircle size={12} />Changes Requested
            </span>
          </div>

          <div style={{ background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.3)', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={15} className="text-red-400" />
              <span className="text-sm font-semibold text-red-400">Admin Feedback</span>
            </div>
            
            {adminFeedback.message && (
              <p className="text-xs text-gray-300 mb-3">{adminFeedback.message}</p>
            )}

            {adminFeedback.changes && adminFeedback.changes.length > 0 && (
              <>
                <p className="text-xs text-gray-400 mb-2">Required Changes:</p>
                {adminFeedback.changes.map((item, i) => (
                  <div key={i} style={{ background: '#121F27', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle size={13} className="text-red-400" />
                      <span className="text-sm font-medium text-white">{item.title}</span>
                    </div>
                    <p className="text-xs text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </>
            )}

            {adminFeedback.reviewedBy && (
              <p className="text-xs text-gray-400 mt-2">{adminFeedback.reviewedBy}</p>
            )}
          </div>
        </div>
      )}

      {/* TEMPORARY: Mock Admin Feedback for Testing - Remove this after testing */}
      {!adminFeedback && (
        <div style={{ ...card, marginTop: '4px', padding: 'clamp(14px, 4vw, 24px)' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-base mb-1">Admin Feedback (TEST MODE)</p>
              <p className="text-xs text-gray-400">This is a test display - no actual feedback exists</p>
            </div>
            <span className="flex items-center gap-1" style={{ background: '#dc3545', borderRadius: '6px', padding: '2px 10px', fontSize: '11px', color: '#fff' }}>
              <AlertCircle size={12} />Changes Requested
            </span>
          </div>

          <div style={{ background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.3)', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={15} className="text-red-400" />
              <span className="text-sm font-semibold text-red-400">Admin Feedback</span>
            </div>
            
            <p className="text-xs text-gray-300 mb-3">
              Good initial work, but need more details before we can proceed with the final report. Please address the specific points below.
            </p>

            <p className="text-xs text-gray-400 mb-2">Required Changes:</p>
            
            <div style={{ background: '#121F27', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px' }}>
              <div className="flex items-center gap-2 mb-1">
                <RxCrossCircled  size={13} className="text-red-400" />
                <span className="text-sm font-medium text-white">Evidence Collection</span>
              </div>
              <p className="text-xs text-gray-300">
                Please provide copies of the actual wire transfer receipts and transaction logs. Screenshots are not sufficient for legal proceedings.
              </p>
            </div>

            <div style={{ background: '#121F27', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px' }}>
              <div className="flex items-center gap-2 mb-1">
                <RxCrossCircled size={13} className="text-red-400" />
                <span className="text-sm font-medium text-white">Timeline</span>
              </div>
              <p className="text-xs text-gray-300">
                Need exact dates and times for each suspicious transaction. Current timeline is too vague.
              </p>
            </div>

            <div style={{ background: '#121F27', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px' }}>
              <div className="flex items-center gap-2 mb-1">
                <RxCrossCircled size={13} className="text-red-400" />
                <span className="text-sm font-medium text-white">Witness Interviews</span>
              </div>
              <p className="text-xs text-gray-300">
                Have you interviewed the accounting department staff? Their statements are crucial for building the case.
              </p>
            </div>

            <p className="text-xs text-gray-400 mt-2">Reviewed by Admin on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default CaseDetailsPage;
