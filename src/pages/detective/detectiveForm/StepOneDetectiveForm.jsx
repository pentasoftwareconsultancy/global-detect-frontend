import React from 'react'
import { User, Lock } from 'lucide-react'

const StepOneDetectiveForm = ({ data, handleChange, errors = {} }) => {
  const inputCls = (err) => `w-full px-4 py-3 bg-[#1A2832] border ${err ? 'border-[#D92B3A]' : 'border-white'} rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D92B3A] transition`
  const labelCls = "block text-sm text-gray-300 mb-2"
  const errCls = "text-xs text-[#D92B3A] mt-1"

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
          <input placeholder="John" value={data.personal.firstName} onChange={e => handleChange('personal', 'firstName', e.target.value)} className={inputCls(errors.firstName)} />
          {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={labelCls}>Last Name *</label>
          <input placeholder="Doe" value={data.personal.lastName} onChange={e => handleChange('personal', 'lastName', e.target.value)} className={inputCls(errors.lastName)} />
          {errors.lastName && <p className={errCls}>{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>Date of Birth *</label>
          <input type="date" value={data.personal.dob} onChange={e => handleChange('personal', 'dob', e.target.value)} className={inputCls(errors.dob)} />
          {errors.dob && <p className={errCls}>{errors.dob}</p>}
        </div>
        <div>
          <label className={labelCls}>Gender *</label>
          <select value={data.personal.gender} onChange={e => handleChange('personal', 'gender', e.target.value)} className={inputCls(errors.gender)}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className={errCls}>{errors.gender}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Nationality *</label>
          <input placeholder="United States" value={data.personal.nationality} onChange={e => handleChange('personal', 'nationality', e.target.value)} className={inputCls(errors.nationality)} />
          {errors.nationality && <p className={errCls}>{errors.nationality}</p>}
        </div>
        <div>
          <label className={labelCls}>Social Security Number *</label>
          <input placeholder="XXX-XX-XXXX" value={data.personal.ssn} onChange={e => handleChange('personal', 'ssn', e.target.value)} className={inputCls(errors.ssn)} />
          {errors.ssn ? <p className={errCls}>{errors.ssn}</p> : <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Lock size={10} /> Your information is encrypted and secure</p>}
        </div>
      </div>
    </div>
  )
}

export default StepOneDetectiveForm
