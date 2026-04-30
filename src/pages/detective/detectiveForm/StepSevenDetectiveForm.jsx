import React from 'react'
import { Shield } from 'lucide-react'

const StepSevenDetectiveForm = ({ data, handleChange, errors = {}, setErrors }) => {
  const clear = (key) => setErrors(prev => { const c = { ...prev }; delete c[key]; return c })

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Shield size={18} className="text-[#D92B3A]" />
        <h3 className="text-base font-semibold">Legal & Compliance</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">Please answer the following questions truthfully</p>

      <div className="space-y-0 divide-y divide-white/10">
        <div className="py-4 border border-gray-500 rounded px-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.legal.convicted}  
              onChange={e => handleChange('legal', 'convicted', e.target.checked)}
              className="w-4 h-4 accent-[#D92B3A]"
            />
            <span className="text-sm text-gray-200">Have you ever been convicted of a crime?</span>
          </label>
        </div>

        <div className="py-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.legal.consentBackground}
              onChange={e => {
                handleChange('legal', 'consentBackground', e.target.checked)
                if (e.target.checked) clear('consentBackground')
              }}
              className="w-4 h-4 mt-0.5 accent-[#D92B3A]"
            />
            <div>
              <p className="text-sm text-gray-200 font-medium">I consent to a comprehensive background check *</p>
              <p className="text-xs text-gray-500 mt-0.5">This includes criminal records, credit history, employment verification, and professional references</p>
            </div>
          </label>
          {errors.consentBackground && <p className="text-xs text-[#D92B3A] mt-2 ml-7">{errors.consentBackground}</p>}
        </div>

        <div className="py-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.legal.agreeTerms}
              onChange={e => {
                handleChange('legal', 'agreeTerms', e.target.checked)
                if (e.target.checked) clear('agreeTerms')
              }}
              className="w-4 h-4 mt-0.5 accent-[#D92B3A]"
            />
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
          {errors.agreeTerms && <p className="text-xs text-[#D92B3A] mt-2 ml-7">{errors.agreeTerms}</p>}
        </div>
      </div>


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
