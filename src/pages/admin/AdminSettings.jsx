import React, { useState } from "react";
import { FiSettings, FiBell, FiShield, FiKey, FiTrash2 } from "react-icons/fi";

// ✅ Toggle defined OUTSIDE (no scope issues)
const Toggle = ({ state = false, setState }) => {
  return (
    <div
      onClick={() => setState(!state)}
      className={`w-10 h-5 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
        state ? "bg-red" : "bg-gray"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${
          state ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </div>
  );
};

const AdminSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [caseUpdates, setCaseUpdates] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="p-6 text-white montserrat">

      {/* HEADER */}
      <h2 className="text-2xl font-semibold mb-1">Settings</h2>
      <p className="text-lightGray text-sm mb-6">
        Manage your application preferences
      </p>

      {/* ================= APPEARANCE ================= */}
      <div className="bg-[#0E1F2B] p-5 rounded-xl mb-5">
        <h3 className="text-sm mb-4 flex items-center gap-2">
          <FiSettings className="text-lightGray text-lg" />
          Appearance
        </h3>

        <div className="flex justify-between items-center border-t border-gray/20 pt-4">
          <div>
            <p className="text-sm">Language</p>
            <p className="text-xs lightGray">
              Select your preferred language
            </p>
          </div>

          <select className="bg-[#0B1A24] px-3 py-2 rounded-lg text-sm outline-none">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <div className="bg-[#0E1F2B] p-5 rounded-xl mb-5">
        <h3 className="text-sm mb-4 flex items-center gap-2">
          <FiBell className="text-lightGray text-lg" />
          Notifications
        </h3>

        {[
          {
            title: "Email Notifications",
            desc: "Receive notifications via email",
            state: emailNotif,
            setState: setEmailNotif,
          },
          {
            title: "Push Notifications",
            desc: "Receive push notifications on your device",
            state: pushNotif,
            setState: setPushNotif,
          },
          {
            title: "Case Updates",
            desc: "Get notified when case status changes",
            state: caseUpdates,
            setState: setCaseUpdates,
          },
          {
            title: "Weekly Reports",
            desc: "Receive weekly summary reports",
            state: weeklyReports,
            setState: setWeeklyReports,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-t border-gray/20 py-4"
          >
            <div>
              <p className="text-sm">{item.title}</p>
              <p className="text-xs lightGray">{item.desc}</p>
            </div>

            <Toggle state={item.state} setState={item.setState} />
          </div>
        ))}
      </div>

      {/* ================= PRIVACY ================= */}
      <div className="bg-[#0E1F2B] p-5 rounded-xl mb-5">
        <h3 className="text-sm mb-4 flex items-center gap-2">
          <FiShield className="text-lightGray text-lg" />
          Privacy & Security
        </h3>

        {/* 2FA */}
        <div className="flex justify-between items-center border-t border-gray/20 py-4">
          <div>
            <p className="text-sm">Two-Factor Authentication</p>
            <p className="text-xs lightGray">
              Add an extra layer of security to your account
            </p>
          </div>

          {/* ✅ THIS WILL NOT ERROR NOW */}
          <Toggle state={twoFactor} setState={setTwoFactor} />
        </div>

        {/* CHANGE PASSWORD */}
        <div className="border-t border-gray/20 pt-4">
          <button className="w-full flex items-center gap-2 bg-[#0B1A24] px-4 py-3 rounded-lg text-sm hover:bg-[#132B3A] transition">
            <FiKey />
            Change Password
          </button>
        </div>
      </div>

      {/* ================= DANGER ZONE ================= */}
      <div className="border border-red/40 rounded-xl p-5 mb-5">
        <p className="text-red text-sm mb-1">Danger Zone</p>
        <p className="text-xs lightGray mb-4">
          Irreversible actions
        </p>

        <button className="flex items-center gap-2 bg-red px-4 py-2 rounded-lg text-sm hover:bg-red/80 transition">
          <FiTrash2 />
          Delete Account
        </button>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button className="bg-red px-5 py-2 rounded-lg text-sm hover:bg-red/80 transition">
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;