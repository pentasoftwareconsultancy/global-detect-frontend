import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { validateTextarea } from '../../../hooks/validation';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const textareaStyle = { borderRadius: '14px', borderWidth: '2px', padding: '14px', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: 'white', backgroundColor: '#0b1120', WebkitTextFillColor: 'white', minHeight: '112px', maxHeight: '160px' };
const textareaClass = "w-full border border-white/20 placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors resize-none";
const errorClass = "text-red-400 text-xs mt-1";

const Step5CaseDescription = forwardRef(({ formData, handleInputChange }, ref) => {
  const [errors, setErrors] = useState({});

  const runValidate = (name, value) => {
    if (name === 'detailedDescription') return validateTextarea(value, 'Detailed Case Description', 30);
    if (name === 'keyQuestions') return validateTextarea(value, 'Key Questions', 10);
    if (name === 'expectedOutcome') return validateTextarea(value, 'Expected Outcome', 10);
    return '';
  };

  const validate = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: runValidate(name, value) }));
  };

  useImperativeHandle(ref, () => ({
    validateAll: () => {
      const fields = ['detailedDescription', 'keyQuestions', 'expectedOutcome'];
      const newErrors = {};
      let valid = true;
      fields.forEach(f => {
        const err = runValidate(f, formData[f] || '');
        newErrors[f] = err;
        if (err) valid = false;
      });
      setErrors(newErrors);
      return valid;
    }
  }));

  const handleChange = (e) => {
    handleInputChange(e);
    validate(e.target.name, e.target.value);
  };

  return (
    <div className="space-y-6">

      <div className="space-y-2">
        <label style={labelStyle}>Detailed Case Description</label>
        <textarea name="detailedDescription" placeholder="Write here" style={textareaStyle} className={textareaClass} value={formData.detailedDescription || ''} onChange={handleChange} onBlur={e => validate(e.target.name, e.target.value)} />
        {errors.detailedDescription && <p className={errorClass}>{errors.detailedDescription}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Key Questions to be Answered</label>
        <textarea name="keyQuestions" placeholder="Write here" style={textareaStyle} className={textareaClass} value={formData.keyQuestions || ''} onChange={handleChange} onBlur={e => validate(e.target.name, e.target.value)} />
        {errors.keyQuestions && <p className={errorClass}>{errors.keyQuestions}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Expected Outcome</label>
        <textarea name="expectedOutcome" placeholder="Write here" style={textareaStyle} className={textareaClass} value={formData.expectedOutcome || ''} onChange={handleChange} onBlur={e => validate(e.target.name, e.target.value)} />
        {errors.expectedOutcome && <p className={errorClass}>{errors.expectedOutcome}</p>}
      </div>

    </div>
  );
});

export default Step5CaseDescription;
