import React, { useState } from "react";
import { Sun, Bell, Shield, Mail, Smartphone, FileText, BarChart2, Lock, Trash2, Save } from "lucide-react";

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? "bg-[#FF4959]" : "bg-[#2D3E4D]"}`}
  >
    <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`} />
  </button>
);

const SectionCard = ({ children }) => (
  <div className="bg-[#1A2832] border border-white/5 rounded-xl p-5 sm:p-6 mb-4">
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, title, desc }) => (
  <div className="mb-4">
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-white" />
      <h2 className="text-sm font-semibold text-white">{title}</h2>
    </div>
    {desc && <p className="text-xs text-gray-400 mt-1">{desc}</p>}
  </div>
);

const SettingRow = ({ icon: Icon, title, desc, right }) => (
  <div className="flex items-center justify-between py-3.5 border-t border-white/5 gap-3">
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="text-white flex-shrink-0" />}
        <p className="text-sm text-white">{title}</p>
      </div>
      {desc && <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</p>}
    </div>
    <div className="flex-shrink-0">{right}</div>
  </div>
);

const AdminSettings = () => {
  const [language, setLanguage] = useState("English");
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    caseUpdates: true,
    weeklyReports: false,
  });
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="min-h-screen bg-[#121F27] text-white p-4 sm:p-6 font-[Montserrat]">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage your application preferences</p>
      </div>

      {/* Appearance */}
      <SectionCard>
        <SectionHeader icon={Sun} title="Appearance" desc="Customize the look and feel of the application" />
        <SettingRow
          title="Language"
          desc="Select your preferred language"
          right={
            <div className="relative">
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="bg-[#1A2832] border border-white/10 text-sm text-white rounded-lg px-3 py-1.5 pr-8 outline-none appearance-none cursor-pointer w-full sm:w-auto"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
                
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</span>
            </div>
          }
        />
      </SectionCard>

      {/* Notifications */}
      <SectionCard>
        <SectionHeader icon={Bell} title="Notifications" desc="Configure how you receive notifications" />
        <SettingRow
          icon={Mail}
          title="Email Notifications"
          desc="Receive notifications via email"
          right={<Toggle checked={notifs.email} onChange={v => setNotifs(p => ({ ...p, email: v }))} />}
        />
        <SettingRow
          icon={Smartphone}
          title="Push Notifications"
          desc="Receive push notifications on your device"
          right={<Toggle checked={notifs.push} onChange={v => setNotifs(p => ({ ...p, push: v }))} />}
        />
        <SettingRow
          title="Case Updates"
          desc="Get notified when case status changes"
          right={<Toggle checked={notifs.caseUpdates} onChange={v => setNotifs(p => ({ ...p, caseUpdates: v }))} />}
        />
        <SettingRow
          title="Weekly Reports"
          desc="Receive weekly summary reports"
          right={<Toggle checked={notifs.weeklyReports} onChange={v => setNotifs(p => ({ ...p, weeklyReports: v }))} />}
        />
      </SectionCard>

      {/* Privacy & Security */}
      <SectionCard>
        <SectionHeader icon={Shield} title="Privacy & Security" desc="Manage your privacy and security settings" />
        <SettingRow
          icon={Lock}
          title="Two-Factor Authentication"
          desc="Add an extra layer of security to your account"
          right={<Toggle checked={twoFA} onChange={setTwoFA} />}
        />
        <div className="border-t border-white/5 pt-3.5">
          <button className="flex items-center gap-2 text-sm text-white bg-[#121F27] border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg transition w-full sm:w-auto">
            <Lock size={13} className="text-gray-400" /> Change Password
          </button>
        </div>
      </SectionCard>

      {/* Danger Zone */}
      <div className="bg-[#1A2832] border border-[#FF4959]/40 rounded-xl p-5 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-[#FF4959] mb-1">Danger Zone</h2>
        <p className="text-xs text-gray-400 mb-4">Irreversible actions</p>
        <button className="flex items-center gap-2 bg-[#DC262699] hover:bg-[#b82231] text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          <Trash2 size={13} /> Delete Account
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center justify-center gap-2 bg-[#FF4959] hover:bg-[#b82231] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition w-full sm:w-auto">
          <Save size={14} /> Save All Settings
        </button>
      </div>

    </div>
  );
};

export default AdminSettings;
