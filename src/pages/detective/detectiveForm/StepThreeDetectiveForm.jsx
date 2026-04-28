import React from 'react'
import { Briefcase } from 'lucide-react'
import { formatLicenseNumber, validateLicenseNumber, validateSelect, validateLicenseIssueDate, validateLicenseExpiryDate } from '../../../hooks/validation'

const StepThreeDetectiveForm = ({ data, handleChange, errors = {}, setErrors }) => {
  const inputCls = (err) => `w-full px-4 py-3 bg-[#1A2832] border ${err ? 'border-[#D92B3A]' : 'border-white/50'} rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D92B3A] transition`
  const labelCls = "block text-sm text-gray-300 mb-2"
  const errCls = "text-xs text-[#D92B3A] mt-1"

  const clear = (key) => setErrors(prev => { const c = { ...prev }; delete c[key]; return c })
  const set = (key, msg) => setErrors(prev => ({ ...prev, [key]: msg }))

  const today = new Date().toISOString().split('T')[0]

  const onIssueDateChange = (val) => {
    handleChange('professional', 'issueDate', val)
    const err = validateLicenseIssueDate(val)
    err ? set('issueDate', err) : clear('issueDate')
    // re-validate expiry against new issue date instantly
    if (data.professional.expiryDate) {
      const expiryErr = validateLicenseExpiryDate(data.professional.expiryDate, val)
      expiryErr ? set('expiryDate', expiryErr) : clear('expiryDate')
    }
  }

  const onExpiryDateChange = (val) => {
    handleChange('professional', 'expiryDate', val)
    const err = validateLicenseExpiryDate(val, data.professional.issueDate)
    err ? set('expiryDate', err) : clear('expiryDate')
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Briefcase size={18} className="text-[#D92B3A]" />
        <h3 className="text-base font-semibold">Professional Information</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">Tell us about your detective credentials and experience</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>Detective License Number *</label>
          <input
            placeholder="DET-123456"
            value={data.professional.licenseNumber}
            onChange={e => {
              const val = formatLicenseNumber(e.target.value)
              handleChange('professional', 'licenseNumber', val)
              const err = validateLicenseNumber(val)
              err ? set('licenseNumber', err) : clear('licenseNumber')
            }}
            maxLength={20}
            className={inputCls(errors.licenseNumber)}
          />
          {errors.licenseNumber
            ? <p className={errCls}>{errors.licenseNumber}</p>
            : <p className="text-xs text-gray-500 mt-1">Format: alphanumeric with hyphens (e.g. DET-123456)</p>
          }
        </div>
        <div>
          <label className={labelCls}>Specialization *</label>
          <select
            value={data.professional.specialization}
            onChange={e => {
              handleChange('professional', 'specialization', e.target.value)
              const err = validateSelect(e.target.value, 'specialization')
              err ? set('specialization', err) : clear('specialization')
            }}
            className={inputCls(errors.specialization)}
          >
            <option value="">Select specialization</option>
            <option>Corporate Investigation</option>
            <option>Background Verification</option>
            <option>Cyber Investigation</option>
            <option>Field Investigation</option>
            <option>Surveillance</option>
            <option>Fraud Detection</option>
          </select>
          {errors.specialization && <p className={errCls}>{errors.specialization}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>License Issue Date *</label>
          <input
            type="date"
            value={data.professional.issueDate}
            onChange={e => onIssueDateChange(e.target.value)}
            max={today}
            className={inputCls(errors.issueDate)}
          />
          {errors.issueDate && <p className={errCls}>{errors.issueDate}</p>}
        </div>
        <div>
          <label className={labelCls}>License Expiry Date *</label>
          <input
            type="date"
            value={data.professional.expiryDate}
            onChange={e => onExpiryDateChange(e.target.value)}
            min={data.professional.issueDate || today}
            className={inputCls(errors.expiryDate)}
          />
          {errors.expiryDate && <p className={errCls}>{errors.expiryDate}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Years of Experience *</label>
          <select
            value={data.professional.experience}
            onChange={e => {
              handleChange('professional', 'experience', e.target.value)
              const err = validateSelect(e.target.value, 'experience')
              err ? set('experience', err) : clear('experience')
            }}
            className={inputCls(errors.experience)}
          >
            <option value="">Select experience</option>
            <option>0-1 years</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </select>
          {errors.experience && <p className={errCls}>{errors.experience}</p>}
        </div>
        <div>
          <label className={labelCls}>Previous Agency (if any)</label>
          <input
            placeholder="ABC Investigation Services"
            value={data.professional.previousAgency}
            onChange={e => handleChange('professional', 'previousAgency', e.target.value)}
            className={inputCls(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default StepThreeDetectiveForm
