import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const labelStyle = { fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '21px', letterSpacing: '0px', color: '#D1D5DB' };
const inputStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '16px' };

const Step6EvidenceSupportingInformation = ({ formData, handleInputChange }) => {
  const [uploadedFiles1, setUploadedFiles1] = useState(formData.uploadedFiles1 || []);
  const [uploadedFiles2, setUploadedFiles2] = useState(formData.uploadedFiles2 || []);

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
          <input type="text" name="existingEvidence" placeholder="Yes / No" style={inputStyle} className="w-full bg-transparent border border-white/20 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors" value={formData.existingEvidence || ''} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <label style={labelStyle}>Evidence Type</label>
          <select name="evidenceType" style={inputStyle} className="w-full bg-[#0b1120] border border-white/20 pr-4 text-white focus:outline-none focus:border-white appearance-none" value={formData.evidenceType || ''} onChange={handleInputChange}>
            <option value="">Select type</option>
            <option value="Document">Document</option>
            <option value="Photo">Photo</option>
            <option value="Video">Video</option>
            <option value="Other">Other</option>
          </select>
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
            <label htmlFor={id} style={{ borderRadius: '14px', borderWidth: '2px' }} className="border-2 border-dashed border-white/20 p-8 flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer min-h-[160px]">
              <Upload size={32} className="text-gray-400" />
              <span style={labelStyle}>Upload documents</span>
            </label>
            {files.length > 0 && (
              <div className="space-y-2 mt-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                    <span className="text-sm text-gray-300 truncate">{file.name}</span>
                    <button onClick={() => removeFile(index, files, setFiles, fieldName)} className="text-red-400 hover:text-red-300">
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
};

export default Step6EvidenceSupportingInformation;
