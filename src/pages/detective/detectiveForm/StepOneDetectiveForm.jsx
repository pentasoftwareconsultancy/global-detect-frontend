import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepOneDetectiveForm = ({
  data,
  handleChange,
}) => {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold"><User className="text-pink-500" /> Personal Information</h3>
      <p className="text-sm text-gray-400 mb-4">Please provide your basic personal details</p>

      <div className="grid grid-cols-2 gap-4">
        <input placeholder="First Name" value={data.personal.firstName} onChange={(e) => handleChange('personal', 'firstName', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <input placeholder="Last Name" value={data.personal.lastName} onChange={(e) => handleChange('personal', 'lastName', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <input placeholder="Date of Birth" value={data.personal.dob} onChange={(e) => handleChange('personal', 'dob', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <select value={data.personal.gender} onChange={(e) => handleChange('personal', 'gender', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700">
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <input placeholder="Nationality" value={data.personal.nationality} onChange={(e) => handleChange('personal', 'nationality', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <input placeholder="Social Security Number" value={data.personal.ssn} onChange={(e) => handleChange('personal', 'ssn', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
      </div>
    </div>
  )
}

export default StepOneDetectiveForm