import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/contexts/AuthContext'
import { ROUTES } from '../../core/constants/routes.constant'
import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const StepIndicator = ({ steps, active }) => {
  return (
    <div className="bg-[#0f2629] rounded-lg p-4 mb-6">
      <div className="flex items-center gap-6 justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 text-center">
            <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center ${i < active ? 'bg-green-500' : i === active ? 'bg-pink-500' : 'bg-gray-700'}`}>
              <span className="text-white font-semibold">{i+1}</span>
            </div>
            <div className="mt-2 text-xs text-gray-300">{s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const DetectiveForm = () => {
  const { setKycComplete } = useAuth();
  const navigate = useNavigate();

  const steps = [
    'Personal Info',
    'Contact Details',
    'Professional',
    'Documents',
    'Banking',
    'References',
    'Legal'
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    personal: { firstName: '', lastName: '', dob: '', gender: '', nationality: '', ssn: '' },
    contact: { email: '', phone: '', altPhone: '', address: '', city: '', state: '', zip: '', country: '' , emergency: { name:'', relation:'', phone:''}},
    professional: { licenseNumber: '', specialization: '', issueDate: '', expiryDate: '', experience: '', previousAgency: '' },
    documents: {},
    banking: { bankName:'', accountNumber:'', holderName:'', routingNumber:'' },
    references: [{ name:'', phone:'', email:'' }, { name:'', phone:'', email:'' }],
    legal: { convicted: false, consentBackground: false, agreeTerms: false }
  });

  const handleChange = (section, field, value, idx) => {
    setData((prev) => {
      const clone = { ...prev };
      if (section === 'references') {
        clone.references[idx][field] = value;
      } else if (section === 'documents') {
        clone.documents[field] = value;
      } else if (section === 'personal' || section === 'contact' || section === 'professional' || section === 'banking' || section === 'legal') {
        clone[section][field] = value;
      }
      return clone;
    });
  };

  const handleFile = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setData((p) => ({ ...p, documents: { ...p.documents, [key]: file.name } }));
  };

  const next = () => setActiveStep((s) => Math.min(s+1, steps.length-1));
  const prev = () => setActiveStep((s) => Math.max(s-1, 0));

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setKycComplete(true);
    navigate(ROUTES.OTP);
  };

  return (
    <div className="min-h-screen p-8 bg-[#071018] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Detective KYC Application</h1>
            <p className="text-sm text-gray-300">Complete your verification to join our team</p>
          </div>
          <button className="text-sm text-gray-400">Cancel</button>
        </div>

        <StepIndicator steps={steps} active={activeStep} />

        <div className="bg-[#0b2326] rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* Step content */}
            {activeStep === 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold"><User className="text-pink-500" /> Personal Information</h3>
                <p className="text-sm text-gray-400 mb-4">Please provide your basic personal details</p>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="First Name" value={data.personal.firstName} onChange={(e)=>handleChange('personal','firstName',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <input placeholder="Last Name" value={data.personal.lastName} onChange={(e)=>handleChange('personal','lastName',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input placeholder="Date of Birth" value={data.personal.dob} onChange={(e)=>handleChange('personal','dob',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <select value={data.personal.gender} onChange={(e)=>handleChange('personal','gender',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700">
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input placeholder="Nationality" value={data.personal.nationality} onChange={(e)=>handleChange('personal','nationality',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <input placeholder="Social Security Number" value={data.personal.ssn} onChange={(e)=>handleChange('personal','ssn',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold"><MapPin className="text-pink-500"/> Contact Information</h3>
                <p className="text-sm text-gray-400 mb-4">How can we reach you?</p>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Email Address" value={data.contact.email} onChange={(e)=>handleChange('contact','email',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <input placeholder="Phone Number" value={data.contact.phone} onChange={(e)=>handleChange('contact','phone',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                </div>
                <div className="mt-4">
                  <input placeholder="Street Address" value={data.contact.address} onChange={(e)=>handleChange('contact','address',e.target.value)} className="w-full p-3 bg-[#081718] rounded border border-gray-700" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <input placeholder="City" value={data.contact.city} onChange={(e)=>handleChange('contact','city',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <input placeholder="State/Province" value={data.contact.state} onChange={(e)=>handleChange('contact','state',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <input placeholder="ZIP/Postal Code" value={data.contact.zip} onChange={(e)=>handleChange('contact','zip',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                </div>

                <div className="mt-6 bg-[#071a1b] p-4 rounded">
                  <h4 className="text-sm font-medium mb-2">Emergency Contact</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <input placeholder="Full Name" value={data.contact.emergency.name} onChange={(e)=>setData(p=>({...p, contact:{...p.contact, emergency:{...p.contact.emergency, name:e.target.value}}}))} className="p-3 bg-[#081718] rounded border border-gray-700" />
                    <input placeholder="Relationship" value={data.contact.emergency.relation} onChange={(e)=>setData(p=>({...p, contact:{...p.contact, emergency:{...p.contact.emergency, relation:e.target.value}}}))} className="p-3 bg-[#081718] rounded border border-gray-700" />
                    <input placeholder="Phone Number" value={data.contact.emergency.phone} onChange={(e)=>setData(p=>({...p, contact:{...p.contact, emergency:{...p.contact.emergency, phone:e.target.value}}}))} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold"><Briefcase className="text-pink-500"/> Professional Information</h3>
                <p className="text-sm text-gray-400 mb-4">Tell us about your detective credentials and experience</p>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Detective License Number" value={data.professional.licenseNumber} onChange={(e)=>handleChange('professional','licenseNumber',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <input placeholder="Specialization" value={data.professional.specialization} onChange={(e)=>handleChange('professional','specialization',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input placeholder="License Issue Date" value={data.professional.issueDate} onChange={(e)=>handleChange('professional','issueDate',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <input placeholder="License Expiry Date" value={data.professional.expiryDate} onChange={(e)=>handleChange('professional','expiryDate',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <select value={data.professional.experience} onChange={(e)=>handleChange('professional','experience',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700">
                    <option value="">Years of Experience</option>
                    <option>0-1</option>
                    <option>1-3</option>
                    <option>3-5</option>
                    <option>5+</option>
                  </select>
                  <input placeholder="Previous Agency (if any)" value={data.professional.previousAgency} onChange={(e)=>handleChange('professional','previousAgency',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold"><FileText className="text-pink-500"/> Required Documents</h3>
                <p className="text-sm text-gray-400 mb-4">Upload the following documents for verification</p>

                <div className="space-y-3">
                  {[
                    ['govId','Government-issued ID Proof'],
                    ['licenseCert','Detective License Certificate'],
                    ['resume','Professional Resume/CV'],
                    ['certs','Professional Certifications'],
                    ['background','Background Check Report'],
                    ['address','Proof of Address']
                  ].map(([key,label])=> (
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
                        <input type="file" onChange={(e)=>handleFile(e, key)} className="hidden" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold"><CreditCard className="text-pink-500"/> Banking Information</h3>
                <p className="text-sm text-gray-400 mb-4">For salary and payment processing</p>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Bank Name" value={data.banking.bankName} onChange={(e)=>handleChange('banking','bankName',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <input placeholder="Account Holder Name" value={data.banking.holderName} onChange={(e)=>handleChange('banking','holderName',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input placeholder="Account Number" value={data.banking.accountNumber} onChange={(e)=>handleChange('banking','accountNumber',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                  <input placeholder="Routing Number" value={data.banking.routingNumber} onChange={(e)=>handleChange('banking','routingNumber',e.target.value)} className="p-3 bg-[#081718] rounded border border-gray-700" />
                </div>
                <div className="mt-4 p-3 bg-[#071a1b] rounded border border-gray-800 text-sm text-gray-400">All banking information is encrypted using industry-standard security protocols.</div>
              </div>
            )}

            {activeStep === 5 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold"><Users className="text-pink-500"/> Professional References</h3>
                <p className="text-sm text-gray-400 mb-4">Provide at least two professional references</p>

                {data.references.map((r, idx)=> (
                  <div key={idx} className="mb-4 p-3 bg-[#081718] rounded border border-gray-700">
                    <div className="grid grid-cols-3 gap-3">
                      <input placeholder="Full Name" value={r.name} onChange={(e)=>handleChange('references','name',e.target.value, idx)} className="p-2 bg-transparent" />
                      <input placeholder="Phone Number" value={r.phone} onChange={(e)=>handleChange('references','phone',e.target.value, idx)} className="p-2 bg-transparent" />
                      <input placeholder="Email Address" value={r.email} onChange={(e)=>handleChange('references','email',e.target.value, idx)} className="p-2 bg-transparent" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeStep === 6 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold"><Shield className="text-pink-500"/> Legal & Compliance</h3>
                <p className="text-sm text-gray-400 mb-4">Please answer the following questions truthfully</p>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={data.legal.convicted} onChange={(e)=>handleChange('legal','convicted',e.target.checked)} />
                    <span className="text-sm">Have you ever been convicted of a crime?</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={data.legal.consentBackground} onChange={(e)=>handleChange('legal','consentBackground',e.target.checked)} />
                    <span className="text-sm">I consent to a comprehensive background check *</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={data.legal.agreeTerms} onChange={(e)=>handleChange('legal','agreeTerms',e.target.checked)} />
                    <span className="text-sm">I agree to the Terms & Conditions and Privacy Policy *</span>
                  </label>

                  <div className="mt-4 p-4 bg-[#071a1b] rounded border border-red-700 text-sm text-red-300">After submission, your application will be reviewed by our compliance team. This process typically takes 5-7 business days.</div>
                </div>
              </div>
            )}

            {/* Footer nav */}
            <div className="flex items-center justify-between mt-6">
              <div>
                <button type="button" onClick={prev} disabled={activeStep===0} className="px-4 py-2 bg-gray-800 rounded text-sm disabled:opacity-50 flex items-center gap-2"><ArrowLeft size={14}/> Previous</button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-400">Step {activeStep+1} of {steps.length}</div>
                {activeStep < steps.length-1 ? (
                  <button type="button" onClick={next} className="px-4 py-2 bg-pink-500 rounded text-sm flex items-center gap-2">Next <ArrowRight size={14}/></button>
                ) : (
                  <button type="submit" className="px-4 py-2 bg-green-600 rounded text-sm flex items-center gap-2">Submit Application <CheckCircle size={14}/></button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DetectiveForm