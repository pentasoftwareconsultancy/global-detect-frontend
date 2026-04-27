import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Upload, X } from 'lucide-react';
import { validateRequired, validateSelect } from '../../../hooks/validation';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const fieldStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '16px', fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', color: 'white', backgroundColor: '#0b1120', WebkitTextFillColor: 'white' };
const fieldClass = "w-full border border-white/20 pr-4 placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors appearance-none";
const errorClass = "text-red-400 text-xs mt-1";

const Step6EvidenceSupportingInformation = forwardRef(({ formData, handleInputChange }, ref) => {
  const [uploadedFiles1, setUploadedFiles1] = useState(formData.uploadedFiles1 || []);
  const [uploadedFiles2, setUploadedFiles2] = useState(formData.uploadedFiles2 || []);
  const [errors, setErrors] = useState({});

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

  const handleFileUpload = (e, setFiles, fieldName) => {
    const files = Array.from(e.target.files);
    const fileData = files.map(file => ({ name: file.name, url: URL.createObjectURL(file) }));
    const newFiles = [...(fieldName === 'uploadedFiles1' ? uploadedFiles1 : uploadedFiles2), ...fileData];
    setFiles(newFiles);
    handleInputChange({ target: { name: fieldName, value: newFiles } });
  };

  const removeFile = (index, files, setFiles, fieldName) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    handleInputChange({ target: { name: fieldName, value: newFiles } });
  };

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label style={labelStyle}>Existing Evidence Available?</label>
          <input type="text" name="existingEvidence" placeholder="Yes / No" style={fieldStyle} className={fieldClass} value={formData.existingEvidence || ''} onChange={handleChange} onBlur={e => validate(e.target.name, e.target.value)} />
          {errors.existingEvidence && <p className={errorClass}>{errors.existingEvidence}</p>}
        </div>

        <div className="space-y-2">
          <label style={labelStyle}>Evidence Type</label>
          <select name="evidenceType" style={fieldStyle} className={fieldClass} value={formData.evidenceType || ''} onChange={handleChange} onBlur={e => validate(e.target.name, e.target.value)}>
            <option value="" style={{ backgroundColor: '#0b1120', color: '#6B7280' }}>Select type</option>
            <option value="Document" style={{ backgroundColor: '#0b1120' }}>Document</option>
            <option value="Photo" style={{ backgroundColor: '#0b1120' }}>Photo</option>
            <option value="Video" style={{ backgroundColor: '#0b1120' }}>Video</option>
            <option value="Other" style={{ backgroundColor: '#0b1120' }}>Other</option>
          </select>
          {errors.evidenceType && <p className={errorClass}>{errors.evidenceType}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'upload1', files: uploadedFiles1, setFiles: setUploadedFiles1, fieldName: 'uploadedFiles1' },
          { id: 'upload2', files: uploadedFiles2, setFiles: setUploadedFiles2, fieldName: 'uploadedFiles2' },
        ].map(({ id, files, setFiles, fieldName }) => (
          <div key={id} className="space-y-2">
            <label style={labelStyle}>Upload Documents</label>
            <input type="file" id={id} multiple className="hidden" onChange={(e) => handleFileUpload(e, setFiles, fieldName)} />
            <label htmlFor={id} style={{ borderRadius: '14px', borderWidth: '2px', backgroundColor: '#0b1120' }} className="border-2 border-dashed border-white/20 p-8 flex flex-col items-center justify-center gap-3 hover:border-white/40 transition-colors cursor-pointer min-h-[160px]">
              <Upload size={32} className="text-gray-400" />
              <span style={labelStyle}>Upload documents</span>
            </label>
            {files.length > 0 && (
              <div className="space-y-2 mt-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg p-2" style={{ backgroundColor: '#0b1120', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontFamily: 'Montserrat', fontSize: '13px', color: '#D1D5DB' }} className="truncate">{file.name}</span>
                    <button onClick={() => removeFile(index, files, setFiles, fieldName)} className="text-red-400 hover:text-red-300 ml-2 flex-shrink-0">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
});

export default Step6EvidenceSupportingInformation;
