import React from 'react';

const Step5CaseDescription = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      {/* Detailed Case Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Detailed Case Description</label>
        <textarea
          name="detailedDescription"
          placeholder="Write here"
          className="w-full bg-transparent border border-white/20 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors min-h-[120px] resize-none"
          value={formData.detailedDescription || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* Key questions to be answered */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Key questions to be answered</label>
        <textarea
          name="keyQuestions"
          placeholder="Write here"
          className="w-full bg-transparent border border-white/20 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors min-h-[120px] resize-none"
          value={formData.keyQuestions || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* Expected Outcome */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Expected Outcome</label>
        <textarea
          name="expectedOutcome"
          placeholder="Write here"
          className="w-full bg-transparent border border-white/20 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors min-h-[120px] resize-none"
          value={formData.expectedOutcome || ''}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Step5CaseDescription;
