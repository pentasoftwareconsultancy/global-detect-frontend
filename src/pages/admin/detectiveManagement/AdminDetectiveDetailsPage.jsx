import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ArrowLeft, User, Briefcase, Shield, FileText,
  Users, ClipboardList, CheckCircle, Download, Eye,
} from "lucide-react";
import { ROUTES } from "../../../core/constants/routes.constant";
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { RiGlobalLine } from "react-icons/ri";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdCastForEducation } from "react-icons/md";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ALL_DETECTIVES = [
  {
    id: 0,
    name: "Detective Emma Watson",
    specialization: "Corporate Fraud",
    status: "On Case",
    kyc: "Approved",
    activeCases: 2,
    rating: 4.8,
    lat: 39.5, lng: -98.35,
    personal: {
      fullName: "Emma Watson", dob: "Apr 15, 1980",
      phone: "+1-555-0109", email: "e.watson@detectiveagency.com",
      address: "123 Wall Street, New York, NY, New York, NY 10001",
      nationality: "American",
      emergencyName: "Alice Johnson", emergencyRelation: "Sister", emergencyPhone: "+1-555-0112",
    },
    professional: {
      licenseNumber: "L123456789", licenseState: "NY",
      licenseExpiry: "Apr 15, 2028", experience: "10 years",
      previousAgency: "ABC Detective Agency",
      education: "Bachelor of Science in Criminal Justice",
      certifications: ["Certified Fraud Examiner"],
      specializations: ["Corporate Fraud", "Financial Investigations"],
      languages: ["English", "Spanish"],
    },
    background: { status: "Cleared", criminalRecord: "No" },
    biography: "Emma Watson is a seasoned detective with over 10 years of experience in corporate fraud investigations. She holds a Bachelor of Science in Criminal Justice and is certified as a Fraud Examiner.",
    documents: [
      { name: "ID_Card.pdf", type: "PDF", uploaded: "Nov 01, 2025", status: "Verified" },
      { name: "License.pdf", type: "PDF", uploaded: "Nov 01, 2025", status: "Verified" },
    ],
    references: [
      { name: "John Doe", role: "Manager", agency: "ABC Detective Agency", phone: "+1-555-010", email: "john.doe@abc.com" },
      { name: "Jane Smith", role: "Supervisor", agency: "XYZ Detective Agency", phone: "+1-555-0111", email: "jane.smith@xyz.com" },
    ],
    cases: [
      { id: "C001", title: "Corporate Embezzlement Investigation", client: "John Smith", status: "insights submitted", priority: "urgent", created: "Jan 15, 2026" },
      { id: "C003", title: "Asset Recovery Investigation", client: "John Smith", status: "report ready", priority: "high", created: "Jan 10, 2026" },
    ],
  },
  {
    id: 1,
    name: "Detective James Bond",
    specialization: "Personal Investigation",
    status: "On Case",
    kyc: "Approved",
    activeCases: 1,
    rating: 4.5,
    lat: 51.5074, lng: -0.1278,
    personal: {
      fullName: "James Bond", dob: "Mar 10, 1975",
      phone: "+1-555-0200", email: "j.bond@detectiveagency.com",
      address: "007 Spy Lane, London, UK",
      nationality: "British",
      emergencyName: "M Director", emergencyRelation: "Colleague", emergencyPhone: "+1-555-0201",
    },
    professional: {
      licenseNumber: "L007007007", licenseState: "CA",
      licenseExpiry: "Dec 31, 2027", experience: "15 years",
      previousAgency: "MI6 Agency",
      education: "Bachelor of Arts in Criminology",
      certifications: ["Licensed Private Investigator"],
      specializations: ["Personal Investigation", "Surveillance"],
      languages: ["English", "French"],
    },
    background: { status: "Cleared", criminalRecord: "No" },
    biography: "James Bond is an elite investigator with 15 years of experience in personal investigations and surveillance operations worldwide.",
    documents: [
      { name: "ID_Card.pdf", type: "PDF", uploaded: "Nov 05, 2025", status: "Verified" },
      { name: "License.pdf", type: "PDF", uploaded: "Nov 05, 2025", status: "Verified" },
    ],
    references: [
      { name: "M Director", role: "Director", agency: "MI6 Agency", phone: "+1-555-0202", email: "m@mi6.com" },
      { name: "Q Branch", role: "Tech Lead", agency: "MI6 Agency", phone: "+1-555-0203", email: "q@mi6.com" },
    ],
    cases: [
      { id: "C002", title: "Personal Surveillance Operation", client: "Jane Doe", status: "in progress", priority: "high", created: "Jan 20, 2026" },
    ],
  },
  {
    id: 2,
    name: "Detective Olivia Martinez",
    specialization: "Missing Persons",
    status: "Available",
    kyc: "Approved",
    activeCases: 0,
    rating: 4.7,
    lat: 41.8781, lng: -87.6298,
    personal: {
      fullName: "Olivia Martinez", dob: "Jun 22, 1985",
      phone: "+1-555-0300", email: "o.martinez@detectiveagency.com",
      address: "456 Oak Ave, Chicago, IL 60601",
      nationality: "American",
      emergencyName: "Carlos Martinez", emergencyRelation: "Brother", emergencyPhone: "+1-555-0301",
    },
    professional: {
      licenseNumber: "L987654321", licenseState: "IL",
      licenseExpiry: "Jun 22, 2029", experience: "8 years",
      previousAgency: "Chicago PD",
      education: "Master of Science in Forensic Science",
      certifications: ["Certified Missing Persons Investigator"],
      specializations: ["Missing Persons", "Child Recovery"],
      languages: ["English", "Spanish", "Portuguese"],
    },
    background: { status: "Cleared", criminalRecord: "No" },
    biography: "Olivia Martinez specializes in missing persons cases with 8 years of experience. She holds an MSc in Forensic Science and has successfully resolved over 50 missing persons cases.",
    documents: [
      { name: "ID_Card.pdf", type: "PDF", uploaded: "Nov 10, 2025", status: "Verified" },
      { name: "License.pdf", type: "PDF", uploaded: "Nov 10, 2025", status: "Verified" },
    ],
    references: [
      { name: "Chief Rodriguez", role: "Chief", agency: "Chicago PD", phone: "+1-555-0302", email: "rodriguez@cpd.com" },
      { name: "Dr. Lee", role: "Forensic Expert", agency: "Forensic Lab", phone: "+1-555-0303", email: "lee@forensiclab.com" },
    ],
    cases: [],
  },
  {
    id: 3,
    name: "Detective David Lee",
    specialization: "Cyber Crime",
    status: "Available",
    kyc: "Approved",
    activeCases: 0,
    rating: 4.6,
    lat: 37.7749, lng: -122.4194,
    personal: {
      fullName: "David Lee", dob: "Sep 14, 1990",
      phone: "+1-555-0400", email: "d.lee@detectiveagency.com",
      address: "789 Tech Blvd, San Francisco, CA 94105",
      nationality: "American",
      emergencyName: "Susan Lee", emergencyRelation: "Spouse", emergencyPhone: "+1-555-0401",
    },
    professional: {
      licenseNumber: "L555444333", licenseState: "CA",
      licenseExpiry: "Sep 14, 2028", experience: "6 years",
      previousAgency: "FBI Cyber Division",
      education: "Bachelor of Science in Computer Science",
      certifications: ["Certified Ethical Hacker", "CISSP"],
      specializations: ["Cyber Crime", "Digital Forensics"],
      languages: ["English", "Mandarin"],
    },
    background: { status: "Cleared", criminalRecord: "No" },
    biography: "David Lee is a cyber crime specialist with 6 years of experience in digital forensics and cyber investigations. Previously worked with the FBI Cyber Division.",
    documents: [
      { name: "ID_Card.pdf", type: "PDF", uploaded: "Nov 15, 2025", status: "Verified" },
      { name: "License.pdf", type: "PDF", uploaded: "Nov 15, 2025", status: "Verified" },
    ],
    references: [
      { name: "Agent Johnson", role: "Senior Agent", agency: "FBI", phone: "+1-555-0402", email: "johnson@fbi.gov" },
      { name: "Prof. Chen", role: "Professor", agency: "MIT", phone: "+1-555-0403", email: "chen@mit.edu" },
    ],
    cases: [],
  },
];

const statusStyle = {
  "On Case":  "bg-[#2B7FFF1A] text-blue-400 border border-[#2B7FFF33]",
  Available:  "bg-[#00C9501A] text-green-400 border border-[#00C95033]",
  Offline:    "bg-[#6A72821A] text-gray-400 border border-[#6A728233]",
};

const caseStatusStyle = {
  "insights submitted": "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]",
  "report ready":       "bg-[#00C9501A] text-green-400 border border-[#00C95033]",
  "in progress":        "bg-[#2B7FFF1A] text-blue-400 border border-[#2B7FFF33]",
};

const priorityStyle = {
  urgent: "bg-[#FF49591A] text-[#FF4959] border border-[#FF495933]",
  high:   "bg-[#F0B1001A] text-yellow-400 border border-[#F0B10033]",
  low:    "bg-[#6A72821A] text-gray-400 border border-[#6A728233]",
};

const CertTag = ({ text }) => (
  <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#1A2832" }}>{text}</span>
);
const SpecTag = ({ text }) => (
  <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#2D3E4D" }}>{text}</span>
);
const LangTag = ({ text }) => (
  <span className="px-3 py-1 text-xs rounded-lg border border-white/10 text-white" style={{ backgroundColor: "#1A2832" }}>{text}</span>
);

const InfoBlock = ({ label, value, prefix }) => (
  <div>
    <p className="text-[11px] text-[#9CA3AF] mb-0.5">{label}</p>
    <p className="text-sm text-white flex items-center gap-1 leading-snug">
      {prefix && <span className="flex-shrink-0 flex items-center">{prefix}</span>}{value}
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

const AdminDetectiveDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const detective = ALL_DETECTIVES[Number(id)] ?? ALL_DETECTIVES[0];

  const { lat, lng } = detective;

  
  return (
    <div className="text-white bg-[#121F27] min-h-screen font-[Montserrat]">

      {/* ── MAP ── */}
      <div style={{ height: 'clamp(200px, 40vw, 400px)', width: "100%" }}>
        <MapContainer
          center={[lat, lng]}
          zoom={4}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[lat, lng]}>
            <Popup>{detective.name}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* ── CONTENT ── */}
      <div className="p-3 sm:p-6">

        {/* Back + Name */}
        <button
          onClick={() => navigate(ROUTES.ADMIN_DETECTIVE_MANAGEMENT)}
          className="flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-white transition mb-2"
        >
          <ArrowLeft size={13} /> Back
        </button>
        <h1 className="text-xl font-bold text-white">{detective.name}</h1>
        <p className="text-sm text-[#9CA3AF] mb-5">{detective.specialization}</p>

        {/* ── STATUS CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-3">Current Status</p>
            <span className={`px-3 py-1 text-xs rounded-lg ${statusStyle[detective.status]}`}>{detective.status}</span>
          </div>
          <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-3">KYC Status</p>
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]">
              <CheckCircle size={10} /> {detective.kyc}
            </span>
          </div>
          <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-3">Active Cases</p>
            <p className="text-2xl font-bold text-white">{detective.activeCases}</p>
          </div>
          <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-3">Rating</p>
            <p className="text-xl font-bold text-white flex items-center gap-1">
              <span className="text-yellow-400">★</span> {detective.rating}
            </p>
          </div>
        </div>

        {/* ── PERSONAL + PROFESSIONAL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

          <SectionCard icon={<User size={14} />} title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
              <InfoBlock label="Full Name" value={detective.personal.fullName} />
              <InfoBlock label="Date of Birth" value={detective.personal.dob} />
              <InfoBlock label="Phone" value={detective.personal.phone} prefix={<FiPhone />} />
              <InfoBlock label="Email" value={detective.personal.email} prefix="✉" />
            </div>
            <InfoBlock label="Address" value={detective.personal.address} prefix={<GrLocation />} />
            <div className="mt-4">
              <InfoBlock label="Nationality" value={detective.personal.nationality} prefix={<RiGlobalLine />} />
            </div>
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-xs font-semibold text-white mb-3">Emergency Contact</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <InfoBlock label="Name" value={detective.personal.emergencyName} />
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
              <InfoBlock label="License State" value={detective.professional.licenseState} />
              <InfoBlock label="License Expiry" value={detective.professional.licenseExpiry} />
              <InfoBlock label="Experience" value={detective.professional.experience} />
            </div>
            <div className="mb-4">
              <InfoBlock label="Previous Agency" value={detective.professional.previousAgency} />
            </div>
            <div className="mb-4">
              <p className="text-[11px] text-[#9CA3AF] mb-0.5 flex items-center gap-1"><MdCastForEducation /> Education</p>
              <p className="text-sm text-white">{detective.professional.education}</p>
            </div>
            <div className="mb-4">
              <p className="text-[11px] text-[#9CA3AF] mb-2 flex items-center gap-1"><LiaCertificateSolid /> Certifications</p>
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
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033] mb-4">
              <CheckCircle size={10} /> {detective.background.status}
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
        <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5 mb-4">
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
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 text-sm text-white">{doc.name}</td>
                    <td className="py-3 text-sm text-[#F9FAFB]">{doc.type}</td>
                    <td className="py-3 text-sm text-[#F9FAFB]">{doc.uploaded}</td>
                    <td className="py-3">
                      <span className="px-3 py-1 text-xs rounded-lg bg-[#00C9501A] text-green-400 border border-[#00C95033]">
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-xs text-[#F9FAFB] hover:text-white transition">
                          <Eye size={12} /> View
                        </button>
                        <button className="flex items-center gap-1 text-xs text-[#F9FAFB] hover:text-white transition">
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
        <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Users size={14} className="text-[#9CA3AF]" />
            <h3 className="text-sm font-semibold text-white">Professional References</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detective.references.map((ref, i) => (
              <div key={i} className="bg-[#1A2832] border border-white/5 rounded-xl p-4">
                <p className="text-sm font-semibold text-white">{ref.name}</p>
                <p className="text-xs text-[#9CA3AF] mb-3">{ref.role}</p>
                <p className="text-xs text-white mb-2">{ref.agency}</p>
                <p className="text-xs text-[#F9FAFB] mb-1 flex items-center gap-1"><FiPhone size={11} /> {ref.phone}</p>
                <p className="text-xs text-[#F9FAFB] flex items-center gap-1">✉ {ref.email}</p>
              </div>
            ))}
          </div>
        </div>


        {/* ── ASSIGNED CASES ── */}
        <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList size={14} className="text-[#9CA3AF]" />
            <h3 className="text-sm font-semibold text-white">
              Assigned Cases ({detective.cases.length})
            </h3>
          </div>
          {detective.cases.length === 0 ? (
            <p className="text-sm text-[#9CA3AF]">No assigned cases.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 text-[#F9FAFB] text-xs">
                    <th className="text-left py-2 font-medium">Case Number</th>
                    <th className="text-left py-2 font-medium">Title</th>
                    <th className="text-left py-2 font-medium">Client</th>
                    <th className="text-left py-2 font-medium">Status</th>
                    <th className="text-left py-2 font-medium">Priority</th>
                    <th className="text-left py-2 font-medium">Created</th>
                    <th className="text-left py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {detective.cases.map((c, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-[#132735] transition">
                      <td className="py-3 text-sm text-white">{c.id}</td>
                      <td className="py-3 text-sm text-white">{c.title}</td>
                      <td className="py-3 text-sm text-[#F9FAFB]">{c.client}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 text-xs rounded-lg ${caseStatusStyle[c.status] ?? "bg-gray-500/20 text-gray-400"}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-3 py-1 text-xs rounded-lg ${priorityStyle[c.priority] ?? "bg-gray-500/20 text-gray-400"}`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-[#F9FAFB]">{c.created}</td>
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
