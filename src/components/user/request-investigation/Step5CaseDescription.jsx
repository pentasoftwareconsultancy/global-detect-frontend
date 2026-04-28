import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { validateTextarea } from '../../../hooks/validation';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const textareaStyle = { borderRadius: '14px', borderWidth: '2px', padding: '14px', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: 'white', backgroundColor: '#0b1120', WebkitTextFillColor: 'white', minHeight: '112px' };
const textareaClass = "w-full border border-white/20 placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors resize-none";
const errorClass = "text-red-400 text-xs mt-1";

const MIN_LENGTHS = { detailedDescription: 30, keyQuestions: 10, expectedOutcome: 10 };

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

  const CharHint = ({ name }) => {
    const val = (formData[name] || '').trim();
    const min = MIN_LENGTHS[name];
    const remaining = min - val.length;
    if (errors[name]) return <p className={errorClass}>{errors[name]}</p>;
    if (val.length > 0 && remaining > 0)
      return <p className="text-yellow-400 text-xs mt-1">{remaining} more character{remaining !== 1 ? 's' : ''} needed</p>;
    if (val.length >= min)
      return <p className="text-green-400 text-xs mt-1">✓ Looks good</p>;
    return null;
  };

  return (
    <div className="space-y-6">

      <div className="space-y-2">
        <label style={labelStyle}>Detailed Case Description</label>
        <textarea name="detailedDescription" placeholder="Write here (min 30 characters)" style={textareaStyle} className={textareaClass}
          value={formData.detailedDescription || ''} onChange={handleChange}
          onBlur={e => validate(e.target.name, e.target.value)} />
        <CharHint name="detailedDescription" />
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Key Questions to be Answered</label>
        <textarea name="keyQuestions" placeholder="Write here (min 10 characters)" style={textareaStyle} className={textareaClass}
          value={formData.keyQuestions || ''} onChange={handleChange}
          onBlur={e => validate(e.target.name, e.target.value)} />
        <CharHint name="keyQuestions" />
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Expected Outcome</label>
        <textarea name="expectedOutcome" placeholder="Write here (min 10 characters)" style={textareaStyle} className={textareaClass}
          value={formData.expectedOutcome || ''} onChange={handleChange}
          onBlur={e => validate(e.target.name, e.target.value)} />
        <CharHint name="expectedOutcome" />
      </div>

    </div>
  );
});

export default Step5CaseDescription;
