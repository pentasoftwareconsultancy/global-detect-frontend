import React, { useState } from 'react';
import { Bell, FileText, UserPlus, CheckCircle, MapPin, AlertTriangle, Users, Upload, CheckSquare, Settings, Trash2, Eye, Download } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, icon: <FileText size={16} style={{ color: '#dc3545' }} />, title: 'Case Updated', unread: true, tag: 'case', time: '5 min ago', desc: 'Detective Watson submitted new insights for Case #1234', actions: ['View Case', 'Mark as Read', 'Delete'] },
  { id: 2, icon: <UserPlus size={16} style={{ color: '#dc3545' }} />, title: 'New Case Assigned', unread: true, tag: 'case', time: '1 hour ago', desc: 'You have been assigned to Case #1235 - Insurance Fraud Investigation', actions: ['View Details', 'Mark as Read', 'Delete'] },
  { id: 3, icon: <CheckCircle size={16} style={{ color: '#22c55e' }} />, title: 'Report Ready', unread: false, tag: 'case', time: '2 hours ago', desc: 'Final investigation report for Case #1232 is ready for download', actions: ['Download Report', 'Delete'] },
  { id: 4, icon: <MapPin size={16} style={{ color: '#3b82f6' }} />, title: 'Location Update Required', unread: true, tag: 'system', time: '3 hours ago', desc: 'Please update your location for active investigation Case #1234', actions: ['Mark as Read', 'Delete'] },
  { id: 5, icon: <FileText size={16} style={{ color: '#3b82f6' }} />, title: 'Case Priority Changed', unread: false, tag: 'case', time: '5 hours ago', desc: 'Case #1236 priority has been upgraded to Urgent', actions: ['View Case', 'Delete'] },
  { id: 6, icon: <AlertTriangle size={16} style={{ color: '#f59e0b' }} />, title: 'Deadline Approaching', unread: true, tag: 'case', time: '6 hours ago', desc: 'Case #1237 deadline is in 24 hours', actions: ['View Case', 'Mark as Read', 'Delete'] },
  { id: 7, icon: <Users size={16} style={{ color: '#3b82f6' }} />, title: 'New Team Member', unread: false, tag: 'user', time: '1 day ago', desc: 'Detective Johnson has joined the agency', actions: ['Delete'] },
  { id: 8, icon: <CheckCircle size={16} style={{ color: '#22c55e' }} />, title: 'Evidence Uploaded', unread: false, tag: 'case', time: '1 day ago', desc: 'New evidence has been uploaded to Case #1234', actions: ['View Evidence', 'Delete'] },
  { id: 9, icon: <FileText size={16} style={{ color: '#dc3545' }} />, title: 'Case Status Changed', unread: false, tag: 'case', time: '2 days ago', desc: 'Case #1238 status updated to Report Ready', actions: ['View Case', 'Delete'] },
  { id: 10, icon: <Settings size={16} style={{ color: '#3b82f6' }} />, title: 'System Maintenance', unread: false, tag: 'system', time: '3 days ago', desc: 'Scheduled maintenance on Saturday 10 PM - 2 AM', actions: ['Delete'] },
];

const actionBtn = (label) => {
  if (label === 'Delete') return { background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', padding: '4px 0' };
  if (label === 'Mark as Read') return { background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', padding: '4px 10px' };
  return { background: '#dc3545', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600', padding: '5px 14px' };
};

const ActionIcon = ({ label }) => {
  if (label === 'Delete') return <Trash2 size={13} />;
  if (label === 'Mark as Read') return <Eye size={13} />;
  if (label === 'Download Report') return ;
  return null;
};

const DetectiveNotificationPage = () => {
  const [filter, setFilter] = useState('All');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filters = ['All', 'Cases', 'System', 'Team'];
  const unreadCount = notifications.filter(n => n.unread).length;

  const filtered = notifications.filter(n => {
    if (unreadOnly && !n.unread) return false;
    if (filter === 'All') return true;
    if (filter === 'Cases') return n.tag === 'case';
    if (filter === 'System') return n.tag === 'system';
    if (filter === 'Team') return n.tag === 'user';
    return true;
  });

  const deleteNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  const clearAll = () => setNotifications([]);

  return (
    <div className="bg-[#121F27] text-white min-h-screen px-3 sm:px-6 py-4 sm:py-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bell size={20} style={{ color: '#dc3545' }} />
            <h1 className="text-xl font-bold text-white">Notifications</h1>
          </div>
          <p className="text-sm text-gray-400">{unreadCount} unread notifications</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={markAllRead} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#9ca3af', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}>
            <Eye size={14} /> Mark All Read
          </button>
          <button onClick={clearAll} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#9ca3af', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}>
            <Trash2 size={14} /> Clear All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#1C2B35', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px' }}>
        <div className="flex items-center gap-2 mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          <span className="text-sm font-medium text-gray-300">Filters</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                background: filter === f ? '#dc3545' : '#243340',
                border: 'none', borderRadius: '6px', padding: '5px 12px',
                color: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: filter === f ? '600' : '400',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                {f}
                {f === 'All' && <span style={{ background: filter === 'All' ? 'rgba(255,255,255,0.3)' : '#3a4651', borderRadius: '999px', padding: '0 6px', fontSize: '11px' }}>{notifications.length}</span>}
              </button>
            ))}
          </div>
          <button onClick={() => setUnreadOnly(!unreadOnly)} style={{
            background: unreadOnly ? '#dc3545' : '#243340', border: 'none', borderRadius: '6px',
            padding: '5px 12px', color: '#fff', fontSize: '13px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <Bell size={13} /> Unread Only
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map(n => (
          <div key={n.id} style={{
            background: n.unread ? 'rgba(220,53,69,0.06)' : '#1C2B35',
            border: n.unread ? '1px solid rgba(220,53,69,0.25)' : '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px', padding: '16px 20px',
          }}>
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                {n.icon}
                <span className="text-sm font-semibold text-white">{n.title}</span>
                {n.unread && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#dc3545', display: 'inline-block' }} />}
              </div>
              <div className="flex items-center gap-2">
                <span style={{ background: '#243340', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', color: '#9ca3af' }}>{n.tag}</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{n.time}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-3">{n.desc}</p>
            <div className="flex items-center gap-2">
              {n.actions.map((label, i) => (
                <button key={i} onClick={() => { if (label === 'Delete') deleteNotif(n.id); if (label === 'Mark as Read') markRead(n.id); }} style={actionBtn(label)}>
                  <ActionIcon label={label} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No notifications</div>
        )}
      </div>
    </div>
  );
};

export default DetectiveNotificationPage;
