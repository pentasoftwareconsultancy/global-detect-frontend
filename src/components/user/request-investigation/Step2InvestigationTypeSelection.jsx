import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { validateOnlyCharacters, validateSelect, restrictToLetters, hasInvalidLetterChars, handlePasteLettersOnly } from '../../../hooks/validation';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const fieldStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '16px', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: 'white', backgroundColor: '#0b1120', WebkitTextFillColor: 'white' };
const fieldClass = "w-full border border-white/20 pr-4 placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors appearance-none";
const textareaStyle = { borderRadius: '14px', borderWidth: '2px', padding: '16px', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: 'white', backgroundColor: '#0b1120', WebkitTextFillColor: 'white', minHeight: '160px' };
const errorClass = "text-red-400 text-xs mt-1";

const Step2InvestigationTypeSelection = forwardRef(({ formData, handleInputChange }, ref) => {
  const [errors, setErrors] = useState({});

  const runValidate = (name, value) => {
    if (name === 'purpose') return validateOnlyCharacters(value, 'Purpose of Investigation');
    if (name === 'investigationType') return validateSelect(value, 'Investigation Type');
    return '';
  };

  const validate = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: runValidate(name, value) }));
  };

  useImperativeHandle(ref, () => ({
    validateAll: () => {
      const fields = ['purpose', 'investigationType'];
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

  const handlePurposeChange = (e) => {
    const raw = e.target.value;
    if (hasInvalidLetterChars(raw)) {
      setErrors(prev => ({ ...prev, purpose: 'Please enter only letters' }));
    }
    const cleaned = restrictToLetters(raw);
    handleInputChange({ target: { name: 'purpose', value: cleaned } });
    if (!hasInvalidLetterChars(raw)) validate('purpose', cleaned);
  };

  const handleChange = (e) => {
    handleInputChange(e);
    validate(e.target.name, e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      <div className="space-y-2 flex flex-col">
        <label style={labelStyle}>Purpose of Investigation</label>
        <textarea
          name="purpose"
          placeholder="Write here (letters only)"
          style={{ ...textareaStyle, height: 'auto' }}
          className="w-full border border-white/20 placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors resize-none flex-grow"
          value={formData.purpose || ''}
          onChange={handlePurposeChange}
          onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'purpose', value: v } }))}
          onBlur={e => validate(e.target.name, e.target.value)}
        />
        {errors.purpose && <p className={errorClass}>{errors.purpose}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Investigation Type</label>
        <select name="investigationType" style={fieldStyle} className={fieldClass}
          value={formData.investigationType || ''} onChange={handleChange}
          onBlur={e => validate(e.target.name, e.target.value)}>
          <option value="" style={{ backgroundColor: '#0b1120', color: '#6B7280' }}>Select Investigation type</option>
          <option value="Personal" style={{ backgroundColor: '#0b1120' }}>Personal</option>
          <option value="Corporate" style={{ backgroundColor: '#0b1120' }}>Corporate</option>
          <option value="Legal" style={{ backgroundColor: '#0b1120' }}>Legal</option>
        </select>
        {errors.investigationType && <p className={errorClass}>{errors.investigationType}</p>}
      </div>

    </div>
  );
});

export default Step2InvestigationTypeSelection;
