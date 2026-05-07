import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ArrowLeft, User, Briefcase, Shield, FileText,
  Users, ClipboardList, CheckCircle, Download, Eye,
  Loader2, AlertCircle, Clock, X,
} from "lucide-react";
import { toast } from "react-toastify";
import { ROUTES } from "../../../core/constants/routes.constant";
import { authService } from "../../../core/services/auth.service";
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { RiGlobalLine } from "react-icons/ri";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdCastForEducation } from "react-icons/md";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ─── helpers ─── */
const dash = (v) => (v !== undefined && v !== null && v !== "") ? v : "—";
const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

/* ─── small UI pieces ─── */
const CertTag  = ({ text }) => <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#1A2832" }}>{text}</span>;
const SpecTag  = ({ text }) => <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#2D3E4D" }}>{text}</span>;
const LangTag  = ({ text }) => <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#1A2832" }}>{text}</span>;

const InfoBlock = ({ label, value, prefix }) => (
  <div>
    <p className="text-[11px] text-[#9CA3AF] mb-0.5">{label}</p>
    <p className="text-sm text-white flex items-center gap-1 leading-snug">
      {prefix && <span className="shrink-0 flex items-center">{prefix}</span>}
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

const statusStyle = {
  on_case:   "bg-[#2B7FFF1A] text-blue-400 border border-[#2B7FFF33]",
  available: "bg-[#00C9501A] text-green-400 border border-[#00C95033]",
  offline:   "bg-[#6A72821A] text-gray-400 border border-[#6A728233]",
};
const statusLabel = { on_case: "On Case", available: "Available", offline: "Offline" };

const KYCBadge = ({ kycStatus }) => {
  if (kycStatus === "approved") return <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]"><CheckCircle size={10} /> Approved</span>;
  if (kycStatus === "rejected") return <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-red-500/10 text-red-400 border border-red-500/20"><X size={10} /> Rejected</span>;
  return <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]"><Clock size={10} /> Pending</span>;
};

const caseStatusStyle = {
  assigned:    "bg-[#2B7FFF1A] text-blue-400 border border-[#2B7FFF33]",
  in_progress: "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]",
  completed:   "bg-[#00C9501A] text-green-400 border border-[#00C95033]",
  cancelled:   "bg-[#6A72821A] text-gray-400 border border-[#6A728233]",
};
const priorityStyle = {
  urgent: "bg-[#FF49591A] text-[#FF4959] border border-[#FF495933]",
  high:   "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]",
  medium: "bg-[#2B7FFF1A] text-blue-400 border border-[#2B7FFF33]",
  low:    "bg-[#6A72821A] text-gray-400 border border-[#6A728233]",
};

/* ═══════════════════════════════════════════════════════════════════════════ */
const AdminDetectiveDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detective, setDetective] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await authService.getDetectiveById(id);
        setDetective(res?.data?.data ?? res?.data ?? null);
      } catch (err) {
        const msg = err?.response?.data?.message ?? "Failed to load detective";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#121F27] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <Loader2 size={32} className="animate-spin text-[#FF4959]" />
        <p className="text-sm">Loading detective profile…</p>
      </div>
    </div>
  );

  if (error || !detective) return (
    <div className="min-h-screen bg-[#121F27] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <AlertCircle size={32} className="opacity-40" />
        <p className="text-sm">{error ?? "Detective not found"}</p>
        <button onClick={() => navigate(ROUTES.ADMIN_DETECTIVE_MANAGEMENT)} className="text-xs text-[#FF4959] hover:underline mt-1">← Back to list</button>
      </div>
    </div>
  );

  /* ── shorthand refs ── */
  const kyc     = detective.kycApplication   ?? null;
  const personal = kyc?.personalInfo         ?? null;
  const contact  = kyc?.contactInfo          ?? null;
  const emergency = kyc?.emergencyContact    ?? null;
  const prof     = kyc?.professionalInfo     ?? null;
  const docs     = kyc?.documents            ?? null;
  const refs     = kyc?.references           ?? [];
  const legal    = kyc?.legalCompliance      ?? null;

  /* ── derived values ── */
  const fullName       = personal ? `${personal.first_name} ${personal.last_name}` : detective.name;
  const phone          = contact?.phone_number    ?? detective.phone;
  const email          = contact?.email           ?? detective.email;
  const city           = contact?.city            ?? detective.city;
  const address        = contact?.street_address  ? `${contact.street_address}, ${contact.city}, ${contact.state_province} ${contact.zip_postal_code}, ${contact.country}` : null;
  const nationality    = personal?.nationality    ?? null;
  const dob            = personal?.date_of_birth  ?? null;
  const gender         = personal?.gender         ?? null;
  const specialization = detective.specialization ?? prof?.specialization ?? null;
  const licenseNumber  = detective.licenseNumber  ?? prof?.detective_license_number ?? null;
  const licenseExpiry  = prof?.license_expiry_date  ?? null;
  const licenseIssue   = prof?.license_issue_date   ?? null;
  const experience     = prof?.years_of_experience  ? `${prof.years_of_experience} years` : null;
  const previousAgency = prof?.previous_agency      ?? null;

  const lat = parseFloat(detective.lat) || 20.5937;
  const lng = parseFloat(detective.lng) || 78.9629;

  const recentCases = detective.recentCases ?? [];

  /* ── document rows ── */
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
    <div className="text-white  min-h-screen font-[Montserrat]">

      {/* ── MAP ── */}
      <div style={{ height: "clamp(200px, 40vw, 400px)", width: "100%" }}>
        <MapContainer center={[lat, lng]} zoom={4} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
          <Marker position={[lat, lng]}>
            <Popup>{detective.name}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* ── CONTENT ── */}
      <div className="p-3 sm:p-6">

        {/* Back + Name */}
        <button onClick={() => navigate(ROUTES.ADMIN_DETECTIVE_MANAGEMENT)} className="flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-white transition mb-2">
          <ArrowLeft size={13} /> Back
        </button>
        <h1 className="text-xl font-bold text-white">{fullName}</h1>
        <p className="text-sm text-[#9CA3AF] mb-5">{dash(specialization)}</p>

        {/* ── STATUS CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-3">Current Status</p>
            <span className={`px-3 py-1 text-xs rounded-lg ${statusStyle[detective.status] ?? statusStyle.offline}`}>
              {statusLabel[detective.status] ?? detective.status}
            </span>
          </div>
          <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-3">KYC Status</p>
            <KYCBadge kycStatus={detective.kycStatus} />
          </div>
          <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-3">Active Cases</p>
            <p className="text-2xl font-bold text-white">{detective.activeCases ?? 0}</p>
          </div>
          <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-3">Completed Cases</p>
            <p className="text-xl font-bold text-white">{detective.completedCases ?? 0}</p>
          </div>
        </div>

        {/* ── PERSONAL + PROFESSIONAL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

          {/* Personal */}
          <SectionCard icon={<User size={14} />} title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
              <InfoBlock label="Full Name"     value={fullName} />
              <InfoBlock label="Date of Birth" value={fmtDate(dob)} />
              <InfoBlock label="Phone"         value={phone}  prefix={<FiPhone />} />
              <InfoBlock label="Email"         value={email}  prefix="✉" />
            </div>
            <InfoBlock label="Address"     value={address}     prefix={<GrLocation />} />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <InfoBlock label="Nationality" value={nationality} prefix={<RiGlobalLine />} />
              <InfoBlock label="Gender"      value={gender} />
            </div>

            {/* Emergency Contact */}
            {emergency && (
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="text-xs font-semibold text-white mb-3">Emergency Contact</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  <InfoBlock label="Name"         value={emergency.full_name} />
                  <InfoBlock label="Relationship" value={emergency.relationship} />
                </div>
                <div className="mt-3">
                  <InfoBlock label="Phone" value={emergency.phone_number} prefix={<FiPhone />} />
                </div>
              </div>
            )}

            {/* KYC dates */}
            {kyc && (
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="text-xs font-semibold text-white mb-3">KYC Application</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  <InfoBlock label="Submitted" value={fmtDate(kyc.submitted_at)} />
                  <InfoBlock label="Reviewed"  value={fmtDate(kyc.reviewed_at)} />
                </div>
                {kyc.rejection_reason && (
                  <div className="mt-3">
                    <InfoBlock label="Rejection Reason" value={kyc.rejection_reason} />
                  </div>
                )}
              </div>
            )}
          </SectionCard>

          {/* Professional */}
          <SectionCard icon={<Briefcase size={14} />} title="Professional Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
              <InfoBlock label="License Number" value={licenseNumber} />
              <InfoBlock label="License State"  value={contact?.state_province} />
              <InfoBlock label="License Expiry" value={fmtDate(licenseExpiry)} />
              <InfoBlock label="Experience"     value={experience} />
            </div>
            <div className="mb-4">
              <InfoBlock label="Previous Agency" value={previousAgency} />
            </div>
            <div className="mb-4">
              <p className="text-[11px] text-[#9CA3AF] mb-0.5 flex items-center gap-1"><MdCastForEducation /> Education</p>
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
            <p className="text-[11px] text-[#9CA3AF] mb-2">Status</p>
            {legal ? (
              <>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg mb-4 ${
                  legal.consent_background_check
                    ? "bg-[#00C9501A] text-green-400 border border-[#00C95033]"
                    : "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]"
                }`}>
                  <CheckCircle size={10} /> {legal.consent_background_check ? "Consent Given" : "Pending Consent"}
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
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033] mb-4">
                  <CheckCircle size={10} /> —
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
        <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={14} className="text-[#9CA3AF]" />
            <h3 className="text-sm font-semibold text-white">Submitted Documents</h3>
          </div>
          {docRows.length === 0 ? (
            <p className="text-sm text-[#9CA3AF]">No documents available.</p>
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
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 text-sm text-white">{doc.name}</td>
                      <td className="py-3">
                        <span className="px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]">Uploaded</span>
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
        <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Users size={14} className="text-[#9CA3AF]" />
            <h3 className="text-sm font-semibold text-white">Professional References</h3>
          </div>
          {refs.length === 0 ? (
            <p className="text-sm text-[#9CA3AF]">No references available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {refs.map((ref, i) => (
                <div key={i} className="bg-[#1A2832] border border-white/5 rounded-xl p-4">
                  <p className="text-sm font-semibold text-white">{ref.full_name}</p>
                  <p className="text-xs text-[#9CA3AF] mb-3">Reference #{ref.reference_number}</p>
                  <p className="text-xs text-[#F9FAFB] mb-1 flex items-center gap-1"><FiPhone size={11} /> {ref.phone_number}</p>
                  <p className="text-xs text-[#F9FAFB] mb-2 flex items-center gap-1">✉ {ref.email}</p>
                  <span className={`px-2 py-0.5 text-xs rounded-lg ${
                    detective.kycStatus === "approved" || ref.verification_status === "verified"
                      ? "bg-[#00C9501A] text-green-400 border border-[#00C95033]"
                      : detective.kycStatus === "rejected" || ref.verification_status === "failed"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]"
                  }`}>
                    {detective.kycStatus === "approved" ? "verified"
                      : detective.kycStatus === "rejected" ? "rejected"
                      : ref.verification_status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* ── ASSIGNED CASES ── */}
        <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList size={14} className="text-[#9CA3AF]" />
            <h3 className="text-sm font-semibold text-white">Assigned Cases ({recentCases.length})</h3>
          </div>
          {recentCases.length === 0 ? (
            <p className="text-sm text-[#9CA3AF]">No assigned cases.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
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
                      <td className="py-3 text-sm text-white font-mono">{c.form_number ?? c.id?.slice(0, 8)}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 text-xs rounded-lg ${caseStatusStyle[c.status] ?? "bg-gray-500/20 text-gray-400"}`}>
                          {c.status?.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3">
                        {c.priority
                          ? <span className={`px-3 py-1 text-xs rounded-lg ${priorityStyle[c.priority] ?? "bg-gray-500/20 text-gray-400"}`}>{c.priority}</span>
                          : <span className="text-gray-500 text-xs">—</span>}
                      </td>
                      <td className="py-3 text-xs text-[#9CA3AF]">{fmtDate(c.assigned_at)}</td>
                      <td className="py-3 text-xs text-[#9CA3AF]">{fmtDate(c.submitted_at)}</td>
                      <td className="py-3">
                        <button
                          onClick={() => navigate(ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL, { state: { caseItem: { id: c.id } } })}
                          className="flex items-center gap-1 text-xs text-[#F9FAFB] hover:text-white transition"
                        >
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
    </div>
  );
};

export default AdminDetectiveDetailsPage;
