
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

const UserDashboardPage = () => {
  const navigate = useNavigate();

  const savedCases = JSON.parse(localStorage.getItem("userCases") || "[]");

  const defaultCases = [
    {
      id: "CASE-1001",
      title: "Background verification",
      category: "Background",
      progress: 100,
      status: "Evidence gathering phase in downtown sector",
      daysRemaining: "34 Days",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      files: [
        { name: "Surveillance_Photo_01.jpg", date: "Oct 21, 2023 • 2.4 MB" },
        { name: "Property_Records.pdf", date: "Oct 16, 2023 • 1.2 MB" },
        { name: "Interview_Recording_04.mp3", date: "Oct 12, 2023 • 5.8 MB" },
      ],
    },
    {
      id: "CASE-1002",
      title: "Whispering Hall",
      category: "Surveillance",
      progress: 20,
      status: "Preliminary background checks initiated",
      daysRemaining: "8 Days",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      files: [
        { name: "Surveillance_Photo_01.jpg", date: "Oct 21, 2023 • 2.4 MB" },
        { name: "Property_Records.pdf", date: "Oct 16, 2023 • 1.2 MB" },
      ],
    },
    {
      id: "CASE-1003",
      title: "Background verification",
      category: "Background",
      progress: 65,
      status: "Evidence gathering phase in downtown sector",
      daysRemaining: "34 Days",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      files: [
        { name: "Surveillance_Photo_01.jpg", date: "Oct 21, 2023 • 2.4 MB" },
        { name: "Property_Records.pdf", date: "Oct 16, 2023 • 1.2 MB" },
        { name: "Interview_Recording_04.mp3", date: "Oct 12, 2023 • 5.8 MB" },
      ],
    },
    {
      id: "CASE-1004",
      title: "Whispering Hall",
      category: "Surveillance",
      progress: 20,
      status: "Preliminary background checks initiated",
      daysRemaining: "8 Days",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      files: [
        { name: "Surveillance_Photo_01.jpg", date: "Oct 21, 2023 • 2.4 MB" },
        { name: "Property_Records.pdf", date: "Oct 16, 2023 • 1.2 MB" },
      ],
    },
    {
      id: "CASE-1005",
      title: "Financial Fraud Investigation",
      category: "Fraud",
      progress: 45,
      status: "Document review phase in progress",
      daysRemaining: "15 Days",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      files: [
        { name: "Bank_Statements.pdf", date: "Oct 20, 2023 • 3.1 MB" },
        { name: "Transaction_Log.xlsx", date: "Oct 19, 2023 • 2.8 MB" },
        { name: "Audit_Report.docx", date: "Oct 18, 2023 • 1.5 MB" },
      ],
    },
  ];

  const [investigations] = useState([...savedCases, ...defaultCases]);

  const activeCount = investigations.filter(
    (inv) => inv.progress < 100
  ).length;
  const totalCount = investigations.length;

  return (
    <div className="text-white montserrat w-full">

      {/* HEADER */}
      <h1 className="font-['Montserrat'] font-medium text-2xl leading-[21px] tracking-normal text-white mb-6">
        Dashboard
      </h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-3 gap-2 md:gap-6 mb-8">

        <div className="dashboard-stats-container bg-[#2b3a42] border-white border-opacity-50 hover:border-opacity-100 transition" style={{minHeight: 'unset'}}>
          <p className="investigation-label">Active Investigations</p>
          <div className="stat-number-container bg-[rgba(217,43,58,0.48)]">{activeCount}</div>
        </div>

        {/* Total */}
        <div className="dashboard-stats-container bg-[#2b3a42] border-white border-opacity-50 hover:border-opacity-100 transition" style={{minHeight: 'unset'}}>
          <p className="investigation-label">Total Investigations</p>
          <div className="stat-number-container bg-[rgba(217,43,58,0.48)]">{totalCount}</div>
        </div>

        {/* Request Investigation */}
        <div
          onClick={() => navigate(ROUTES.REQUEST_INVESTIGATION)}
          className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl cursor-pointer p-3 flex flex-col justify-between transition hover:shadow-lg"
          style={{minHeight: 'unset'}}
        >
          <p className="investigation-label">Request investigation</p>
          <div className="flex items-center gap-2">
            <div className="request-investigation-icon">
              <Plus className="w-7 h-7 text-white" strokeWidth={3} />
            </div>
            <p className="text-sm text-white/80 hidden sm:block">Request your new investigation now</p>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="active-investigations-title" style={{ marginBottom: '24px' }}>
        Active Investigations
      </h2>

      {/* CARDS */}
      <div className="space-y-6">
        {investigations.map((item) => (
          <div key={item.id} className="investigation-card">

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="investigation-image"
            />

            {/* CONTENT SECTION */}
            <div className="investigation-content">

              {/* PRIORITY + CASE ID + AVATAR */}
              <div className="investigation-priority-case">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded">
                      {item.priority || "High"} Priority
                    </span>
                    <p className="text-[11px] text-gray-400">
                      Case ID: #{item.id}
                    </p>
                  </div>
                  <h3 className="font-semibold text-white text-lg">
                    {item.title}
                  </h3>
                </div>
                <img
                  src="https://i.pravatar.cc/32"
                  alt="user"
                  className="investigation-avatar"
                />
              </div>

              {/* PROGRESS SECTION */}
              <div className="investigation-progress">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-gray-300">
                    Investigation Progress
                  </p>
                  <p className="text-sm text-white font-semibold">
                    {item.progress}%
                  </p>
                </div>
                <div className="bg-gray-600 h-2 rounded w-full">
                  <div
                    className="bg-red-500 h-2 rounded"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {item.status}
                </p>
              </div>

              {/* FOOTER - DAYS + BUTTON */}
              <div className="investigation-footer">
                <p className="text-xs text-gray-400">
                  {item.daysRemaining}
                </p>
                <button
                  onClick={() => navigate(`${ROUTES.USER_DASHBOARD_DETAILS}/${item.id}`)}
                  className="view-full-case-btn"
                >
                  View Full Case
                </button>
              </div>
            </div>

            {/* FILES CARDS - RIGHT SIDE */}
            <div className="investigation-files">
              {item.files.map((file, i) => (
                <div key={i} className="files-card">
                  <div className="files-card-name">{file.name}</div>
                  <div className="files-card-date">{file.date}</div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardPage;