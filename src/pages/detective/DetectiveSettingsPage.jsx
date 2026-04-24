import React, { useState } from 'react';
import { Sun, Bell, Shield, Lock, Mail, Smartphone, Save, Trash2, Moon } from 'lucide-react';

const card = { background: '#1C2B35', borderRadius: '14px', padding: '24px', marginBottom: '16px' };
const divider = { borderBottom: '1px solid rgba(255,255,255,0.07)' };
const rowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' };

const Toggle = ({ value, onChange }) => (
  <div
    onClick={() => onChange(!value)}
    style={{
      width: '44px', height: '24px', borderRadius: '999px', cursor: 'pointer',
      background: value ? '#dc3545' : '#3a4651',
      position: 'relative', transition: 'background 0.2s', flexShrink: 0,
    }}
  >
    <div style={{
      position: 'absolute', top: '3px',
      left: value ? '23px' : '3px',
      width: '18px', height: '18px', borderRadius: '50%',
      background: '#fff', transition: 'left 0.2s',
    }} />
  </div>
);

const DetectiveSettingsPage = () => {
  const [theme, setTheme] = useState('Dark');
  const [language, setLanguage] = useState('English');
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [caseUpdates, setCaseUpdates] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);

  const selectStyle = {
    background: '#243340', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
    padding: '6px 32px 6px 12px', color: '#fff', fontSize: '13px', outline: 'none',
    cursor: 'pointer', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
  };

  return (
    <div className="bg-[#121F27] text-white min-h-screen px-3 sm:px-6 py-4 sm:py-6">

      {/* Page header */}
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-gray-400">Manage your application preferences</p>
      </div>

      {/* Appearance */}
      <div style={card}>
        <div className="flex items-center gap-2 mb-1">
          <Sun size={16} style={{ color: '#9ca3af' }} />
          <span className="font-semibold text-base">Appearance</span>
        </div>
        <p className="text-xs text-gray-400 mb-4">Customize the look and feel of the application</p>

        <div style={{ ...rowStyle, ...divider }}>
          <div>
            <p className="text-sm font-medium text-white">Theme</p>
            <p className="text-xs text-gray-400">Choose your preferred color scheme</p>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '130px' }}>
            <Moon size={13} style={{ color: '#9ca3af', position: 'absolute', left: '10px', pointerEvents: 'none', zIndex: 1 }} />
            <select value={theme} onChange={e => setTheme(e.target.value)} style={{ ...selectStyle, paddingLeft: '28px', width: '130px' }}>
              <option>Dark</option>
              <option>Light</option>
              <option>System</option>
            </select>
          </div>
        </div>

        <div style={rowStyle}>
          <div>
            <p className="text-sm font-medium text-white">Language</p>
            <p className="text-xs text-gray-400">Select your preferred language</p>
          </div>
          <select value={language} onChange={e => setLanguage(e.target.value)} style={{ ...selectStyle, width: '130px' }}>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div style={card}>
        <div className="flex items-center gap-2 mb-1">
          <Bell size={16} style={{ color: '#9ca3af' }} />
          <span className="font-semibold text-base">Notifications</span>
        </div>
        <p className="text-xs text-gray-400 mb-4">Configure how you receive notifications</p>

        {[
          { icon: <Mail size={14} style={{ color: '#9ca3af' }} />, label: 'Email Notifications', desc: 'Receive notifications via email', value: emailNotif, onChange: setEmailNotif },
          { icon: <Smartphone size={14} style={{ color: '#9ca3af' }} />, label: 'Push Notifications', desc: 'Receive push notifications on your device', value: pushNotif, onChange: setPushNotif },
          { label: 'Case Updates', desc: 'Get notified when case status changes', value: caseUpdates, onChange: setCaseUpdates },
          { label: 'Weekly Reports', desc: 'Receive weekly summary reports', value: weeklyReports, onChange: setWeeklyReports },
        ].map((item, i, arr) => (
          <div key={i} style={{ ...rowStyle, ...(i < arr.length - 1 ? divider : {}) }}>
            <div>
              <div className="flex items-center gap-2">
                {item.icon}
                <p className="text-sm font-medium text-white">{item.label}</p>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
            </div>
            <Toggle value={item.value} onChange={item.onChange} />
          </div>
        ))}
      </div>

      {/* Privacy & Security */}
      <div style={card}>
        <div className="flex items-center gap-2 mb-1">
          <Shield size={16} style={{ color: '#9ca3af' }} />
          <span className="font-semibold text-base">Privacy &amp; Security</span>
        </div>
        <p className="text-xs text-gray-400 mb-4">Manage your privacy and security settings</p>

        <div style={{ ...rowStyle, ...divider }}>
          <div>
            <div className="flex items-center gap-2">
              <Lock size={14} style={{ color: '#9ca3af' }} />
              <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Add an extra layer of security to your account</p>
          </div>
          <Toggle value={twoFactor} onChange={setTwoFactor} />
        </div>

        <div style={{ ...rowStyle, ...divider }}>
          <div>
            <p className="text-sm font-medium text-white">Location Tracking</p>
            <p className="text-xs text-gray-400 mt-0.5">Allow admin to track your location during cases</p>
          </div>
          <Toggle value={locationTracking} onChange={setLocationTracking} />
        </div>

        <div style={{ marginTop: '8px' }}>
          <button style={{ width: '100%', background: '#243340', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 16px', color: '#fff', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <Lock size={15} style={{ color: '#9ca3af' }} />
            Change Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ ...card, border: '1px solid rgba(220,53,69,0.4)', background: '#1C2B35' }}>
        <p className="font-semibold text-base mb-1" style={{ color: '#dc3545' }}>Danger Zone</p>
        <p className="text-xs text-gray-400 mb-4">Irreversible actions</p>
        <button style={{ width: '100%', background: '#dc3545', border: 'none', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Trash2 size={15} /> Delete Account
        </button>
      </div>

      {/* Save All Settings */}
      <div className="flex justify-center mt-2 mb-6">
        <button style={{ background: '#dc3545', border: 'none', borderRadius: '8px', padding: '10px 28px', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Save size={15} /> Save All Settings
        </button>
      </div>

    </div>
  );
};

export default DetectiveSettingsPage;
