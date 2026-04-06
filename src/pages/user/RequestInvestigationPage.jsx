import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlobalLogo from '../../assets/Global.png';

// Import step components
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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save form data to localStorage before submitting
      const uploadedImages = [
        ...(formData.uploadedFiles1 || []),
        ...(formData.uploadedFiles2 || [])
      ];
      
      const newCase = {
        id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
        title: formData.investigationType || 'New Investigation',
        category: formData.investigationType || 'General',
        progress: 0,
        status: 'Pending Admin Approval',
        daysRemaining: 'Pending',
        image: uploadedImages.length > 0 ? uploadedImages[0].url : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
        files: uploadedImages.map(file => ({
          name: file.name,
          date: new Date().toLocaleDateString()
        })),
        submittedDate: new Date().toISOString()
      };
      
      const existingCases = JSON.parse(localStorage.getItem('userCases') || '[]');
      existingCases.unshift(newCase);
      localStorage.setItem('userCases', JSON.stringify(existingCases));
      
      setSubmitted(true);
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

  return (
   <div className="min-h-screen bg-[#0b1120] text-white flex flex-col md:flex-row">

  {/* Sidebar - Desktop */}
  <div className="hidden md:flex w-72 lg:w-80 bg-[#111827] p-6 lg:p-8 flex-col border-r border-white/5 sticky top-0 h-screen">

    {/* Logo */}
    <div className="flex items-center gap-3 mb-10 lg:mb-12">
      <img src={GlobalLogo} alt="Logo" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full" />
      <div>
        <h1 className="font-bold text-xs lg:text-sm tracking-wider uppercase leading-tight">
          Universal Detective
        </h1>
        <p className="text-[9px] lg:text-[10px] text-gray-400">PVT LTD</p>
      </div>
    </div>

    {/* Steps */}
    <div className="relative flex-1">
      <div className="absolute left-[14px] top-2 bottom-2 w-[2px] bg-white/10"></div>

      <div className="flex flex-col gap-8 lg:gap-10">
        {steps.map((step) => (
          <div key={step.id} className="relative flex items-center gap-3 lg:gap-4 z-10">

            <div
              className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-[9px] lg:text-[10px] font-bold transition-all duration-300 ${
                currentStep > step.id
                  ? 'bg-green-500 text-white'
                  : currentStep === step.id
                  ? 'bg-white text-[#0b1120] border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'bg-[#111827] text-gray-500 border-2 border-white/10'
              }`}
            >
              {currentStep > step.id ? <CheckCircle2 size={14} /> : step.id}
            </div>

            <span
              className={`text-[11px] lg:text-xs font-semibold transition-colors duration-300 ${
                currentStep === step.id ? 'text-white' : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Mobile Header */}
  <div className="md:hidden bg-[#111827] px-4 py-3 border-b border-white/5">

    {/* Logo */}
    <div className="flex items-center gap-2 mb-3">
      <img src={GlobalLogo} alt="Logo" className="w-7 h-7 rounded-full" />
      <div>
        <h1 className="font-bold text-[11px] uppercase leading-tight">
          Universal Detective
        </h1>
        <p className="text-[8px] text-gray-400">PVT LTD</p>
      </div>
    </div>

    {/* Steps Scroll */}
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">

      {steps.map((step) => (
        <div key={step.id} className="flex items-center gap-2 flex-shrink-0">

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold ${
              currentStep >= step.id
                ? 'bg-red text-white'
                : 'bg-white/10 text-gray-500'
            }`}
          >
            {step.id}
          </div>

          {currentStep === step.id && (
            <span className="text-[10px] font-bold whitespace-nowrap">
              {step.title}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>

  {/* Main Content */}
  <div className="flex-1 px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10 overflow-y-auto min-h-screen">

    <div className="max-w-6xl mx-auto">

      {/* Heading */}
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          {steps[currentStep - 1].title}
        </h2>
        <div className="h-1 w-16 sm:w-20 bg-red rounded-full"></div>
      </div>

      {/* Step Content */}
      <div className="bg-transparent rounded-xl min-h-[300px] md:min-h-[400px]">
        {renderStep()}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/5">

        <button
          onClick={handleBack}
          className="w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 rounded-xl border border-white/20 font-bold hover:bg-white/5 transition-all active:scale-95"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="w-full sm:w-auto bg-red px-6 sm:px-10 md:px-12 py-3 rounded-xl font-bold text-white hover:bg-[#b0222f] transition-all shadow-lg shadow-red/20 active:scale-95"
        >
          {currentStep === steps.length ? 'Save and Submit' : 'Save and next'}
        </button>

      </div>

    </div>
  </div>
</div>
  );
};

export default RequestInvestigationPage;
