import React, { useState, useEffect } from 'react';
import { Mail, Phone, User as UserIcon } from 'lucide-react';
import { MdSave } from 'react-icons/md';
import { authService } from '../../core/services/auth.service';

const UserProfilePage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(true);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── 1. GET PROFILE ──
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await authService.getProfile();
      const data = res.data?.data || {};
      setFormData({ name: data.name ?? '', email: data.email ?? '', phone: data.phone ?? '' });
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  // ── 2. UPDATE PROFILE ──
  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await authService.updateProfile({ name: formData.name, email: formData.email, phone: formData.phone });
      setSaved(true);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err?.response?.data || err.message || err);
    } finally {
      setLoading(false);
    }
  };

  // ── 3. DELETE PROFILE ──
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      setLoading(true);
      await authService.deleteProfile();
      alert('Account deleted successfully');
      window.location.href = '/login';
    } catch (err) {
      console.error('Error deleting profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-['Montserrat'] text-white">
      <div className="w-full space-y-6">

        {/* ── PAGE TITLE ── */}
        <div>
          <h1 className="font-['Montserrat'] font-medium text-2xl leading-[21px] text-white">
            Profile
          </h1>
          <p className="font-['Montserrat'] font-normal text-base leading-6 text-[#9CA3AF] mt-1">
            Manage your account information
          </p>
        </div>

        {/* ── AVATAR CARD ── */}
        <div className="w-full bg-[#1A2832] rounded-xl" style={{ border: '0.67px solid #FFFFFF1A' }}>
          <div className="flex items-center gap-4 py-4 px-4 sm:px-6">
            <div className="w-24 h-24 rounded-full bg-[#FF4959] flex items-center justify-center flex-shrink-0">
              <span className="font-['Montserrat'] font-bold text-2xl text-white">
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Montserrat'] font-semibold text-lg leading-6 text-white truncate">
                {formData.name}
              </p>
              <p className="font-['Montserrat'] font-normal text-sm leading-5 text-[#9CA3AF] mt-1 truncate">
                {formData.email}
              </p>
            </div>
          </div>
        </div>

        {/* ── PERSONAL INFORMATION ── */}
        <div className="w-full bg-[#1A2832] rounded-xl" style={{ border: '0.67px solid #FFFFFF1A' }}>
          <div className="flex flex-col gap-4 p-4 sm:p-5">
            <div>
              <h3 className="font-['Montserrat'] font-medium text-base leading-4 text-[#F9FAFB]">
                Personal Information
              </h3>
              <p className="font-['Montserrat'] font-normal text-base leading-6 text-[#9CA3AF] mt-1">
                Update your personal details
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="font-['Montserrat'] font-medium text-xs text-white">Full Name</label>
                <div className="relative h-9">
                  <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                  <input
                    type="text" name="name" value={formData.name ?? ''}
                    onChange={handleInputChange} disabled={!isEditing}
                    className="w-full h-full bg-[#1A2832] font-['Montserrat'] text-sm text-white rounded-md pl-9 pr-3 py-1 focus:outline-none disabled:text-[#9CA3AF]"
                    style={{ border: '0.67px solid #FFFFFF1A' }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-['Montserrat'] font-medium text-xs text-white">Email Address</label>
                <div className="relative h-9">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                  <input
                    type="email" name="email" value={formData.email ?? ''}
                    onChange={handleInputChange} disabled={!isEditing}
                    className="w-full h-full bg-[#1A2832] font-['Montserrat'] text-sm text-white rounded-md pl-9 pr-3 py-1 focus:outline-none disabled:text-[#9CA3AF]"
                    style={{ border: '0.67px solid #FFFFFF1A' }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="font-['Montserrat'] font-medium text-xs text-white">Phone Number</label>
                <div className="relative h-9">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                  <input
                    type="tel" name="phone" value={formData.phone ?? ''}
                    onChange={handleInputChange} disabled={!isEditing}
                    className="w-full h-full bg-[#1A2832] font-['Montserrat'] text-sm text-white rounded-md pl-9 pr-3 py-1 focus:outline-none disabled:text-[#9CA3AF]"
                    style={{ border: '0.67px solid #FFFFFF1A' }}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {isEditing && (
              <div className="flex justify-end">
                <button
                  onClick={handleSaveChanges}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-[#FF4959] hover:bg-[#e03848] transition-colors font-['Montserrat'] font-medium text-sm leading-5 text-white disabled:opacity-60 cursor-pointer"
                  style={{ width: '155px' }}
                >
                  <MdSave size={15} />
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── ACCOUNT INFORMATION ── */}
        <div className="w-full bg-[#1A2832] rounded-xl" style={{ border: '0.67px solid #FFFFFF1A' }}>
          <div className="flex flex-col gap-3 px-6 py-6">
            <h3 className="font-['Montserrat'] font-medium text-base leading-4 text-[#F9FAFB]">
              Account Information
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-3 py-2">
                <span className="font-['Montserrat'] font-normal text-sm leading-5 text-[#9CA3AF]">Account ID</span>
                <span className="font-['Montserrat'] font-normal text-sm leading-5 text-[#9CA3AF]">user-2</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-3 py-2">
                <span className="font-['Montserrat'] font-normal text-sm leading-5 text-[#9CA3AF]">Role</span>
                <span className="font-['Montserrat'] font-normal text-sm leading-5 text-[#9CA3AF]">User</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfilePage;
