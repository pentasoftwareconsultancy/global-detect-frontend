import React from 'react';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#9CA3AF' };
const valueStyle = { fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', lineHeight: '21px', color: 'white' };
const sectionTitleStyle = { fontFamily: 'Montserrat', fontWeight: 600, fontSize: '16px', lineHeight: '21px', color: 'white' };

const Field = ({ label, value }) => (
  <div className="space-y-1">
    <p style={labelStyle}>{label}</p>
    <p style={valueStyle}>{value || 'Not provided'}</p>
  </div>
);

const Step8ReviewSubmit = ({ formData }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 rounded-[14px] p-8 border border-white/10">
        <h3 style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '20px', color: '#D92B3A' }} className="mb-6">Review Your Information</h3>

        <div className="space-y-8">

          {/* Step 1 */}
          <div>
            <h4 style={sectionTitleStyle} className="mb-4">Basic Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Full Name" value={formData.name} />
              <Field label="Email" value={formData.email} />
              <Field label="Phone" value={formData.phone} />
              <Field label="Pincode" value={formData.pincode} />
              <Field label="City" value={formData.city} />
              <Field label="State" value={formData.state} />
              <Field label="Country" value={formData.country} />
              <Field label="Preferred Contact Method" value={formData.preferredContactMethod} />
              <div className="md:col-span-2 lg:col-span-3 space-y-1">
                <p style={labelStyle}>Address</p>
                <p style={valueStyle}>{formData.address || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border-t border-white/10 pt-6">
            <h4 style={sectionTitleStyle} className="mb-4">Investigation Type</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Investigation Type" value={formData.investigationType} />
              <div className="md:col-span-2 space-y-1">
                <p style={labelStyle}>Purpose</p>
                <p style={valueStyle}>{formData.purpose || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border-t border-white/10 pt-6">
            <h4 style={sectionTitleStyle} className="mb-4">Subject Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Entity Name" value={formData.subjectEntityName} />
              <Field label="Contact" value={formData.subjectContact} />
              <Field label="Email" value={formData.subjectEmail} />
              <Field label="Pincode" value={formData.subjectPincode} />
              <Field label="City" value={formData.subjectCity} />
              <Field label="State" value={formData.subjectState} />
              <Field label="Relationship to Subject" value={formData.relationshipToSubject} />
              <Field label="Subject Type" value={formData.subjectType} />
            </div>
          </div>

          {/* Step 4 */}
          <div className="border-t border-white/10 pt-6">
            <h4 style={sectionTitleStyle} className="mb-4">Investigation Location</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Location Type" value={formData.locationType} />
              <Field label="State" value={formData.locationState} />
              <Field label="City" value={formData.locationCity} />
              <div className="md:col-span-2 lg:col-span-3 space-y-1">
                <p style={labelStyle}>Address</p>
                <p style={valueStyle}>{formData.locationAddress || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="border-t border-white/10 pt-6">
            <h4 style={sectionTitleStyle} className="mb-4">Case Description</h4>
            <div className="space-y-4">
              <Field label="Detailed Description" value={formData.detailedDescription} />
              <Field label="Key Questions" value={formData.keyQuestions} />
              <Field label="Expected Outcome" value={formData.expectedOutcome} />
            </div>
          </div>

          {/* Step 6 */}
          <div className="border-t border-white/10 pt-6">
            <h4 style={sectionTitleStyle} className="mb-4">Evidence & Supporting Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Existing Evidence" value={formData.existingEvidence} />
              <Field label="Evidence Type" value={formData.evidenceType} />
            </div>
            {(formData.uploadedFiles1?.length > 0 || formData.uploadedFiles2?.length > 0) && (
              <div className="mt-4">
                <p style={labelStyle} className="mb-2">Uploaded Documents</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...(formData.uploadedFiles1 || []), ...(formData.uploadedFiles2 || [])].map((file, index) => (
                    <div key={index} className="space-y-2">
                      <img src={file.url} alt={file.name} className="w-full h-24 object-cover rounded-lg border border-white/20" />
                      <p className="text-xs text-gray-400 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 7 */}
          <div className="border-t border-white/10 pt-6">
            <h4 style={sectionTitleStyle} className="mb-4">Legal Consent & Declaration</h4>
            <Field label="Legal Consent" value={formData.legalConsent ? '✓ Confirmed' : '✗ Not confirmed'} />
            {formData.signatureFile && (
              <div className="mt-4 space-y-2">
                <p style={labelStyle}>Signature</p>
                <div className="max-w-xs">
                  <img src={formData.signaturePreview} alt="Signature" className="w-full h-32 object-contain bg-white/5 rounded-lg border border-white/20 p-2" />
                  <p className="text-xs text-gray-400 mt-2">{formData.signatureFile.name}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: '13px', color: '#9CA3AF' }} className="text-center italic">
        Please review all steps before final submission. Once submitted, your case will be reviewed by our admin team.
      </p>
    </div>
  );
};

export default Step8ReviewSubmit;
