import React, { useState, useEffect } from "react";
import {
  MdEmail,
  MdPhoneAndroid,
  MdFolder,
  MdLock,
  MdLanguage,
  MdDelete,
  MdSave,
  MdWarning,
  MdWbSunny,
  MdChevronRight,
  MdNightlight,
  MdLightMode,
} from "react-icons/md";

const rowLabelStyle = {
  fontFamily: "Montserrat",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "14px",
  letterSpacing: 0,
};

const sectionTitleStyle = {
  fontFamily: "Montserrat",
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "16px",
  letterSpacing: 0,
};

// ─── Toggle ───────────────────────────────────────────────────────────────────
const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative flex-shrink-0 w-11 h-6 rounded-full p-[2px] transition-colors duration-300 focus:outline-none ${enabled ? "bg-red-500" : "bg-gray-600"
      }`}
  >
    <div
      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-5" : "translate-x-0"
        }`}
    />
  </button>
);

// ─── Bordered Select Button ───────────────────────────────────────────────────
const BorderedSelect = ({ value, onChange, options, icons }) => {
  const [open, setOpen] = useState(false);
  const CurrentIcon = icons?.[value];

  return (
    <div className="relative">
      {/* Trigger — bordered pill */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#0d1820] border border-[#2a3a48] rounded-lg px-3 py-1.5 cursor-pointer focus:outline-none hover:border-gray-500 transition-colors duration-200"
        style={rowLabelStyle}
      >
        {CurrentIcon && (
          <CurrentIcon size={14} className="text-gray-400 flex-shrink-0" />
        )}
        <span className="text-gray-300">{value}</span>
        <MdChevronRight
          size={15}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"
            }`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 min-w-[140px] bg-[#1a2832] border border-[#2a3a48] rounded-lg overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            {options.map((opt) => {
              const OptIcon = icons?.[opt];
              return (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 border-none cursor-pointer transition-colors duration-150 ${value === opt
                    ? "bg-[#2a3a48] text-white"
                    : "bg-transparent text-gray-400 hover:bg-[#2a3a48] hover:text-white"
                    }`}
                  style={rowLabelStyle}
                >
                  {OptIcon && <OptIcon size={14} className="flex-shrink-0" />}
                  {opt}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Section Card ─────────────────────────────────────────────────────────────
const Section = ({ title, subtitle, children }) => (
  <div className="bg-[#1A2832] border border-[#2a3a48] rounded-xl p-4 sm:p-6 mb-5">
    <h2 className="text-white mb-1.5" style={sectionTitleStyle}>
      {title}
    </h2>
    <p className="text-gray-500 text-xs font-['Montserrat'] mb-5">{subtitle}</p>
    {children}
  </div>
);

// ─── Row Item ─────────────────────────────────────────────────────────────────
const RowItem = ({ icon, label, desc, right, noBorder = false }) => (
  <div
    className={`flex items-center justify-between py-3.5 ${!noBorder ? "border-b border-[#2a3a48]" : ""
      }`}
  >
    <div className="flex items-center gap-3 min-w-0">
      <span className="text-gray-400 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-white" style={rowLabelStyle}>
          {label}
        </p>
        <p className="text-gray-500 text-[11px] font-['Montserrat'] mt-1 leading-tight">
          {desc}
        </p>
      </div>
    </div>
    <div className="flex-shrink-0 ml-4">{right}</div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const UserSettingsPage = () => {
  const [theme, setTheme] = useState("Dark");
  const [language, setLanguage] = useState("English");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [caseUpdates, setCaseUpdates] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  const themeIcons = {
    Dark: MdNightlight,
    Light: MdLightMode,
  };

  const languageIcons = {
    English: MdLanguage,
    Hindi: MdLanguage,
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);


  return (
    <div className="w-full font-['Montserrat'] p-0 m-0">

      {/* Page Header */}
      <div className="mb-7">
        <h1 className="font-['Montserrat'] font-medium text-2xl leading-[21px] tracking-normal text-white mb-1">
          Settings
        </h1>
        <p className="text-[#9CA3AF] font-['Montserrat'] font-normal text-base leading-6 tracking-normal">
          Manage your application preferences
        </p>
      </div>

      {/* ── Appearance ── */}
      <Section
        title="Appearance"
        subtitle="Customize the look and feel of the application"
      >
        {/* Theme */}
        <div className="flex items-center justify-between py-3.5 border-b border-[#2a3a48]">
          <div className="flex items-center gap-3">
            <MdWbSunny size={16} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-white" style={rowLabelStyle}>
                Theme
              </p>
              <p className="text-gray-500 text-[11px] font-['Montserrat'] mt-1 leading-tight">
                Choose your preferred color scheme
              </p>
            </div>
          </div>
          <BorderedSelect
            value={theme}
            onChange={setTheme}
            options={["Dark", "Light"]}
            icons={themeIcons}
          />
        </div>

        {/* Language */}
        <div className="flex items-center justify-between py-3.5">
          <div className="flex items-center gap-3">
            <MdLanguage size={16} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-white" style={rowLabelStyle}>
                Language
              </p>
              <p className="text-gray-500 text-[11px] font-['Montserrat'] mt-1 leading-tight">
                Select your preferred language
              </p>
            </div>
          </div>
          <BorderedSelect
            value={language}
            onChange={setLanguage}
            options={["English", "Hindi"]}
            icons={languageIcons}
          />
        </div>
      </Section>

      {/* ── Notifications ── */}
      <Section
        title="Notifications"
        subtitle="Configure how you receive notifications"
      >
        <RowItem
          icon={<MdEmail size={16} />}
          label="Email Notifications"
          desc="Receive notifications via email"
          right={<Toggle enabled={emailNotif} onChange={setEmailNotif} />}
        />
        <RowItem
          icon={<MdPhoneAndroid size={16} />}
          label="Push Notifications"
          desc="Receive push notifications on your device"
          right={<Toggle enabled={pushNotif} onChange={setPushNotif} />}
        />
        <RowItem
          icon={<MdFolder size={16} />}
          label="Case Updates"
          desc="Get notified when case status changes"
          right={<Toggle enabled={caseUpdates} onChange={setCaseUpdates} />}
          noBorder
        />
      </Section>

      {/* ── Privacy & Security ── */}
      <Section
        title="Privacy & Security"
        subtitle="Manage your privacy and security settings"
      >
        <RowItem
          icon={<MdLock size={16} />}
          label="Two-Factor Authentication"
          desc="Add an extra layer of security to your account"
          right={<Toggle enabled={twoFA} onChange={setTwoFA} />}
        />
        <button
          onClick={() => alert("Redirect to change password")}
          className="w-full text-left bg-[#0d1820] hover:bg-[#151e2a] text-white px-4 py-3 rounded-lg border border-[#2a3a48] transition-colors duration-200 mt-4 flex items-center gap-2.5 cursor-pointer"
          style={rowLabelStyle}
        >
          <MdLock size={15} className="text-gray-400 flex-shrink-0" />
          Change Password
        </button>
      </Section>

      {/* ── Danger Zone ── */}
      <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <MdWarning size={18} className="text-red-500 flex-shrink-0" />
          <h2 className="text-red-500" style={sectionTitleStyle}>
            Danger Zone
          </h2>
        </div>
        <p className="text-gray-500 text-xs font-['Montserrat'] mb-4">
          Irreversible actions
        </p>
        <button
          onClick={() =>
            window.confirm("Are you sure you want to delete your account?") &&
            alert("Account deleted!")
          }
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer border-none"
          style={rowLabelStyle}
        >
          <MdDelete size={15} />
          Delete Account
        </button>
      </div>

      {/* ── Save ── */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => alert("Settings saved successfully!")}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg cursor-pointer border-none"
          style={rowLabelStyle}
        >
          <MdSave size={16} />
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default UserSettingsPage;