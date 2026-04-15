import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';


const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const inputStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '44px' };
const inputClass = "w-full bg-transparent border border-white/20 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors placeholder:font-normal";

const Step1BasicContactInformation = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5">

      {/* Full Name */}
      <div className="space-y-2">
        <label style={labelStyle}>Full Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" name="name" placeholder="Enter Name" style={inputStyle} className={inputClass} value={formData.name || ''} onChange={handleInputChange} />
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <label style={labelStyle}>Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="email" name="email" placeholder="Enter Email ID" style={inputStyle} className={inputClass} value={formData.email || ''} onChange={handleInputChange} />
        </div>
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label style={labelStyle}>Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="tel" name="phone" placeholder="Phone number" style={inputStyle} className={inputClass} value={formData.phone || ''} onChange={handleInputChange} />
        </div>
      </div>

      {/* Pincode */}
      <div className="space-y-2">
        <label style={labelStyle}>Pincode</label>
        <div className="relative">
          <input type="text" name="pincode" placeholder="Enter Pincode" style={{ ...inputStyle, paddingLeft: '16px' }} className={inputClass} value={formData.pincode || ''} onChange={handleInputChange} />
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label style={labelStyle}>City / Village</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="city" style={{ ...inputStyle }} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.city || ''} onChange={handleInputChange}>
            <option value="">Select City / Village</option>
            <option value="City1">City 1</option>
            <option value="City2">City 2</option>
          </select>
        </div>
      </div>

      {/* State */}
      <div className="space-y-2">
        <label style={labelStyle}>State</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="state" style={{ ...inputStyle }} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.state || ''} onChange={handleInputChange}>
            <option value="">Select State</option>
            <option value="State1">State 1</option>
            <option value="State2">State 2</option>
          </select>
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <label style={labelStyle}>Country</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="country" style={{ ...inputStyle }} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.country || ''} onChange={handleInputChange}>
            <option value="">Select Country</option>
            <option value="India">India</option>
          </select>
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-2">
        <label style={labelStyle}>Preferred Contact Method</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" name="preferredContactMethod" placeholder="Call / Email / WhatsApp" style={inputStyle} className={inputClass} value={formData.preferredContactMethod || ''} onChange={handleInputChange} />
        </div>
      </div>

      {/* Address */}
      <div className="md:col-span-2 lg:col-span-3 space-y-2">
        <label style={labelStyle}>Address</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" name="address" placeholder="eg- build 12, flat- 4, locality, area, landmark" style={{ ...inputStyle, paddingLeft: '44px' }} className={inputClass} value={formData.address || ''} onChange={handleInputChange} />
        </div>
      </div>

    </div>
  );
};

export default Step1BasicContactInformation;
