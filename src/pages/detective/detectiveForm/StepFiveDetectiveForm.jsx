import React from 'react'
import { CreditCard, Lock } from 'lucide-react'
import { restrictToLetters, restrictToDigits, handlePasteLettersOnly, handlePasteDigitsOnly, validateRequired, validateOnlyCharacters, validateAccountNumber, validateRoutingNumber } from '../../../hooks/validation'

const StepFiveDetectiveForm = ({ data, handleChange, errors = {}, setErrors }) => {
  const inputCls = (err) => `w-full px-4 py-3 bg-[#1A2832] border ${err ? 'border-[#D92B3A]' : 'border-white/50'} rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D92B3A] transition`
  const labelCls = "block text-sm text-gray-300 mb-2"
  const errCls = "text-xs text-[#D92B3A] mt-1"

  const clear = (key) => setErrors(prev => { const c = { ...prev }; delete c[key]; return c })
  const set = (key, msg) => setErrors(prev => ({ ...prev, [key]: msg }))

  
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
          <input
            placeholder="Chase Bank"
            value={data.banking.bankName}
            onChange={e => {
              const val = restrictToLetters(e.target.value)
              handleChange('banking', 'bankName', val)
              const err = validateRequired(val, 'bank_name')
              err ? set('bankName', err) : clear('bankName')
            }}
            onPaste={e => handlePasteLettersOnly(e, v => handleChange('banking', 'bankName', v))}
            className={inputCls(errors.bankName)}
          />
          {errors.bankName && <p className={errCls}>{errors.bankName}</p>}
        </div>
        <div>
          <label className={labelCls}>Account Holder Name *</label>
          <input
            placeholder="John Doe"
            value={data.banking.holderName}
            onChange={e => {
              const val = restrictToLetters(e.target.value)
              handleChange('banking', 'holderName', val)
              const err = validateOnlyCharacters(val, 'account_holder_name')
              err ? set('holderName', err) : clear('holderName')
            }}
            onPaste={e => handlePasteLettersOnly(e, v => handleChange('banking', 'holderName', v))}
            className={inputCls(errors.holderName)}
          />
          {errors.holderName && <p className={errCls}>{errors.holderName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className={labelCls}>Account Number *</label>
          <input
            type="password"
            placeholder="6–17 digits"
            value={data.banking.accountNumber}
            onChange={e => {
              const val = restrictToDigits(e.target.value, 17)
              handleChange('banking', 'accountNumber', val)
              // clear error immediately once valid
              if (errors.accountNumber) {
                const err = validateAccountNumber(val)
                err ? set('accountNumber', err) : clear('accountNumber')
              }
            }}
            onBlur={() => {
              // show error on blur if still invalid
              const err = validateAccountNumber(data.banking.accountNumber)
              err ? set('accountNumber', err) : clear('accountNumber')
            }}
            onPaste={e => handlePasteDigitsOnly(e, 17, v => {
              handleChange('banking', 'accountNumber', v)
              const err = validateAccountNumber(v)
              err ? set('accountNumber', err) : clear('accountNumber')
            })}
            maxLength={17}
            className={inputCls(errors.accountNumber)}
          />
          {errors.accountNumber && <p className={errCls}>{errors.accountNumber}</p>}
        </div>
        <div>
          <label className={labelCls}>Routing Number *</label>
          <input
            placeholder="9-digit routing number"
            value={data.banking.routingNumber}
            onChange={e => {
              const val = restrictToDigits(e.target.value, 9)
              handleChange('banking', 'routingNumber', val)
              // clear error immediately once valid
              if (errors.routingNumber) {
                const err = validateRoutingNumber(val)
                err ? set('routingNumber', err) : clear('routingNumber')
              }
            }}
            onBlur={() => {
              // show error on blur if still invalid
              const err = validateRoutingNumber(data.banking.routingNumber)
              err ? set('routingNumber', err) : clear('routingNumber')
            }}
            onPaste={e => handlePasteDigitsOnly(e, 9, v => {
              handleChange('banking', 'routingNumber', v)
              const err = validateRoutingNumber(v)
              err ? set('routingNumber', err) : clear('routingNumber')
            })}
            maxLength={9}
            className={inputCls(errors.routingNumber)}
          />
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
