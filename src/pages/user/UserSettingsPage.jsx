import React, { useState, useEffect } from "react";
import { Moon, ChevronDown, Bell, Mail, Smartphone, Shield, Lock, Save } from "lucide-react";


const Toggle = ({ enabled, onChange }) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition duration-300 ${enabled ? "bg-red" : "bg-gray"
        }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${enabled ? "translate-x-5" : ""
          }`}
      />
    </button>
  );
};

const Section = ({ title, subtitle, children }) => (
  <div className="bg-[#0f1a24] border border-[#1f2a36] rounded-xl p-5 mb-5">
    <h2 className="text-white text-lg font-semibold mb-1">{title}</h2>
    <p className="text-gray-500 text-sm mb-4">{subtitle}</p>
    {children}
  </div>
);

const UserSettingsPage = () => {
  const [theme, setTheme] = useState("Dark");
  const [language, setLanguage] = useState("English");

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [caseUpdates, setCaseUpdates] = useState(true);

  const [twoFA, setTwoFA] = useState(false);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);


  return (
    <div className="min-h-screen bg-[#0b141c] p-4 md:p-8 montserrat">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-1">
          Settings
        </h1>
        <p className="text-gray-500 mb-6 text-sm md:text-base">
          Manage your application preferences
        </p>

        {/* Appearance */}
        <div className="bg-linear-to-r from-[#0f1a24] to-[#162734] border border-[#2a3544] rounded-xl p-5 w-full mb-8 ">

          {/* Header */}
          <div className="mb-5">
            <h2 className="text-white text-base font-semibold flex items-center gap-2">
              <span>⚙️</span> Appearance
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Customize the look and feel of the application
            </p>
          </div>

          {/* Row 1 - Theme */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white text-sm">Theme</p>
              <p className="text-gray-400 text-xs">
                Choose your preferred color scheme
              </p>
            </div>

            {/* Dropdown Button */}
            <div className="relative w-[110px]">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-[#1e2a36] text-white text-sm pl-8 pr-7 py-1.5 
          rounded-md border border-[#2f3b46] appearance-none 
          focus:outline-none cursor-pointer"
              >
                <option>Dark</option>
                <option>Light</option>
              </select>

              {/* Moon Icon */}
              <Moon
                size={14}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              {/* Arrow */}
              <ChevronDown
                size={14}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-[#2a3544]" />

          {/* Row 2 - Language */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white text-sm">Language</p>
              <p className="text-gray-400 text-xs">
                Select your preferred language
              </p>
            </div>

            {/* Dropdown Button */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#1a2330] text-white text-sm px-3 py-1.5 pr-8 rounded-lg border border-[#2a3544] appearance-none focus:outline-none cursor-pointer"
              >
                <option>English</option>
                <option>Hindi</option>
              </select>

              {/* Arrow */}
              <ChevronDown
                size={14}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

            </div>
          </div>
        </div>


        {/* Notifications */}
        <Section
          title="Notifications"
          subtitle="Configure how you receive notifications"
        >
          {[
            {
              label: "Email Notifications",
              desc: "Receive notifications via email",
              state: emailNotif,
              setter: setEmailNotif,
              icon: Mail,
            },
            {
              label: "Push Notifications",
              desc: "Receive push notifications on your device",
              state: pushNotif,
              setter: setPushNotif,
              icon: Smartphone,
            },
            {
              label: "Case Updates",
              desc: "Get notified when case status changes",
              state: caseUpdates,
              setter: setCaseUpdates,
              icon: Bell,
            },
          ].map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-[#1f2a36] last:border-none"
              >
                {/* LEFT SIDE (ICON + TEXT) */}
                <div className="flex items-start gap-3">
                  <Icon
                    size={16}
                    className="text-gray-400 mt-1"
                  />

                  <div>
                    <p className="text-white text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>

                {/* RIGHT SIDE (TOGGLE) */}
                <Toggle
                  enabled={item.state}
                  onChange={item.setter}
                />
              </div>
            );
          })}
        </Section>

        {/* Privacy & Security */}
        <Section
          title={
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-gray-300" />
              Privacy & Security
            </div>
          }
          subtitle="Manage your privacy and security settings"
        >
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between py-3 border-b border-[#1f2a36]">

            {/* LEFT SIDE (ICON + TEXT) */}
            <div className="flex items-start gap-3">
              <Lock size={16} className="text-gray-400 mt-1" />

              <div>
                <p className="text-white text-sm">Two-Factor Authentication</p>
                <p className="text-gray-500 text-xs">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>

            {/* TOGGLE */}
            <Toggle enabled={twoFA} onChange={setTwoFA} />
          </div>

          {/* Change Password Button */}
          <button
            className="mt-4 w-full flex items-center gap-2 bg-[#1a2330] hover:bg-[#243041] text-white px-4 py-2 rounded-lg border border-[#2a3544] transition"
            onClick={() => alert("Redirect to change password")}
          >
            <Lock size={16} className="text-gray-400" />
            Change Password
          </button>
        </Section>

        {/* Danger Zone */}
        <div className="border border-red rounded-xl p-5 mb-6">
          <h2 className="text-red font-semibold mb-1">Danger Zone</h2>
          <p className="text-gray-500 text-sm mb-4">
            Irreversible actions
          </p>
          <button
            onClick={() => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete your account?"
              );
              if (confirmDelete) {
                alert("Account deleted!");
              }
            }}
            className="bg-red hover:bg-[#b81f2c] text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Delete Account
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-red hover:bg-[#b81f2c] text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            <Save size={16} />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
