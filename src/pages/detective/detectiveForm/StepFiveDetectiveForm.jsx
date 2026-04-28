import React from 'react'
import { CreditCard, Lock } from 'lucide-react'

const StepFiveDetectiveForm = ({ data, handleChange, errors = {} }) => {
  const inputCls = (err) => `w-full px-4 py-3 bg-[#1A2832] border ${err ? 'border-[#D92B3A]' : 'border-white'} rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D92B3A] transition`
  const labelCls = "block text-sm text-gray-300 mb-2"
  const errCls = "text-xs text-[#D92B3A] mt-1"

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <CreditCard size={18} className="text-[#D92B3A]" />
        <h3 className="text-base font-semibold">Banking Information</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">For salary and payment processing</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>Bank Name *</label>
          <input placeholder="Chase Bank" value={data.banking.bankName} onChange={e => handleChange('banking', 'bankName', e.target.value)} className={inputCls(errors.bankName)} />
          {errors.bankName && <p className={errCls}>{errors.bankName}</p>}
        </div>
        <div>
          <label className={labelCls}>Account Holder Name *</label>
          <input placeholder="John Doe" value={data.banking.holderName} onChange={e => handleChange('banking', 'holderName', e.target.value)} className={inputCls(errors.holderName)} />
          {errors.holderName && <p className={errCls}>{errors.holderName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className={labelCls}>Account Number *</label>
          <input type="password" placeholder="........" value={data.banking.accountNumber} onChange={e => handleChange('banking', 'accountNumber', e.target.value)} className={inputCls(errors.accountNumber)} />
          {errors.accountNumber && <p className={errCls}>{errors.accountNumber}</p>}
        </div>
        <div>
          <label className={labelCls}>Routing Number *</label>
          <input placeholder="123456789" value={data.banking.routingNumber} onChange={e => handleChange('banking', 'routingNumber', e.target.value)} className={inputCls(errors.routingNumber)} />
          {errors.routingNumber && <p className={errCls}>{errors.routingNumber}</p>}
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-[#2D3E4D80] border border-white/10 rounded-lg">
        <Lock size={18} className="text-[#D92B3A] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-white mb-1">Secure Banking Information</p>
          <p className="text-xs text-gray-400 leading-relaxed">All banking information is encrypted using industry-standard security protocols. Your data will only be used for payroll processing and will never be shared with third parties.</p>
        </div>
      </div>
    </div>
  )
}

export default StepFiveDetectiveForm
