import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepFourDetectiveForm = ({
  data,
  handleChange,
  handleFile,
}) => {
  const inputCls = "w-full px-4 py-3  border border-white rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#D92B3A] transition"
  const labelCls = "block text-sm text-gray-300 mb-1"
  return (
    <div>
      <div className="flex items-center gap-2 mb-1"><FileText size={18} className="text-[#D92B3A]" /><h3 className="text-base font-semibold">Required Documents</h3></div>
      <p className="text-sm text-gray-400 mb-6">Upload the following documents for verification</p>

      <div className="space-y-5">
        {[
          { key: 'govId', label: 'Government-issued ID Proof', required: true },
          { key: 'licenseCert', label: 'Detective License Certificate', required: true },
          { key: 'resume', label: 'Professional Resume/CV', required: true },
          { key: 'certs', label: 'Professional Certifications', required: false },
          { key: 'background', label: 'Background Check Report', required: true },
          { key: 'address', label: 'Proof of Address', required: true },
        ].map(({ key, label, required }) => (
          <div key={key}>
            <label className="block text-sm text-gray-300 mb-1">
              {label} {required && <span className="text-[#D92B3A]">*</span>}
            </label>
            <label className="flex items-center cursor-pointer">
              <div className="flex-1 px-4 py-3  border border-white rounded-lg text-sm text-gray-500 min-h-[46px]">
                {data.documents[key] || ''}
              </div>
              <div className="ml-2 p-3  border border-white rounded-lg hover:border-[#D92B3A]/50 transition">
                <UploadCloud size={16} className="text-gray-400" />
              </div>
              <input type="file" onChange={e => handleFile(e, key)} className="hidden" />
            </label>
            <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepFourDetectiveForm