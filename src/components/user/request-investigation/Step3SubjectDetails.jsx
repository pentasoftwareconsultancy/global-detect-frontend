import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const inputStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '44px' };
const inputClass = "w-full bg-transparent border border-white/20 pr-4 text-white placeholder:text-gray-500 placeholder:font-normal focus:outline-none focus:border-white transition-colors";

const Step3SubjectDetails = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div className="space-y-2">
        <label style={labelStyle}>Entity Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" name="subjectEntityName" placeholder="Enter Name" style={inputStyle} className={inputClass} value={formData.subjectEntityName || ''} onChange={handleInputChange} />
        </div>
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Known Contact Information (if any)</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="tel" name="subjectContact" placeholder="Phone number" style={inputStyle} className={inputClass} value={formData.subjectContact || ''} onChange={handleInputChange} />
        </div>
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="email" name="subjectEmail" placeholder="Enter Email ID" style={inputStyle} className={inputClass} value={formData.subjectEmail || ''} onChange={handleInputChange} />
        </div>
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Pincode</label>
        <input type="text" name="subjectPincode" placeholder="Enter Pincode" style={{ ...inputStyle, paddingLeft: '16px' }} className={inputClass} value={formData.subjectPincode || ''} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>City / Village</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="subjectCity" style={inputStyle} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.subjectCity || ''} onChange={handleInputChange}>
            <option value="">Select City / Village</option>
            <option value="City1">City 1</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>State</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="subjectState" style={inputStyle} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.subjectState || ''} onChange={handleInputChange}>
            <option value="">Select State</option>
            <option value="State1">State 1</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 md:col-span-2 lg:col-span-3">
        <label style={labelStyle}>Relationship to Subject</label>
        <select name="relationshipToSubject" style={{ ...inputStyle, paddingLeft: '16px' }} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.relationshipToSubject || ''} onChange={handleInputChange}>
          <option value="">Select (Self / Employee / Client / Other)</option>
          <option value="Self">Self</option>
          <option value="Employee">Employee</option>
          <option value="Client">Client</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2 md:col-span-2 lg:col-span-3">
        <label style={labelStyle}>Subject Type</label>
        <select name="subjectType" style={{ ...inputStyle, paddingLeft: '16px' }} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.subjectType || ''} onChange={handleInputChange}>
          <option value="">Select (Individual / Company / Property / Digital Identity)</option>
          <option value="Individual">Individual</option>
          <option value="Company">Company</option>
          <option value="Property">Property</option>
          <option value="Digital Identity">Digital Identity</option>
        </select>
      </div>

    </div>
  );
};

export default Step3SubjectDetails;
