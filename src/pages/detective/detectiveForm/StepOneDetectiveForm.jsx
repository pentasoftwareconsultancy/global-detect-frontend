import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield, Lock } from 'lucide-react'

const StepOneDetectiveForm = ({
  data,
  handleChange,
}) => {
  const inputCls = "w-full px-4 py-3  border border-white rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#D92B3A] transition"
  const labelCls = "block text-sm text-gray-300 mb-1"
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <User size={18} className="text-[#D92B3A]" />
        <h3 className="text-base font-semibold">Personal Information</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">Please provide your basic personal details</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>First Name *</label>
          <input placeholder="John" value={data.personal.firstName} onChange={e => handleChange('personal', 'firstName', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Last Name *</label>
          <input placeholder="Doe" value={data.personal.lastName} onChange={e => handleChange('personal', 'lastName', e.target.value)} className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>Date of Birth *</label>
          <input type="date" value={data.personal.dob} onChange={e => handleChange('personal', 'dob', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Gender *</label>
          <select value={data.personal.gender} onChange={e => handleChange('personal', 'gender', e.target.value)} className={inputCls}>
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Nationality *</label>
          <input placeholder="United States" value={data.personal.nationality} onChange={e => handleChange('personal', 'nationality', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Social Security Number *</label>
          <input placeholder="XXX-XX-XXXX" value={data.personal.ssn} onChange={e => handleChange('personal', 'ssn', e.target.value)} className={inputCls} />
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Lock size={10} /> Your information is encrypted and secure</p>
        </div>
      </div>
    </div>
  )
}

export default StepOneDetectiveForm