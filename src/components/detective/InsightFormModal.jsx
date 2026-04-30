import React, { useState, useRef } from 'react';
import { FileText, MapPin, User, Camera, Send, Info, Plus, Upload } from 'lucide-react';
import { validateOnlyCharacters, validateRequired, restrictToLetters } from '../../hooks/validation';

const inputCls = "w-full bg-[#1C2B35] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-white/30 transition";
const textareaCls = "w-full bg-[#1C2B35] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-white/30 transition resize-none";
const addBtnCls = "w-full bg-[#1C2B35] border border-white/10 rounded-lg py-2.5 text-sm text-gray-400 cursor-pointer flex items-center justify-center gap-1.5 hover:border-white/30 transition";
const dropdownStyle = {
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
};

const SectionLabel = ({ icon, text, required }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className="text-white flex-shrink-0">{icon}</span>
    <span className="text-sm font-semibold text-white">{text}</span>
    {required && <span className="text-[#dc3545]">*</span>}
  </div>
);

const Divider = () => <div className="border-t border-white/5 my-5" />;

const InsightFormModal = ({ onClose }) => {
  const [status, setStatus] = useState('');
  const [summary, setSummary] = useState('');
  const [keyFindings, setKeyFindings] = useState('');
  const [locations, setLocations] = useState([{ address: '', findings: '' }]);
  const [people, setPeople] = useState([{ name: '', relationship: '', notes: '' }]);
  const [evidences, setEvidences] = useState([{ type: '', description: '', file: null }]);
  const [peopleErrors, setPeopleErrors] = useState([{ name: '', relationship: '' }]);
  const fileInputRefs = useRef([]);
  const [recommendations, setRecommendations] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const handleSubmit = () => {
    setSubmitting(true);
    let secs = 5;
    setCountdown(secs);
    const interval = setInterval(() => {
      secs -= 1;
      setCountdown(secs);
      if (secs === 0) {
        clearInterval(interval);
        setSubmitting(false);
        setCountdown(null);
        onClose();
      }
    }, 1000);
  };

  return (
    /* Backdrop — fixed, covers everything, blurs background */
    <div
      className="fixed inset-0 z-50"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
      
    >
      {/* Modal card — fixed position, scrolls internally */}
      <div
        className="fixed montserrat inset-0 lg:top-[100px] lg:left-[80px] lg:right-[80px] lg:bottom-[100px]"
        style={{
          background: '#121F27',
          overflowY: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 max-w-[1300px] mx-auto">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-white mb-1">Submit Investigation Insights</h2>
            <p className="text-xs text-gray-400">Investigation Case - Provide detailed findings from your investigation</p>
          </div>

          {/* Investigation Status */}
          <div className="mb-5">
            <SectionLabel icon={<FileText size={15} />} text="Investigation Status" required />
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className={inputCls}
              style={dropdownStyle}
            >
              <option value="">Select current status</option>
              <option value="in_progress">In Progress</option>
              <option value="insights_submitted">Insights Submitted</option>
              <option value="report_ready">Report Ready</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <Divider />

          {/* Investigation Summary */}
          <div className="mb-5">
            <SectionLabel icon={<FileText size={15} />} text="Investigation Summary" required />
            <textarea
              rows={3}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="Provide a brief overview of your investigation activities and progress..."
              className={textareaCls}
            />
          </div>

          <Divider />

          {/* Key Findings */}
          <div className="mb-5">
            <SectionLabel icon={<FileText size={15} />} text="Key Findings" required />
            <textarea
              rows={3}
              value={keyFindings}
              onChange={e => setKeyFindings(e.target.value)}
              placeholder="List the most important discoveries, evidence, and observations from your investigation..."
              className={textareaCls}
            />
          </div>

          <Divider />

          {/* Locations Visited */}
          <div className="mb-5">
            <SectionLabel icon={<MapPin size={15} />} text="Locations Visited" />
            {locations.map((loc, i) => (
              <div key={i} className="space-y-2 mb-2">
                <input
                  value={loc.address}
                  onChange={e => { const l = [...locations]; l[i].address = e.target.value; setLocations(l); }}
                  placeholder="Location address"
                  className={inputCls}
                />
                <textarea
                  rows={3}
                  value={loc.findings}
                  onChange={e => { const l = [...locations]; l[i].findings = e.target.value; setLocations(l); }}
                  placeholder="Findings at this location..."
                  className={textareaCls}
                />
              </div>
            ))}
            <button className={addBtnCls} onClick={() => setLocations([...locations, { address: '', findings: '' }])}>
              <Plus size={13} /> Add Location
            </button>
          </div>

          

          <Divider />

          {/* People Interviewed */}
          <div className="mb-5">
            <SectionLabel icon={<User size={15} />} text="People Interviewed" />
            {people.map((p, i) => (
              <div key={i} className="space-y-2 mb-2">
                <div>
                  <input
                    value={p.name}
                    onChange={e => {
                      const filtered = restrictToLetters(e.target.value);
                      const arr = [...people]; arr[i].name = filtered; setPeople(arr);
                      const errs = [...peopleErrors];
                      errs[i] = { ...errs[i], name: e.target.value !== filtered ? 'Person name must contain only letters' : validateOnlyCharacters(filtered, 'person_name') };
                      setPeopleErrors(errs);
                    }}
                    placeholder="Person's name"
                    className={inputCls}
                  />
                  {peopleErrors[i]?.name && <p className="text-xs text-[#dc3545] mt-1">{peopleErrors[i].name}</p>}
                </div>
                <div>
                  <input
                    value={p.relationship}
                    onChange={e => {
                      const filtered = restrictToLetters(e.target.value);
                      const arr = [...people]; arr[i].relationship = filtered; setPeople(arr);
                      const errs = [...peopleErrors];
                      errs[i] = { ...errs[i], relationship: e.target.value !== filtered ? 'Relationship must contain only letters' : validateRequired(filtered, 'relationship') };
                      setPeopleErrors(errs);
                    }}
                    placeholder="Relationship to case (e.g., witness, colleague, neighbor)"
                    className={inputCls}
                  />
                  {peopleErrors[i]?.relationship && <p className="text-xs text-[#dc3545] mt-1">{peopleErrors[i].relationship}</p>}
                </div>
                <textarea
                  rows={3}
                  value={p.notes}
                  onChange={e => { const arr = [...people]; arr[i].notes = e.target.value; setPeople(arr); }}
                  placeholder="Interview notes and key information..."
                  className={textareaCls}
                />
              </div>
            ))}
            <button className={addBtnCls} onClick={() => { setPeople([...people, { name: '', relationship: '', notes: '' }]); setPeopleErrors([...peopleErrors, { name: '', relationship: '' }]); }}>
              <Plus size={13} /> Add Person
            </button>
          </div>

          <Divider />

          {/* Evidence Collected */}
          <div className="mb-5">
            <SectionLabel icon={<Camera size={15} />} text="Evidence Collected" />
            {evidences.map((ev, i) => (
              <div key={i} className="space-y-2 mb-2">
                <select
                  value={ev.type}
                  onChange={e => { const arr = [...evidences]; arr[i].type = e.target.value; setEvidences(arr); }}
                  className={inputCls}
                  style={dropdownStyle}
                >
                  <option value="">Evidence type</option>
                  <option value="document">Document</option>
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                  <option value="testimony">Testimony</option>
                  <option value="digital">Digital</option>
                </select>
                <textarea
                  rows={3}
                  value={ev.description}
                  onChange={e => { const arr = [...evidences]; arr[i].description = e.target.value; setEvidences(arr); }}
                  placeholder="Description of evidence..."
                  className={textareaCls}
                />
                <input
                  type="file"
                  ref={el => fileInputRefs.current[i] = el}
                  className="hidden"
                  onChange={e => {
                    const arr = [...evidences];
                    arr[i].file = e.target.files[0] || null;
                    setEvidences(arr);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRefs.current[i]?.click()}
                  className="flex items-center gap-1.5 bg-[#1C2B35] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-400 hover:border-white/30 transition"
                >
                  <Upload size={13} />
                  {ev.file ? ev.file.name : 'Upload File'}
                </button>
              </div>
            ))}
            <button className={addBtnCls} onClick={() => setEvidences([...evidences, { type: '', description: '', file: null }])}>
              <Plus size={13} /> Add Evidence
            </button>
          </div>

          <Divider />

          {/* Recommendations */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-white mb-3">Recommendations</p>
            <textarea
              rows={3}
              value={recommendations}
              onChange={e => setRecommendations(e.target.value)}
              placeholder="Your professional recommendations based on findings..."
              className={textareaCls}
            />
          </div>

          {/* Next Steps */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-white mb-3">Next Steps</p>
            <textarea
              rows={3}
              value={nextSteps}
              onChange={e => setNextSteps(e.target.value)}
              placeholder="Suggested next steps for the investigation..."
              className={textareaCls}
            />
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 bg-[#1C2B35] border border-white/10 rounded-lg px-4 py-3 mb-6">
            <Info size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              All submitted insights will be reviewed by the admin before being compiled into the final report for the client. Ensure all information is accurate and professional.
            </p>
          </div>

          {/* Bottom Cancel + Submit */}
          <div className="flex items-center justify-center gap-3 pb-4">
            <button onClick={onClose} className="text-sm text-gray-400 hover:text-white transition px-4 py-2">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 bg-[#dc3545] hover:bg-[#b82231] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
            >
              <Send size={13} /> {submitting ? `Submitting... (${countdown}s)` : 'Submit Insights'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InsightFormModal;
