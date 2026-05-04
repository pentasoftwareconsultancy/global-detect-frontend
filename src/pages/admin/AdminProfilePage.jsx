import React from "react";
import { FiUser, FiMail, FiSave } from "react-icons/fi";

const AdminProfilePage = () => {
  return (
    <div className="p-6 text-white montserrat">

      {/* HEADER */}
      <h2 className="text-2xl font-semibold mb-1">Profile</h2>
      <p className="text-lightGray text-sm mb-6">
        Manage your account information
      </p>

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-[#0E1F2B] p-5 rounded-xl mb-5 flex items-center gap-4">
        
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-red flex items-center justify-center text-lg font-semibold">
          A
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium">Admin Director</p>
          <p className="text-xs lightGray">admin@detectiveagency.com</p>
          <span className="text-[10px] px-2 py-1 bg-[#132B3A] rounded mt-1 inline-block">
            Admin
          </span>
        </div>
      </div>

      {/* ================= PERSONAL INFO ================= */}
      <div className="bg-[#0E1F2B] p-5 rounded-xl mb-5">

        <h3 className="text-sm mb-1">Personal Information</h3>
        <p className="text-xs lightGray mb-4">
          Update your personal details
        </p>

        <div className="grid grid-cols-2 gap-4">

          {/* Full Name */}
          <div>
            <label className="text-xs lightGray">Full Name</label>
            <div className="flex items-center gap-2 bg-[#0B1A24] px-3 py-2 rounded-lg mt-1">
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
            <label className="text-xs lightGray">Email Address</label>
            <div className="flex items-center gap-2 bg-[#0B1A24] px-3 py-2 rounded-lg mt-1">
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
          <button className="flex items-center gap-2 bg-red px-4 py-2 rounded-lg text-sm hover:bg-red/80 transition">
            <FiSave />
            Save Changes
          </button>
        </div>
      </div>

      {/* ================= ACCOUNT INFO ================= */}
      <div className="bg-[#0E1F2B] p-5 rounded-xl">

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
