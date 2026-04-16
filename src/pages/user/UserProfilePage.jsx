import React, { useState } from 'react';
import { Mail, Phone, User as UserIcon } from 'lucide-react';

const UserProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+1-555-0102',
  });

  const [isEditing, setIsEditing] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSaved(false);
  };

  const handleSaveChanges = () => {
    setSaved(true);
  };

  return (
    <div className="h-screen bg-[#0b1120] text-white flex justify-center px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden" style={{ fontFamily: 'Montserrat' }}>
      
      <div className="w-full max-w-[1100px] mx-auto space-y-6 h-full overflow-hidden py-4">
        
        <div className="w-full">
          <h1 className="text-[22px] leading-[28px] font-semibold text-white">
            Profile
          </h1>

          <p className="text-[14px] leading-[20px] text-gray-400 mt-1">
            Manage your account information
          </p>
        </div>

        <div className="w-full bg-[#111827] rounded-[12px] border border-white/10" style={{ borderWidth: '0.67px' }}>
          <div className="flex items-center gap-4 py-4 px-4 sm:px-6">
            <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-[#D92B3A] to-[#a0202a] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px] leading-[28px] font-bold text-white">S</span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[18px] leading-[24px] font-semibold text-white truncate">
                {formData.fullName}
              </p>
              <p className="text-[14px] leading-[20px] text-gray-400 mt-1 truncate">
                {formData.email}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-[12px] border border-white/10" style={{ borderWidth: '0.67px' }}>
          <div className="w-full flex flex-col gap-4 p-4 sm:p-5">
            <div>
              <h3 className="text-[15px] leading-[22px] text-white font-semibold">
                Personal Information
              </h3>
              <p className="text-[16px] leading-[24px] text-gray-400 mt-2">
                Update your personal details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] leading-[18px] font-medium text-white">
                  Full Name
                </label>
                <div className="h-[44px] bg-[#0b1120] border border-white/10 rounded-xl flex items-center gap-3 px-3">
                  <UserIcon size={16} className="text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{ fontFamily: 'Montserrat', fontWeight: 400, fontStyle: 'normal', letterSpacing: '0px' }}
                    className="flex-1 bg-transparent text-white focus:outline-none disabled:text-gray-400 text-[13px] leading-[18px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] leading-[18px] font-medium text-white">
                  Email Address
                </label>
                <div className="h-[44px] bg-[#0b1120] border border-white/10 rounded-xl flex items-center gap-3 px-3">
                  <Mail size={16} className="text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{ fontFamily: 'Montserrat', fontWeight: 400, fontStyle: 'normal', letterSpacing: '0px' }}
                    className="flex-1 bg-transparent text-white focus:outline-none disabled:text-gray-400 text-[13px] leading-[18px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] leading-[18px] font-medium text-white">
                  Phone Number
                </label>
                <div className="h-[44px] bg-[#0b1120] border border-white/10 rounded-xl flex items-center gap-3 px-3">
                  <Phone size={16} className="text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{ fontFamily: 'Montserrat', fontWeight: 400, fontStyle: 'normal', letterSpacing: '0px' }}
                    className="flex-1 bg-transparent text-white focus:outline-none disabled:text-gray-400 text-[13px] leading-[18px]"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10 mt-1" />

            {isEditing && (
              <div className="flex justify-end">
                <button
                  onClick={handleSaveChanges}
                  className="w-auto h-[36px] bg-[#D92B3A] hover:bg-[#b0202a] text-white rounded-xl text-[14px] leading-[20px] px-5 transition-all"
                >
                  {saved ? 'Saved Changes' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full min-h-[160px] rounded-[12px] border border-white/10 p-0" style={{ borderWidth: '0.67px' }}>
          <div className="flex flex-col gap-3 px-6 py-6">
            <div>
              <h3 className="text-[16px] leading-[16px] text-white">
                Account Information
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 px-3 py-2">
                <span className="text-[14px] leading-[20px]" style={{ fontFamily: 'Montserrat', fontWeight: 400, fontStyle: 'normal', letterSpacing: '0px', color: '#9CA3AF' }}>
                  Account ID
                </span>
                <span className="text-[14px] leading-[20px]" style={{ fontFamily: 'Montserrat', fontWeight: 400, fontStyle: 'normal', letterSpacing: '0px', color: '#9CA3AF' }}>
                  user-2
                </span>
              </div>
              <div className="w-full h-[1px] bg-white/10 mt-0" style={{ background: '#FFFFFF1A' }} />

              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 px-3 py-2">
                <span className="text-[14px] leading-[20px]" style={{ fontFamily: 'Montserrat', fontWeight: 400, fontStyle: 'normal', letterSpacing: '0px', color: '#9CA3AF' }}>
                  Role
                </span>
                <span className="text-[14px] leading-[20px]" style={{ fontFamily: 'Montserrat', fontWeight: 400, fontStyle: 'normal', letterSpacing: '0px', color: '#9CA3AF' }}>
                  User
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfilePage;