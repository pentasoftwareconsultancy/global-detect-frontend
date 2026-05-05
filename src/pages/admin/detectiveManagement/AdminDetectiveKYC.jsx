import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, User, Briefcase, Shield, FileText,
  Users, ClipboardList, CheckCircle, Clock, Download, Eye,
  MapPin, Phone, Mail, Loader2, AlertCircle, X,
} from "lucide-react";
import { toast } from "react-toastify";
import { ROUTES } from "../../../core/constants/routes.constant";
import { authService } from "../../../core/services/auth.service";
import { MdCastForEducation } from "react-icons/md";
import { LiaCertificateSolid } from "react-icons/lia";
import { RiGlobalLine } from "react-icons/ri";

/* ─── helpers ─── */
const dash = (v) => (v !== undefined && v !== null && v !== "") ? v : "—";
const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

/* ─── small UI pieces ─── */
const CertTag = ({ text }) => <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#1A2832" }}>{text}</span>;
const SpecTag = ({ text }) => <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#2D3E4D" }}>{text}</span>;
const LangTag = ({ text }) => <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#1A2832" }}>{text}</span>;

const InfoBlock = ({ label, value, icon }) => (
  <div>
    <p className="text-[11px] text-[#9CA3AF] mb-0.5">{label}</p>
    <p className="text-sm text-white flex items-center gap-1">
      {icon && <span className="shrink-0">{icon}</span>}
      {dash(value)}
    </p>
  </div>
);

const SectionCard = ({ icon, title, children }) => (
  <div className="bg-[#1A2832] border border-white/10 rounded-xl p-5">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[#9CA3AF]">{icon}</span>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
    </div>
    {children}
  </div>
);

/* ─── Reject modal ─── */
const RejectModal = ({ onConfirm, onCancel, loading }) => {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A2832] border border-white/10 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-base font-semibold text-white mb-2">Reject KYC Application</h3>
        <p className="text-xs text-gray-400 mb-4">Please provide a reason for rejection. This will be shown to the detective.</p>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Enter rejection reason..."
          rows={4}
          className="w-full bg-[#121F27] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-white/30 resize-none mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(reason)}
            disabled={!reason.trim() || loading}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#DC2626] text-white hover:bg-[#b91c1c] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
            Confirm Reject
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-xs text-gray-300 border border-white/10 rounded-lg hover:border-white/30 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
const AdminDetectiveKYC = () => {
  const { id } = useParams(); // detective user ID
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [recentCases, setRecentCases] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  /* ── fetch application + cases in parallel ── */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [kycRes, detectiveRes] = await Promise.allSettled([
          authService.getKYCApplicationByUserId(id),
          authService.getDetectiveById(id),
        ]);

        if (kycRes.status === "fulfilled") {
          setApplication(kycRes.value?.data?.data ?? kycRes.value?.data ?? null);
        } else {
          throw kycRes.reason;
        }

        if (detectiveRes.status === "fulfilled") {
          const d = detectiveRes.value?.data?.data ?? detectiveRes.value?.data ?? {};
          setRecentCases(d.recentCases ?? []);
        }
        // cases failing is non-critical — silently ignore
      } catch (err) {
        const msg = err?.response?.data?.message ?? "Failed to load KYC application";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  /* ── approve ── */
  const handleApprove = async () => {
    if (!window.confirm("Approve this KYC application?")) return;
    setActionLoading(true);
    try {
      await authService.updateKYCStatus(application.id, { status: "approved" });
      toast.success("KYC application approved!");
      setApplication(prev => ({ ...prev, status: "approved" }));
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Failed to approve");
    } finally {
      setActionLoading(false);
    }
  };
  /* ── reject ── */
  const handleReject = async (reason) => {
    setActionLoading(true);
    try {
      await authService.updateKYCStatus(application.id, { status: "rejected", rejectionReason: reason });
      toast.success("KYC application rejected");
      setApplication(prev => ({ ...prev, status: "rejected", rejection_reason: reason }));
      setShowRejectModal(false);
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Failed to reject");
    } finally {
      setActionLoading(false);
    }
  };

  /* ── loading / error states ── */
  if (loading) return (
    <div className="min-h-screen bg-[#121F27] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <Loader2 size={32} className="animate-spin text-[#FF4959]" />
        <p className="text-sm">Loading KYC application…</p>
      </div>
    </div>
  );

  if (error || !application) return (
    <div className="min-h-screen bg-[#121F27] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <AlertCircle size={32} className="opacity-40" />
        <p className="text-sm">{error ?? "Application not found"}</p>
        <button onClick={() => navigate(ROUTES.ADMIN_DETECTIVE_MANAGEMENT)} className="text-xs text-[#FF4959] hover:underline mt-1">← Back to list</button>
      </div>
    </div>
  );

  /* ── shorthand refs ── */
  const detective  = application.user        ?? {};
  const personal   = application.personalInfo   ?? null;
  const contact    = application.contactInfo    ?? null;
  const emergency  = application.emergencyContact ?? null;
  const prof       = application.professionalInfo ?? null;
  const docs       = application.documents       ?? null;
  const refs       = application.references      ?? [];
  const legal      = application.legalCompliance ?? null;

  const fullName       = personal ? `${personal.first_name} ${personal.last_name}` : detective.name;
  const phone          = contact?.phone_number   ?? detective.phone;
  const email          = contact?.email          ?? detective.email;
  const address        = contact?.street_address ? `${contact.street_address}, ${contact.city}, ${contact.state_province} ${contact.zip_postal_code}, ${contact.country}` : null;
  const specialization = prof?.specialization    ?? null;
  const isPending      = application.status === "pending" || application.status === "draft";
  const isApproved     = application.status === "approved";
  const isRejected     = application.status === "rejected";

  const docRows = docs ? [
    { name: "Government ID Proof",           url: docs.government_id_proof },
    { name: "Detective License Certificate", url: docs.detective_license_certificate },
    { name: "Professional Resume",           url: docs.professional_resume },
    { name: "Professional Certifications",   url: docs.professional_certifications },
    { name: "Background Check Report",       url: docs.background_check_report },
    { name: "Proof of Address",              url: docs.proof_of_address },
  ].filter(d => d.url) : [];

  /* ══════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="font-[Montserrat] text-white bg-[#121F27] min-h-screen p-3 sm:p-6">

      {showRejectModal && (
        <RejectModal
          onConfirm={handleReject}
          onCancel={() => setShowRejectModal(false)}
          loading={actionLoading}
        />
      )}

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <button
            onClick={() => navigate(ROUTES.ADMIN_DETECTIVE_MANAGEMENT)}
            className="flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-white transition mt-1 shrink-0"
          >
            <ArrowLeft size={13} /> Back
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">{fullName}</h1>
            <p className="text-sm text-[#9CA3AF]">{dash(specialization)}</p>
          </div>
        </div>

        {/* Action buttons — only show when pending */}
        {isPending && (
          <div className="flex gap-3 shrink-0 flex-wrap">
            <button
              onClick={handleApprove}
              disabled={actionLoading}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#FF4959] text-white hover:bg-[#e03848] disabled:opacity-50 transition"
            >
              {actionLoading ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
              Approve KYC
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              disabled={actionLoading}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#DC262699] text-white border border-[#FF495966] hover:bg-[#DC2626] disabled:opacity-50 transition"
            >
              <X size={13} /> Reject KYC
            </button>
          </div>
        )}

        {isApproved && (
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]">
            <CheckCircle size={13} /> KYC Approved
          </span>
        )}

        {isRejected && (
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <X size={13} /> KYC Rejected
          </span>
        )}
      </div>

      {/* Rejection reason banner */}
      {isRejected && application.rejection_reason && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5 text-sm text-red-400">
          <span className="font-semibold">Rejection reason: </span>{application.rejection_reason}
        </div>
      )}

      {/* ── STATUS CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-[#9CA3AF] mb-3">Application Status</p>
          {isApproved && <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]"><CheckCircle size={10} /> Approved</span>}
          {isRejected && <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-red-500/10 text-red-400 border border-red-500/20"><X size={10} /> Rejected</span>}
          {isPending  && <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]"><Clock size={10} /> Pending</span>}
        </div>
        <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-[#9CA3AF] mb-3">Submitted</p>
          <p className="text-sm text-white font-medium">{fmtDate(application.submitted_at)}</p>
        </div>
        <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-[#9CA3AF] mb-3">Reviewed</p>
          <p className="text-sm text-white font-medium">{fmtDate(application.reviewed_at)}</p>
        </div>
        <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-[#9CA3AF] mb-3">Step Completed</p>
          <p className="text-2xl font-bold text-white">{application.current_step ?? 0} / 7</p>
        </div>
      </div>

      {/* ── PERSONAL + PROFESSIONAL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

        <SectionCard icon={<User size={14} />} title="Personal Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <InfoBlock label="Full Name"     value={fullName} />
            <InfoBlock label="Date of Birth" value={fmtDate(personal?.date_of_birth)} />
            <InfoBlock label="Phone"  value={phone}  icon={<Phone size={12} />} />
            <InfoBlock label="Email"  value={email}  icon={<Mail size={12} />} />
          </div>
          <InfoBlock label="Address" value={address} icon={<MapPin size={12} />} />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <InfoBlock label="Nationality" value={personal?.nationality} icon={<RiGlobalLine />} />
            <InfoBlock label="Gender"      value={personal?.gender} />
          </div>
          {contact?.alternate_phone && (
            <div className="mt-3">
              <InfoBlock label="Alternate Phone" value={contact.alternate_phone} icon={<Phone size={12} />} />
            </div>
          )}

          {emergency && (
            <div className="mt-5 pt-4 border-t border-white/5">
              <p className="text-xs font-semibold text-white mb-3">Emergency Contact</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <InfoBlock label="Name"         value={emergency.full_name} />
                <InfoBlock label="Relationship" value={emergency.relationship} />
              </div>
              <div className="mt-3">
                <InfoBlock label="Phone" value={emergency.phone_number} icon={<Phone size={12} />} />
              </div>
            </div>
          )}
        </SectionCard>

        <SectionCard icon={<Briefcase size={14} />} title="Professional Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <InfoBlock label="License Number" value={prof?.detective_license_number} />
            <InfoBlock label="License State"  value={contact?.state_province} />
            <InfoBlock label="License Expiry" value={fmtDate(prof?.license_expiry_date)} />
            <InfoBlock label="Experience"     value={prof?.years_of_experience ? `${prof.years_of_experience} years` : null} />
          </div>
          <div className="mb-4">
            <InfoBlock label="Previous Agency" value={prof?.previous_agency} />
          </div>
          <div className="mb-4">
            <p className="text-[11px] text-[#9CA3AF] mb-2 flex items-center gap-1"><MdCastForEducation /> Education</p>
            <p className="text-sm text-white">—</p>
          </div>
          <div className="mb-4">
            <p className="text-[11px] text-[#9CA3AF] mb-2 flex items-center gap-1"><LiaCertificateSolid /> Certifications</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">—</span>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-[11px] text-[#9CA3AF] mb-2">Specializations</p>
            <div className="flex flex-wrap gap-2">
              {specialization ? <SpecTag text={specialization} /> : <span className="text-xs text-gray-500">—</span>}
            </div>
          </div>
          <div>
            <p className="text-[11px] text-[#9CA3AF] mb-2">Languages</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">—</span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ── BACKGROUND + BIOGRAPHY ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <SectionCard icon={<Shield size={14} />} title="Background Check">
          <p className="text-[11px] text-[#9CA3AF] mb-2">Consent Status</p>
          {legal ? (
            <>
              <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg mb-4 ${
                legal.consent_background_check
                  ? "bg-[#00C9501A] text-green-400 border border-[#00C95033]"
                  : "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]"
              }`}>
                <CheckCircle size={10} /> {legal.consent_background_check ? "Consent Given" : "Pending"}
              </span>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-[11px] text-[#9CA3AF] mb-1">Criminal Record</p>
                  <p className="text-sm text-white">{legal.has_criminal_record ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#9CA3AF] mb-1">Terms Accepted</p>
                  <p className="text-sm text-white">{legal.terms_accepted ? `Yes — ${fmtDate(legal.terms_accepted_at)}` : "No"}</p>
                </div>
              </div>
              {legal.has_criminal_record && legal.criminal_record_details && (
                <div className="mt-3">
                  <p className="text-[11px] text-[#9CA3AF] mb-1">Details</p>
                  <p className="text-sm text-white">{legal.criminal_record_details}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]">
                <Clock size={10} /> Not submitted
              </span>
              <div className="mt-4">
                <p className="text-[11px] text-[#9CA3AF] mb-1">Criminal Record</p>
                <p className="text-sm text-white">—</p>
              </div>
            </>
          )}
        </SectionCard>

        <SectionCard icon={<FileText size={14} />} title="Biography">
          <p className="text-sm text-[#9CA3AF] leading-relaxed">—</p>
        </SectionCard>
      </div>

      {/* ── SUBMITTED DOCUMENTS ── */}
      <div className="bg-[#1A2832] border border-white/10 rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={14} className="text-[#9CA3AF]" />
          <h3 className="text-sm font-semibold text-white">Submitted Documents</h3>
        </div>
        {docRows.length === 0 ? (
          <p className="text-sm text-[#9CA3AF]">No documents uploaded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[580px]">
              <thead>
                <tr className="border-b border-white/10 text-[#F9FAFB] text-xs">
                  <th className="text-left py-2 font-medium">Document Name</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {docRows.map((doc, i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="py-3 text-sm text-white">{doc.name}</td>
                    <td className="py-3">
                      {isApproved ? (
                        <span className="px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]">
                          Reviewed
                        </span>
                      ) : isRejected ? (
                        <span className="px-3 py-1 text-xs rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                          Rejected
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-lg bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]">
                          Pending Review
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-4">
                        <a href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-[#F9FAFB] hover:text-white transition">
                          <Eye size={12} /> View
                        </a>
                        <a href={doc.url} download className="flex items-center gap-1 text-xs text-[#F9FAFB] hover:text-white transition">
                          <Download size={12} /> Download
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── PROFESSIONAL REFERENCES ── */}
      <div className="bg-[#1A2832] border border-white/10 rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Users size={14} className="text-[#9CA3AF]" />
          <h3 className="text-sm font-semibold text-white">Professional References</h3>
        </div>
        {refs.length === 0 ? (
          <p className="text-sm text-[#9CA3AF]">No references submitted.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {refs.map((ref, i) => (
              <div key={i} className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
                <p className="text-sm font-semibold text-white mb-0.5">{ref.full_name}</p>
                <p className="text-xs text-[#9CA3AF] mb-3">Reference #{ref.reference_number}</p>
                <p className="text-xs text-[#F9FAFB] mb-1 flex items-center gap-1"><Phone size={11} /> {ref.phone_number}</p>
                <p className="text-xs text-[#F9FAFB] mb-2 flex items-center gap-1"><Mail size={11} /> {ref.email}</p>
                <span className={`px-2 py-0.5 text-xs rounded-lg ${
                  isApproved
                    ? "bg-[#00C9501A] text-green-400 border border-[#00C95033]"
                    : isRejected
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : ref.verification_status === "verified"
                    ? "bg-[#00C9501A] text-green-400 border border-[#00C95033]"
                    : ref.verification_status === "failed"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]"
                }`}>
                  {isApproved ? "verified" : isRejected ? "rejected" : ref.verification_status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── ASSIGNED CASES ── */}
      <div className="bg-[#1A2832] border border-white/10 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList size={14} className="text-[#9CA3AF]" />
          <h3 className="text-sm font-semibold text-white">Assigned Cases ({recentCases.length})</h3>
        </div>
        {recentCases.length === 0 ? (
          <p className="text-sm text-[#9CA3AF] text-center py-6">No cases assigned yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 text-[#F9FAFB] text-xs">
                  <th className="text-left py-2 font-medium">Case Number</th>
                  <th className="text-left py-2 font-medium">Status</th>
                  <th className="text-left py-2 font-medium">Priority</th>
                  <th className="text-left py-2 font-medium">Assigned</th>
                  <th className="text-left py-2 font-medium">Submitted</th>
                  <th className="text-left py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((c, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-[#132735] transition">
                    <td className="py-3 text-sm text-white font-mono">
                      {c.form_number ?? c.id?.slice(0, 8)}
                    </td>
                    <td className="py-3">
                      <span className={`px-3 py-1 text-xs rounded-lg ${
                        c.status === "assigned"    ? "bg-[#2B7FFF1A] text-blue-400 border border-[#2B7FFF33]" :
                        c.status === "in_progress" ? "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]" :
                        c.status === "completed"   ? "bg-[#00C9501A] text-green-400 border border-[#00C95033]" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>
                        {c.status?.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3">
                      {c.priority ? (
                        <span className={`px-3 py-1 text-xs rounded-lg ${
                          c.priority === "urgent" ? "bg-[#FF49591A] text-[#FF4959] border border-[#FF495933]" :
                          c.priority === "high"   ? "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]" :
                          c.priority === "medium" ? "bg-[#2B7FFF1A] text-blue-400 border border-[#2B7FFF33]" :
                          "bg-[#6A72821A] text-gray-400 border border-[#6A728233]"
                        }`}>
                          {c.priority}
                        </span>
                      ) : <span className="text-gray-500 text-xs">—</span>}
                    </td>
                    <td className="py-3 text-xs text-[#9CA3AF]">{fmtDate(c.assigned_at)}</td>
                    <td className="py-3 text-xs text-[#9CA3AF]">{fmtDate(c.submitted_at)}</td>
                    <td className="py-3">
                      <button className="flex items-center gap-1 text-xs text-[#F9FAFB] hover:text-white transition">
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDetectiveKYC;
