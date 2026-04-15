import React from 'react';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const textareaClass = "w-full bg-transparent border border-white/20 text-white placeholder:text-gray-500 placeholder:font-normal focus:outline-none focus:border-white transition-colors h-28 max-h-[160px] resize-none";
const textareaStyle = { borderRadius: '14px', borderWidth: '2px', padding: '14px' };

const Step5CaseDescription = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">

      <div className="space-y-2">
        <label style={labelStyle}>Detailed Case Description</label>
        <textarea name="detailedDescription" placeholder="Write here" style={textareaStyle} className={textareaClass} value={formData.detailedDescription || ''} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Key Questions to be Answered</label>
        <textarea name="keyQuestions" placeholder="Write here" style={textareaStyle} className={textareaClass} value={formData.keyQuestions || ''} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Expected Outcome</label>
        <textarea name="expectedOutcome" placeholder="Write here" style={textareaStyle} className={textareaClass} value={formData.expectedOutcome || ''} onChange={handleInputChange} />
      </div>

    </div>
  );
};

export default Step5CaseDescription;
