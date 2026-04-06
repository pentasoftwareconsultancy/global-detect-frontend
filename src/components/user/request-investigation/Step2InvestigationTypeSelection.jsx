import React from 'react';

const Step2InvestigationTypeSelection = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Purpose of Investigation */}
      <div className="space-y-2 flex flex-col h-full">
        <label className="text-sm font-medium text-gray-300">Purpose of Investigation (Short text)</label>
        <textarea
          name="purpose"
          placeholder="Write here"
          className="w-full bg-transparent border border-white/20 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors min-h-[160px] resize-none flex-grow"
          value={formData.purpose || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* Investigation type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Investigation type</label>
        <div className="relative">
          <select
            name="investigationType"
            className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-white transition-colors appearance-none"
            value={formData.investigationType || ''}
            onChange={handleInputChange}
          >
            <option value="">Select Investigation type</option>
            <option value="Personal">Personal</option>
            <option value="Corporate">Corporate</option>
            <option value="Legal">Legal</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2InvestigationTypeSelection;
