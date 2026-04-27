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

import { CheckCircle, ArrowLeft, ArrowRight, UploadCloud, User, MapPin, Briefcase, FileText, CreditCard, Users, Shield } from 'lucide-react'

const DetectiveForm = () => {
  const { setKycComplete } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const [showSuccess, setShowSuccess] = useState(false);
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

    setData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [key]: file.name
      }
    }));

  };

  const handleChange = (
    section,
    field,
    value,
    idx
  ) => {

    setData((prev) => {

      const clone = { ...prev };

      if (section === 'references') {
        clone.references[idx][field] = value;
      }
      else {
        clone[section][field] = value;
      }

      return clone;

    });

  };

  const next = () =>
    setActiveStep((s) =>
      Math.min(s + 1, steps.length - 1)
    );

  const prev = () =>
    setActiveStep((s) =>
      Math.max(s - 1, 0)
    );

  const handleSubmit = async () => {

    try {

      setLoading(true);

      console.log('Final Payload:', data);

      const response =
        await authService.createDetectiveKYC(data);

      console.log('KYC Success:', response);

      setKycComplete(true);

      setShowSuccess(true);

    }
    catch (error) {

      console.error('KYC Failed:', error);

      alert(
        error?.response?.data?.message ||
        'Failed to submit KYC. Please try again.'
      );

    }
    finally {

      setLoading(false);

    }

  };

  const renderStep = () => {

    switch (activeStep) {

      case 0:
        return (
          <StepOneDetectiveForm
            data={data}
            handleChange={handleChange}
          />
        );

      case 1:
        return (
          <StepTwoDetectiveForm
            data={data}
            handleChange={handleChange}
          />
        );

      case 2:
        return (
          <StepThreeDetectiveForm
            data={data}
            handleChange={handleChange}
          />
        );

      case 3:
        return (
          <StepFourDetectiveForm
            data={data}
            handleChange={handleChange}
            handleFile={handleFile}
          />
        );

      case 4:
        return (
          <StepFiveDetectiveForm
            data={data}
            handleChange={handleChange}
          />
        );

      case 5:
        return (
          <StepSixDetectiveForm
            data={data}
            handleChange={handleChange}
          />
        );

      case 6:
        return (
          <StepSevenDetectiveForm
            data={data}
            handleChange={handleChange}
          />
        );

      default:
        return null;

    }

  };

  return (
    <div className="min-h-screen p-8 bg-[#071018] text-white">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Detective KYC Application</h1>
            <p className="text-sm text-gray-300">Complete your verification to join our team</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
        </div>

        <StepIndicator
          steps={steps}
          active={activeStep}
        />

        <div className="bg-[#0b2326] rounded-lg p-6">

          {renderStep()}

          {/* Footer nav */}
          <div className="flex items-center justify-between mt-6">
            <div>
              <button type="button" onClick={prev} disabled={activeStep === 0} className="px-4 py-2 bg-gray-800 rounded text-sm disabled:opacity-50 flex items-center gap-2"><ArrowLeft size={14} /> Previous</button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-400">Step {activeStep + 1} of {steps.length}</div>
              {activeStep < steps.length - 1 ? (
                <button type="button" onClick={next} className="px-4 py-2 bg-pink-500 rounded text-sm flex items-center gap-2">Next <ArrowRight size={14} /></button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 rounded text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                  <CheckCircle size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

          <div className="bg-[#1a2535] rounded-2xl w-full max-w-md p-6">

            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-center text-white mb-2">
              Application Submitted Successfully!
            </h2>

            <p className="text-sm text-gray-400 text-center mb-6">
              Your detective KYC application is under review.
            </p>

            <button
              onClick={() =>
                navigate(ROUTES.DETECTIVE_DASHBOARD)
              }
              className="w-full py-3 bg-green-600 rounded-lg"
            >
              Return to Dashboard
            </button>

          </div>

        </div>
      )}
    </div>
  )
}

export default DetectiveForm