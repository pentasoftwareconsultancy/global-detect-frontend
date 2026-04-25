import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepSixDetectiveForm = ({
  data,
  handleChange,
}) => {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold"><Users className="text-pink-500" /> Professional References</h3>
      <p className="text-sm text-gray-400 mb-4">Provide at least two professional references</p>

      {data.references.map((r, idx) => (
        <div key={idx} className="mb-4 p-3 bg-[#081718] rounded border border-gray-700">
          <div className="grid grid-cols-3 gap-3">
            <input placeholder="Full Name" value={r.name} onChange={(e) => handleChange('references', 'name', e.target.value, idx)} className="p-2 bg-transparent" />
            <input placeholder="Phone Number" value={r.phone} onChange={(e) => handleChange('references', 'phone', e.target.value, idx)} className="p-2 bg-transparent" />
            <input placeholder="Email Address" value={r.email} onChange={(e) => handleChange('references', 'email', e.target.value, idx)} className="p-2 bg-transparent" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default StepSixDetectiveForm