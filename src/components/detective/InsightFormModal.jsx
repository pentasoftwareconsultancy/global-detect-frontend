import React, { useState } from 'react';
import { X, FileText, MapPin, User, Camera, Send, Info, Plus } from 'lucide-react';

const inputStyle = {
  width: '100%', background: '#1C2B35', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none',
};
const textareaStyle = { ...inputStyle, resize: 'vertical', minHeight: '80px' };
const sectionTitle = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '12px' };
const addBtn = {
  width: '100%', background: '#1C2B35', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px', padding: '10px', color: '#9ca3af', fontSize: '14px',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
};

const InsightFormModal = ({ onClose }) => {
  const [status, setStatus] = useState('');
  const [summary, setSummary] = useState('');
  const [keyFindings, setKeyFindings] = useState('');
  const [locations, setLocations] = useState([{ address: '', findings: '' }]);
  const [people, setPeople] = useState([{ name: '', relationship: '', notes: '' }]);
  const [evidences, setEvidences] = useState([{ type: '', description: '' }]);
  const [recommendations, setRecommendations] = useState('');
  const [nextSteps, setNextSteps] = useState('');

  return (
    <div style={{
      position: 'fixed', top: '57px', left: 0, right: 0, bottom: 0,
      zIndex: 100, background: '#121F27', overflowY: 'auto',
      padding: '20px clamp(12px, 3vw, 28px)',
    }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Submit Investigation Insights</h2>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>Investigation Case - Provide detailed findings from your investigation</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
            <X size={20} />
          </button>
        </div>

        {/* Investigation Status */}
        <div style={{ marginBottom: '24px' }}>
          <div style={sectionTitle}><FileText size={16} className="text-gray-400" />Investigation Status <span style={{ color: '#dc3545' }}>*</span></div>
          <select value={status} onChange={e => setStatus(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
            <option value="">Select current status</option>
            <option value="in_progress">In Progress</option>
            <option value="insights_submitted">Insights Submitted</option>
            <option value="report_ready">Report Ready</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Investigation Summary */}
        <div style={{ marginBottom: '24px' }}>
          <div style={sectionTitle}><FileText size={16} className="text-gray-400" />Investigation Summary <span style={{ color: '#dc3545' }}>*</span></div>
          <textarea value={summary} onChange={e => setSummary(e.target.value)} placeholder="Provide a brief overview of your investigation activities and progress..." style={textareaStyle} />
        </div>

        {/* Key Findings */}
        <div style={{ marginBottom: '24px' }}>
          <div style={sectionTitle}><FileText size={16} className="text-gray-400" />Key Findings <span style={{ color: '#dc3545' }}>*</span></div>
          <textarea value={keyFindings} onChange={e => setKeyFindings(e.target.value)} placeholder="List the most important discoveries, evidence, and observations from your investigation..." style={textareaStyle} />
        </div>

        {/* Locations Visited */}
        <div style={{ marginBottom: '24px' }}>
          <div style={sectionTitle}><MapPin size={16} className="text-gray-400" />Locations Visited</div>
          {locations.map((loc, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <input value={loc.address} onChange={e => { const l = [...locations]; l[i].address = e.target.value; setLocations(l); }} placeholder="Location address" style={{ ...inputStyle, marginBottom: '8px' }} />
              <textarea value={loc.findings} onChange={e => { const l = [...locations]; l[i].findings = e.target.value; setLocations(l); }} placeholder="Findings at this location..." style={{ ...textareaStyle, minHeight: '70px' }} />
            </div>
          ))}
          <button style={addBtn} onClick={() => setLocations([...locations, { address: '', findings: '' }])}><Plus size={14} /> Add Location</button>
        </div>

        

        {/* People Interviewed */}
        <div style={{ marginBottom: '24px' }}>
          <div style={sectionTitle}><User size={16} className="text-gray-400" />People Interviewed</div>
          {people.map((p, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <input value={p.name} onChange={e => { const arr = [...people]; arr[i].name = e.target.value; setPeople(arr); }} placeholder="Person's name" style={{ ...inputStyle, marginBottom: '8px' }} />
              <input value={p.relationship} onChange={e => { const arr = [...people]; arr[i].relationship = e.target.value; setPeople(arr); }} placeholder="Relationship to case (e.g., witness, colleague, neighbor)" style={{ ...inputStyle, marginBottom: '8px' }} />
              <textarea value={p.notes} onChange={e => { const arr = [...people]; arr[i].notes = e.target.value; setPeople(arr); }} placeholder="Interview notes and key information..." style={{ ...textareaStyle, minHeight: '70px' }} />
            </div>
          ))}
          <button style={addBtn} onClick={() => setPeople([...people, { name: '', relationship: '', notes: '' }])}><Plus size={14} /> Add Person</button>
        </div>

        {/* Evidence Collected */}
        <div style={{ marginBottom: '24px' }}>
          <div style={sectionTitle}><Camera size={16} className="text-gray-400" />Evidence Collected</div>
          {evidences.map((ev, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <select value={ev.type} onChange={e => { const arr = [...evidences]; arr[i].type = e.target.value; setEvidences(arr); }} style={{ ...inputStyle, marginBottom: '8px', appearance: 'none' }}>
                <option value="">Evidence type</option>
                <option value="document">Document</option>
                <option value="photo">Photo</option>
                <option value="video">Video</option>
                <option value="testimony">Testimony</option>
                <option value="digital">Digital</option>
              </select>
              <textarea value={ev.description} onChange={e => { const arr = [...evidences]; arr[i].description = e.target.value; setEvidences(arr); }} placeholder="Description of evidence..." style={{ ...textareaStyle, minHeight: '70px' }} />
            </div>
          ))}
          <button style={addBtn} onClick={() => setEvidences([...evidences, { type: '', description: '' }])}><Plus size={14} /> Add Evidence</button>
        </div>

        {/* Recommendations */}
        <div style={{ marginBottom: '24px' }}>
          <div style={sectionTitle}>Recommendations</div>
          <textarea value={recommendations} onChange={e => setRecommendations(e.target.value)} placeholder="Your professional recommendations based on findings..." style={textareaStyle} />
        </div>

        {/* Next Steps */}
        <div style={{ marginBottom: '24px' }}>
          <div style={sectionTitle}>Next Steps</div>
          <textarea value={nextSteps} onChange={e => setNextSteps(e.target.value)} placeholder="Suggested next steps for the investigation..." style={textareaStyle} />
        </div>

        {/* Info note */}
        <div style={{ background: '#1C2B35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '24px' }}>
          <Info size={15} style={{ color: '#9ca3af', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '13px', color: '#9ca3af' }}>All submitted insights will be reviewed by the admin before being compiled into the final report for the client. Ensure all information is accurate and professional.</p>
        </div>

        {/* Bottom actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          <button style={{ background: '#dc3545', border: 'none', borderRadius: '8px', padding: '8px 20px', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Send size={14} /> Submit Insights
          </button>
        </div>
    </div>
  );
};

export default InsightFormModal;
