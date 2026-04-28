import React from 'react'
import { Users } from 'lucide-react'

const StepSixDetectiveForm = ({ data, handleChange, errors = {} }) => {
  const inputCls = (err) => `w-full px-4 py-3 bg-[#1A2832] border ${err ? 'border-[#D92B3A]' : 'border-white'} rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D92B3A] transition`
  const labelCls = "block text-sm text-gray-300 mb-2"
  const errCls = "text-xs text-[#D92B3A] mt-1"

  const refs = [
    { idx: 0, namePh: 'Jane Smith',       phonePh: '+1 (555) 000-0000', emailPh: 'jane.smith@example.com',       nameErr: 'ref0Name', phoneErr: 'ref0Phone', emailErr: 'ref0Email' },
    { idx: 1, namePh: 'Michael Johnson',  phonePh: '+1 (555) 000-0000', emailPh: 'michael.johnson@example.com',  nameErr: 'ref1Name', phoneErr: 'ref1Phone', emailErr: 'ref1Email' },
  ]

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Users size={18} className="text-[#D92B3A]" />
        <h3 className="text-base font-semibold">Professional References</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">Provide at least two professional references</p>

      {refs.map(({ idx, namePh, phonePh, emailPh, nameErr, phoneErr, emailErr }) => (
        <div key={idx} className={idx > 0 ? 'mt-8' : ''}>
          <h4 className="text-base font-semibold mb-4">Reference {idx + 1} *</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input placeholder={namePh} value={data.references[idx].name} onChange={e => handleChange('references', 'name', e.target.value, idx)} className={inputCls(errors[nameErr])} />
              {errors[nameErr] && <p className={errCls}>{errors[nameErr]}</p>}
            </div>
            <div>
              <label className={labelCls}>Phone Number *</label>
              <input placeholder={phonePh} value={data.references[idx].phone} onChange={e => handleChange('references', 'phone', e.target.value, idx)} className={inputCls(errors[phoneErr])} />
              {errors[phoneErr] && <p className={errCls}>{errors[phoneErr]}</p>}
            </div>
            <div>
              <label className={labelCls}>Email Address *</label>
              <input placeholder={emailPh} value={data.references[idx].email} onChange={e => handleChange('references', 'email', e.target.value, idx)} className={inputCls(errors[emailErr])} />
              {errors[emailErr] && <p className={errCls}>{errors[emailErr]}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StepSixDetectiveForm
