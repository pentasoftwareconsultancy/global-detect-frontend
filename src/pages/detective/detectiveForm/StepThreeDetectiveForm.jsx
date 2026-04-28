import React from 'react'
import { Briefcase } from 'lucide-react'

const StepThreeDetectiveForm = ({ data, handleChange, errors = {} }) => {
  const inputCls = (err) => `w-full px-4 py-3 bg-[#1A2832] border ${err ? 'border-[#D92B3A]' : 'border-white'} rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D92B3A] transition`
  const labelCls = "block text-sm text-gray-300 mb-2"
  const errCls = "text-xs text-[#D92B3A] mt-1"

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
          <input placeholder="DET-123456" value={data.professional.licenseNumber} onChange={e => handleChange('professional', 'licenseNumber', e.target.value)} className={inputCls(errors.licenseNumber)} />
          {errors.licenseNumber && <p className={errCls}>{errors.licenseNumber}</p>}
        </div>
        <div>
          <label className={labelCls}>Specialization *</label>
          <select value={data.professional.specialization} onChange={e => handleChange('professional', 'specialization', e.target.value)} className={inputCls(errors.specialization)}>
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
          <input type="date" value={data.professional.issueDate} onChange={e => handleChange('professional', 'issueDate', e.target.value)} className={inputCls(errors.issueDate)} />
          {errors.issueDate && <p className={errCls}>{errors.issueDate}</p>}
        </div>
        <div>
          <label className={labelCls}>License Expiry Date *</label>
          <input type="date" value={data.professional.expiryDate} onChange={e => handleChange('professional', 'expiryDate', e.target.value)} className={inputCls(errors.expiryDate)} />
          {errors.expiryDate && <p className={errCls}>{errors.expiryDate}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Years of Experience *</label>
          <select value={data.professional.experience} onChange={e => handleChange('professional', 'experience', e.target.value)} className={inputCls(errors.experience)}>
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
          <input placeholder="ABC Investigation Services" value={data.professional.previousAgency} onChange={e => handleChange('professional', 'previousAgency', e.target.value)} className={inputCls(false)} />
        </div>
      </div>
    </div>
  )
}

export default StepThreeDetectiveForm
