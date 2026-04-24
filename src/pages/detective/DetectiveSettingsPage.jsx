import { useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";

/* ── Toggle ── */
function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
        on ? "bg-red-600" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-md transition-all duration-200 ${
          on ? "left-[23px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}


/* ── Section Card ── */
function Card({ children, danger = false }) {
  return (
    <div
      className={`rounded-xl p-5 md:p-6 mb-4 ${
        danger
          ? "bg-[#1a2235] border border-red-700/40"
          : "bg-[#1a2235] border border-white/[0.05]"
      }`}
    >
      {children}
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-slate-300 text-sm leading-none">{icon}</span>
        <h2 className="text-white text-sm font-semibold leading-none">{title}</h2>
      </div>
      <p className="text-gray-500 text-[12px] pl-6">{subtitle}</p>
    </div>
  );
}

/* ── Row divider ── */
const RowDivider = () => <div className="border-t border-white/[0.05]" />;

/* ── Toggle Row ── */
function ToggleRow({ icon, label, desc, on, onChange, first = false }) {
  return (
    <>
      {!first && <RowDivider />}
      <div className="flex items-center justify-between py-3.5">
        <div className="flex items-start gap-2.5 flex-1 min-w-0 pr-4">
          {icon && (
            <span className="text-gray-500 mt-0.5 flex-shrink-0">{icon}</span>
          )}
          <div className="min-w-0">
            <p className="text-[#e2e8f0] text-[13px] font-medium leading-snug">{label}</p>
            <p className="text-gray-500 text-[11px] mt-0.5 leading-snug">{desc}</p>
          </div>
        </div>
        <Toggle on={on} onChange={onChange} />
      </div>
    </>
  );
}

/* ── Select Row ── */
function SelectRow({ label, desc, value, options, onChange, first = false, pillIcon }) {
  return (
    <>
      {!first && <RowDivider />}
      <div className="flex items-center justify-between py-3.5">
        <div className="min-w-0 pr-4">
          <p className="text-[#e2e8f0] text-[13px] font-medium leading-snug">{label}</p>
          <p className="text-gray-500 text-[11px] mt-0.5 leading-snug">{desc}</p>
        </div>
        {/* Pill Select */}
        <div className="relative flex items-center flex-shrink-0">
          {pillIcon && (
            <span className="absolute left-2.5 text-[13px] pointer-events-none z-10">
              {pillIcon}
            </span>
          )}
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none bg-[#242d3f] text-white text-[13px] border border-white/10 rounded-lg focus:outline-none focus:border-white/20 cursor-pointer pr-7"
            style={{
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: pillIcon ? 30 : 12,
              paddingRight: 28,
              minWidth: 110,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
            }}
          >
            {options.map((o) => (
              <option key={o} value={o} className="bg-[#242d3f]">
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

/* ── Lock SVG ── */
const LockIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* ── Bell SVG ── */
const BellIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/* ── Shield SVG ── */
const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ── Mail SVG ── */
const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* ── Phone SVG ── */
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

/* ── Save Icon ── */
const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function DetectiveSettingsPage() {
  const [theme,            setTheme]            = useState("Dark");
  const [language,         setLanguage]         = useState("English");
  const [emailNotifs,      setEmailNotifs]      = useState(true);
  const [pushNotifs,       setPushNotifs]       = useState(true);
  const [caseUpdates,      setCaseUpdates]      = useState(true);
  const [weeklyReports,    setWeeklyReports]    = useState(false);
  const [twoFactor,        setTwoFactor]        = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#121F27" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 ">

        {/* ── Page Title ── */}
        <div className="mb-7">
          <h1 className="text-white text-[22px] font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500 text-[13px] mt-1">Manage your application preferences</p>
        </div>

        {/* ══════════════
            APPEARANCE
        ══════════════ */}
        <Card>
          <SectionHeader
            icon={<span className="text-base"><MdOutlineLightMode /></span>}
            title="Appearance"
            subtitle="Customize the look and feel of the application"
          />
          <SelectRow
            first
            label="Theme"
            desc="Choose your preferred color scheme"
            value={theme}
            options={["Dark", "Light", "System"]}
            onChange={setTheme}
            pillIcon=<IoMoonOutline />
            />
          <SelectRow
            label="Language"
            desc="Select your preferred language"
            value={language}
            options={["English", "Hindi", "Spanish", "French", "German"]}
            onChange={setLanguage}
          />
        </Card>

        {/* ══════════════
            NOTIFICATIONS
        ══════════════ */}
        <Card>
          <SectionHeader
            icon={<BellIcon />}
            title="Notifications"
            subtitle="Configure how you receive notifications"
          />
          <ToggleRow
            first
            icon={<MailIcon />}
            label="Email Notifications"
            desc="Receive notifications via email"
            on={emailNotifs}
            onChange={setEmailNotifs}
          />
          <ToggleRow
            icon={<PhoneIcon />}
            label="Push Notifications"
            desc="Receive push notifications on your device"
            on={pushNotifs}
            onChange={setPushNotifs}
          />
          <ToggleRow
            label="Case Updates"
            desc="Get notified when case status changes"
            on={caseUpdates}
            onChange={setCaseUpdates}
          />
          <ToggleRow
            label="Weekly Reports"
            desc="Receive weekly summary reports"
            on={weeklyReports}
            onChange={setWeeklyReports}
          />
        </Card>

        {/* ══════════════════
            PRIVACY & SECURITY
        ══════════════════ */}
        <Card>
          <SectionHeader
            icon={<ShieldIcon />}
            title="Privacy & Security"
            subtitle="Manage your privacy and security settings"
          />
          <ToggleRow
            first
            icon={<LockIcon color="#6b7280" />}
            label="Two-Factor Authentication"
            desc="Add an extra layer of security to your account"
            on={twoFactor}
            onChange={setTwoFactor}
          />
          <ToggleRow
            label="Location Tracking"
            desc="Allow admin to track your location during cases"
            on={locationTracking}
            onChange={setLocationTracking}
          />
          {/* Change Password row */}
          <div className="mt-3.5 pt-3.5 border-t border-white/[0.05]">
            <button className="w-full flex items-center gap-2.5 bg-[#242d3f] hover:bg-[#2a3449] transition-colors border border-white/[0.06] rounded-lg px-4 py-3 cursor-pointer text-left">
              <LockIcon color="#9ca3af" />
              <span className="text-[#e2e8f0] text-[13px] font-medium">Change Password</span>
            </button>
          </div>
        </Card>

        {/* ══════════════
            DANGER ZONE
        ══════════════ */}
        <Card danger>
          <h2 className="text-red-500 text-[14px] font-semibold mb-1">Danger Zone</h2>
          <p className="text-gray-500 text-[12px] mb-4">Irreversible actions</p>
          <button className="w-full bg-red-700 hover:bg-red-800 active:bg-red-900 transition-colors text-white text-[14px] font-medium rounded-lg py-3 cursor-pointer">
            Delete Account
          </button>
        </Card>

        {/* ══════════════
            SAVE BUTTON
        ══════════════ */}
        <div className="flex justify-center mt-2">
          <button className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-700 active:bg-red-800 transition-colors text-white text-[14px] font-medium rounded-lg px-7 py-3 cursor-pointer">
            <SaveIcon />
            Save All Settings
          </button>
        </div>

      </div>
    </div>
  );
}