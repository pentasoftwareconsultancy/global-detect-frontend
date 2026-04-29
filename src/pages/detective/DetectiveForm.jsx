import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/contexts/AuthContext'
import { ROUTES } from '../../core/constants/routes.constant'
import { authService } from '../../core/services/auth.service';
import StepIndicator from '../../components/detective/StepIndicator';


import StepOneDetectiveForm from './detectiveForm/StepOneDetectiveForm';
import StepTwoDetectiveForm from './detectiveForm/StepTwoDetectiveForm';
import StepThreeDetectiveForm from './detectiveForm/StepThreeDetectiveForm';
import StepFourDetectiveForm from './detectiveForm/StepFourDetectiveForm';
import StepFiveDetectiveForm from './detectiveForm/StepFiveDetectiveForm';
import StepSixDetectiveForm from './detectiveForm/StepSixDetectiveForm';
import StepSevenDetectiveForm from './detectiveForm/StepSevenDetectiveForm';

import { CheckCircle, ArrowLeft, ArrowRight, Shield, Clock, Mail, AlertCircle, X } from 'lucide-react'
import {
  validateOnlyCharacters, validateDOB, validateGender, validateRequired,
  validateSSN, validateEmail, validatePhone, validateAddress, validateZip,
  validateLicenseNumber, validateSelect, validateLicenseIssueDate, validateLicenseExpiryDate,
  validateAccountNumber, validateRoutingNumber, validateConsent
} from '../../hooks/validation';

const DetectiveForm = () => {
  const { setKycComplete } = useAuth();
  const navigate = useNavigate();
  const steps = ['Personal Info', 'Contact Details', 'Professional', 'Documents', 'Banking', 'References', 'Legal'];

  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    personal: { firstName: '', lastName: '', dob: '', gender: '', nationality: '', ssn: '' },
    contact: { email: '', phone: '', altPhone: '', address: '', city: '', state: '', zip: '', country: '', emergency: { name: '', relation: '', phone: '' } },
    professional: { licenseNumber: '', specialization: '', issueDate: '', expiryDate: '', experience: '', previousAgency: '' },
    documents: {},
    banking: { bankName: '', accountNumber: '', holderName: '', routingNumber: '' },
    references: [{ name: '', phone: '', email: '' }, { name: '', phone: '', email: '' }],
    legal: { convicted: false, consentBackground: false, agreeTerms: false }
  });

  const handleFile = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setData(prev => ({ ...prev, documents: { ...prev.documents, [key]: file.name } }));
    // clear the error for this doc key immediately
    const errKey = key === 'address' ? 'address_doc' : key;
    setErrors(prev => { const c = { ...prev }; delete c[errKey]; return c; });
  };

  // clears a single error key when user fixes a field
  const clearError = (key) => setErrors(prev => { const c = { ...prev }; delete c[key]; return c; });

  const handleChange = (section, field, value, idx) => {
    setData(prev => {
      const clone = { ...prev };
      if (section === 'references') {
        clone.references = clone.references.map((r, i) => i === idx ? { ...r, [field]: value } : r);
      } else if (field === 'emergency') {
        clone.contact = { ...clone.contact, emergency: value };
      } else {
        clone[section] = { ...clone[section], [field]: value };
      }
      return clone;
    });
  };

  const validateStep = () => {
    let e = {};
    if (activeStep === 0) {
      e.firstName = validateOnlyCharacters(data.personal.firstName, 'first_name');
      e.lastName = validateOnlyCharacters(data.personal.lastName, 'last_name');
      e.dob = validateDOB(data.personal.dob);
      e.gender = validateGender(data.personal.gender);
      e.nationality = validateRequired(data.personal.nationality, 'nationality');
      e.ssn = validateSSN(data.personal.ssn);
    } else if (activeStep === 1) {
      e.email = validateEmail(data.contact.email);
      e.phone = validatePhone(data.contact.phone);
      e.address = validateAddress(data.contact.address);
      e.city = validateOnlyCharacters(data.contact.city, 'city');
      e.state = validateRequired(data.contact.state, 'state');
      e.zip = validateZip(data.contact.zip);
      e.country = validateRequired(data.contact.country, 'country');
      e.emergencyName = validateOnlyCharacters(data.contact.emergency.name, 'emergency_name');
      e.emergencyRelation = validateRequired(data.contact.emergency.relation, 'relationship');
      e.emergencyPhone = validatePhone(data.contact.emergency.phone);
    } else if (activeStep === 2) {
      e.licenseNumber = validateLicenseNumber(data.professional.licenseNumber);
      e.specialization = validateSelect(data.professional.specialization, 'specialization');
      e.issueDate = validateLicenseIssueDate(data.professional.issueDate);
      e.expiryDate = validateLicenseExpiryDate(data.professional.expiryDate, data.professional.issueDate);
      e.experience = validateSelect(data.professional.experience, 'experience');
    } else if (activeStep === 3) {
      e.govId = validateRequired(data.documents.govId, 'government_id');
      e.licenseCert = validateRequired(data.documents.licenseCert, 'license_certificate');
      e.resume = validateRequired(data.documents.resume, 'resume');
      e.background = validateRequired(data.documents.background, 'background_check_report');
      e.address_doc = validateRequired(data.documents.address, 'proof_of_address');
    } else if (activeStep === 4) {
      e.bankName = validateRequired(data.banking.bankName, 'bank_name');
      e.holderName = validateOnlyCharacters(data.banking.holderName, 'account_holder_name');
      e.accountNumber = validateAccountNumber(data.banking.accountNumber);
      e.routingNumber = validateRoutingNumber(data.banking.routingNumber);
    } else if (activeStep === 5) {
      e.ref0Name = validateOnlyCharacters(data.references[0].name, 'reference_1_name');
      e.ref0Phone = validatePhone(data.references[0].phone);
      e.ref0Email = validateEmail(data.references[0].email);
      e.ref1Name = validateOnlyCharacters(data.references[1].name, 'reference_2_name');
      e.ref1Phone = validatePhone(data.references[1].phone);
      e.ref1Email = validateEmail(data.references[1].email);
    } else if (activeStep === 6) {
      e.consentBackground = validateConsent(data.legal.consentBackground);
      e.agreeTerms = validateConsent(data.legal.agreeTerms);
    }
    const filtered = Object.fromEntries(Object.entries(e).filter(([, v]) => v));
    setErrors(filtered);
    return Object.keys(filtered).length === 0;
  };

  const handleNext = () => { if (validateStep()) { setErrors({}); setActiveStep(s => Math.min(s + 1, steps.length - 1)); } };
  const prev = () => { setErrors({}); setActiveStep(s => Math.max(s - 1, 0)); };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setShowSuccess(true);
    try {
      const response = await authService.createDetectiveKYC(data);
      console.log('KYC Success:', response);
      setKycComplete(true);
    } catch (error) {
      console.error('KYC Failed:', error);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0: return <StepOneDetectiveForm data={data} handleChange={handleChange} errors={errors} setErrors={setErrors} />;
      case 1: return <StepTwoDetectiveForm data={data} handleChange={handleChange} errors={errors} setErrors={setErrors} />;
      case 2: return <StepThreeDetectiveForm data={data} handleChange={handleChange} errors={errors} setErrors={setErrors} />;
      case 3: return <StepFourDetectiveForm data={data} handleChange={handleChange} handleFile={handleFile} errors={errors} />;
      case 4: return <StepFiveDetectiveForm data={data} handleChange={handleChange} errors={errors} setErrors={setErrors} />;
      case 5: return <StepSixDetectiveForm data={data} handleChange={handleChange} errors={errors} setErrors={setErrors} />;
      case 6: return <StepSevenDetectiveForm data={data} handleChange={handleChange} errors={errors} setErrors={setErrors} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#121F27] text-white montserrat">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D92B3A] flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold leading-snug">Detective KYC Application</h1>
              <p className="text-xs sm:text-sm text-gray-400">Complete your verification to join our team</p>
            </div>
          </div>
          <button onClick={() => navigate(-1)} className="ml-2 flex-shrink-0 text-gray-400 hover:text-white transition">
            <X size={20} className="sm:hidden" />
            <span className="hidden sm:inline text-sm text-[#F9FAFB]">Cancel</span>
          </button>
        </div>

        <StepIndicator steps={steps} active={activeStep} />

        <div className="bg-[#1A2832] border border-white/10 rounded-xl p-6">
          {renderStep()}

          <div className="flex items-center justify-between mt-8 gap-2">
            <button type="button" onClick={prev} disabled={activeStep === 0} className="flex items-center gap-1 sm:gap-2 text-sm text-gray-300 hover:text-white disabled:opacity-30 transition flex-shrink-0">
              <ArrowLeft size={14} />
              <span>Previous</span>
            </button>

            <span className="text-xs sm:text-sm text-gray-400 text-center flex-shrink-0">Step {activeStep + 1} of {steps.length}</span>

            {activeStep < steps.length - 1 ? (
              <button type="button" onClick={handleNext} className="flex items-center gap-1 sm:gap-2 px-4 sm:px-5 py-2 bg-[#D92B3A] hover:bg-[#b82231] rounded-lg text-sm font-medium transition flex-shrink-0">
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} className="flex items-center gap-1 sm:gap-2 px-4 sm:px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition flex-shrink-0">
                <span className="sm:hidden">Submit</span>
                <span className="hidden sm:inline">Submit Application</span>
                <CheckCircle size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#121F27] rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-hidden py-6 px-6 relative my-4 sm:my-0">
            <button onClick={() => setShowSuccess(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
              <X size={18} />
            </button>

            <div className="flex justify-center mb-5 mt-2">
              <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-center text-white mb-2">Application Submitted Successfully!</h2>
            <p className="text-sm text-gray-400 text-center mb-5">
              Your detective KYC application has been received and is now pending admin verification
            </p>

            <div className="bg-[#2D3E4D80] border border-white/10 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-[#D92B3A]" />
                <span className="text-sm font-semibold text-white">What Happens Next?</span>
              </div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>· Admin will review your application within 5-7 business days</li>
                <li>· We will verify your credentials and documents</li>
                <li>· Background check will be conducted</li>
                <li>· References will be contacted</li>
              </ul>
            </div>

            <div className="bg-[#FF49591A] border border-red/10 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <Mail size={16} className="text-[#D92B3A]" />
                <span className="text-sm font-semibold text-white">Email Notifications</span>
              </div>
              <p className="text-sm text-gray-400">You'll receive email updates at each stage of verification. Please check your inbox regularly.</p>
            </div>

            <div className="bg-[#F0B1001A] border border-yellow-900/40 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle size={16} className="text-yellow-400" />
                <span className="text-sm font-semibold text-white">Important Note</span>
              </div>
              <p className="text-sm text-gray-400">Please do not submit multiple applications. Duplicate submissions may delay the verification process.</p>
            </div>

            <p className="text-xs text-gray-500 text-center mb-4">
              Need help?<br />
              <span className="text-gray-400">Contact us at: </span>
              <a href="mailto:kyc@detectiveagency.com" className="text-[#D92B3A]">kyc@detectiveagency.com</a>
            </p>

            <div className="flex gap-3">
              <button onClick={() => setShowSuccess(false)} className="flex-1 py-3 rounded-lg border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/30 transition">
                Close
              </button>
              <button onClick={() => navigate(ROUTES.DETECTIVE_DASHBOARD)} className="flex-1 py-3 rounded-lg bg-[#D92B3A] hover:bg-[#b82231] text-sm font-medium transition">
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetectiveForm
