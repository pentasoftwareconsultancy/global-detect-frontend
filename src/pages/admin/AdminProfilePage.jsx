import React from "react";
import { FiUser, FiMail, FiSave } from "react-icons/fi";

const AdminProfilePage = () => {
  return (
    <div className="p-6 text-white montserrat bg-[#121F27]">

      {/* HEADER */}
      <h2 className="text-2xl font-semibold mb-1">Profile</h2>
      <p className="text-lightGray text-sm mb-6">
        Manage your account information
      </p>

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-[#1A2832] p-5 rounded-xl mb-5 flex items-center gap-4 border border-gray/20">
        
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-[#FF4959] flex items-center justify-center text-lg font-semibold">
          A
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium">Admin Director</p>
          <p className="text-xs lightGray">admin@detectiveagency.com</p>
          <span className="text-[10px] px-2 py-1 bg-[#2D3E4D] rounded mt-1 inline-block">
            Admin
          </span>
        </div>
      </div>

      {/* ================= PERSONAL INFO ================= */}
      <div className="bg-[#1A2832] p-5 rounded-xl mb-5 border border-gray/20">

        <h3 className="text-sm mb-1">Personal Information</h3>
        <p className="text-xs lightGray mb-4">
          Update your personal details
        </p>

        <div className="grid grid-cols-3 gap-4">

          {/* Full Name */}
          <div>
            <label className="text-xs white">Full Name</label>
            <div className="flex items-center gap-2 bg-[#1A2832] px-3 py-2 rounded-lg mt-1 border border-gray/50">
              <FiUser className="text-lightGray" />
              <input
                type="text"
                value="Admin Director"
                className="bg-transparent outline-none text-sm w-full"
                readOnly
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs white">Email Address</label>
            <div className="flex items-center gap-2 bg-[#1A2832] px-3 py-2 rounded-lg mt-1 border border-gray/50">
              <FiMail className="text-lightGray" />
              <input
                type="text"
                value="admin@detectiveagency.com"
                className="bg-transparent outline-none text-sm w-full"
                readOnly
              />
            </div>
          </div>

        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end mt-4">
          <button className="flex items-center gap-2 bg-[#FF4959] px-4 py-2 rounded-lg text-sm hover:bg-[#FF4959]/80 transition">
            <FiSave />
            Save Changes
          </button>
        </div>
      </div>

      {/* ================= ACCOUNT INFO ================= */}
      <div className="bg-[#1A2832] p-5 rounded-xl border border-gray/20">

        <h3 className="text-sm mb-4">Account Information</h3>

        <div className="flex justify-between border-t border-gray/20 py-3 text-sm">
          <span className="lightGray">Account ID</span>
          <span>admin-1</span>
        </div>

        <div className="flex justify-between border-t border-gray/20 py-3 text-sm">
          <span className="lightGray">Role</span>
          <span>Admin</span>
        </div>

      </div>
    </div>
  );
};

export default AdminProfilePage;