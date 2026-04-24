
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalLogo from '../../assets/Global-logo.png';
import NoiseBg from '../../assets/noise.png';
import UserIcon from '../../assets/user_icon.png';
import DetectiveIcon from '../../assets/detective_icon.png';
import { ROUTES } from '../../core/constants/routes.constant';
import { authService } from '../../core/services/auth.service';

const LANGUAGES = [
  { key: 'English', label: 'English' },
  { key: 'Hindi', label: 'हिंदी' },
  { key: 'Marathi', label: 'मराठी' },
];

const LangDropdown = ({ showLangDropdown, setShowLangDropdown, language, setLanguage }) => {
  const selectedLabel = LANGUAGES.find(l => l.key === language)?.label || 'English';

  return (
    <div className="relative z-50">
      <button
        onClick={() => setShowLangDropdown(!showLangDropdown)}
        style={{ height: '48px', borderRadius: '10px', paddingLeft: '20px', paddingRight: '20px', fontSize: '15px', fontWeight: 600 }}
        className="bg-white text-red flex items-center justify-between shadow gap-2 min-w-[160px]"
      >
        {selectedLabel}
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="#D92B3A" strokeWidth="2" strokeLinecap="round" /></svg>
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
};

const Signup = () => {
  const [accountType, setAccountType] = useState('User');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState('English');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadharNumber: '',
    city: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ========== STEP 1: Send OTP ==========
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      // ✅ Call backend - Step 1: Send OTP
      const response = await authService.registerSendOtp({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        aadharCard: formData.aadharNumber,
        city: formData.city,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: accountType === 'Detective' ? 'detective' : 'user',
      });

      console.log('OTP sent:', response.data.data);

      // ✅ Store phone for step 2
      localStorage.setItem('registrationPhone', formData.phone);
      localStorage.setItem('isFromSignup', 'true');
      localStorage.setItem('accountType', accountType === 'Detective' ? 'detective' : 'user');

      // ✅ Redirect to OTP page
      navigate('/OTP');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to send OTP';
      setError(errorMsg);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = { fontSize: '14px', fontWeight: 500, lineHeight: '21px', letterSpacing: '0px', color: '#FFF3EA' };
  const inputStyle = { borderRadius: '14px', borderWidth: '2px', height: '49px', paddingLeft: '44px' };
  const inputClass = "w-full bg-transparent border border-white/60 pr-4 text-white outline-none focus:border-white placeholder:font-montserrat placeholder:font-medium placeholder:text-[14px] placeholder:leading-[21px] placeholder:tracking-[0px] placeholder:text-white/60";

  return (
    <div className="min-h-screen flex font-montserrat bg-red overflow-x-hidden overflow-y-hidden">

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
      <div className="flex-1 flex justify-center items-start bg-red relative px-4 sm:px-6 pb-10 pt-6 lg:pt-[52px] overflow-y-auto">

        {/* SELECT LANGUAGE - desktop */}
        <div className="hidden lg:flex absolute top-[52px] right-6 z-50">
          <LangDropdown showLangDropdown={showLangDropdown} setShowLangDropdown={setShowLangDropdown} language={language} setLanguage={setLanguage} />
        </div>

        <div className="w-full max-w-[500px]">

          {/* MOBILE HEADER */}
          <div className="flex lg:hidden flex-col w-full pt-2 pb-4">
            {/* Language button - top right */}
            <div className="flex justify-end mb-4">
              <LangDropdown showLangDropdown={showLangDropdown} setShowLangDropdown={setShowLangDropdown} language={language} setLanguage={setLanguage} />
            </div>
            {/* Logo + text centered */}
            <div className="flex flex-col items-center">
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3.79px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={GlobalLogo} style={{ width: '93px', height: '93px', borderRadius: '50%' }} className="object-cover" />
              </div>
              <p style={{ fontSize: '18px', fontWeight: 700, lineHeight: '22.5px', letterSpacing: '0px', color: 'white', textAlign: 'center', marginTop: '10px' }}>Universal Detective</p>
              <p style={{ fontSize: '18px', fontWeight: 700, lineHeight: '22.5px', letterSpacing: '0px', color: 'white', textAlign: 'center' }}>pvt ltd</p>
            </div>
          </div>

          {/* TITLE */}
          <div className="w-full flex flex-col items-start text-left mb-4 mt-5 lg:mt-5">
            <h2 style={{ lineHeight: '54px', fontSize: '36px', fontWeight: 700, color: '#FFF3EA', letterSpacing: '0px' }}>Sign Up</h2>
            <p style={{ lineHeight: '24px', fontSize: '16px', fontWeight: 500, color: '#FFF3EA', letterSpacing: '0px' }}>
              Choose your account type and create an account
            </p>
          </div>

          {/* ACCOUNT TYPE */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setAccountType('User')}
              style={{ borderRadius: '10px', borderWidth: '2px', paddingTop: '18px', paddingRight: '18px', paddingBottom: '2px', paddingLeft: '18px' }}
              className={`flex-1 flex flex-col justify-start items-center border-2 h-[111.5px] ${accountType === 'User' ? 'bg-white/30 border-white' : 'border-white/50'}`}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-2">
                <img src={UserIcon} alt="User" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-white text-sm font-medium">User</span>
            </button>

            <button
              onClick={() => setAccountType('Detective')}
              style={{ borderRadius: '10px', borderWidth: '2px', paddingTop: '18px', paddingRight: '18px', paddingBottom: '2px', paddingLeft: '18px' }}
              className={`flex-1 flex flex-col justify-start items-center border-2 h-[111.5px] ${accountType === 'Detective' ? 'bg-white/30 border-white' : 'border-white/50'}`}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-2">
                <img src={DetectiveIcon} alt="Detective" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-white text-sm font-medium">Detective</span>
            </button>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* ========== STEP 1: FORM ========== */}
          <form className="space-y-3 mt-4" onSubmit={handleStep1Submit}>
            {[
              { name: 'name', label: 'Name (As per Adhar card)', icon: User, placeholder: 'Enter name' },
              { name: 'phone', label: 'Phone Number (linked to adhar card)', icon: Phone, placeholder: 'Enter Phone number' },
              { name: 'email', label: 'Email Address', icon: Mail, placeholder: 'Enter your email' },
            ].map((field, i) => {
              const Icon = field.icon;
              return (
                <div key={i}>
                  <label style={labelStyle}>{field.label}</label>
                  <div className="relative mt-1">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" size={16} />
                    <input 
                      type={field.type || 'text'}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder={field.placeholder} 
                      style={inputStyle} 
                      className={inputClass + ' disabled:opacity-50'}
                    />
                  </div>
                </div>
              );
            })}

            {/* CITY */}
            <div>
              <label style={labelStyle}>City</label>
              <div className="relative mt-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 z-10" size={16} />
                <input 
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter city"
                  style={inputStyle}
                  className={inputClass}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label style={labelStyle}>Create Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" size={16} />
                <input 
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Create password"
                  type={showPassword ? 'text' : 'password'} 
                  style={{ borderRadius: '14px', borderWidth: '2px', paddingLeft: '44px', height: '49px' }} 
                  className="w-full border border-white/60 pr-11 text-white bg-transparent placeholder-white/50 outline-none focus:border-white" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* CONFIRM */}
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" size={16} />
                <input 
                  name="confirmPassword" 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Confirm password"
                  type={showConfirmPassword ? 'text' : 'password'} 
                  style={{ borderRadius: '14px', borderWidth: '2px', paddingLeft: '44px', height: '49px' }} 
                  className="w-full border border-white/60 pr-11 text-white bg-transparent placeholder-white/50 outline-none focus:border-white" 
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* AADHAAR CARD NUMBER */}
            <div>
              <label style={labelStyle}>Aadhaar Card Number</label>
              <div className="relative mt-1">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" size={16} />
                <input type="text" placeholder="Enter your Aadhaar card number" style={inputStyle} className={inputClass} />
              </div>
            </div>

            {/* BUTTON */}
            <button type="submit" disabled={loading} className="w-full bg-white text-red py-3 rounded-[16px] font-semibold mt-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* SOCIAL */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex-1 h-[1px] bg-white/40"></div>
            <span className="text-xs text-[#FFF3EA]">OR SIGN UP WITH</span>
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

          {/* ALREADY HAVE AN ACCOUNT */}
          <div className="flex items-center justify-center gap-1 mt-4 mb-6">
            <span style={{ fontSize: '13px', fontWeight: 400, lineHeight: '19.5px', color: '#FFF3EA' }}>Already have an account?</span>
            <Link to={ROUTES.LOGIN} style={{ fontSize: '13px', fontWeight: 600, lineHeight: '19.5px', color: '#FFF3EA' }}>Log In</Link>
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

export default Signup;

