import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, MinusCircle, Ban, User, CreditCard, Shield, Briefcase, Eye, MapPin, Phone, Mail } from "lucide-react";
import { ROUTES } from "../../../core/constants/routes.constant";
import { casesData } from "../../../components/admin/caseManagement/caseManagementData";

const USERS_DATA = {
  "user-1": { name: "John Smith",       email: "john.smith@email.com",  phone: "+1-555-0101", status: "Active",   joined: "Dec 01, 2025", totalSpent: "$15,000", accountType: "Individual", lastLogin: "Feb 05, 2026 14:30", paymentMethod: "Credit Card", aadhaar: "2344 5678 2457", notifications: true,  verifications: ["Email: Verified","Phone: Verified","Identity: Verified"], verificationDate: "Dec 01, 2025 10:00", billingAddress: "123 Main St, New York, NY 10001" },
  "user-2": { name: "Sarah Johnson",    email: "sarah.j@email.com",     phone: "+1-555-0102", status: "Active",   joined: "Dec 05, 2025", totalSpent: "$8,500",  accountType: "Individual", lastLogin: "Feb 03, 2026 09:15", paymentMethod: "PayPal",      aadhaar: "3456 7890 1234", notifications: true,  verifications: ["Email: Verified","Phone: Verified"],                      verificationDate: "Dec 05, 2025 11:00", billingAddress: "456 Oak Ave, Los Angeles, CA 90001" },
  "user-3": { name: "Michael Chen",     email: "michael.c@email.com",   phone: "+1-555-0103", status: "Active",   joined: "Dec 10, 2025", totalSpent: "$5,000",  accountType: "Corporate",  lastLogin: "Feb 01, 2026 16:45", paymentMethod: "Bank Transfer",aadhaar: "5678 9012 3456", notifications: false, verifications: ["Email: Verified","Identity: Verified"],                   verificationDate: "Dec 10, 2025 14:00", billingAddress: "789 Pine St, Chicago, IL 60601" },
  "user-4": { name: "Emily Davis",      email: "emily.davis@email.com", phone: "+1-555-0104", status: "Active",   joined: "Dec 15, 2025", totalSpent: "$0",      accountType: "Individual", lastLogin: "Jan 20, 2026 10:00", paymentMethod: "Credit Card", aadhaar: "6789 0123 4567", notifications: true,  verifications: ["Email: Verified"],                                        verificationDate: "Dec 15, 2025 09:00", billingAddress: "321 Elm St, Houston, TX 77001" },
  "user-5": { name: "Robert Wilson",    email: "robert.w@email.com",    phone: "+1-555-0105", status: "Blocked",  joined: "Nov 20, 2025", totalSpent: "$3,000",  accountType: "Individual", lastLogin: "Jan 10, 2026 08:30", paymentMethod: "Credit Card", aadhaar: "7890 1234 5678", notifications: false, verifications: ["Email: Verified","Phone: Verified"],                      verificationDate: "Nov 20, 2025 12:00", billingAddress: "654 Maple Dr, Phoenix, AZ 85001" },
  "user-6": { name: "Jessica Martinez", email: "j.martinez@email.com",  phone: "+1-555-0106", status: "Inactive", joined: "Oct 10, 2025", totalSpent: "$0",      accountType: "Individual", lastLogin: "Nov 01, 2025 15:00", paymentMethod: "PayPal",      aadhaar: "8901 2345 6789", notifications: false, verifications: ["Email: Verified"],                                        verificationDate: "Oct 10, 2025 10:00", billingAddress: "987 Cedar Ln, Philadelphia, PA 19101" },
  "user-7": { name: "David Brown",      email: "d.brown@email.com",     phone: "+1-555-0107", status: "Active",   joined: "Jan 05, 2026", totalSpent: "$4,500",  accountType: "Corporate",  lastLogin: "Feb 04, 2026 11:20", paymentMethod: "Bank Transfer",aadhaar: "9012 3456 7890", notifications: true,  verifications: ["Email: Verified","Phone: Verified","Identity: Verified"], verificationDate: "Jan 05, 2026 09:30", billingAddress: "147 Birch Blvd, San Antonio, TX 78201" },
  "user-8": { name: "Linda Garcia",     email: "linda.g@email.com",     phone: "+1-555-0108", status: "Blocked",  joined: "Nov 01, 2025", totalSpent: "$0",      accountType: "Individual", lastLogin: "Nov 15, 2025 14:00", paymentMethod: "Credit Card", aadhaar: "0123 4567 8901", notifications: false, verifications: ["Email: Verified"],                                        verificationDate: "Nov 01, 2025 10:00", billingAddress: "258 Walnut St, San Diego, CA 92101" },
};

const StatusBadge = ({ status }) => {
  if (status === "Active")   return <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-[#00C9501A] text-green-400 border border-green-500/30"><CheckCircle size={10} /> Active</span>;
  if (status === "Blocked")  return <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/30"><XCircle size={10} /> Blocked</span>;
  return <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 border border-white/10"><MinusCircle size={10} /> Inactive</span>;
};

const PriorityBadge = ({ p }) => {
  const map = { urgent: "bg-[#FB2C361A] text-red-400 border border-red-500/30", high: "bg-[#FF69001A] text-orange-400 border border-orange-500/30", medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30", low: "bg-green-500/20 text-green-400 border border-green-500/30" };
  return <span className={`px-2 py-0.5 text-xs rounded-md ${map[p?.toLowerCase()] || map.low}`}>{p}</span>;
};

const CaseStatusBadge = ({ s }) => {
  const val = s?.toLowerCase();
  const map = { "insights submitted": "bg-[#F0B1001A] text-yellow-400 border border-yellow-500/30", "report ready": "bg-[#00C9501A] text-green-400 border border-green-500/30", "in progress": "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30", "completed": "bg-green-500/20 text-green-400 border border-green-500/30", "pending": "bg-gray-500/20 text-gray-400 border border-white/10", "assigned": "bg-purple-500/20 text-purple-400 border border-purple-500/30" };
  return <span className={`px-2 py-0.5 text-xs rounded-md  ${map[val] || "bg-gray-500/20 text-gray-400"}`}>{s}</span>;
};

const AdminUserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const u = USERS_DATA[userId];

  if (!u) return (
    <div className="p-6 text-white bg-[#08141B] min-h-screen font-[Montserrat] flex items-center justify-center">
      <p className="text-gray-400">User not found.</p>
    </div>
  );

  // Filter cases from caseManagementData by matching client name
  const userCases = casesData.filter(c => c.client === u.name);
  const activeCases = userCases.filter(c => !["completed", "report ready"].includes(c.status?.toLowerCase())).length;
  const completedCases = userCases.filter(c => ["completed", "report ready"].includes(c.status?.toLowerCase())).length;

  const cardCls = "bg-[#1A2832] border border-white/5 rounded-xl p-5";

  return (
    <div className="p-4 sm:p-6 text-white bg-[#121F27] min-h-screen font-[Montserrat]">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => navigate(ROUTES.ADMIN_USER_MANAGEMENT)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition flex-shrink-0">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold">{u.name}</h1>
            <p className="text-xs sm:text-sm text-gray-400">{u.email}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#DC262699] hover:bg-[#b82231] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex-shrink-0">
          <Ban size={13} /> Block User
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className={cardCls}>
          <p className="text-xs text-gray-400 mb-3">Account Status</p>
          <StatusBadge status={u.status} />
        </div>
        <div className={cardCls}>
          <p className="text-xs text-gray-400 mb-3">Total Cases</p>
          <p className="text-2xl sm:text-3xl font-bold">{userCases.length}</p>
        </div>
        <div className={cardCls}>
          <p className="text-xs text-gray-400 mb-3">Active Cases</p>
          <p className="text-2xl sm:text-3xl font-bold">{activeCases}</p>
        </div>
        <div className={cardCls}>
          <p className="text-xs text-gray-400 mb-3">Total Spent</p>
          <p className="text-2xl sm:text-3xl font-bold">$ {u.totalSpent.replace("$", "")}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

        {/* Personal Info */}
        <div className={cardCls}>
          <div className="flex items-center gap-2 mb-4">
            <User size={15} className="text-white" />
            <h3 className="text-sm font-semibold">Personal Information</h3>
          </div>
          <div className="space-y-3">
            <div><p className="text-xs text-gray-500 mb-0.5">Full Name</p><p className="text-sm font-medium">{u.name}</p></div>
            <div><p className="text-xs text-gray-500 mb-0.5">Phone</p><p className="text-sm flex items-center gap-1"><Phone size={11} className="text-white" /> {u.phone}</p></div>
            <div><p className="text-xs text-gray-500 mb-0.5">Email</p><p className="text-sm flex items-center gap-1"><Mail size={11} className="text-white" /> {u.email}</p></div>
            <div><p className="text-xs text-gray-500 mb-0.5">Adhar Card Number</p><p className="text-sm">{u.aadhaar}</p></div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Notifications</p>
              <span className={`px-3 py-1 text-xs rounded-md font-medium ${u.notifications ? "bg-[#FF4959] text-white" : "bg-gray-500/20 text-gray-400"}`}>
                {u.notifications ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className={cardCls}>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={15} className="text-white" />
            <h3 className="text-sm font-semibold">Account Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Account Type</p>
              <p className="text-sm flex items-center gap-1"><User size={11} className="text-white" /> {u.accountType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Joined Date</p>
              <p className="text-sm flex items-center gap-1"><Briefcase size={11} className="text-white" /> {u.joined}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500 mb-0.5">Last Login</p>
              <p className="text-sm">{u.lastLogin}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500 mb-0.5">Payment Method</p>
              <p className="text-sm flex items-center gap-1"><CreditCard size={11} className="text-white" /> {u.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className={cardCls}>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={15} className="text-white" />
            <h3 className="text-sm font-semibold">Verification Status</h3>
          </div>
          <div className="flex gap-2 flex-wrap mb-3">
            {u.verifications.map((v, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md bg-green-500/20 text-green-400 border border-green-500/30">
                <CheckCircle size={10} /> {v}
              </span>
            ))}
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Verification Date</p>
            <p className="text-sm">{u.verificationDate}</p>
          </div>
        </div>

        {/* Billing */}
        <div className={cardCls}>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={15} className="text-white" />
            <h3 className="text-sm font-semibold">Billing Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Billing Address</p>
              <p className="text-sm flex items-center gap-1"><MapPin size={11} className="text-white" /> {u.billingAddress}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Completed Cases</p>
                <p className="text-sm font-semibold">{completedCases}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Total Spent</p>
                <p className="text-sm font-semibold">{u.totalSpent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case History */}
      <div className={cardCls}>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase size={15} className="text-white" />
          <h3 className="text-sm font-semibold">Case History ({userCases.length})</h3>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {userCases.length === 0 ? (
            <p className="py-8 text-center text-white text-sm">No cases present</p>
          ) : userCases.map((c, i) => (
            <div key={i} className="bg-[#132735] border border-white/5 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-xs text-gray-400">{c.id}</p>
                  <p className="text-sm text-white font-medium">{c.type}</p>
                </div>
                <CaseStatusBadge s={c.status} />
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <PriorityBadge p={c.priority} />
                <span className="text-xs text-gray-400">{c.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">{c.detective || "Unassigned"}</p>
                <button onClick={() => navigate(`${ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL}/${c.id}`)} className="flex items-center gap-1 text-xs text-white hover:text-white transition">
                  <Eye size={13} /> View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 text-white text-xs">
                <th className="text-left py-3 font-medium">Case Number</th>
                <th className="text-left py-3 font-medium">Title</th>
                <th className="text-left py-3 font-medium">Status</th>
                <th className="text-left py-3 font-medium">Priority</th>
                <th className="text-left py-3 font-medium">Created</th>
                <th className="text-left py-3 font-medium">Assigned Detective</th>
                <th className="text-left py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-white text-sm">No cases present</td>
                </tr>
              ) : userCases.map((c, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-[#132735] transition">
                  <td className="py-3 text-xs text-gray-300">{c.id}</td>
                  <td className="py-3 text-xs text-white">{c.type}</td>
                  <td className="py-3"><CaseStatusBadge s={c.status} /></td>
                  <td className="py-3"><PriorityBadge p={c.priority} /></td>
                  <td className="py-3 text-xs text-white">{c.date}</td>
                  <td className="py-3 text-xs text-white">{c.detective || "Unassigned"}</td>
                  <td className="py-3">
                    <button onClick={() => navigate(`${ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL}/${c.id}`)} className="flex items-center gap-1 text-xs text-white hover:text-white transition">
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailsPage;
