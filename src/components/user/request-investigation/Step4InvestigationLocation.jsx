import React from 'react';
import { MapPin } from 'lucide-react';

const Step4InvestigationLocation = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Location Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Location Type</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <MapPin size={18} />
          </span>
          <select
            name="locationType"
            className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white transition-colors appearance-none"
            value={formData.locationType || ''}
            onChange={handleInputChange}
          >
            <option value="">Physical/ Online</option>
            <option value="Physical">Physical</option>
            <option value="Online">Online</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* State */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">State</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <MapPin size={18} />
          </span>
          <select
            name="locationState"
            className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white transition-colors appearance-none"
            value={formData.locationState || ''}
            onChange={handleInputChange}
          >
            <option value="">Select State</option>
            <option value="State1">State 1</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">City</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <MapPin size={18} />
          </span>
          <select
            name="locationCity"
            className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white transition-colors appearance-none"
            value={formData.locationCity || ''}
            onChange={handleInputChange}
          >
            <option value="">Select City</option>
            <option value="City1">City 1</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="md:col-span-3 space-y-2">
        <label className="text-sm font-medium text-gray-300">Address</label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-gray-400">
            <MapPin size={18} />
          </span>
          <input
            type="text"
            name="locationAddress"
            placeholder="eg- build 12, flat- 4, locality, area, landmark"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.locationAddress || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Step4InvestigationLocation;
