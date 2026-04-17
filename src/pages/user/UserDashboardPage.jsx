

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
        { name: "Surveillance_Photo_01.jpg", date: "Oct 21, 2025 | 2:34 PM" },
        { name: "Property_Records.pdf", date: "Oct 16, 2025 | 11:03" },
        { name: "Interview_Recording_04.mp3", date: "Oct 12, 2025 | 8:59 AM" },
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
        { name: "Surveillance_Photo_01.jpg", date: "Oct 21, 2025 | 2:34 PM" },
        { name: "Property_Records.pdf", date: "Oct 16, 2025 | 11:03" },
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
        { name: "Surveillance_Photo_01.jpg", date: "Oct 21, 2025 | 2:34 PM" },
        { name: "Property_Records.pdf", date: "Oct 16, 2025 | 11:03" },
        { name: "Interview_Recording_04.mp3", date: "Oct 12, 2025 | 8:59 AM" },
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
        { name: "Surveillance_Photo_01.jpg", date: "Oct 21, 2025 | 2:34 PM" },
        { name: "Property_Records.pdf", date: "Oct 16, 2025 | 11:03" },
      ],
    },
  ];

  const [investigations] = useState([...savedCases, ...defaultCases]);

  const activeCount = investigations.filter(
    (inv) => inv.progress < 100
  ).length;
  const totalCount = investigations.length;

  return (
    <div className=" text-white montserrat">

      {/* HEADER */}
      <h1 className="text-lg md:text-2xl font-semibold mb-4">
        Dashboard
      </h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-3 gap-5 md:gap-5">

        {/* Active */}
        <div className="bg-[#2b3a42] rounded-xl p-3 md:p-5 border border-white">
          <p className="text-xs md:text-sm text-gray-300">
            Active Investigations
          </p>
          <span className="bg-[rgba(217,43,58,0.48)]   px-3 py-1 rounded mt-2 inline-block">
            {activeCount}
          </span>
        </div>

        {/* Total */}
        <div className="bg-[#2b3a42] rounded-xl p-3 md:p-5 border border-white">
          <p className="text-xs md:text-sm text-gray-300">
            Total Investigations
          </p>
          <span className="bg-[rgba(217,43,58,0.48)]  s px-3 py-1 rounded mt-2 inline-block">
            {totalCount}
          </span>
        </div>

        {/* Request Investigation */}
        <div
          onClick={() => navigate(ROUTES.REQUEST_INVESTIGATION)}
          className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl cursor-pointer"
        >

          {/* ===== DESKTOP VIEW ===== */}
          <div className="hidden md:flex  gap-3 p-6 ">

            <div className="bg-white/20 p-3 rounded-xl">
              <Plus className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Request investigation
              </p>
              <p className="text-xs text-gray-200">
                Request you new investigation now
              </p>
            </div>
          </div>

          {/* ===== MOBILE VIEW ===== */}
          <div className="md:hidden p-2 space-y-2">

            <p className="text-xs font-semibold">
              Request investigation
            </p>

            <div className="flex items-center gap-2">

              <div className="bg-white/20 p-2 rounded-lg">
                <Plus size={14} />
              </div>

              <p className="text-[10px] text-gray-200 leading-tight">
                Request your new investigation now
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* TITLE */}
      <h2 className="mt-6 mb-3 text-sm md:text-lg font-semibold ">
        Active Investigations
      </h2>

      {/* CARDS */}
      <div className="space-y-4 ">
        {investigations.map((item) => (
          <div key={item.id} className="bg-[#2b3a42] rounded-xl overflow-hidden">

            {/* ===== DESKTOP ===== */}
            <div className="hidden md:flex border border-white rounded-xl ">

  <img
    src={item.image}
    className="w-52 h-40 object-cover"
  />

  <div className="flex-1 p-4 ">

    {/* 🔴 Priority + Case ID */}
    <div className="flex justify-between items-start">

  {/* LEFT SIDE */}
  <div>

    {/* Priority + Case ID */}
    <div className="flex items-center gap-2 mb-1">
      <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded">
        {item.priority} Priority
      </span>

      <p className="text-[11px] text-gray-400">
        Case ID: #{item.id}
      </p>
    </div>

    {/* Title */}
    {/* <h3 className="font-semibold text-lg">
      {item.title}
    </h3> */}

  </div>

  {/* RIGHT SIDE AVATAR */}
  <img
    src="https://i.pravatar.cc/40"  // dummy avatar (replace later)
    alt="user"
    className="w-8 h-8 rounded-full object-cover"
  />

</div>

    {/* Category */}
    {/* <p className="text-xs text-red-400 mb-1">
      {item.category}
    </p> */}

    {/* Title */}
    <h3 className="font-semibold text-lg">
      {item.title}
    </h3>
    
      


    {/* Progress */}
    <div className="mt-2">

      {/* 👇 Added Progress % */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-300">
          Investigation Progress
        </p>

        <p className="text-[13px] text-white">
          {item.progress}%
        </p>
      </div>

      <div className="bg-gray-600 h-1 rounded mt-1">
        <div
          className="bg-red-500 h-1"
          style={{ width: `${item.progress}%` }}
        ></div>
      </div>
    </div>

    {/* Status */}
    <p className="text-xs text-gray-400 mt-2">
      {item.status}
    </p>

    {/* Footer */}
    <div className="flex justify-between items-center mt-3">
      <p className="text-xs text-gray-400">
        {item.daysRemaining}
      </p>
 
      <button
        onClick={() => navigate(`${ROUTES.USER_DASHBOARD_DETAILS}/${item.id}`)}
        className="bg-red-500 px-3 py-1 rounded text-xs"
      >
        View Full Case
      </button>
    </div>
  </div>

  {/* FILES */}
  <div className="w-60 p-3 space-y-2 ">
    {item.files.map((file, i) => (
      <div key={i} className="bg-[#3a4b54] p-2 rounded text-xs rounded-xl border border-white">
        {file.name}
        <p className="text-[10px] text-gray-400">
          {file.date}
        </p>
      </div>
    ))}
  </div>

</div>

            {/* ===== MOBILE ===== */}
            <div className="md:hidden rounded-xl border border-white">

  {/* IMAGE */}
  <img
    src={item.image}
    className="w-full h-40 object-cover"
  />

  {/* CONTENT WRAPPER (IMPORTANT - you missed this) */}
  <div className="p-3 space-y-2">

    {/* Priority + Case ID */}
   <div className="flex justify-between items-start">

  {/* LEFT SIDE */}
  <div>

    {/* Priority + Case ID */}
    <div className="flex items-center gap-2 mb-1">
      <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded">
        {item.priority} Priority
      </span>

      <p className="text-[11px] text-gray-400">
        Case ID: #{item.id}
      </p>
    </div>

    {/* Title */}
    <h3 className="font-semibold text-lg">
      {item.title}
    </h3>

  </div>

  {/* RIGHT SIDE AVATAR */}
  <img
    src="https://i.pravatar.cc/40"  // dummy avatar (replace later)
    alt="user"
    className="w-8 h-8 rounded-full object-cover"
  />

</div>

    {/* Title */}
    <h3 className="text-sm font-semibold">
      {item.title}
    </h3>

    {/* Progress */}
    <div>
      <div className="flex justify-between items-center">
        <p className="text-[10px] text-gray-300">
          Investigation Progress
        </p>

        {/* 👇 Progress % added */}
        <p className="text-[11px] text-white">
          {item.progress}%
        </p>
      </div>

      <div className="bg-gray-600 h-1 rounded mt-1">
        <div
          className="bg-red-500 h-1"
          style={{ width: `${item.progress}%` }}
        ></div>
      </div>
    </div>

    {/* Status */}
    <p className="text-[10px] text-gray-400">
      {item.status}
    </p>

    {/* Days */}
    <p className="text-[10px] text-gray-400">
      {item.daysRemaining}
    </p>

    {/* FILES */}
    <div className="space-y-2">
      {item.files.map((file, i) => (
        <div key={i} className="bg-[#3a4b54] p-2 rounded text-[10px]">
          {file.name}
          <p className="text-[9px] text-gray-400">
            {file.date}
          </p>
        </div>
      ))}
    </div>

    {/* BUTTON */}
    <button
      onClick={() =>
        navigate(`${ROUTES.USER_DASHBOARD_DETAILS}/${item.id}`)
      }
      className="bg-red-500 w-full py-2 rounded text-xs"
    >
      View Full Case
    </button>

  </div>
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardPage;