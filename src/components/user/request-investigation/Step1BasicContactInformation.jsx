import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const Step1BasicContactInformation = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Full Name</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <User size={18} />
          </span>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.name || ''}
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
            name="email"
            placeholder="Enter Email ID"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.email || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Phone number</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Phone size={18} />
          </span>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.phone || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Pincode */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Pincode</label>
        <input
          type="text"
          name="pincode"
          placeholder="Enter Pincode"
          className="w-full bg-transparent border border-white/20 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
          value={formData.pincode || ''}
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
            name="city"
            className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white transition-colors appearance-none"
            value={formData.city || ''}
            onChange={handleInputChange}
          >
            <option value="">Select City/ Village</option>
            <option value="City1">City 1</option>
            <option value="City2">City 2</option>
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
            name="state"
            className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white transition-colors appearance-none"
            value={formData.state || ''}
            onChange={handleInputChange}
          >
            <option value="">Select State</option>
            <option value="State1">State 1</option>
            <option value="State2">State 2</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Country</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <MapPin size={18} />
          </span>
          <select
            name="country"
            className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white transition-colors appearance-none"
            value={formData.country || ''}
            onChange={handleInputChange}
          >
            <option value="">Select Country</option>
            <option value="Country1">Country 1</option>
            <option value="Country2">Country 2</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 leading-tight">
          Preferred Contact Method (Call / Email / WhatsApp)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Phone size={18} />
          </span>
          <input
            type="text"
            name="preferredContactMethod"
            placeholder="Type method"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.preferredContactMethod || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Address */}
      <div className="md:col-span-2 lg:col-span-3 space-y-2">
        <label className="text-sm font-medium text-gray-300">Address</label>
        <div className="relative">
          <span className="absolute left-4 top-4 text-gray-400">
            <MapPin size={18} />
          </span>
          <input
            type="text"
            name="address"
            placeholder="eg- build 12, flat- 4, locality, area, landmark"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.address || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1BasicContactInformation;
