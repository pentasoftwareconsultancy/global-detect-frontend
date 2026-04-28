import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import {
  validateOnlyCharacters, validateEmail, validatePhoneGeneric,
  validatePincode, validateAddress, validateSelect,
  restrictToLetters, restrictToDigits,
  hasInvalidLetterChars, hasInvalidDigitChars,
  handlePasteLettersOnly, handlePasteDigitsOnly
} from '../../../hooks/validation';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const fieldStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '44px', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: 'white', backgroundColor: '#0b1120', WebkitTextFillColor: 'white' };
const fieldClass = "w-full border border-white/20 pr-4 placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors";
const errorClass = "text-red-400 text-xs mt-1";

const Step1BasicContactInformation = forwardRef(({ formData, handleInputChange }, ref) => {
  const [errors, setErrors] = useState({});

  const runValidate = (name, value) => {
    if (name === 'name') return validateOnlyCharacters(value, 'Full Name');
    if (name === 'email') return validateEmail(value);
    if (name === 'phone') return validatePhoneGeneric(value);
    if (name === 'pincode') return validatePincode(value);
    if (name === 'city') return validateOnlyCharacters(value, 'City');
    if (name === 'state') return validateOnlyCharacters(value, 'State');
    if (name === 'country') return validateOnlyCharacters(value, 'Country');
    if (name === 'preferredContactMethod') return validateSelect(value, 'Preferred Contact Method');
    if (name === 'address') return validateAddress(value);
    return '';
  };

  const validate = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: runValidate(name, value) }));
  };

  useImperativeHandle(ref, () => ({
    validateAll: () => {
      const fields = ['name', 'email', 'phone', 'pincode', 'city', 'state', 'country', 'preferredContactMethod', 'address'];
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5">

      <div className="space-y-2">
        <label style={labelStyle}>Full Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="name" placeholder="Enter Name" style={fieldStyle} className={fieldClass}
            value={formData.name || ''} onChange={handleLetterChange}
            onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'name', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="email" name="email" placeholder="Enter Email ID" style={fieldStyle} className={fieldClass}
            value={formData.email || ''} onChange={handleChange}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="tel" name="phone" placeholder="Phone number" style={fieldStyle} className={fieldClass}
            value={formData.phone || ''} onChange={handlePhoneChange}
            onPaste={e => handlePasteDigitsOnly(e, 10, v => handleInputChange({ target: { name: 'phone', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Pincode</label>
        <div className="relative">
          <input type="text" name="pincode" placeholder="Enter Pincode" style={{ ...fieldStyle, paddingLeft: '16px' }} className={fieldClass}
            value={formData.pincode || ''} onChange={handlePincodeChange}
            onPaste={e => handlePasteDigitsOnly(e, 6, v => handleInputChange({ target: { name: 'pincode', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.pincode && <p className={errorClass}>{errors.pincode}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>City / Village</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="city" placeholder="Enter City / Village" style={fieldStyle} className={fieldClass}
            value={formData.city || ''} onChange={handleLetterChange}
            onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'city', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.city && <p className={errorClass}>{errors.city}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>State</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="state" placeholder="Enter State" style={fieldStyle} className={fieldClass}
            value={formData.state || ''} onChange={handleLetterChange}
            onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'state', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.state && <p className={errorClass}>{errors.state}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Country</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="country" placeholder="Enter Country" style={fieldStyle} className={fieldClass}
            value={formData.country || ''} onChange={handleLetterChange}
            onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'country', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.country && <p className={errorClass}>{errors.country}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>Preferred Contact Method</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="preferredContactMethod" style={fieldStyle} className={fieldClass + ' appearance-none'}
            value={formData.preferredContactMethod || ''} onChange={handleChange}
            onBlur={e => validate(e.target.name, e.target.value)}>
            <option value="" style={{ backgroundColor: '#0b1120', color: '#6B7280' }}>Select Contact Method</option>
            <option value="Call" style={{ backgroundColor: '#0b1120' }}>Call</option>
            <option value="WhatsApp" style={{ backgroundColor: '#0b1120' }}>WhatsApp</option>
            <option value="Email" style={{ backgroundColor: '#0b1120' }}>Email</option>
          </select>
        </div>
        {errors.preferredContactMethod && <p className={errorClass}>{errors.preferredContactMethod}</p>}
      </div>

      <div className="md:col-span-2 lg:col-span-3 space-y-2">
        <label style={labelStyle}>Address</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="address" placeholder="eg- build 12, flat- 4, locality, area, landmark" style={fieldStyle} className={fieldClass}
            value={formData.address || ''} onChange={handleChange}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.address && <p className={errorClass}>{errors.address}</p>}
      </div>

    </div>
  );
});

export default Step1BasicContactInformation;
