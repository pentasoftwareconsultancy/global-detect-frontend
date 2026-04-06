import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const Step3SubjectDetails = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Entity Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Entity Name</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <User size={18} />
          </span>
          <input
            type="text"
            name="subjectEntityName"
            placeholder="Enter Name"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.subjectEntityName || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Known Contact Information */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Known Contact Information (if any)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Phone size={18} />
          </span>
          <input
            type="tel"
            name="subjectContact"
            placeholder="Phone number"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.subjectContact || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email Address</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail size={18} />
          </span>
          <input
            type="email"
            name="subjectEmail"
            placeholder="Enter Email ID"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.subjectEmail || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Pincode */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Pincode</label>
        <input
          type="text"
          name="subjectPincode"
          placeholder="Enter Pincode"
          className="w-full bg-transparent border border-white/20 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
          value={formData.subjectPincode || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* City/ Village */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">City/ Village</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <MapPin size={18} />
          </span>
          <select
            name="subjectCity"
            className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white transition-colors appearance-none"
            value={formData.subjectCity || ''}
            onChange={handleInputChange}
          >
            <option value="">Select City/ Village</option>
            <option value="City1">City 1</option>
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
            name="subjectState"
            className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white transition-colors appearance-none"
            value={formData.subjectState || ''}
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

      {/* Relationship to Subject */}
      <div className="space-y-2 lg:col-span-2">
        <label className="text-sm font-medium text-gray-300">Relationship to Subject (Self / Employee / Client / Other)</label>
        <select
          name="relationshipToSubject"
          className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-white transition-colors appearance-none"
          value={formData.relationshipToSubject || ''}
          onChange={handleInputChange}
        >
          <option value="">Select subject</option>
          <option value="Self">Self</option>
          <option value="Employee">Employee</option>
          <option value="Client">Client</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Subject Type */}
      <div className="space-y-2 lg:col-span-2">
        <label className="text-sm font-medium text-gray-300">Subject Type (Individual / Company / Property / Digital Identity)</label>
        <select
          name="subjectType"
          className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-white transition-colors appearance-none"
          value={formData.subjectType || ''}
          onChange={handleInputChange}
        >
          <option value="">Select type</option>
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
