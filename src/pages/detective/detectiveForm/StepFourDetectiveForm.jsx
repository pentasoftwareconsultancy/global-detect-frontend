import React, { useRef } from 'react'
import { FileText, UploadCloud, Loader2, CheckCircle } from 'lucide-react'
import { authService } from '../../../core/services/auth.service'
import { toast } from 'react-toastify'

const DOCS = [
  { key: 'govId',       label: 'Government-issued ID Proof',   required: true,  errKey: 'govId'       },
  { key: 'licenseCert', label: 'Detective License Certificate', required: true,  errKey: 'licenseCert' },
  { key: 'resume',      label: 'Professional Resume/CV',        required: true,  errKey: 'resume'      },
  { key: 'certs',       label: 'Professional Certifications',   required: false, errKey: null          },
  { key: 'background',  label: 'Background Check Report',       required: true,  errKey: 'background'  },
  { key: 'address',     label: 'Proof of Address',              required: true,  errKey: 'address_doc' },
]

const StepFourDetectiveForm = ({ data, handleFile, errors = {}, uploading = {}, setUploading }) => {
  const inputRefs = useRef({})

  const handleSelect = async (e, key) => {
    const file = e.target.files[0]
    if (!file) return

    // validate size (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`${file.name} exceeds 5 MB limit`)
      return
    }

    // show filename immediately
    handleFile({ target: { files: [file] } }, key)

    // upload to Cloudinary
    setUploading(prev => ({ ...prev, [key]: true }))
    try {
      const res = await authService.uploadKYCDocument(file)
      const url = res?.data?.data?.url || res?.data?.url
      if (!url) throw new Error('No URL returned')
      // store the Cloudinary URL instead of the filename
      handleFile({ target: { files: [{ name: url }] } }, key, url)
      toast.success('Document uploaded')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Upload failed')
      // clear the file on failure
      handleFile({ target: { files: [{ name: '' }] } }, key, '')
    } finally {
      setUploading(prev => ({ ...prev, [key]: false }))
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <FileText size={18} className="text-[#D92B3A]" />
        <h3 className="text-base font-semibold">Required Documents</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">Upload the following documents for verification</p>

      <div className="space-y-5">
        {DOCS.map(({ key, label, required, errKey }) => {
          const value     = data.documents[key] || ''
          const isUploading = uploading[key]
          const isUploaded  = value.startsWith('http')
          const hasError    = errKey && errors[errKey]

          return (
            <div key={key}>
              <label className="block text-sm text-gray-300 mb-2">
                {label} {required && <span className="text-[#D92B3A]">*</span>}
              </label>

              <div className="flex items-center gap-2">
                {/* filename / URL display — clicking opens file picker */}
                <div
                  onClick={() => !isUploading && inputRefs.current[key]?.click()}
                  className={`flex-1 px-4 py-3 border ${hasError ? 'border-[#D92B3A]' : isUploaded ? 'border-green-500/50' : 'border-white/50'} rounded-lg text-sm min-h-[46px] bg-[#1A2832] flex items-center gap-2 cursor-pointer`}
                >
                  {isUploaded && <CheckCircle size={14} className="text-green-400 shrink-0" />}
                  <span className={`truncate ${isUploaded ? 'text-green-400' : 'text-gray-400'}`}>
                    {isUploaded ? 'Uploaded ✓' : value || 'No file chosen'}
                  </span>
                </div>

                {/* upload button */}
                <label className={`p-3 border rounded-lg transition bg-[#1A2832] cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : 'border-white/50 hover:border-[#D92B3A]/50'}`}>
                  {isUploading
                    ? <Loader2 size={16} className="text-gray-400 animate-spin" />
                    : <UploadCloud size={16} className="text-gray-400" />
                  }
                  <input
                    ref={el => inputRefs.current[key] = el}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={e => !isUploading && handleSelect(e, key)}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              {hasError && <p className="text-xs text-[#D92B3A] mt-1">{errors[errKey]}</p>}
              <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepFourDetectiveForm
