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
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 w-full sm:w-32 h-9 px-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer focus:outline-none font-['Montserrat'] font-medium text-sm text-white"
        style={{ border: '0.67px solid #FFFFFF1A' }}
      >
        <div className="flex items-center gap-2">
          {CurrentIcon && <CurrentIcon size={14} className="text-[#9CA3AF] flex-shrink-0" />}
          <span>{value}</span>
        </div>
        <MdChevronRight
          size={15}
          className={`text-[#9CA3AF] transition-transform duration-200 ${open ? "rotate-90" : "rotate-0"}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-1 z-20 w-32 bg-[#1A2832] rounded-lg overflow-hidden"
            style={{ border: '0.67px solid #FFFFFF1A' }}
          >
            {options.map((opt) => {
              const OptIcon = icons?.[opt];
              return (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 font-['Montserrat'] text-sm cursor-pointer transition-colors ${
                    value === opt ? "bg-white/10 text-white" : "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
                  }`}
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
  <div className="bg-[#1A2832] rounded-xl p-4 sm:p-6 mb-5" style={{ border: '0.67px solid #FFFFFF1A' }}>
    <h2 className="font-['Montserrat'] font-medium text-base leading-4 text-[#F9FAFB] mb-1.5">{title}</h2>
    <p className="font-['Montserrat'] font-normal text-base leading-6 text-[#9CA3AF] mb-5">{subtitle}</p>
    {children}
  </div>
);

// ─── Row Item ─────────────────────────────────────────────────────────────────
const RowItem = ({ icon, label, desc, right, noBorder = false }) => (
  <div className={`flex items-center justify-between py-3.5 ${!noBorder ? "border-b border-white/10" : ""}`}>
    <div className="flex items-center gap-3 min-w-0">
      <span className="text-[#9CA3AF] flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="font-['Montserrat'] font-medium text-sm leading-none text-white">{label}</p>
        <p className="font-['Montserrat'] font-normal text-xs leading-4 text-[#9CA3AF] mt-1">{desc}</p>
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
        <div className="flex items-center justify-between py-3.5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <MdWbSunny size={16} className="text-[#9CA3AF] flex-shrink-0" />
            <div>
              <p className="font-['Montserrat'] font-medium text-sm leading-none text-white">Theme</p>
              <p className="font-['Montserrat'] font-normal text-xs leading-4 text-[#9CA3AF] mt-1">Choose your preferred color scheme</p>
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
            <MdLanguage size={16} className="text-[#9CA3AF] flex-shrink-0" />
            <div>
              <p className="font-['Montserrat'] font-medium text-sm leading-none text-white">Language</p>
              <p className="font-['Montserrat'] font-normal text-xs leading-4 text-[#9CA3AF] mt-1">Select your preferred language</p>
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
          className="w-full h-9 text-left font-['Montserrat'] font-medium text-sm text-white bg-white/5 hover:bg-white/10 transition-colors mt-4 flex items-center gap-3 px-4 rounded-md cursor-pointer"
          style={{ border: '0.67px solid #FFFFFF1A' }}
        >
          <MdLock size={15} className="text-[#9CA3AF] flex-shrink-0" />
          Change Password
        </button>
      </Section>

      {/* ── Danger Zone ── */}
      <div
        className="bg-[#1A2832] rounded-xl p-4 sm:p-6 mb-6"
        style={{ border: '0.67px solid #FF4959' }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <MdWarning size={18} className="text-[#FF4959] flex-shrink-0" />
          <h2 className="font-['Montserrat'] font-medium text-base leading-4 text-[#FF4959]">Danger Zone</h2>
        </div>
        <p className="font-['Montserrat'] font-normal text-xs leading-4 text-[#9CA3AF] mb-4">Irreversible actions</p>
        <button
          onClick={() => window.confirm("Are you sure you want to delete your account?") && alert("Account deleted!")}
        className="h-9 px-4 rounded-md font-['Montserrat'] font-medium text-sm leading-5 text-white bg-red flex items-center gap-2 cursor-pointer transition-colors hover:opacity-90"
          style={{ border: '0.67px solid #FF495933', width: '207px' }}
        >
          <MdDelete size={15} />
          Delete Account
        </button>
      </div>

      {/* ── Save ── */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => alert("Settings saved successfully!")}
          className="flex items-center justify-center gap-2 bg-[#D92B3A] hover:bg-[#b0222f] transition-colors text-white font-['Montserrat'] font-medium text-sm leading-5 rounded-md h-10 cursor-pointer"
          style={{ width: '181px' }}
        >
          <MdSave size={16} />
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default UserSettingsPage;