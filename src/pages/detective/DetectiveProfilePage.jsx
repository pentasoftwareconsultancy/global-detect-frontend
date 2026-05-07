import React, { useState } from 'react';
import { User, Mail, Phone, Briefcase, MapPin, Calendar, Save } from 'lucide-react';
import { authService } from "../../core/services/auth.service";
import { useEffect } from "react";
import { toast } from 'react-toastify';

const card = { background: '#1C2B35', borderRadius: '14px', padding: '24px', marginBottom: '16px' };
const fieldBox = { background: '#1C2B35', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#fff' };
const lbl = { fontSize: '13px', color: '#9ca3af', marginBottom: '6px'  };
const dividerRow = { borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' };


 const DetectiveProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [status, setStatus] = useState('');
  const [accountId, setAccountId] = useState('');
  const [role, setRole] = useState('');
  const [activeCases, setActiveCases] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await authService.getProfile();
      // Backend wraps response in data.data structure
      const data = res?.data?.data || res?.data || {};

      setName(data.name || ""); 
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setSpecialization(data.specialization || "");
      setStatus(data.status || "Available");
      setAccountId(data.account_id || "");
      setRole(data.role || "");
      setActiveCases(data.active_cases || 0);
      setCurrentLocation(data.current_location || null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const body = { name, email, phone, specialization };
      const res = await authService.updateProfile(body);

      // Check if response is successful (either res.success or res.data.success)
      if (res?.data?.success || res?.success) {
        toast.success("Profile updated successfully");
        // Refresh profile data
        fetchProfile();
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'D';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="bg-[#121F27] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }


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
            {getInitials(name)}
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{name || 'Detective'}</p>
            <p className="text-sm text-gray-400 mb-2">{email || 'N/A'}</p>
            <div className="flex items-center gap-2">
              <span style={{ background: '#2a3a47', borderRadius: '6px', padding: '2px 10px', fontSize: '12px', color: '#cbd5e1' }}>{role}</span>
              <span style={{ 
                background: status === 'Available' ? '#10b981' : '#dc3545', 
                borderRadius: '6px', 
                padding: '2px 10px', 
                fontSize: '12px', 
                color: '#fff', 
                fontWeight: '500' 
              }}>
                {status}
              </span>
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
            disabled={updating}
            style={{ 
              background: '#dc3545', 
              border: 'none', 
              borderRadius: '8px', 
              padding: '9px 20px', 
              color: '#fff', 
              fontSize: '14px', 
              fontWeight: '600', 
              cursor: updating ? 'not-allowed' : 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              opacity: updating ? 0.6 : 1
            }}
          >
            <Save size={15} /> {updating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Current Location */}
      <div style={card}>
        <p className="font-semibold text-base mb-1">Current Location</p>
        <p className="text-xs text-gray-400 mb-4">Your last known location</p>
        {currentLocation ? (
          <>
            <div className="flex items-start gap-2 mb-2">
              <MapPin size={16} style={{ color: '#dc3545', marginTop: '2px', flexShrink: 0 }} />
              <p className="text-sm font-semibold text-white">{currentLocation.address}</p>
            </div>
            <div style={{ paddingLeft: '24px' }}>
              {(currentLocation.latitude && currentLocation.longitude) && (
                <p className="text-xs text-gray-400">
                  Lat: {currentLocation.latitude} &nbsp;&nbsp; Lng: {currentLocation.longitude}
                </p>
              )}
              {currentLocation.last_updated && (
                <div className="flex items-center gap-1 mt-1">
                  <Calendar size={12} style={{ color: '#9ca3af' }} />
                  <p className="text-xs text-gray-400">Last updated: {formatDate(currentLocation.last_updated)}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400">No location data available</p>
        )}
      </div>

      {/* Account Information */}
      <div style={card}>
        <p className="font-semibold text-base mb-4">Account Information</p>
        <div style={{ maxWidth: '50%' }}>
          {[
            { label: 'Account ID', value: accountId || 'N/A' },
            { label: 'Role', value: role || 'Detective' },
            { label: 'Active Cases', value: activeCases.toString() },
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
