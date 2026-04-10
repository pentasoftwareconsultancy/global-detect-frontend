import React from 'react';
import { MapPin } from 'lucide-react';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const inputStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '44px' };
const inputClass = "w-full bg-transparent border border-white/20 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors";

const Step4InvestigationLocation = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="space-y-2">
        <label style={labelStyle}>Location Type</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="locationType" style={inputStyle} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.locationType || ''} onChange={handleInputChange}>
            <option value="">Physical / Online</option>
            <option value="Physical">Physical</option>
            <option value="Online">Online</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>State</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="locationState" style={inputStyle} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.locationState || ''} onChange={handleInputChange}>
            <option value="">Select State</option>
            <option value="State1">State 1</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>City</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="locationCity" style={inputStyle} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.locationCity || ''} onChange={handleInputChange}>
            <option value="">Select City</option>
            <option value="City1">City 1</option>
          </select>
        </div>
      </div>

      <div className="md:col-span-3 space-y-2">
        <label style={labelStyle}>Address</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" name="locationAddress" placeholder="eg- build 12, flat- 4, locality, area, landmark" style={inputStyle} className={inputClass} value={formData.locationAddress || ''} onChange={handleInputChange} />
        </div>
      </div>

    </div>
  );
};

export default Step4InvestigationLocation;
