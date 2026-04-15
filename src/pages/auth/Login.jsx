import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalLogo from '../../assets/Global-logo.png';
import NoiseBg from '../../assets/noise.png';
import UserIcon from '../../assets/user_icon.png';
import DetectiveIcon from '../../assets/detective_icon.png';
import { ROUTES } from '../../core/constants/routes.constant';
import { useAuth } from '../../core/contexts/AuthContext';

const LANGUAGES = [
  { key: 'English', label: 'English' },
  { key: 'Hindi', label: 'हिंदी' },
  { key: 'Marathi', label: 'मराठी' },
];

const Login = () => {
  const [accountType, setAccountType] = useState('User');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '', rememberMe: false });
  const [language, setLanguage] = useState('English');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roleMap = { User: 'user', Detective: 'detective' };
    const role = roleMap[accountType];
    localStorage.setItem('accountType', role);
    login({
      token: 'temp-token-' + Date.now(),
      user: { role, kycComplete: true },
    });
    const routeMap = { user: ROUTES.USER_DASHBOARD, detective: ROUTES.DETECTIVE_DASHBOARD };
    navigate(routeMap[role] || ROUTES.USER_DASHBOARD);
  };

  const labelStyle = { fontSize: '14px', fontWeight: 500, lineHeight: '21px', letterSpacing: '0px', color: '#FFF3EA' };
  const inputStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '44px' };
  const inputClass = "w-full bg-transparent border border-white/60 pr-4 text-white outline-none focus:border-white placeholder:font-montserrat placeholder:font-medium placeholder:text-[14px] placeholder:leading-[21px] placeholder:tracking-[0px] placeholder:text-white/60";

  const selectedLabel = LANGUAGES.find(l => l.key === language)?.label || 'English';

  const LangDropdown = () => (
    <div className="relative z-50">
      <button
        onClick={() => setShowLangDropdown(!showLangDropdown)}
        style={{ height: '48px', borderRadius: '10px', paddingLeft: '20px', paddingRight: '20px', fontSize: '15px', fontWeight: 600 }}
        className="bg-white text-red flex items-center justify-between shadow gap-2 min-w-[160px]"
      >
        {selectedLabel}
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="#D92B3A" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      {showLangDropdown && (
        <div className="absolute top-[52px] left-0 w-full bg-white rounded-[10px] shadow-lg overflow-hidden">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.key}
              onClick={() => { setLanguage(lang.key); setShowLangDropdown(false); }}
              className="w-full px-5 py-3 text-left text-red font-medium hover:bg-red/10 flex items-center justify-between"
              style={{
                fontSize: '15px',
                borderLeft: language === lang.key ? '3px solid #D92B3A' : '3px solid transparent',
                fontWeight: language === lang.key ? 600 : 400,
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen flex font-montserrat bg-red overflow-hidden">

      {/* LEFT PANEL - desktop only */}
      <div className="hidden lg:flex lg:flex-col w-[563px] min-h-screen relative flex-shrink-0">
        <div className="w-full h-full bg-white relative overflow-hidden" style={{ borderBottomRightRadius: '301.5px' }}>
          <img src={NoiseBg} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply pointer-events-none z-20" />
          <div className="relative z-10 flex flex-col items-center pt-[167px]">
            <img src={GlobalLogo} className="w-[156px] h-[200px] object-cover" />
            <h1 className="text-[#D92B3A] text-[32px] leading-[37px] font-[700] text-center mt-[30px] w-[453px]">
              Universal Detective <br /> pvt ltd
            </h1>
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex-1 flex justify-center items-center bg-red relative px-4 sm:px-6 py-4 lg:py-[32px] overflow-hidden">

        {/* SELECT LANGUAGE - desktop */}
        <div className="hidden lg:flex absolute top-[52px] right-6 z-50">
          <LangDropdown />
        </div>

        <div className="w-full max-w-[460px] flex-shrink-0 h-full overflow-hidden">

          {/* MOBILE HEADER */}
          <div className="flex lg:hidden flex-col w-full pt-2 pb-4">
            <div className="flex justify-end mb-4">
              <LangDropdown />
            </div>
            <div className="flex flex-col items-center">
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3.79px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={GlobalLogo} style={{ width: '93px', height: '93px', borderRadius: '50%' }} className="object-cover" />
              </div>
              <p style={{ fontSize: '18px', fontWeight: 700, lineHeight: '22.5px', letterSpacing: '0px', color: 'white', textAlign: 'center', marginTop: '10px' }}>Universal Detective</p>
              <p style={{ fontSize: '18px', fontWeight: 700, lineHeight: '22.5px', letterSpacing: '0px', color: 'white', textAlign: 'center' }}>pvt ltd</p>
            </div>
          </div>

          {/* TITLE */}
          <div className="w-full flex flex-col items-start text-left mb-4 mt-3">
            <h2 style={{ lineHeight: '42px', fontSize: '32px', fontWeight: 700, color: '#FFF3EA', letterSpacing: '0px' }}>Log In</h2>
            <p style={{ lineHeight: '22px', fontSize: '14px', fontWeight: 500, color: '#FFF3EA', letterSpacing: '0px' }}>
              Choose your account type and login
            </p>
          </div>

          {/* ACCOUNT TYPE */}
          <div className="flex justify-start gap-3 mt-3">
            <button
              onClick={() => setAccountType('User')}
              style={{ borderRadius: '10px', borderWidth: '2px', paddingTop: '14px', paddingRight: '16px', paddingBottom: '8px', paddingLeft: '16px' }}
              className={`flex-1 flex flex-col justify-start items-center border-2 h-[104px] ${accountType === 'User' ? 'bg-white/30 border-white' : 'border-white/50'}`}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-2">
                <img src={UserIcon} alt="User" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-white text-sm font-medium">User</span>
            </button>

            <button
              onClick={() => setAccountType('Detective')}
              style={{ borderRadius: '10px', borderWidth: '2px', paddingTop: '14px', paddingRight: '16px', paddingBottom: '8px', paddingLeft: '16px' }}
              className={`flex-1 flex flex-col justify-start items-center border-2 h-[104px] ${accountType === 'Detective' ? 'bg-white/30 border-white' : 'border-white/50'}`}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-2">
                <img src={DetectiveIcon} alt="Detective" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-white text-sm font-medium">Detective</span>
            </button>
          </div>

          {/* FORM */}
          <form className="space-y-3 mt-4" onSubmit={handleSubmit}>

            <div>
              <label style={labelStyle}>Email or Phone number</label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" size={16} />
                <input type="text" name="emailOrPhone" placeholder="Enter your email / phone number" value={formData.emailOrPhone} onChange={handleInputChange} style={inputStyle} className={inputClass} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Password / OTP</label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ borderRadius: '14px', borderWidth: '2px', paddingLeft: '44px', height: '49px' }}
                  className="w-full border border-white/60 pr-11 text-white bg-transparent outline-none focus:border-white placeholder:font-montserrat placeholder:font-medium placeholder:text-[14px] placeholder:leading-[21px] placeholder:text-white/60"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer" style={labelStyle}>
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="hidden" />
                <div className={`w-4 h-4 rounded-sm border-2 border-white flex items-center justify-center ${formData.rememberMe ? 'bg-white' : 'bg-transparent'}`}>
                  {formData.rememberMe && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                Remember me
              </label>
            </div>

            <button type="submit" style={{ height: '54.5px', fontSize: '14px', fontWeight: 500, lineHeight: '21px', letterSpacing: '0px', borderRadius: '10px' }} className="w-full bg-white text-red mt-3 flex items-center justify-center">
              Log in as {accountType}
            </button>

          </form>

          {/* SOCIAL */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex-1 h-[1px] bg-white/40"></div>
            <span className="text-xs text-[#FFF3EA]">OR CONTINUE WITH</span>
            <div className="flex-1 h-[1px] bg-white/40"></div>
          </div>

          <div className="flex gap-3 mt-4">
            {[
              { src: "https://www.svgrepo.com/show/475656/google-color.svg", alt: "Google" },
              { src: "https://www.svgrepo.com/show/475647/facebook-color.svg", alt: "Facebook" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", alt: "Apple" },
            ].map((item, i) => (
              <button key={i} style={{ height: '48px', borderRadius: '14px', borderWidth: '2px' }} className="flex-1 bg-white border border-white/60 flex justify-center items-center">
                <img src={item.src} alt={item.alt} style={{ width: '20px', height: '20px' }} className="object-contain" />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1 mt-6 mb-6">
            <span style={{ fontSize: '14px', fontWeight: 500, lineHeight: '21px', color: '#FFF3EA' }}>Don't have an account?</span>
            <Link to={ROUTES.SIGNUP} style={{ fontSize: '14px', fontWeight: 600, lineHeight: '21px', color: '#FFF3EA' }}>Sign Up</Link>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL - desktop only */}
      <div className="hidden lg:block w-[90px] min-h-screen bg-white relative overflow-hidden flex-shrink-0" style={{ borderBottomLeftRadius: '301.5px' }}>
        <img src={NoiseBg} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply pointer-events-none" />
      </div>

    </div>
  );
};

export default Login;
