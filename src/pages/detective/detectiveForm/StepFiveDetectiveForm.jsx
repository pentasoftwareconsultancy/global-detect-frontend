import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepFiveDetectiveForm = ({
  data,
  handleChange,
}) => {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold"><CreditCard className="text-pink-500" /> Banking Information</h3>
      <p className="text-sm text-gray-400 mb-4">For salary and payment processing</p>

      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Bank Name" value={data.banking.bankName} onChange={(e) => handleChange('banking', 'bankName', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <input placeholder="Account Holder Name" value={data.banking.holderName} onChange={(e) => handleChange('banking', 'holderName', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <input placeholder="Account Number" value={data.banking.accountNumber} onChange={(e) => handleChange('banking', 'accountNumber', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <input placeholder="Routing Number" value={data.banking.routingNumber} onChange={(e) => handleChange('banking', 'routingNumber', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
      </div>
      <div className="mt-4 p-3 bg-[#071a1b] rounded border border-gray-800 text-sm text-gray-400">All banking information is encrypted using industry-standard security protocols.</div>
    </div>
  )
}

export default StepFiveDetectiveForm