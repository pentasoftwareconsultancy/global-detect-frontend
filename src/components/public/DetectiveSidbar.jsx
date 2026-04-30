
import React from 'react';
import { LayoutGrid, User, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../core/constants/routes.constant';
import { useAuth } from '../../core/contexts/AuthContext';

const DetectiveSidbar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleNav = (route) => {
    navigate(route);
    if (onClose) onClose();
  };

  const handleLogout = async () => {
    await logout(); // Call backend API and clear storage
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', route: ROUTES.DETECTIVE_DASHBOARD },
    { icon: User, label: 'Profile', route: ROUTES.DETECTIVE_PROFILE },
    { icon: Settings, label: 'Settings', route: ROUTES.DETECTIVE_SETTING },
  ];

  const isActive = (route) => location.pathname === route;

  return (
    <div
      style={{
        width: '235px',
        height: '100vh',
        background: '#121F27',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 12px 16px 20px',
        paddingTop: '74px',
      }}
    >
      {/* Inner pill container */}
      <div style={{
        background: '#232E34',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        padding: '14px 10px',
      }}>

        {/* Menu Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNav(item.route)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '11px',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                fontFamily: 'Inter, Poppins, sans-serif',
                fontSize: '14.5px',
                fontWeight: isActive(item.route) ? '600' : '400',
                background: isActive(item.route) ? '#e63946' : 'transparent',
                color: isActive(item.route) ? '#ffffff' : '#cbd5e1',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { if (!isActive(item.route)) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (!isActive(item.route)) e.currentTarget.style.background = 'transparent'; }}
            >
              <item.icon size={19} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            background: '#3a4a57',
            color: '#cbd5e1',
            fontFamily: 'Inter, Poppins, sans-serif',
            fontSize: '14.5px',
            fontWeight: '500',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4a5a67'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#3a4a57'; }}
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>

      </div>
    </div>
  );
};

export default DetectiveSidbar;
