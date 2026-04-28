import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepSixDetectiveForm = ({
  data,
  handleChange,
}) => {
  const inputCls = "w-full px-4 py-3  border border-white rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#D92B3A] transition"
  const labelCls = "block text-sm text-gray-300 mb-1"
  return (
    <div>
      <div className="flex items-center gap-2 mb-1"><Users size={18} className="text-[#D92B3A]" /><h3 className="text-base font-semibold">Professional References</h3></div>
      <p className="text-sm text-gray-400 mb-6">Provide at least two professional references</p>

      {[
        { idx: 0, namePh: 'Jane Smith', phonePh: '+1 (555) 000-0000', emailPh: 'jane.smith@example.com' },
        { idx: 1, namePh: 'Michael Johnson', phonePh: '+1 (555) 000-0000', emailPh: 'michael.johnson@example.com' },
      ].map(({ idx, namePh, phonePh, emailPh }) => (
        <div key={idx} className={idx > 0 ? 'mt-8' : ''}>
          <h4 className="text-base font-semibold mb-4">Reference {idx + 1} *</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className={labelCls}>Full Name</label>
              <input placeholder={namePh} value={data.references[idx].name} onChange={e => handleChange('references', 'name', e.target.value, idx)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <input placeholder={phonePh} value={data.references[idx].phone} onChange={e => handleChange('references', 'phone', e.target.value, idx)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input placeholder={emailPh} value={data.references[idx].email} onChange={e => handleChange('references', 'email', e.target.value, idx)} className={inputCls} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StepSixDetectiveForm