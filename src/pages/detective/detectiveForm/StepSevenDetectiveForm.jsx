import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepSevenDetectiveForm = ({
  data,
  handleChange,
}) => {
  const inputCls = "w-full px-4 py-3  border border-white rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#D92B3A] transition"
  const labelCls = "block text-sm text-gray-300 mb-1"
  return (
    <div>
      <div className="flex items-center gap-2 mb-1"><Shield size={18} className="text-[#D92B3A]" /><h3 className="text-base font-semibold">Legal & Compliance</h3></div>
      <p className="text-sm text-gray-400 mb-6">Please answer the following questions truthfully</p>

      <div className="space-y-0 divide-y divide-white/10">
        {/* Checkbox 1 */}
        <div className="py-4 border border-gray-500 rounded px-2 py-1">
          <label className="flex items-center gap-3 cursor-pointer ">
            <input type="checkbox" checked={data.legal.convicted} onChange={e => handleChange('legal', 'convicted', e.target.checked)} className="w-4 h-4 accent-[#D92B3A]" />
            <span className="text-sm text-gray-200">Have you ever been convicted of a crime?</span>
          </label>
        </div>

        {/* Checkbox 2 */}
        <div className="py-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={data.legal.consentBackground} onChange={e => handleChange('legal', 'consentBackground', e.target.checked)} className="w-4 h-4 mt-0.5 accent-[#D92B3A]" />
            <div>
              <p className="text-sm text-gray-200 font-medium">I consent to a comprehensive background check *</p>
              <p className="text-xs text-gray-500 mt-0.5">This includes criminal records, credit history, employment verification, and professional references</p>
            </div>
          </label>
          {!data.legal.consentBackground && <p className="text-xs text-[#D92B3A] mt-2 ml-7">You must consent to background check</p>}
        </div>

        {/* Checkbox 3 */}
        <div className="py-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={data.legal.agreeTerms} onChange={e => handleChange('legal', 'agreeTerms', e.target.checked)} className="w-4 h-4 mt-0.5 accent-[#D92B3A]" />
            <div>
              <p className="text-sm text-gray-200 font-medium">I agree to the Terms & Conditions and Privacy Policy *</p>
              <p className="text-xs text-gray-500 mt-0.5">
                By checking this box, you agree to our{' '}
                <span className="text-[#D92B3A] cursor-pointer hover:underline">Terms & Conditions</span>
                and{' '}
                <span className="text-[#D92B3A] cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            </div>
          </label>
          {!data.legal.agreeTerms && <p className="text-xs text-[#D92B3A] mt-2 ml-7">You must agree to terms and conditions</p>}
        </div>
      </div>

      {/* Verification Process box */}
      <div className="flex items-start gap-3 mt-4 p-4 bg-[#D92B3A]/10 border border-[#D92B3A]/30 rounded-lg">
        <div className="w-5 h-5 rounded-full border-2 border-[#D92B3A] flex items-center justify-center flex-shrink-0 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D92B3A]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-1">Verification Process</p>
          <p className="text-xs text-gray-400 leading-relaxed">After submission, your application will be reviewed by our compliance team. This process typically takes 5-7 business days. You will receive email updates at each stage of the verification process.</p>
        </div>
      </div>
    </div>
  )
}

export default StepSevenDetectiveForm