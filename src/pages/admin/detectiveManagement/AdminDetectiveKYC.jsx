import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, User, Briefcase, Shield, FileText,
  Users, ClipboardList, CheckCircle, Clock, Download, Eye, MapPin, Phone, Mail,
} from "lucide-react";
import { ROUTES } from "../../../core/constants/routes.constant";
import { MdCastForEducation } from "react-icons/md";
import { LiaCertificateSolid } from "react-icons/lia";
import { RiGlobalLine } from "react-icons/ri";

const PENDING_DETECTIVES = [
  {
    id: 4,
    name: "Detective Sophia Anderson",
    specialization: "Insurance Fraud",
    status: "Offline",
    kyc: "Pending",
    activeCases: 0,
    rating: null,
    personal: {
      fullName: "Sophia Anderson", dob: "Sep 10, 1988",
      phone: "+1-555-0125", email: "s.anderson@detectiveagency.com",
      address: "555 Oak Lane, Miami, FL, Miami, FL 33101",
      nationality: "American",
      emergencyName: "Thomas Anderson", emergencyRelation: "Father", emergencyPhone: "+1-555-0128",
    },
    professional: {
      licenseNumber: "L555666777", licenseState: "FL",
      licenseExpiry: "Sep 10, 2027", experience: "5 years",
      previousAgency: "Florida Private Investigations",
      education: "Bachelor of Science in Insurance and Risk Management",
      certifications: ["Certified Fraud Investigator", "Insurance Claims Adjuster License"],
      specializations: ["Insurance Fraud", "Claims Investigation"],
      languages: ["English", "French"],
    },
    background: { status: "Pending", criminalRecord: "No" },
    biography: "Sophia Anderson specializes in insurance fraud investigations with 5 years of experience. She holds certifications in fraud investigation and claims adjustment.",
    documents: [
      { name: "ID_Card.pdf",         type: "PDF", uploaded: "Feb 01, 2026", status: "Pending" },
      { name: "License.pdf",         type: "PDF", uploaded: "Feb 01, 2026", status: "Pending" },
      { name: "Certification_CFI.pdf", type: "PDF", uploaded: "Feb 01, 2026", status: "Pending" },
    ],
    references: [
      { name: "Michael Roberts",   role: "Senior Investigator", agency: "Florida Private Investigations", phone: "+1-555-0126", email: "michael.roberts@fpi.com" },
      { name: "Patricia Williams", role: "Manager",             agency: "State Farm Insurance",           phone: "+1-555-0127", email: "patricia.williams@statefarm.com" },
    ],
    cases: [],
  },
  {
    id: 5,
    name: "Detective Marcus Thompson",
    specialization: "Background Checks",
    status: "Offline",
    kyc: "Pending",
    activeCases: 0,
    rating: null,
    personal: {
      fullName: "Marcus Thompson", dob: "Jan 20, 1992",
      phone: "+1-555-0130", email: "m.thompson@detectiveagency.com",
      address: "88 Pine St, Houston, TX 77001",
      nationality: "American",
      emergencyName: "Linda Thompson", emergencyRelation: "Mother", emergencyPhone: "+1-555-0131",
    },
    professional: {
      licenseNumber: "L888999000", licenseState: "TX",
      licenseExpiry: "Jan 20, 2028", experience: "3 years",
      previousAgency: "Texas Investigations LLC",
      education: "Bachelor of Science in Criminal Justice",
      certifications: ["Certified Background Screener"],
      specializations: ["Background Checks", "Employment Verification"],
      languages: ["English"],
    },
    background: { status: "Pending", criminalRecord: "No" },
    biography: "Marcus Thompson is a background check specialist with 3 years of experience in employment and criminal background screening.",
    documents: [
      { name: "ID_Card.pdf",  type: "PDF", uploaded: "Feb 02, 2026", status: "Pending" },
      { name: "License.pdf",  type: "PDF", uploaded: "Feb 02, 2026", status: "Pending" },
    ],
    references: [
      { name: "James Carter", role: "Director",  agency: "Texas Investigations LLC", phone: "+1-555-0132", email: "j.carter@txinv.com" },
      { name: "Sara Mills",   role: "HR Manager", agency: "CorpCheck Inc",            phone: "+1-555-0133", email: "s.mills@corpcheck.com" },
    ],
    cases: [],
  },
  {
    id: 6,
    name: "Detective Rachel Kim",
    specialization: "Surveillance",
    status: "Offline",
    kyc: "Pending",
    activeCases: 0,
    rating: null,
    personal: {
      fullName: "Rachel Kim", dob: "Apr 05, 1995",
      phone: "+1-555-0140", email: "r.kim@detectiveagency.com",
      address: "22 Maple Ave, Seattle, WA 98101",
      nationality: "American",
      emergencyName: "David Kim", emergencyRelation: "Brother", emergencyPhone: "+1-555-0141",
    },
    professional: {
      licenseNumber: "L111222333", licenseState: "WA",
      licenseExpiry: "Apr 05, 2029", experience: "2 years",
      previousAgency: "Pacific Northwest Surveillance",
      education: "Associate Degree in Criminal Justice",
      certifications: ["Licensed Surveillance Investigator"],
      specializations: ["Surveillance", "Covert Operations"],
      languages: ["English", "Korean"],
    },
    background: { status: "Pending", criminalRecord: "No" },
    biography: "Rachel Kim is a surveillance specialist with 2 years of experience in covert operations and field investigations.",
    documents: [
      { name: "ID_Card.pdf", type: "PDF", uploaded: "Feb 03, 2026", status: "Pending" },
      { name: "License.pdf", type: "PDF", uploaded: "Feb 03, 2026", status: "Pending" },
    ],
    references: [
      { name: "Tom Nguyen",  role: "Lead Investigator", agency: "Pacific Northwest Surveillance", phone: "+1-555-0142", email: "t.nguyen@pns.com" },
      { name: "Amy Chen",    role: "Supervisor",         agency: "Seattle PD",                    phone: "+1-555-0143", email: "a.chen@seattlepd.gov" },
    ],
    cases: [],
  },
];

// Map management page index (4,5,6) to pending detective
const findDetective = (id) =>
  PENDING_DETECTIVES.find(d => d.id === Number(id)) ?? PENDING_DETECTIVES[0];

const CertTag  = ({ text }) => <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#1A2832" }}>{text}</span>;
const SpecTag  = ({ text }) => <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#2D3E4D" }}>{text}</span>;
const LangTag  = ({ text }) => <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#1A2832" }}>{text}</span>;

const InfoBlock = ({ label, value, icon }) => (
  <div>
    <p className="text-[11px] text-[#9CA3AF] mb-0.5">{label}</p>
    <p className="text-sm text-white flex items-center gap-1">
      {icon && <span className="flex-shrink-0">{icon}</span>}{value}
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

const AdminDetectiveKYC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const detective = findDetective(id);
  const [approved, setApproved] = useState(false);

  return (
    <div className="montserrat text-white bg-[#121F27] min-h-screen p-3 sm:p-6">

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
            <h1 className="text-lg sm:text-xl font-bold text-white">{detective.name}</h1>
            <p className="text-sm text-[#9CA3AF]">{detective.specialization}</p>
          </div>
        </div>
        {!approved ? (
          <div className="flex gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => setApproved(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#FF4959] text-white hover:bg-[#e03848] transition">
              <CheckCircle size={13} /> Approve KYC
            </button>
            <button
              onClick={() => navigate(ROUTES.ADMIN_DETECTIVE_MANAGEMENT)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#DC262699] text-white border border-[#FF495966]">
              <Clock size={13} /> Reject KYC
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate(ROUTES.ADMIN_DETECTIVE_MANAGEMENT)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#FFFFFF08] text-white border border-white/20 hover:border-white/50 transition shrink-0">
            <MapPin size={13} /> Track
          </button>
        )}
      </div>

      {/* ── STATUS CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-[#9CA3AF] mb-3">Current Status</p>
          <span className={`px-3 py-1 text-xs rounded-lg ${
            approved
              ? "bg-[#00C9501A] text-green-400 border border-[#00C95033]"
              : "bg-[#6A72821A] text-gray-400 border border-[#6A728233]"
          }`}>
            {approved ? "Available" : detective.status}
          </span>
        </div>
        <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-[#9CA3AF] mb-3">KYC Status</p>
          {approved ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]">
              <CheckCircle size={10} /> Approved
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]">
              <Clock size={10} /> Pending
            </span>
          )}
        </div>
        <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-[#9CA3AF] mb-3">Active Cases</p>
          <p className="text-2xl font-bold text-white">{detective.activeCases}</p>
        </div>
        <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
          <p className="text-xs text-[#9CA3AF] mb-3">Rating</p>
          <p className="text-sm text-[#9CA3AF]">No rating yet</p>
        </div>
      </div>

      {/* ── PERSONAL + PROFESSIONAL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

        <SectionCard icon={<User size={14} />} title="Personal Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <InfoBlock label="Full Name"    value={detective.personal.fullName} />
            <InfoBlock label="Date of Birth" value={detective.personal.dob} />
            <InfoBlock label="Phone" value={detective.personal.phone} icon={<Phone size={12} />} />
            <InfoBlock label="Email" value={detective.personal.email} icon={<Mail size={12} />} />
          </div>
          <InfoBlock label="Address"     value={detective.personal.address}     icon={<MapPin size={12} />} />
          <div className="mt-4">
            <InfoBlock label="Nationality" value={detective.personal.nationality} icon={<RiGlobalLine />} />
          </div>
          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-xs font-semibold text-white mb-3">Emergency Contact</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <InfoBlock label="Name"         value={detective.personal.emergencyName} />
              <InfoBlock label="Relationship" value={detective.personal.emergencyRelation} />
            </div>
            <div className="mt-3">
              <InfoBlock label="Phone" value={detective.personal.emergencyPhone} />
            </div>
          </div>
        </SectionCard>

        <SectionCard icon={<Briefcase size={14} />} title="Professional Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <InfoBlock label="License Number" value={detective.professional.licenseNumber} />
            <InfoBlock label="License State"  value={detective.professional.licenseState} />
            <InfoBlock label="License Expiry" value={detective.professional.licenseExpiry} />
            <InfoBlock label="Experience"     value={detective.professional.experience} />
          </div>
          <div className="mb-4">
            <InfoBlock label="Previous Agency" value={detective.professional.previousAgency} />
          </div>
          <div className="mb-4">
            <p className="text-[11px] text-[#9CA3AF] mb-2 flex items-center gap-1"><MdCastForEducation /> Education</p>
            <p className="text-sm text-white">{detective.professional.education}</p>
          </div>
          <div className="mb-4">
            <p className="text-[11px] text-[#9CA3AF] mb-2 flex items-center gap-1"> <LiaCertificateSolid />Certifications</p>
            <div className="flex flex-wrap gap-2">
              {detective.professional.certifications.map(c => <CertTag key={c} text={c} />)}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-[11px] text-[#9CA3AF] mb-2">Specializations</p>
            <div className="flex flex-wrap gap-2">
              {detective.professional.specializations.map(s => <SpecTag key={s} text={s} />)}
            </div>
          </div>
          <div>
            <p className="text-[11px] text-[#9CA3AF] mb-2">Languages</p>
            <div className="flex flex-wrap gap-2">
              {detective.professional.languages.map(l => <LangTag key={l} text={l} />)}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ── BACKGROUND + BIOGRAPHY ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <SectionCard icon={<Shield size={14} />} title="Background Check">
          <p className="text-[11px] text-[#9CA3AF] mb-2">Status</p>
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]">
            <Clock size={10} /> {detective.background.status}
          </span>
          <div className="mt-4">
            <p className="text-[11px] text-[#9CA3AF] mb-1">Criminal Record</p>
            <p className="text-sm text-white">{detective.background.criminalRecord}</p>
          </div>
        </SectionCard>

        <SectionCard icon={<FileText size={14} />} title="Biography">
          <p className="text-sm text-[#9CA3AF] leading-relaxed">{detective.biography}</p>
        </SectionCard>
      </div>

      {/* ── SUBMITTED DOCUMENTS ── */}
      <div className="bg-[#1A2832] border border-white/10 rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={14} className="text-[#9CA3AF]" />
          <h3 className="text-sm font-semibold text-white">Submitted Documents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[580px]">
            <thead>
              <tr className="border-b border-white/10 text-[#F9FAFB] text-xs">
                <th className="text-left py-2 font-medium">Document Name</th>
                <th className="text-left py-2 font-medium">Type</th>
                <th className="text-left py-2 font-medium">Uploaded Date</th>
                <th className="text-left py-2 font-medium">Status</th>
                <th className="text-left py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {detective.documents.map((doc, i) => (
                <tr key={i} className="border-b border-white/10">
                  <td className="py-3 text-sm text-white">{doc.name}</td>
                  <td className="py-3 text-sm text-[#F9FAFB]">{doc.type}</td>
                  <td className="py-3 text-sm text-[#F9FAFB]">{doc.uploaded}</td>
                  <td className="py-3">
                    <span className="px-3 py-1 text-xs rounded-lg bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]">
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-xs text-[#F9FAFB] hover:text-white transition">
                        <Eye size={12} /> View
                      </button>
                      <button className="flex items-center gap-1 text-xs text-[#F9FAFB] hover:text-white transition ">
                        <Download size={12} /> Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* ── PROFESSIONAL REFERENCES ── */}
      <div className="bg-[#1A2832] border border-white/10 rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Users size={14} className="text-[#9CA3AF]" />
          <h3 className="text-sm font-semibold text-white">Professional References</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {detective.references.map((ref, i) => (
            <div key={i} className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
              <p className="text-sm font-semibold text-white mb-0.5">{ref.name}</p>
              <p className="text-xs text-[#9CA3AF] mb-3">{ref.role}</p>
              <p className="text-xs text-white mb-2">{ref.agency}</p>
              <p className="text-xs text-[#F9FAFB] mb-1 flex items-center gap-1"><Phone size={11} /> {ref.phone}</p>
              <p className="text-xs text-[#F9FAFB] flex items-center gap-1"><Mail size={11} /> {ref.email}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ASSIGNED CASES ── */}
      <div className="bg-[#1A2832] border border-white/10 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList size={14} className="text-[#9CA3AF]" />
          <h3 className="text-sm font-semibold text-white">
            Assigned Cases ({detective.cases.length})
          </h3>
        </div>
        <p className="text-sm text-[#9CA3AF] text-center py-6">No cases assigned yet.</p>
      </div>

    </div>
  );
};

export default AdminDetectiveKYC;
