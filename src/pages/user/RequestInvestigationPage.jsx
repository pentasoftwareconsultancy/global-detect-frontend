import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ServerUrl from "../../core/constants/serverURL.constant";


import Step1BasicContactInformation from '../../components/user/request-investigation/Step1BasicContactInformation';
import Step2InvestigationTypeSelection from '../../components/user/request-investigation/Step2InvestigationTypeSelection';
import Step3SubjectDetails from '../../components/user/request-investigation/Step3SubjectDetails';
import Step4InvestigationLocation from '../../components/user/request-investigation/Step4InvestigationLocation';
import Step5CaseDescription from '../../components/user/request-investigation/Step5CaseDescription';
import Step6EvidenceSupportingInformation from '../../components/user/request-investigation/Step6EvidenceSupportingInformation';
import Step7LegalConsentDeclaration from '../../components/user/request-investigation/Step7LegalConsentDeclaration';
import Step8ReviewSubmit from '../../components/user/request-investigation/Step8ReviewSubmit';
import SuccessScreen from '../../components/user/request-investigation/SuccessScreen';

const RequestInvestigationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    preferredContactMethod: '',
    address: '',
    purpose: '',
    investigationType: '',
    subjectEntityName: '',
    subjectContact: '',
    subjectEmail: '',
    subjectPincode: '',
    subjectCity: '',
    subjectState: '',
    relationshipToSubject: '',
    subjectType: '',
    locationType: '',
    locationState: '',
    locationCity: '',
    locationAddress: '',
    detailedDescription: '',
    keyQuestions: '',
    expectedOutcome: '',
    existingEvidence: '',
    evidenceType: '',
    legalConsent: false,
  });

  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Basic Contact Information' },
    { id: 2, title: 'Investigation Type Selection' },
    { id: 3, title: 'Subject Details' },
    { id: 4, title: 'Investigation Location' },
    { id: 5, title: 'Case Description' },
    { id: 6, title: 'Evidence & Supporting Information' },
    { id: 7, title: 'Legal Consent & Declaration' },
    { id: 8, title: 'Review & Submit' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isLoggedIn = !!localStorage.getItem("token"); 


    const getSessionId = () => {
    let sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }

    return sessionId;
  };


  const buildPayload = () => ({
  // Step tracking
  current_step: currentStep,

  // Contact
  full_name: formData.name,
  email: formData.email,
  phone: formData.phone,
  pincode: formData.pincode,
  city: formData.city,
  state: formData.state,
  country: formData.country || "India",
  preferred_contact_method: formData.preferredContactMethod,
  address: formData.address,

  // Investigation
  purpose_of_investigation: formData.purpose,
  investigation_type: formData.investigationType,

  // Subject
  subject_name: formData.subjectEntityName,
  subject_phone: formData.subjectContact,
  subject_email: formData.subjectEmail,
  subject_pincode: formData.subjectPincode,
  subject_city: formData.subjectCity,
  subject_state: formData.subjectState,
  relationship_with_subject: formData.relationshipToSubject,
  subject_type: formData.subjectType,

  // Location
  location_type: formData.locationType,
  investigation_state: formData.locationState,
  investigation_city: formData.locationCity,
  investigation_address: formData.locationAddress,

  // Description
  case_description: formData.detailedDescription,
  specific_questions: formData.keyQuestions,
  expected_outcome: formData.expectedOutcome,

  // Evidence
  evidence_type: formData.evidenceType,
existing_evidence: formData.existingEvidence,

  // Consent
  agreement_confirmed: formData.legalConsent,
  // digital_signature: formData.name // or separate field if you have
});


 const handleNext = async () => {

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // FINAL STEP
    try {
      if (!formData.legalConsent) {
        alert("Please accept terms & conditions");
        return;
      }

      const sessionId = getSessionId();

      const payload = {
        ...buildPayload(),
        session_id: sessionId
      };

      // STEP 1: SAVE DRAFT
      const draftRes = await axios.post(
        ServerUrl.DRAFT_REQUEST_FORM_API,
        payload
      );

      const formId =
        draftRes.data?.id ||
        draftRes.data?.data?.id;

      if (!formId) {
        throw new Error("Form ID not received");
      }

      localStorage.setItem("formId", formId);

      // STEP 2: SUBMIT IF LOGGED IN
      if (isLoggedIn) {
        await axios.post(
          ServerUrl.CREATE_REQUEST_FORM_API,
          { form_id: formId }
        );
      }

      setSubmitted(true);

    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      alert("Something went wrong!");
    }
  };


  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  if (submitted) {
    return <SuccessScreen />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1BasicContactInformation formData={formData} handleInputChange={handleInputChange} />;
      case 2: return <Step2InvestigationTypeSelection formData={formData} handleInputChange={handleInputChange} />;
      case 3: return <Step3SubjectDetails formData={formData} handleInputChange={handleInputChange} />;
      case 4: return <Step4InvestigationLocation formData={formData} handleInputChange={handleInputChange} />;
      case 5: return <Step5CaseDescription formData={formData} handleInputChange={handleInputChange} />;
      case 6: return <Step6EvidenceSupportingInformation formData={formData} handleInputChange={handleInputChange} />;
      case 7: return <Step7LegalConsentDeclaration formData={formData} handleInputChange={handleInputChange} />;
      case 8: return <Step8ReviewSubmit formData={formData} />;
      default: return null;
    }
  };

  const isStepEight = currentStep === 8;

  return (
   <div className="fixed inset-0 bg-[#0b1120] text-white flex flex-col md:flex-row overflow-hidden">

  {/* STEP PROGRESS SIDEBAR */}
  <div className="hidden md:flex flex-shrink-0" style={{ width: '450px' }}>
    <div className="bg-[#1A2832] rounded-[24px] m-6 flex flex-col relative" style={{ width: '400px', maxHeight: 'calc(100vh - 48px)', padding: '40px 32px', overflow: 'hidden' }}>

          <div className="absolute" style={{ left: '63px', top: '40px', width: '6px', bottom: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}></div>

      {/* Filled progress line */}
      <div className="absolute transition-all duration-500" style={{
        left: '63px',
        top: '40px',
        width: '6px',
        height: 'calc(100% - 80px)',
        transform: `scaleY(${(currentStep - 1) / (steps.length - 1)})`,
        transformOrigin: 'top',
        background: 'white',
        borderRadius: '3px'
      }}></div>

          <div className="flex flex-col justify-between h-full relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="relative flex items-center gap-4">
                <div className="flex-shrink-0" style={{ width: '30px', height: '30px', marginLeft: '19px' }}>
                  <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep > step.id ? 'bg-green-500 text-white'
                    : currentStep === step.id ? 'bg-white text-[#0b1120]'
                    : 'bg-[#111827] text-gray-500 border-2 border-white/20'
                  }`}>
                    {currentStep > step.id
                      ? <CheckCircle2 size={14} />
                      : <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '12px', lineHeight: '21px', letterSpacing: '0px', textAlign: 'center' }}>
                          {String(step.id).padStart(2, '0')}
                        </span>
                    }
                  </div>
                </div>
                <span style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '17px', lineHeight: '20px', letterSpacing: '0px', width: '310px' }}
                  className={`transition-colors duration-300 ${currentStep === step.id ? 'text-white' : currentStep > step.id ? 'text-white/60' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

  {/* MOBILE PROGRESS BAR */}
  <div className="md:hidden bg-[#0b1120] px-4 pt-4 pb-2 shrink-0">
    <div style={{ width: '100%', gap: '11.99px' }} className="flex flex-col">

      {/* Step X of 8 + percentage */}
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: 'white' }}>
          Step {currentStep} of {steps.length}
        </span>
        <span style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '12px', lineHeight: '18px', letterSpacing: '0px', color: '#9CA3AF' }}>
          {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}% Complete
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', height: '7.98px', borderRadius: '42431300px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <div
          className="transition-all duration-500"
          style={{
            height: '100%',
            width: `${Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%`,
            background: '#D92B3A',
            borderRadius: '42431300px'
          }}
        />
      </div>

      {/* Step title */}
      <span style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#9CA3AF' }}>
        {steps[currentStep - 1].title}
      </span>

    </div>
  </div>

  {/* Main Content */}
  <div className="flex-1 flex flex-col overflow-hidden">
    <div className="flex-1 overflow-hidden px-4 sm:px-6 md:px-4 lg:px-6 py-4 md:py-10" style={{ height: '100%' }}>
      <div className="max-w-6xl mx-auto h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-hidden">
            {/* Heading - desktop only */}
            <div className="hidden md:block pt-2">
              <h2 style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '32px', lineHeight: '40px', letterSpacing: '0px' }} className="text-white mb-8">
                {steps[currentStep - 1].title}
              </h2>
            </div>

            {/* Step Content */}
            <div className="bg-transparent rounded-xl h-full overflow-hidden">
              {isStepEight ? (
                <div className="h-full overflow-y-auto pr-2 pb-6 min-h-0">
                  {renderStep()}
                </div>
              ) : (
                <div className="min-h-0">
                  {renderStep()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

        <div className="border-t border-white/10 bg-[#0b1120] sticky bottom-0 z-20 py-4">
          <div className="max-w-6xl mx-auto flex justify-between gap-4">
            <button
              onClick={handleBack}
              style={{ height: '54px', borderRadius: '8px', borderWidth: '2px', fontFamily: 'Inter', fontWeight: 600, fontSize: '20px', lineHeight: '100%', letterSpacing: '0px' }}
              className="w-35.75 md:w-35.75 border border-white/30 text-white hover:bg-white/5 transition-all active:scale-95 flex items-center justify-center"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              style={{ height: '54px', borderRadius: '8px', fontFamily: 'Inter', fontWeight: 600, fontSize: '20px', lineHeight: '100%', letterSpacing: '0px', background: '#D92B3A' }}
              className="flex-1 md:flex-none md:w-54.25 text-white hover:bg-[#b0222f] transition-all active:scale-95 flex items-center justify-center"
            >
              {currentStep === steps.length ? 'Save and Submit' : 'Save and next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RequestInvestigationPage;
