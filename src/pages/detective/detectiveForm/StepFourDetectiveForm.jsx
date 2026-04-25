import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepFourDetectiveForm = ({
  data,
  handleChange,
}) => {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold"><FileText className="text-pink-500" /> Required Documents</h3>
      <p className="text-sm text-gray-400 mb-4">Upload the following documents for verification</p>

      <div className="space-y-3">
        {[
          ['govId', 'Government-issued ID Proof'],
          ['licenseCert', 'Detective License Certificate'],
          ['resume', 'Professional Resume/CV'],
          ['certs', 'Professional Certifications'],
          ['background', 'Background Check Report'],
          ['address', 'Proof of Address']
        ].map(([key, label]) => (
          <label key={key} className="flex items-center justify-between p-3 bg-[#081718] rounded border border-gray-700">
            <div>
              <div className="text-sm">{label} <span className="text-red-500">*</span></div>
              <div className="text-xs text-gray-400">Accepted: PDF, JPG, PNG (Max 5MB)</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-300">{data.documents[key] || 'No file'}</div>
              <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center">
                <UploadCloud size={16} />
              </div>
              <input type="file" onChange={(e) => handleFile(e, key)} className="hidden" />
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default StepFourDetectiveForm