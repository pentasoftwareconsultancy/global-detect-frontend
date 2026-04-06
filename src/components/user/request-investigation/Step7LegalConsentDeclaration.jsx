import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const Step7LegalConsentDeclaration = ({ formData, handleInputChange }) => {
  const [signatureFile, setSignatureFile] = useState(formData.signatureFile || null);
  const [previewUrl, setPreviewUrl] = useState(formData.signaturePreview || null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSignatureFile({ name: file.name, url });
      setPreviewUrl(url);
      handleInputChange({ target: { name: 'signatureFile', value: { name: file.name, url } } });
      handleInputChange({ target: { name: 'signaturePreview', value: url } });
    }
  };

  const removeFile = () => {
    setSignatureFile(null);
    setPreviewUrl(null);
    handleInputChange({ target: { name: 'signatureFile', value: null } });
    handleInputChange({ target: { name: 'signaturePreview', value: null } });
  };
  return (
    <div className="space-y-12">
      {/* Checkbox */}
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          name="legalConsent"
          id="legalConsent"
          className="w-5 h-5 rounded border-white/20 bg-transparent accent-white shrink-0 mt-1"
          checked={formData.legalConsent || false}
          onChange={handleInputChange}
        />
        <label htmlFor="legalConsent" className="text-sm text-gray-300 leading-relaxed">
          "I confirm that the information provided is accurate and the investigation request complies with applicable laws and ethical standards."
        </label>
      </div>

      {/* Upload Sign */}
      <div className="space-y-4 max-w-sm">
        <label className="text-sm font-medium text-gray-300">Upload Sign for consent</label>
        <input
          type="file"
          id="signUpload"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        {!signatureFile ? (
          <label
            htmlFor="signUpload"
            className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer min-h-[160px]"
          >
            <Upload size={32} className="text-gray-400" />
            <span className="text-sm text-gray-400">Upload Sign</span>
          </label>
        ) : (
          <div className="relative border-2 border-white/20 rounded-xl p-4 bg-white/5">
            <button
              onClick={removeFile}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
            <img
              src={previewUrl}
              alt="Signature"
              className="w-full h-40 object-contain"
            />
            <p className="text-sm text-gray-300 mt-2 text-center truncate">{signatureFile.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step7LegalConsentDeclaration;
