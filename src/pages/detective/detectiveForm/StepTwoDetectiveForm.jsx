import React from 'react'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepTwoDetectiveForm = ({
  data,
  handleChange,
}) => {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold"><MapPin className="text-pink-500" /> Contact Information</h3>
      <p className="text-sm text-gray-400 mb-4">How can we reach you?</p>

      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Email Address" value={data.contact.email} onChange={(e) => handleChange('contact', 'email', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <input placeholder="Phone Number" value={data.contact.phone} onChange={(e) => handleChange('contact', 'phone', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
      </div>
      <div className="mt-4">
        <input placeholder="Street Address" value={data.contact.address} onChange={(e) => handleChange('contact', 'address', e.target.value)} className="w-full p-3 bg-[#081718] rounded border border-gray-700" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <input placeholder="City" value={data.contact.city} onChange={(e) => handleChange('contact', 'city', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <input placeholder="State/Province" value={data.contact.state} onChange={(e) => handleChange('contact', 'state', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
        <input placeholder="ZIP/Postal Code" value={data.contact.zip} onChange={(e) => handleChange('contact', 'zip', e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
      </div>

      <div className="mt-6 bg-[#071a1b] p-4 rounded">
        <h4 className="text-sm font-medium mb-2">Emergency Contact</h4>
        <div className="grid grid-cols-3 gap-4">
          <input placeholder="Full Name" value={data.contact.emergency.name} onChange={(e) => setData(p => ({ ...p, contact: { ...p.contact, emergency: { ...p.contact.emergency, name: e.target.value } } }))} className="p-3 bg-[#081718] rounded border border-gray-700" />
          <input placeholder="Relationship" value={data.contact.emergency.relation} onChange={(e) => setData(p => ({ ...p, contact: { ...p.contact, emergency: { ...p.contact.emergency, relation: e.target.value } } }))} className="p-3 bg-[#081718] rounded border border-gray-700" />
          <input placeholder="Phone Number" value={data.contact.emergency.phone} onChange={(e) => setData(p => ({ ...p, contact: { ...p.contact, emergency: { ...p.contact.emergency, phone: e.target.value } } }))} className="p-3 bg-[#081718] rounded border border-gray-700" />
        </div>
      </div>
    </div>
  )
}

export default StepTwoDetectiveForm