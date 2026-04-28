import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { MapPin } from 'lucide-react';
import {
  validateSelect, validateAddress, validateOnlyCharacters,
  restrictToLetters, hasInvalidLetterChars, handlePasteLettersOnly
} from '../../../hooks/validation';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const fieldStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '44px', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: 'white', backgroundColor: '#0b1120', WebkitTextFillColor: 'white' };
const fieldClass = "w-full border border-white/20 pr-4 placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors appearance-none";
const errorClass = "text-red-400 text-xs mt-1";

const Step4InvestigationLocation = forwardRef(({ formData, handleInputChange }, ref) => {
  const [errors, setErrors] = useState({});

  const runValidate = (name, value) => {
    if (name === 'locationType') return validateSelect(value, 'Location Type');
    if (name === 'locationState') return validateOnlyCharacters(value, 'State');
    if (name === 'locationCity') return validateOnlyCharacters(value, 'City');
    if (name === 'locationAddress') return validateAddress(value);
    return '';
  };

  const validate = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: runValidate(name, value) }));
  };

  useImperativeHandle(ref, () => ({
    validateAll: () => {
      const fields = ['locationType', 'locationState', 'locationCity', 'locationAddress'];
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

  const handleChange = (e) => {
    handleInputChange(e);
    validate(e.target.name, e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="space-y-2">
        <label style={labelStyle}>Location Type</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <select name="locationType" style={fieldStyle} className={fieldClass}
            value={formData.locationType || ''} onChange={handleChange}
            onBlur={e => validate(e.target.name, e.target.value)}>
            <option value="" style={{ backgroundColor: '#0b1120', color: '#6B7280' }}>Physical / Online</option>
            <option value="Physical" style={{ backgroundColor: '#0b1120' }}>Physical</option>
            <option value="Online" style={{ backgroundColor: '#0b1120' }}>Online</option>
          </select>
        </div>
        {errors.locationType && <p className={errorClass}>{errors.locationType}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>State</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="locationState" placeholder="Enter State" style={fieldStyle} className={fieldClass}
            value={formData.locationState || ''} onChange={handleLetterChange}
            onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'locationState', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.locationState && <p className={errorClass}>{errors.locationState}</p>}
      </div>

      <div className="space-y-2">
        <label style={labelStyle}>City</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="locationCity" placeholder="Enter City" style={fieldStyle} className={fieldClass}
            value={formData.locationCity || ''} onChange={handleLetterChange}
            onPaste={e => handlePasteLettersOnly(e, v => handleInputChange({ target: { name: 'locationCity', value: v } }))}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.locationCity && <p className={errorClass}>{errors.locationCity}</p>}
      </div>

      <div className="md:col-span-3 space-y-2">
        <label style={labelStyle}>Address</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input type="text" name="locationAddress" placeholder="eg- build 12, flat- 4, locality, area, landmark" style={fieldStyle} className={fieldClass}
            value={formData.locationAddress || ''} onChange={handleChange}
            onBlur={e => validate(e.target.name, e.target.value)} />
        </div>
        {errors.locationAddress && <p className={errorClass}>{errors.locationAddress}</p>}
      </div>

    </div>
  );
});

export default Step4InvestigationLocation;
