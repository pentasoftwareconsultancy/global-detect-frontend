import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const Step6EvidenceSupportingInformation = ({ formData, handleInputChange }) => {
  const [uploadedFiles1, setUploadedFiles1] = useState(formData.uploadedFiles1 || []);
  const [uploadedFiles2, setUploadedFiles2] = useState(formData.uploadedFiles2 || []);

  const handleFileUpload = (e, setFiles, fieldName) => {
    const files = Array.from(e.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
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
        {/* Existing Evidence Available? (Yes / No) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Existing Evidence Available? (Yes / No)</label>
          <input
            type="text"
            name="existingEvidence"
            placeholder="Yes/ No"
            className="w-full bg-transparent border border-white/20 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
            value={formData.existingEvidence || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Evidence Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Evidence Type</label>
          <div className="relative">
            <select
              name="evidenceType"
              className="w-full bg-[#0b1120] border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-white transition-colors appearance-none"
              value={formData.evidenceType || ''}
              onChange={handleInputChange}
            >
              <option value="">Select type</option>
              <option value="Document">Document</option>
              <option value="Photo">Photo</option>
              <option value="Video">Video</option>
              <option value="Other">Other</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Upload sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Upload documents</label>
          <input
            type="file"
            id="upload1"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e, setUploadedFiles1, 'uploadedFiles1')}
          />
          <label
            htmlFor="upload1"
            className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer min-h-[160px]"
          >
            <Upload size={32} className="text-gray-400" />
            <span className="text-sm text-gray-400">Upload documents</span>
          </label>
          {uploadedFiles1.length > 0 && (
            <div className="space-y-2 mt-2">
              {uploadedFiles1.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                  <span className="text-sm text-gray-300 truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(index, uploadedFiles1, setUploadedFiles1, 'uploadedFiles1')}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Upload documents</label>
          <input
            type="file"
            id="upload2"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e, setUploadedFiles2, 'uploadedFiles2')}
          />
          <label
            htmlFor="upload2"
            className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer min-h-[160px]"
          >
            <Upload size={32} className="text-gray-400" />
            <span className="text-sm text-gray-400">Upload documents</span>
          </label>
          {uploadedFiles2.length > 0 && (
            <div className="space-y-2 mt-2">
              {uploadedFiles2.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                  <span className="text-sm text-gray-300 truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(index, uploadedFiles2, setUploadedFiles2, 'uploadedFiles2')}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step6EvidenceSupportingInformation;
