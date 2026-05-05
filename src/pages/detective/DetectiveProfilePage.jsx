import React, { useState } from 'react';
import { User, Mail, Phone, Briefcase, MapPin, Calendar, Save } from 'lucide-react';
import { authService } from "../../core/services/auth.service";
import { useEffect } from "react";

const card = { background: '#1C2B35', borderRadius: '14px', padding: '24px', marginBottom: '16px' };
const fieldBox = { background: '#1C2B35', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#fff' };
const lbl = { fontSize: '13px', color: '#9ca3af', marginBottom: '6px'  };
const dividerRow = { borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' };


 const DetectiveProfilePage = () => {
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [specialization, setSpecialization] = useState('');

const fetchProfile = async () => {
  try {
    const res = await authService.getProfile();
    const data = res.data;

    setName(data.name || ""); 
    setEmail(data.email || "");
    setPhone(data.phone || "");
    setSpecialization(data.specialization || "");
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

useEffect(() => {
  fetchProfile();
}, []);

  const handleUpdateProfile = async () => {
    try {
      const body = { name, email, phone, specialization };
      const res = await authService.updateProfile(body);

      console.log("Profile updated:", res.data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  return (
    <div className="bg-[#121F27] text-white min-h-screen px-3 sm:px-6 py-4 sm:py-6 montserrat">

      {/* Page header */}
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-white">Profile</h1>
        <p className="text-sm text-gray-400">Manage your account information</p>
      </div>

      {/* Avatar card */}
      <div style={card}>
        <div className="flex items-center gap-4">
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dc3545', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
            D
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Detective Emma Watson</p>
            <p className="text-sm text-gray-400 mb-2">e.watson@detectiveagency.com</p>
            <div className="flex items-center gap-2">
              <span style={{ background: '#2a3a47', borderRadius: '6px', padding: '2px 10px', fontSize: '12px', color: '#cbd5e1' }}>Detective</span>
              <span style={{ background: '#dc3545', borderRadius: '6px', padding: '2px 10px', fontSize: '12px', color: '#fff', fontWeight: '500' }}>On Case</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div style={card}>
        <p className="font-semibold text-base mb-1">Personal Information</p>
        <p className="text-xs text-gray-400 mb-5">Update your personal details</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p style={lbl}>Full Name</p>
            <div style={fieldBox}>
              <User size={15} style={{ color: '#9ca3af', flexShrink: 0 }} />
              <input value={name} onChange={e => setName(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', width: '100%' }} />
            </div>
          </div>
          <div>
            <p style={lbl}>Email Address</p>
            <div style={fieldBox}>
              <Mail size={15} style={{ color: '#9ca3af', flexShrink: 0 }} />
              <input value={email} onChange={e => setEmail(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', width: '100%' }} />
            </div>
          </div>
          <div>
            <p style={lbl}>Phone Number</p>
            <div style={fieldBox}>
              <Phone size={15} style={{ color: '#9ca3af', flexShrink: 0 }} />
              <input value={phone} onChange={e => setPhone(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', width: '100%' }} />
            </div>
          </div>
          <div>
            <p style={lbl}>Specialization</p>
            <div style={fieldBox}>
              <Briefcase size={15} style={{ color: '#9ca3af', flexShrink: 0 }} />
              <input value={specialization} onChange={e => setSpecialization(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', width: '100%' }} />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={handleUpdateProfile}

           style={{ background: '#dc3545', border: 'none', borderRadius: '8px', padding: '9px 20px', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Save size={15} /> Save Changes
          </button>
        </div>
      </div>

      {/* Current Location */}
      <div style={card}>
        <p className="font-semibold text-base mb-1">Current Location</p>
        <p className="text-xs text-gray-400 mb-4">Your last known location</p>
        <div className="flex items-start gap-2 mb-2">
          <MapPin size={16} style={{ color: '#dc3545', marginTop: '2px', flexShrink: 0 }} />
          <p className="text-sm font-semibold text-white">123 Wall Street, New York, NY</p>
        </div>
        <div style={{ paddingLeft: '24px' }}>
          <p className="text-xs text-gray-400">Lat: 40.7128 &nbsp;&nbsp; Lng: -74.0060</p>
          <div className="flex items-center gap-1 mt-1">
            <Calendar size={12} style={{ color: '#9ca3af' }} />
            <p className="text-xs text-gray-400">Last updated: 1/31/2026, 10:30:00 AM</p>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div style={card}>
        <p className="font-semibold text-base mb-4">Account Information</p>
        <div style={{ maxWidth: '50%' }}>
          {[
            { label: 'Account ID', value: 'det-1' },
            { label: 'Role', value: 'Detective' },
            { label: 'Active Cases', value: '2' },
          ].map((item, i, arr) => (
            <div key={i} style={{ ...dividerRow, borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>{item.label}</span>
              <span style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};


export default DetectiveProfilePage;
