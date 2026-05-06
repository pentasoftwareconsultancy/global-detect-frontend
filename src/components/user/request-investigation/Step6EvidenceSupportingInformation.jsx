import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Upload, X, Loader2, CheckCircle } from 'lucide-react';
import { validateRequired, validateSelect } from '../../../hooks/validation';
import { authService } from '../../../core/services/auth.service';
import { toast } from 'react-toastify';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const fieldStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '16px', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: 'white', backgroundColor: '#0b1120', WebkitTextFillColor: 'white' };
const fieldClass = "w-full border border-white/20 pr-4 placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors appearance-none";
const errorClass = "text-red-400 text-xs mt-1";

const Step6EvidenceSupportingInformation = forwardRef(({ formData, handleInputChange }, ref) => {
  // uploadedFiles stores { name, url (Cloudinary), uploading }
  const [uploadedFiles, setUploadedFiles] = useState(formData.uploadedFiles || []);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const runValidate = (name, value) => {
    if (name === 'existingEvidence') return validateRequired(value, 'Existing Evidence');
    if (name === 'evidenceType') return validateSelect(value, 'Evidence Type');
    return '';
  };

  const validate = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: runValidate(name, value) }));
  };

  useImperativeHandle(ref, () => ({
    validateAll: () => {
      const fields = ['existingEvidence', 'evidenceType'];
      const newErrors = {};
      let valid = true;
      fields.forEach(f => {
        const err = runValidate(f, formData[f] || '');
        newErrors[f] = err;
        if (err) valid = false;
      });
      setErrors(newErrors);
      return valid;
    }
  }));

  const handleChange = (e) => {
    handleInputChange(e);
    validate(e.target.name, e.target.value);
  };

  /* ── upload files to Cloudinary ── */
  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Add placeholders with uploading state
    const placeholders = files.map(f => ({ name: f.name, url: null, uploading: true }));
    const startIdx = uploadedFiles.length;
    const newList = [...uploadedFiles, ...placeholders];
    setUploadedFiles(newList);

    // Upload each file
    const results = await Promise.all(
      files.map(async (file, i) => {
        try {
          const res = await authService.uploadCaseFile(file, 'case-evidence');
          const url = res?.data?.data?.url || res?.data?.url;
          if (!url) throw new Error('No URL');
          return { name: file.name, url, uploading: false };
        } catch {
          toast.error(`Failed to upload ${file.name}`);
          return { name: file.name, url: null, uploading: false, failed: true };
        }
      })
    );

    setUploadedFiles(prev => {
      const updated = [...prev];
      results.forEach((r, i) => { updated[startIdx + i] = r; });
      // filter out failed ones
      const final = updated.filter(f => !f.failed);
      handleInputChange({ target: { name: 'uploadedFiles', value: final } });
      return final;
    });

    // reset input so same file can be re-selected
    e.target.value = '';
  };

  const removeFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    handleInputChange({ target: { name: 'uploadedFiles', value: newFiles } });
  };

  return (
    <div className="space-y-8">

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label style={labelStyle}>Existing Evidence Available?</label>
          <select name="existingEvidence" style={fieldStyle} className={fieldClass} value={formData.existingEvidence || ''} onChange={handleChange} onBlur={e => validate(e.target.name, e.target.value)}>
            <option value="" style={{ backgroundColor: '#0b1120', color: '#6B7280' }}>Select</option>
            <option value="Yes" style={{ backgroundColor: '#0b1120' }}>Yes</option>
            <option value="No" style={{ backgroundColor: '#0b1120' }}>No</option>
          </select>
          {errors.existingEvidence && <p className={errorClass}>{errors.existingEvidence}</p>}
        </div>

        <div className="space-y-2">
          <label style={labelStyle}>Evidence Type</label>
          <select name="evidenceType" style={fieldStyle} className={fieldClass} value={formData.evidenceType || ''} onChange={handleChange} onBlur={e => validate(e.target.name, e.target.value)}>
            <option value="" style={{ backgroundColor: '#0b1120', color: '#6B7280' }}>Select type</option>
            <option value="No Evidence" style={{ backgroundColor: '#0b1120' }}>No Evidence</option>
            <option value="Document" style={{ backgroundColor: '#0b1120' }}>Document</option>
            <option value="Photo" style={{ backgroundColor: '#0b1120' }}>Photo</option>
            <option value="Video" style={{ backgroundColor: '#0b1120' }}>Video</option>
            <option value="Other" style={{ backgroundColor: '#0b1120' }}>Other</option>
          </select>
          {errors.evidenceType && <p className={errorClass}>{errors.evidenceType}</p>}
        </div>
      </div>

      {/* Single centred upload zone */}
      <div className="space-y-3">
        <label style={labelStyle}>Upload Documents</label>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.mp4,.mov"
          className="hidden"
          onChange={handleFileSelect}
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          style={{ borderRadius: '14px', backgroundColor: '#0b1120' }}
          className="border-2 border-dashed border-white/20 p-10 flex flex-col items-center justify-center gap-3 hover:border-white/40 transition-colors cursor-pointer min-h-[180px]"
        >
          <Upload size={36} className="text-gray-400" />
          <span style={labelStyle}>Click to upload documents</span>
          <span style={{ fontFamily: 'Montserrat', fontSize: '12px', color: '#6B7280' }}>
            PDF, JPG, PNG, MP4 — single or multiple files
          </span>
        </div>

        {/* File list */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 mt-3">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg p-2 gap-2"
                style={{ backgroundColor: '#0b1120', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {file.uploading
                    ? <Loader2 size={14} className="text-gray-400 animate-spin shrink-0" />
                    : <CheckCircle size={14} className="text-green-400 shrink-0" />
                  }
                  <span style={{ fontFamily: 'Montserrat', fontSize: '13px', color: '#D1D5DB' }} className="truncate">
                    {file.uploading ? `Uploading ${file.name}…` : file.name}
                  </span>
                </div>
                {!file.uploading && (
                  <button onClick={() => removeFile(index)} className="text-red-400 hover:text-red-300 shrink-0">
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
});

export default Step6EvidenceSupportingInformation;
