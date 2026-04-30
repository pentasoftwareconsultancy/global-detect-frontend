import React, { useState } from "react";
import {
  LuSettings, LuPalette, LuGlobe, LuBell, LuMail, LuSmartphone,
  LuRefreshCw, LuChartBar, LuShield, LuKey, LuLock, LuTriangleAlert,
  LuTrash2, LuSave, LuChevronDown,
} from "react-icons/lu";

/* ─────────────────────────────────────────────
   API-READY STATE
   Replace with API GET on mount, PATCH on save
───────────────────────────────────────────── */
const DEFAULT_SETTINGS = {
  language: "English",
  notifications: {
    email: true,
    push: false,
    caseUpdates: true,
    weeklyReports: false,
  },
  twoFactor: false,
};

/* ── Section card wrapper ── */
const SectionCard = ({ children, dangerTop }) => (
  <div
    className={`bg-[#1A2832] rounded-xl w-full ${
      dangerTop ? "border-t border-t-red-600" : ""
    }`}
    style={{ border: "0.67px solid #FFFFFF1A", ...(dangerTop && { borderTop: "0.67px solid #DC2626" }) }}
  >
    {children}
  </div>
);

/* ── Section header ── */
const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-3 px-6 pt-6 pb-5">
    <span className="text-[#9CA3AF] flex-shrink-0">{icon}</span>
    <div>
      <h2 className="font-['Montserrat'] font-medium text-sm leading-none text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="font-['Montserrat'] font-normal text-xs leading-4 text-[#9CA3AF] mt-1">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

/* ── Divider ── */
const Divider = () => (
  <div className="mx-6 h-px bg-white/10" />
);

/* ── Toggle ── */
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 cursor-pointer ${
      checked ? "bg-[#D92B3A]" : "bg-white/10"
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

/* ── Setting row with toggle ── */
const SettingRow = ({ icon, title, subtitle, right }) => (
  <div className="flex items-center justify-between gap-4 px-6 py-[18px]">
    <div className="flex items-center gap-3 min-w-0">
      <span className="text-[#9CA3AF] flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="font-['Montserrat'] font-medium text-sm leading-none text-white">
          {title}
        </p>
        {subtitle && (
          <p className="font-['Montserrat'] font-normal text-xs leading-4 text-[#9CA3AF] mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    <div className="flex-shrink-0">{right}</div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const AdminSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [langOpen, setLangOpen] = useState(false);

  const languages = ["English", "Marathi", "Hindi"];

  const setNotif = (key, val) =>
    setSettings((s) => ({ ...s, notifications: { ...s.notifications, [key]: val } }));

  // Replace with API PATCH call
  const handleSave = () => {
    console.log("Save settings payload:", settings);
    // await authService.updateAdminSettings(settings);
  };

  return (
    <div className="bg-[#0b1120] min-h-screen p-4 sm:p-6 font-['Montserrat'] text-white">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <LuSettings size={22} className="text-white flex-shrink-0" />
            <h1 className="font-['Montserrat'] font-medium text-2xl leading-9 text-white">
              Settings
            </h1>
          </div>
          <p className="font-['Montserrat'] font-normal text-base leading-6 text-[#9CA3AF]">
            Manage your application preferences
          </p>
        </div>
      </div>

      {/* ── SECTIONS ── */}
      <div className="flex flex-col gap-8">

        {/* ── APPEARANCE ── */}
        <SectionCard>
          <SectionTitle
            icon={<LuPalette size={16} />}
            title="Appearance"
            subtitle="Customize the look and feel of your dashboard"
          />
          <Divider />
          <SettingRow
            icon={<LuGlobe size={16} />}
            title="Language"
            subtitle="Select your preferred language"
            right={
              <div className="relative">
                <button
                  onClick={() => setLangOpen((o) => !o)}
                  className="flex items-center justify-between gap-2 w-32 h-9 px-3 rounded-md font-['Montserrat'] font-medium text-sm text-white bg-transparent hover:bg-white/5 transition-colors cursor-pointer"
                  style={{ border: "0.67px solid #FFFFFF1A" }}
                >
                  {settings.language}
                  <LuChevronDown size={14} className="text-[#9CA3AF]" />
                </button>
                {langOpen && (
                  <div
                    className="absolute right-0 top-10 z-20 w-32 bg-[#1A2832] rounded-lg overflow-hidden"
                    style={{ border: "0.67px solid #FFFFFF1A" }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setSettings((s) => ({ ...s, language: lang })); setLangOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-['Montserrat'] hover:bg-white/5 transition-colors cursor-pointer ${
                          settings.language === lang ? "text-[#D92B3A]" : "text-white"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            }
          />
        </SectionCard>

        {/* ── NOTIFICATIONS ── */}
        <SectionCard>
          <SectionTitle
            icon={<LuBell size={16} />}
            title="Notifications"
            subtitle="Manage how and when you receive notifications"
          />
          <Divider />
          <SettingRow
            icon={<LuMail size={16} />}
            title="Email Notifications"
            subtitle="Receive updates and alerts via email"
            right={<Toggle checked={settings.notifications.email} onChange={(v) => setNotif("email", v)} />}
          />
          <Divider />
          <SettingRow
            icon={<LuSmartphone size={16} />}
            title="Push Notifications"
            subtitle="Receive real-time push notifications"
            right={<Toggle checked={settings.notifications.push} onChange={(v) => setNotif("push", v)} />}
          />
          <Divider />
          <SettingRow
            icon={<LuRefreshCw size={16} />}
            title="Case Updates"
            subtitle="Get notified when case status changes"
            right={<Toggle checked={settings.notifications.caseUpdates} onChange={(v) => setNotif("caseUpdates", v)} />}
          />
          <Divider />
          <SettingRow
            icon={<LuChartBar size={16} />}
            title="Weekly Reports"
            subtitle="Receive weekly summary reports"
            right={<Toggle checked={settings.notifications.weeklyReports} onChange={(v) => setNotif("weeklyReports", v)} />}
          />
        </SectionCard>

        {/* ── PRIVACY & SECURITY ── */}
        <SectionCard>
          <SectionTitle
            icon={<LuShield size={16} />}
            title="Privacy & Security"
            subtitle="Manage your account security settings"
          />
          <Divider />
          <SettingRow
            icon={<LuKey size={16} />}
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of security to your account"
            right={
              <Toggle
                checked={settings.twoFactor}
                onChange={(v) => setSettings((s) => ({ ...s, twoFactor: v }))}
              />
            }
          />
          <Divider />
          <div className="px-6 py-[18px]">
            <button
              className="flex items-center justify-start gap-3 w-full h-9 px-4 rounded-md font-['Montserrat'] font-medium text-sm leading-5 text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              style={{ border: "0.67px solid #FFFFFF1A" }}
            >
              <LuLock size={16} className="text-[#9CA3AF] flex-shrink-0" />
              Change Password
            </button>
          </div>
        </SectionCard>

        {/* ── DANGER ZONE ── */}
        <div
          className="bg-[#1A2832] rounded-xl w-full"
          style={{ border: "0.67px solid #FFFFFF1A", borderTop: "0.67px solid #DC2626" }}
        >
          <SectionTitle
            icon={<LuTriangleAlert size={16} className="text-red-600" />}
            title="Danger Zone"
            subtitle="Irreversible and destructive actions"
          />
          <Divider />
          <div className="px-6 py-[18px]">
            <button
              className="flex items-center justify-center gap-2 h-9 px-4 rounded-md font-['Montserrat'] font-medium text-sm leading-5 text-white bg-red-600/10 hover:bg-red-600/20 transition-colors cursor-pointer"
              style={{ width: "207px", border: "0.67px solid #DC262633" }}
            >
              <LuTrash2 size={14} />
              Delete Account
            </button>
          </div>
        </div>

      </div>

      {/* ── SAVE BUTTON ── */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 bg-[#D92B3A] hover:bg-[#b0222f] transition-colors text-white font-['Montserrat'] font-medium text-sm leading-5 rounded-md h-10 cursor-pointer"
          style={{ width: '181px' }}
        >
          <LuSave size={14} />
          Save All Settings
        </button>
      </div>

    </div>
  );
};

export default AdminSettings;
