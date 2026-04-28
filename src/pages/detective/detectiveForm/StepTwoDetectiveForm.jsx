import React from 'react'
import { MapPin } from 'lucide-react'

const StepTwoDetectiveForm = ({ data, handleChange, errors = {} }) => {
  const inputCls = (err) => `w-full px-4 py-3 bg-[#1A2832] border ${err ? 'border-[#D92B3A]' : 'border-white'} rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D92B3A] transition`
  const labelCls = "block text-sm text-gray-300 mb-2"
  const errCls = "text-xs text-[#D92B3A] mt-1"

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <MapPin size={18} className="text-[#D92B3A]" />
        <h3 className="text-base font-semibold">Contact Information</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">How can we reach you?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>Email Address *</label>
          <input placeholder="john.doe@example.com" value={data.contact.email} onChange={e => handleChange('contact', 'email', e.target.value)} className={inputCls(errors.email)} />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label className={labelCls}>Phone Number *</label>
          <input placeholder="+1 (555) 000-0000" value={data.contact.phone} onChange={e => handleChange('contact', 'phone', e.target.value)} className={inputCls(errors.phone)} />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>Alternate Phone</label>
          <input placeholder="+1 (555) 000-0000" value={data.contact.altPhone} onChange={e => handleChange('contact', 'altPhone', e.target.value)} className={inputCls(false)} />
        </div>
      </div>

      <div className="mb-5">
        <label className={labelCls}>Street Address *</label>
        <input placeholder="123 Main Street, Apt 4B" value={data.contact.address} onChange={e => handleChange('contact', 'address', e.target.value)} className={inputCls(errors.address)} />
        {errors.address && <p className={errCls}>{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelCls}>City *</label>
          <input placeholder="New York" value={data.contact.city} onChange={e => handleChange('contact', 'city', e.target.value)} className={inputCls(errors.city)} />
          {errors.city && <p className={errCls}>{errors.city}</p>}
        </div>
        <div>
          <label className={labelCls}>State/Province *</label>
          <input placeholder="NY" value={data.contact.state} onChange={e => handleChange('contact', 'state', e.target.value)} className={inputCls(errors.state)} />
          {errors.state && <p className={errCls}>{errors.state}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <div>
          <label className={labelCls}>ZIP/Postal Code *</label>
          <input placeholder="10001" value={data.contact.zip} onChange={e => handleChange('contact', 'zip', e.target.value)} className={inputCls(errors.zip)} />
          {errors.zip && <p className={errCls}>{errors.zip}</p>}
        </div>
        <div>
          <label className={labelCls}>Country *</label>
          <input placeholder="United States" value={data.contact.country} onChange={e => handleChange('contact', 'country', e.target.value)} className={inputCls(errors.country)} />
          {errors.country && <p className={errCls}>{errors.country}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full border-2 border-[#D92B3A] flex items-center justify-center flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D92B3A]" />
        </div>
        <h4 className="text-base font-semibold">Emergency Contact</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input placeholder="Jane Doe" value={data.contact.emergency.name} onChange={e => handleChange('contact', 'emergency', { ...data.contact.emergency, name: e.target.value })} className={inputCls(errors.emergencyName)} />
          {errors.emergencyName && <p className={errCls}>{errors.emergencyName}</p>}
        </div>
        <div>
          <label className={labelCls}>Relationship *</label>
          <input placeholder="Spouse" value={data.contact.emergency.relation} onChange={e => handleChange('contact', 'emergency', { ...data.contact.emergency, relation: e.target.value })} className={inputCls(errors.emergencyRelation)} />
          {errors.emergencyRelation && <p className={errCls}>{errors.emergencyRelation}</p>}
        </div>
        <div>
          <label className={labelCls}>Phone Number *</label>
          <input placeholder="+1 (555) 000-0000" value={data.contact.emergency.phone} onChange={e => handleChange('contact', 'emergency', { ...data.contact.emergency, phone: e.target.value })} className={inputCls(errors.emergencyPhone)} />
          {errors.emergencyPhone && <p className={errCls}>{errors.emergencyPhone}</p>}
        </div>
      </div>
    </div>
  )
}

export default StepTwoDetectiveForm
