import React from 'react'
import { User, Lock } from 'lucide-react'
import { IoPersonOutline } from "react-icons/io5";
import { restrictToLetters, handlePasteLettersOnly, formatSSN, validateOnlyCharacters, validateDOB, validateGender, validateRequired, validateSSN } from '../../../hooks/validation'

const StepOneDetectiveForm = ({ data, handleChange, errors = {}, setErrors }) => {
  const inputCls = (err) => `w-full px-4 py-3 bg-[#1A2832] border ${err ? 'border-[#D92B3A]' : 'border-white/50'} rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D92B3A] transition`
  const labelCls = "block text-sm text-gray-300 mb-2"
  const errCls = "text-xs text-[#D92B3A] mt-1"

  const clear = (key) => setErrors(prev => { const c = { ...prev }; delete c[key]; return c })
  const set = (key, msg) => setErrors(prev => ({ ...prev, [key]: msg }))

  const onLetters = (field, validator, ...args) => (e) => {
    const val = restrictToLetters(e.target.value)
    handleChange('personal', field, val)
    const err = validator(val, ...args)
    err ? set(field, err) : clear(field)
  }

  const onSSNChange = (e) => {
    const val = formatSSN(e.target.value)
    handleChange('personal', 'ssn', val)
    const err = validateSSN(val)
    err ? set('ssn', err) : clear('ssn')
  }

  const onDOBChange = (e) => {
    const val = e.target.value
    handleChange('personal', 'dob', val)
    const err = validateDOB(val)
    err ? set('dob', err) : clear('dob')
  }

  const onGenderChange = (e) => {
    const val = e.target.value
    handleChange('personal', 'gender', val)
    const err = validateGender(val)
    err ? set('gender', err) : clear('gender')
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <IoPersonOutline className="text-[#D92B3A]" size={18} />
        <h3 className="text-base font-semibold">Personal Information</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">Please provide your basic personal details</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>First Name *</label>
          <input
            placeholder="John"
            value={data.personal.firstName}
            onChange={onLetters('firstName', validateOnlyCharacters, 'first_name')}
            onPaste={e => handlePasteLettersOnly(e, v => handleChange('personal', 'firstName', v))}
            className={inputCls(errors.firstName)}
          />
          {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={labelCls}>Last Name *</label>
          <input
            placeholder="Doe"
            value={data.personal.lastName}
            onChange={onLetters('lastName', validateOnlyCharacters, 'last_name')}
            onPaste={e => handlePasteLettersOnly(e, v => handleChange('personal', 'lastName', v))}
            className={inputCls(errors.lastName)}
          />
          {errors.lastName && <p className={errCls}>{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>Date of Birth *</label>
          <input
            type="date"
            value={data.personal.dob}
            onChange={onDOBChange}
            max={new Date().toISOString().split('T')[0]}
            className={inputCls(errors.dob)}
            style={{ colorScheme: 'dark' }}
          />
          {errors.dob && <p className={errCls}>{errors.dob}</p>}
        </div>
        <div>
          <label className={labelCls}>Gender *</label>
          <select
            value={data.personal.gender}
            onChange={onGenderChange}
            className={inputCls(errors.gender)}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className={errCls}>{errors.gender}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Nationality *</label>
          <input
            placeholder="United States"
            value={data.personal.nationality}
            onChange={onLetters('nationality', validateRequired, 'nationality')}
            onPaste={e => handlePasteLettersOnly(e, v => handleChange('personal', 'nationality', v))}
            className={inputCls(errors.nationality)}
          />
          {errors.nationality && <p className={errCls}>{errors.nationality}</p>}
        </div>
        <div>
          <label className={labelCls}>Social Security Number *</label>
          <input
            placeholder="XXX-XX-XXXX"
            value={data.personal.ssn}
            onChange={onSSNChange}
            maxLength={11}
            className={inputCls(errors.ssn)}
          />
          {errors.ssn
            ? <p className={errCls}>{errors.ssn}</p>
            : <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Lock size={10} /> Your information is encrypted and secure</p>
          }
        </div>
      </div>
    </div>
  )
}

export default StepOneDetectiveForm

