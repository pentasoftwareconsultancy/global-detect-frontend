import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepSevenDetectiveForm = ({
  data,
  handleChange,
}) => {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold"><Shield className="text-pink-500" /> Legal & Compliance</h3>
      <p className="text-sm text-gray-400 mb-4">Please answer the following questions truthfully</p>

      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={data.legal.convicted} onChange={(e) => handleChange('legal', 'convicted', e.target.checked)} />
          <span className="text-sm">Have you ever been convicted of a crime?</span>
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={data.legal.consentBackground} onChange={(e) => handleChange('legal', 'consentBackground', e.target.checked)} />
          <span className="text-sm">I consent to a comprehensive background check *</span>
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" checked={data.legal.agreeTerms} onChange={(e) => handleChange('legal', 'agreeTerms', e.target.checked)} />
          <span className="text-sm">I agree to the Terms & Conditions and Privacy Policy *</span>
        </label>

        <div className="mt-4 p-4 bg-[#071a1b] rounded border border-red-700 text-sm text-red-300">After submission, your application will be reviewed by our compliance team. This process typically takes 5-7 business days.</div>
      </div>
    </div>
  )
}

export default StepSevenDetectiveForm