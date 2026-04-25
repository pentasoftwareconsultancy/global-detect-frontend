import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepThreeDetectiveForm = ({
  data,
  handleChange,
}) => {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold"><Briefcase className="text-pink-500" /> Professional Information</h3>
      <p className="text-sm text-gray-400 mb-4">Tell us about your detective credentials and experience</p>

      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Detective License Number" value={data.professional.licenseNumber} onChange={(e) => handleChange('professional', 'licenseNumber', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <input placeholder="Specialization" value={data.professional.specialization} onChange={(e) => handleChange('professional', 'specialization', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <input placeholder="License Issue Date" value={data.professional.issueDate} onChange={(e) => handleChange('professional', 'issueDate', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <input placeholder="License Expiry Date" value={data.professional.expiryDate} onChange={(e) => handleChange('professional', 'expiryDate', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <select value={data.professional.experience} onChange={(e) => handleChange('professional', 'experience', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700">
          <option value="">Years of Experience</option>
          <option>0-1</option>
          <option>1-3</option>
          <option>3-5</option>
          <option>5+</option>
        </select>
        <input placeholder="Previous Agency (if any)" value={data.professional.previousAgency} onChange={(e) => handleChange('professional', 'previousAgency', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
      </div>
    </div>
  )
}

export default StepThreeDetectiveForm