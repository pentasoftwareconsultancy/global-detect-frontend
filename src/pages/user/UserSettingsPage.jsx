import React, { useState } from "react";

const Toggle = ({ enabled, onChange }) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition duration-300 ${
        enabled ? "bg-red" : "bg-gray"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          enabled ? "translate-x-5" : ""
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
        <Section
          title="Appearance"
          subtitle="Customize the look and feel of the application"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <label className="text-white text-sm block mb-1">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-[#1a2330] text-white px-3 py-2 rounded-lg border border-[#2a3544] focus:outline-none"
              >
                <option>Dark</option>
                <option>Light</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="text-white text-sm block mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#1a2330] text-white px-3 py-2 rounded-lg border border-[#2a3544] focus:outline-none"
              >
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section
          title="Notifications"
          subtitle="Configure how you receive notifications"
        >
          {[{
            label: "Email Notifications",
            desc: "Receive notifications via email",
            state: emailNotif,
            setter: setEmailNotif,
          },
          {
            label: "Push Notifications",
            desc: "Receive push notifications on your device",
            state: pushNotif,
            setter: setPushNotif,
          },
          {
            label: "Case Updates",
            desc: "Get notified when case status changes",
            state: caseUpdates,
            setter: setCaseUpdates,
          }].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-[#1f2a36] last:border-none"
            >
              <div>
                <p className="text-white text-sm">{item.label}</p>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
              <Toggle
                enabled={item.state}
                onChange={item.setter}
              />
            </div>
          ))}
        </Section>

        {/* Privacy & Security */}
        <Section
          title="Privacy & Security"
          subtitle="Manage your privacy and security settings"
        >
          <div className="flex items-center justify-between py-3 border-b border-[#1f2a36]">
            <div>
              <p className="text-white text-sm">Two-Factor Authentication</p>
              <p className="text-gray-500 text-xs">
                Add an extra layer of security to your account
              </p>
            </div>
            <Toggle enabled={twoFA} onChange={setTwoFA} />
          </div>

          <button
            className="mt-4 w-full text-left bg-[#1a2330] hover:bg-[#243041] text-white px-4 py-2 rounded-lg border border-[#2a3544] transition"
            onClick={() => alert("Redirect to change password")}
          >
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
            className="bg-red hover:bg-[#b81f2c] text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
