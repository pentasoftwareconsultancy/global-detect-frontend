import React from 'react';

const Step8ReviewSubmit = ({ formData }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
        <h3 className="text-xl font-bold mb-6 text-red-500 underline underline-offset-8">Review Your Information</h3>
        
        <div className="space-y-8">
          {/* Step 1: Basic Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Basic Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Full Name</p>
                <p className="text-white">{formData.name || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Email</p>
                <p className="text-white">{formData.email || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Phone</p>
                <p className="text-white">{formData.phone || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Pincode</p>
                <p className="text-white">{formData.pincode || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">City</p>
                <p className="text-white">{formData.city || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">State</p>
                <p className="text-white">{formData.state || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Country</p>
                <p className="text-white">{formData.country || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Preferred Contact Method</p>
                <p className="text-white">{formData.preferredContactMethod || 'Not provided'}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-xs text-gray-500 uppercase">Address</p>
                <p className="text-white">{formData.address || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Step 2: Investigation Type */}
          <div className="border-t border-white/10 pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Investigation Type</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Investigation Type</p>
                <p className="text-white">{formData.investigationType || 'Not selected'}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-xs text-gray-500 uppercase">Purpose</p>
                <p className="text-white">{formData.purpose || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Step 3: Subject Details */}
          <div className="border-t border-white/10 pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Subject Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Entity Name</p>
                <p className="text-white">{formData.subjectEntityName || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Contact</p>
                <p className="text-white">{formData.subjectContact || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Email</p>
                <p className="text-white">{formData.subjectEmail || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Pincode</p>
                <p className="text-white">{formData.subjectPincode || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">City</p>
                <p className="text-white">{formData.subjectCity || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">State</p>
                <p className="text-white">{formData.subjectState || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Relationship to Subject</p>
                <p className="text-white">{formData.relationshipToSubject || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Subject Type</p>
                <p className="text-white">{formData.subjectType || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Step 4: Investigation Location */}
          <div className="border-t border-white/10 pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Investigation Location</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Location Type</p>
                <p className="text-white">{formData.locationType || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">State</p>
                <p className="text-white">{formData.locationState || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">City</p>
                <p className="text-white">{formData.locationCity || 'Not provided'}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-xs text-gray-500 uppercase">Address</p>
                <p className="text-white">{formData.locationAddress || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Step 5: Case Description */}
          <div className="border-t border-white/10 pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Case Description</h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Detailed Description</p>
                <p className="text-white">{formData.detailedDescription || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Key Questions</p>
                <p className="text-white">{formData.keyQuestions || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Expected Outcome</p>
                <p className="text-white">{formData.expectedOutcome || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Step 6: Evidence */}
          <div className="border-t border-white/10 pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Evidence & Supporting Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Existing Evidence</p>
                <p className="text-white">{formData.existingEvidence || 'Not provided'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Evidence Type</p>
                <p className="text-white">{formData.evidenceType || 'Not provided'}</p>
              </div>
            </div>
            {(formData.uploadedFiles1?.length > 0 || formData.uploadedFiles2?.length > 0) && (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-gray-500 uppercase">Uploaded Documents</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.uploadedFiles1?.map((file, index) => (
                    <div key={`file1-${index}`} className="space-y-2">
                      <img src={file.url} alt={file.name} className="w-full h-24 object-cover rounded-lg border border-white/20" />
                      <p className="text-xs text-gray-400 truncate">{file.name}</p>
                    </div>
                  ))}
                  {formData.uploadedFiles2?.map((file, index) => (
                    <div key={`file2-${index}`} className="space-y-2">
                      <img src={file.url} alt={file.name} className="w-full h-24 object-cover rounded-lg border border-white/20" />
                      <p className="text-xs text-gray-400 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 7: Legal Consent */}
          <div className="border-t border-white/10 pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Legal Consent & Declaration</h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Legal Consent</p>
                <p className="text-white">{formData.legalConsent ? '✓ Confirmed' : '✗ Not confirmed'}</p>
              </div>
              {formData.signatureFile && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 uppercase">Signature</p>
                  <div className="max-w-xs">
                    <img src={formData.signaturePreview} alt="Signature" className="w-full h-32 object-contain bg-white/5 rounded-lg border border-white/20 p-2" />
                    <p className="text-xs text-gray-400 mt-2">{formData.signatureFile.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 italic text-center">
        Please review all steps before final submission. Once submitted, your case will be reviewed by our admin team.
      </p>
    </div>
  );
};

export default Step8ReviewSubmit;