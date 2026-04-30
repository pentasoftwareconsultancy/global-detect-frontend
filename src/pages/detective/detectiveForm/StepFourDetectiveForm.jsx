import React from 'react'
import { FileText, UploadCloud } from 'lucide-react'

const StepFourDetectiveForm = ({ data, handleFile, errors = {} }) => {
  const docs = [
    { key: 'govId',       label: 'Government-issued ID Proof',    required: true,  errKey: 'govId' },
    { key: 'licenseCert', label: 'Detective License Certificate',  required: true,  errKey: 'licenseCert' },
    { key: 'resume',      label: 'Professional Resume/CV',         required: true,  errKey: 'resume' },
    { key: 'certs',       label: 'Professional Certifications',    required: false, errKey: null },
    { key: 'background',  label: 'Background Check Report',        required: true,  errKey: 'background' },
    { key: 'address',     label: 'Proof of Address',               required: true,  errKey: 'address_doc' },
  ]


  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <FileText size={18} className="text-[#D92B3A]" />
        <h3 className="text-base font-semibold">Required Documents</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">Upload the following documents for verification</p>

      <div className="space-y-5">
        {docs.map(({ key, label, required, errKey }) => (
          <div key={key}>
            <label className="block text-sm text-gray-300 mb-2">
              {label} {required && <span className="text-[#D92B3A]">*</span>}
            </label>
            <label className="flex items-center cursor-pointer">
              <div className={`flex-1 px-4 py-3 border ${errKey && errors[errKey] ? 'border-[#D92B3A]' : 'border-white/50'} rounded-lg text-sm text-gray-500 min-h-[46px] bg-[#1A2832]`}>
                {data.documents[key] || ''}
              </div>
              <div className="ml-2 p-3 border border-white/50 rounded-lg hover:border-[#D92B3A]/50 transition bg-[#1A2832]">
                <UploadCloud size={16} className="text-gray-400" />
              </div>
              <input type="file" onChange={e => handleFile(e, key)} className="hidden" />
            </label>
            {errKey && errors[errKey] && <p className="text-xs text-[#D92B3A] mt-1">{errors[errKey]}</p>}
            <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepFourDetectiveForm
