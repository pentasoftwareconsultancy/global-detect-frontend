import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { MdPerson, MdEmail, MdPhone, MdWork } from 'react-icons/md';

const DetectiveProfilePage = () => {
  const [profileData] = useState({ 
    firstName: 'Emma',
    lastName: 'Watson',
    email: 'ewatson@detectiveagency.com',
    phone: '+1 90002 22202',
    fullName: 'Detective Emma Watson',
    specialization: 'Corporate Fraud',
    role: 'Detective',
    status: 'On Case',
    accountId: 'det-1',
    activeCases: 2,
    location: {
      address: '123 Wall Street, New York, NY',
      lat: 40.7728,
      lng: -73.9560,
      lastUpdated: '1/3/2026, 10:30:00 AM'
    }
  });

  const [formData] = useState(profileData);

  const initials = `${profileData.firstName[0]}${profileData.lastName[0]}`.toUpperCase();

  return (
    <div className="bg-[#0b1120] text-white min-h-screen overflow-x-hidden">

      {/* Content Area */}
      <div className="px-4 py-6 mx-auto w-full max-w-[1318px] space-y-6">
          {/* Profile Header */}
          <div className="w-full bg-[#1A2832] rounded-[12px] p-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D92B3A] to-[#bb2d3b] flex items-center justify-center text-white text-3xl font-bold shrink-0">
                {initials}
              </div>
              <div className="flex-1 py-2 lg:py-4">
                <h2 className="montserrat font-medium text-[20px] leading-[30px] text-white mb-1">
                  {profileData.fullName}
                </h2>
                <p className="text-gray-400 mb-3 text-sm sm:text-base">{profileData.email}</p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
                  <span className="px-3 py-1 bg-[#1f2937] text-gray-300 text-xs rounded">
                    {profileData.role}
                  </span>
                  <span className="px-3 py-1 bg-[#D92B3A] text-white text-xs rounded font-medium">
                    {profileData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="w-full bg-[#1A2832] rounded-[12px] p-6">
            <div className="max-w-[894.67px]">
              <h3 className="montserrat font-medium text-[16px] leading-[16px] text-white mb-2" style={{width: '172px', height: '16px'}}>Personal Information</h3>
              <p className="text-gray-400 text-sm mb-6" style={{width: '230px', height: '24px'}}>Update your personal details</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="montserrat font-medium text-[14px] leading-[14px] text-gray-300 mb-2" style={{width: '73px', height: '14px'}}>Full Name</label>
                <div className="flex items-center gap-2 w-full max-w-[415.33px] h-[36px] rounded-[12px] border border-[#2f3b45] bg-[#15202b] px-3">
                  <MdPerson size={18} className="text-[#D92B3A]" />
                  <span className="montserrat font-normal text-[14px] leading-[20px] text-white">{formData.fullName}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="montserrat font-medium text-[14px] leading-[14px] text-gray-300 mb-2">Email Address</label>
                <div className="flex items-center gap-2 w-full max-w-[415.33px] h-[36px] rounded-[12px] border border-[#2f3b45] bg-[#15202b] px-3 min-w-0">
                  <MdEmail size={18} className="text-[#D92B3A]" />
                  <span className="montserrat font-normal text-[14px] leading-[20px] text-white min-w-0 break-words">{formData.email}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="montserrat font-medium text-[14px] leading-[14px] text-gray-300 mb-2">Phone Number</label>
                <div className="flex items-center gap-2 w-full max-w-[415.33px] h-[36px] rounded-[12px] border border-[#2f3b45] bg-[#15202b] px-3 min-w-0">
                  <MdPhone size={18} className="text-[#D92B3A]" />
                  <span className="montserrat font-normal text-[14px] leading-[20px] text-white min-w-0 break-words">{formData.phone}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="montserrat font-medium text-[14px] leading-[14px] text-gray-300 mb-2" style={{width: '73px', height: '14px'}}>Specialization</label>
                <div className="flex items-center gap-2 w-full max-w-[415.33px] h-[36px] rounded-[12px] border border-[#2f3b45] bg-[#15202b] px-3">
                  <MdWork size={18} className="text-[#D92B3A]" />
                  <span className="montserrat font-normal text-[14px] leading-[20px] text-white">{formData.specialization}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[#2f3b45]" style={{width: '100%', maxWidth: '1269px', height: '1px'}}></div>
            <div className="flex justify-end mt-4">
              <button className="montserrat font-medium text-[14px] leading-[20px] text-center text-white bg-[#D92B3A] rounded-[6px] w-[155px] h-[36px] hover:bg-[#bb2d3b] transition">Save Changes</button>
            </div>
          </div>

          {/* Current Location */}
          <div className="w-full bg-[#1A2832] rounded-[12px] p-6">
            <div className="flex items-center gap-2 mb-2">
              
              <h3 className="montserrat font-medium text-[16px] leading-[16px] text-white">Current Location</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Your last known location</p>

            <div className="space-y-4">
              <div className="flex items-start gap-2 text-white">
                <MapPin size={16} className="text-[#D92B3A] mt-1" />
                <span className="text-sm sm:text-base">{profileData.location.address}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-300">
                <p>Lat: {profileData.location.lat}</p>
                <p>Lng: {profileData.location.lng}</p>
              </div>
              <p className="text-xs text-gray-500">Last updated: {profileData.location.lastUpdated}</p>
            </div>
          </div>

          {/* Account Information */}
          <div className="w-full bg-[#1A2832] rounded-[12px] p-6">
            <h3 className="montserrat font-medium text-[16px] leading-[16px] text-white mb-4">Account Information</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#2f3b45] pb-4 text-sm sm:text-base">
                <span className="text-gray-400">Account ID</span>
                <span className="text-white font-medium">{profileData.accountId}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#2f3b45] pb-4 text-sm sm:text-base">
                <span className="text-gray-400">Role</span>
                <span className="text-white font-medium">{profileData.role}</span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-400">Active Cases</span>
                <span className="text-white font-medium">{profileData.activeCases}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DetectiveProfilePage;