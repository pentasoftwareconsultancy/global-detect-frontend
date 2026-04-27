import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepThreeDetectiveForm = ({
  data,
  handleChange,
}) => {
  const inputCls = "w-full px-4 py-3  border border-white rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#D92B3A] transition"
  const labelCls = "block text-sm text-gray-300 mb-1"
  return (
    <div>
      <div className="flex items-center gap-2 mb-1"><Briefcase size={18} className="text-[#D92B3A]" /><h3 className="text-base font-semibold">Professional Information</h3></div>
      <p className="text-sm text-gray-400 mb-6">Tell us about your detective credentials and experience</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>Detective License Number *</label>
          <input placeholder="DET-123456" value={data.professional.licenseNumber} onChange={e => handleChange('professional', 'licenseNumber', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Specialization *</label>
          <select value={data.professional.specialization} onChange={e => handleChange('professional', 'specialization', e.target.value)} className={inputCls}>
            <option value="">Select specialization</option>
            <option>Corporate Investigation</option>
            <option>Background Verification</option>
            <option>Cyber Investigation</option>
            <option>Field Investigation</option>
            <option>Surveillance</option>
            <option>Fraud Detection</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>License Issue Date *</label>
          <input type="date" value={data.professional.issueDate} onChange={e => handleChange('professional', 'issueDate', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>License Expiry Date *</label>
          <input type="date" value={data.professional.expiryDate} onChange={e => handleChange('professional', 'expiryDate', e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Years of Experience *</label>
          <select value={data.professional.experience} onChange={e => handleChange('professional', 'experience', e.target.value)} className={inputCls}>
            <option value="">Select experience</option>
            <option>0-1 years</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Previous Agency (if any)</label>
          <input placeholder="ABC Investigation Services" value={data.professional.previousAgency} onChange={e => handleChange('professional', 'previousAgency', e.target.value)} className={inputCls} />
        </div>
      </div>
    </div>
  )
}

export default StepThreeDetectiveForm