import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Upload, X, Loader2, CheckCircle } from 'lucide-react';
import { validateConsent } from '../../../hooks/validation';
import { authService } from '../../../core/services/auth.service';
import { toast } from 'react-toastify';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const errorClass = "text-red-400 text-xs mt-1";

const Step7LegalConsentDeclaration = forwardRef(({ formData, handleInputChange }, ref) => {
  const [signatureFile, setSignatureFile] = useState(formData.signatureFile || null);
  const [previewUrl, setPreviewUrl] = useState(formData.signaturePreview || null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    validateAll: () => {
      const err = validateConsent(formData.legalConsent);
      setErrors({ legalConsent: err });
      return !err;
    }
  }));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setSignatureFile({ name: file.name, url: null, uploading: true });
    setUploading(true);

    try {
      const res = await authService.uploadCaseFile(file, 'case-signatures');
      const url = res?.data?.data?.url || res?.data?.url;
      if (!url) throw new Error('No URL');

      setSignatureFile({ name: file.name, url });
      setPreviewUrl(url);
      handleInputChange({ target: { name: 'signatureFile', value: { name: file.name, url } } });
      handleInputChange({ target: { name: 'signaturePreview', value: url } });
      toast.success('Signature uploaded');
    } catch {
      toast.error('Signature upload failed');
      setSignatureFile(null);
      setPreviewUrl(null);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeFile = () => {
    setSignatureFile(null);
    setPreviewUrl(null);
    handleInputChange({ target: { name: 'signatureFile', value: null } });
    handleInputChange({ target: { name: 'signaturePreview', value: null } });
  };

  const handleConsentChange = (e) => {
    handleInputChange(e);
    setErrors({ legalConsent: validateConsent(e.target.checked) });
  };

  return (
    <div className="space-y-10">

      {/* Consent checkbox */}
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          name="legalConsent"
          id="legalConsent"
          className="w-5 h-5 rounded border-white/20 bg-transparent accent-white shrink-0 mt-1"
          checked={formData.legalConsent || false}
          onChange={handleConsentChange}
        />
        <div>
          <label htmlFor="legalConsent" style={labelStyle} className="leading-relaxed cursor-pointer">
            "I confirm that the information provided is accurate and the investigation request complies with applicable laws and ethical standards."
          </label>
          {errors.legalConsent && <p className={errorClass}>{errors.legalConsent}</p>}
        </div>
      </div>

      {/* Signature upload */}
      <div className="space-y-3 max-w-sm">
        <label style={labelStyle}>Upload Sign for Consent</label>
        <input type="file" id="signUpload" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />

        {!signatureFile ? (
          <label
            htmlFor="signUpload"
            style={{ borderRadius: '14px', borderWidth: '2px', backgroundColor: '#0b1120', opacity: uploading ? 0.5 : 1 }}
            className="border-2 border-dashed border-white/20 p-8 flex flex-col items-center justify-center gap-3 hover:border-white/40 transition-colors cursor-pointer min-h-[160px]"
          >
            {uploading
              ? <Loader2 size={32} className="text-gray-400 animate-spin" />
              : <Upload size={32} className="text-gray-400" />
            }
            <span style={labelStyle}>{uploading ? 'Uploading…' : 'Upload Sign'}</span>
          </label>
        ) : (
          <div style={{ borderRadius: '14px', backgroundColor: '#0b1120' }} className="relative border-2 border-white/20 p-4">
            {!uploading && (
              <button onClick={removeFile} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 transition-colors">
                <X size={16} className="text-white" />
              </button>
            )}
            {uploading ? (
              <div className="flex flex-col items-center justify-center h-40 gap-2">
                <Loader2 size={28} className="text-gray-400 animate-spin" />
                <span style={{ fontFamily: 'Montserrat', fontSize: '13px', color: '#D1D5DB' }}>Uploading…</span>
              </div>
            ) : (
              <>
                <img src={previewUrl} alt="Signature" className="w-full h-40 object-contain" />
                <div className="flex items-center gap-1 mt-2 justify-center">
                  <CheckCircle size={13} className="text-green-400 shrink-0" />
                  <p style={{ fontFamily: 'Montserrat', fontSize: '13px', color: '#D1D5DB' }} className="truncate">{signatureFile.name}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

    </div>
  );
});

export default Step7LegalConsentDeclaration;
