import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import {
  validateOnlyCharacters, validateEmail, validatePhoneGeneric,
  validatePincode, validateSelect,
  restrictToLetters, restrictToDigits,
  hasInvalidLetterChars, hasInvalidDigitChars,
  handlePasteLettersOnly, handlePasteDigitsOnly
} from '../../../hooks/validation';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const fieldStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '44px', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: 'white', backgroundColor: '#0b1120', WebkitTextFillColor: 'white' };
const fieldClass = "w-full border border-white/20 pr-4 placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors appearance-none";
const errorClass = "text-red-400 text-xs mt-1";

const Step3SubjectDetails = forwardRef(({ formData, handleInputChange }, ref) => {
  const [errors, setErrors] = useState({});

  const runValidate = (name, value) => {
    if (name === 'subjectEntityName') return validateOnlyCharacters(value, 'Entity Name');
    if (name === 'subjectContact') return value ? validatePhoneGeneric(value) : '';
    if (name === 'subjectEmail') return value ? validateEmail(value) : '';
    if (name === 'subjectPincode') return value ? validatePincode(value) : '';
    if (name === 'subjectCity') return validateOnlyCharacters(value, 'City');
    if (name === 'subjectState') return validateOnlyCharacters(value, 'State');
    if (name === 'relationshipToSubject') return validateSelect(value, 'Relationship to Subject');
    if (name === 'subjectType') return validateSelect(value, 'Subject Type');
    return '';
  };

  const validate = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: runValidate(name, value) }));
  };

  useImperativeHandle(ref, () => ({
    validateAll: () => {
      const fields = ['subjectEntityName', 'subjectCity', 'subjectState', 'relationshipToSubject', 'subjectType'];
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

  const handleLetterChange = (e) => {
    const raw = e.target.value;
    if (hasInvalidLetterChars(raw)) {
      setErrors(prev => ({ ...prev, [e.target.name]: 'Please enter only letters' }));
    }
    const cleaned = restrictToLetters(raw);
    handleInputChange({ target: { name: e.target.name, value: cleaned } });
    if (!hasInvalidLetterChars(raw)) validate(e.target.name, cleaned);
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    if (hasInvalidDigitChars(raw)) {
      setErrors(prev => ({ ...prev, [e.target.name]: 'Please enter only numbers' }));
    }
    const cleaned = restrictToDigits(raw, 10);
    handleInputChange({ target: { name: e.target.name, value: cleaned } });
    if (!hasInvalidDigitChars(raw)) validate(e.target.name, cleaned);
  };

  const handlePincodeChange = (e) => {
    const raw = e.target.value;
    if (hasInvalidDigitChars(raw)) {
      setErrors(prev => ({ ...prev, [e.target.name]: 'Only digits are allowed' }));
    }
    const cleaned = restrictToDigits(raw, 6);
    handleInputChange({ target: { name: e.target.name, value: cleaned } });
    if (!hasInvalidDigitChars(raw)) validate(e.target.name, cleaned);
  };

  const handleChange = (e) => {
    handleInputChange(e);
    validate(e.target.name, e.target.value);
  };

  const selectStyleNoPad = { ...fieldStyle, paddingLeft: '16px' };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div className="space-y-2">
        <label style={labelStyle}>Entity Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="subjectEntityName" placeholder="Enter Name" style={fieldStyle} className={fieldClass}
            value={formData.subjectEntityName || ''} onChange={handleLetterChange}
            onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'subjectEntityName', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.subjectEntityName && <p className={errorClass}>{errors.subjectEntityName}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Known Contact Information (if any)</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="tel" name="subjectContact" placeholder="Phone number" style={fieldStyle} className={fieldClass}
            value={formData.subjectContact || ''} onChange={handlePhoneChange}
            onPaste={e => handlePasteDigitsOnly(e, 10, v => handleInputChange({ target: { name: 'subjectContact', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.subjectContact && <p className={errorClass}>{errors.subjectContact}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="email" name="subjectEmail" placeholder="Enter Email ID" style={fieldStyle} className={fieldClass}
            value={formData.subjectEmail || ''} onChange={handleChange}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.subjectEmail && <p className={errorClass}>{errors.subjectEmail}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Pincode</label>
        <input type="text" name="subjectPincode" placeholder="Enter Pincode" style={{ ...fieldStyle, paddingLeft: '16px' }} className={fieldClass}
          value={formData.subjectPincode || ''} onChange={handlePincodeChange}
          onPaste={e => handlePasteDigitsOnly(e, 6, v => handleInputChange({ target: { name: 'subjectPincode', value: v } }))}
          onBlur={e => validate(e.target.name, e.target.value)} />
        {errors.subjectPincode && <p className={errorClass}>{errors.subjectPincode}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>City / Village</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="subjectCity" placeholder="Enter City / Village" style={fieldStyle} className={fieldClass}
            value={formData.subjectCity || ''} onChange={handleLetterChange}
            onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'subjectCity', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.subjectCity && <p className={errorClass}>{errors.subjectCity}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>State</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="subjectState" placeholder="Enter State" style={fieldStyle} className={fieldClass}
            value={formData.subjectState || ''} onChange={handleLetterChange}
            onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'subjectState', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.subjectState && <p className={errorClass}>{errors.subjectState}</p>}
      </div>

      <div className="space-y-2 md:col-span-2 lg:col-span-3">
        <label style={labelStyle}>Relationship to Subject</label>
        <select name="relationshipToSubject" style={selectStyleNoPad} className={fieldClass}
          value={formData.relationshipToSubject || ''} onChange={handleChange}
          onBlur={e => validate(e.target.name, e.target.value)}>
          <option value="" style={{ backgroundColor: '#0b1120', color: '#6B7280' }}>Select (Self / Employee / Client / Other)</option>
          <option value="Self" style={{ backgroundColor: '#0b1120' }}>Self</option>
          <option value="Employee" style={{ backgroundColor: '#0b1120' }}>Employee</option>
          <option value="Client" style={{ backgroundColor: '#0b1120' }}>Client</option>
          <option value="Other" style={{ backgroundColor: '#0b1120' }}>Other</option>
        </select>
        {errors.relationshipToSubject && <p className={errorClass}>{errors.relationshipToSubject}</p>}
      </div>

      <div className="space-y-2 md:col-span-2 lg:col-span-3">
        <label style={labelStyle}>Subject Type</label>
        <select name="subjectType" style={selectStyleNoPad} className={fieldClass}
          value={formData.subjectType || ''} onChange={handleChange}
          onBlur={e => validate(e.target.name, e.target.value)}>
          <option value="" style={{ backgroundColor: '#0b1120', color: '#6B7280' }}>Select (Individual / Company / Property / Digital Identity)</option>
          <option value="Individual" style={{ backgroundColor: '#0b1120' }}>Individual</option>
          <option value="Company" style={{ backgroundColor: '#0b1120' }}>Company</option>
          <option value="Property" style={{ backgroundColor: '#0b1120' }}>Property</option>
          <option value="Digital Identity" style={{ backgroundColor: '#0b1120' }}>Digital Identity</option>
        </select>
        {errors.subjectType && <p className={errorClass}>{errors.subjectType}</p>}
      </div>

    </div>
  );
});

export default Step3SubjectDetails;
