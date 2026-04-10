import React from 'react';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const inputStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '16px' };
const inputClass = "w-full bg-transparent border border-white/20 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors";

const Step2InvestigationTypeSelection = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Purpose of Investigation */}
      <div className="space-y-2 flex flex-col">
        <label style={labelStyle}>Purpose of Investigation</label>
        <textarea
          name="purpose"
          placeholder="Write here"
          style={{ borderRadius: '14px', borderWidth: '2px', padding: '16px' }}
          className="w-full bg-transparent border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors min-h-[160px] resize-none flex-grow"
          value={formData.purpose || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* Investigation Type */}
      <div className="space-y-2">
        <label style={labelStyle}>Investigation Type</label>
        <div className="relative">
          <select
            name="investigationType"
            style={inputStyle}
            className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none"
            value={formData.investigationType || ''}
            onChange={handleInputChange}
          >
            <option value="">Select Investigation type</option>
            <option value="Personal">Personal</option>
            <option value="Corporate">Corporate</option>
            <option value="Legal">Legal</option>
          </select>
        </div>
      </div>

    </div>
  );
};

export default Step2InvestigationTypeSelection;
