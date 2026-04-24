
import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlobalLogo from '../../assets/Global-logo.png';
import OtpContainer from '../../assets/Container-otp.png';
import { ROUTES } from '../../core/constants/routes.constant';
import { useAuth } from '../../core/contexts/AuthContext';
import { authService } from '../../core/services/auth.service';

const OTP = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(52);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const phone = localStorage.getItem('registrationPhone');
  const accountType = localStorage.getItem('accountType') || 'user';

  useEffect(() => {
    let interval;
    if (timer > 0 && !isSuccess) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer, isSuccess]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    if (!phone) {
      setError('Phone number not found. Please signup again.');
      setTimeout(() => navigate(ROUTES.SIGNUP), 2000);
      return;
    }

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setLoading(true);

      // ✅ Call backend - Verify OTP and create account
      const response = await authService.registerVerifyOtp(phone, otpString);

      console.log('Registration completed:', response.data);

      // ✅ Extract token from response
      const token = response.data.data?.token || response.data.data?.accessToken;
      if (token) {
        localStorage.setItem('TOKEN', token);
      }

      // ✅ Clear registration data
      localStorage.removeItem('registrationPhone');
      localStorage.removeItem('isFromSignup');
      localStorage.removeItem('accountType');

      // ✅ Show success screen
      setIsSuccess(true);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to verify OTP';
      setError(errorMsg);
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRedirectRoute = () => {
    const accountType = localStorage.getItem('accountType');
    const routeMap = {
      user: ROUTES.USER_DASHBOARD,
      detective: ROUTES.DETECTIVE_DASHBOARD,
      admin: ROUTES.ADMIN_DASHBOARD,
    };
    return routeMap[accountType] || ROUTES.USER_DASHBOARD;
  };

  const cardClass = "bg-white border shadow-lg flex flex-col items-center justify-center text-center w-full max-w-[900px] px-6 py-10";
  const cardStyle = { borderRadius: '24px', borderWidth: '2px', borderColor: '#e5e7eb' };

  /* ================= SUCCESS SCREEN ================= */
  if (isSuccess) {
    return (
      <div className="h-screen bg-[#D92B3A] flex flex-col font-montserrat overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center gap-4 px-4 sm:px-8 lg:px-[78px] pt-6 lg:pt-10 pb-4 flex-shrink-0">
          <img src={GlobalLogo} alt="Logo" className="object-cover" style={{ width: '50px', height: '64px', borderRadius: '140.5px' }} />
          <h1 style={{ fontSize: '20px', fontWeight: 700, lineHeight: '31px', color: 'white' }}>
            Universal Detective <br /> pvt ltd
          </h1>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 min-h-0">
          <div style={cardStyle} className={cardClass}>
            <CheckCircle2 size={70} className="text-[#D92B3A] mb-4" />
            <h2 style={{ fontFamily: 'Montserrat', lineHeight: '54px', fontSize: '36px', fontWeight: 700, color: '#140000', letterSpacing: '0px' }}>
              OTP Successful!
            </h2>
            <p style={{ fontFamily: 'Montserrat', fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#575757' }} className="mt-2 mb-6">
              OTP Verification has been completed
            </p>
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              style={{ height: '56px', borderRadius: '16px', fontSize: '16px', fontWeight: 700, lineHeight: '24px', boxShadow: '0px 10px 15px -3px #0000001A, 0px 4px 6px -4px #0000001A' }}
              className="bg-[#D92B3A] text-white w-full max-w-[500px]"
            >
              Back to Login
            </button>
          </div>
        </div>

      </div>
    );
  }

  /* ================= OTP SCREEN ================= */
  return (
    <div className="h-screen bg-[#D92B3A] flex flex-col font-montserrat overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center gap-4 px-4 sm:px-8 lg:px-[78px] pt-6 lg:pt-10 pb-4 flex-shrink-0">
        <img src={GlobalLogo} alt="Logo" className="object-cover" style={{ width: '50px', height: '64px', borderRadius: '140.5px' }} />
        <h1 style={{ fontSize: '20px', fontWeight: 700, lineHeight: '31px', color: 'white' }}>
          Universal Detective <br /> pvt ltd
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 min-h-0">
        <div style={cardStyle} className={cardClass}>

          {/* OTP CONTAINER ICON */}
          <div style={{ width: '80px', height: '80px', borderRadius: '16px', boxShadow: '0px 10px 15px -3px #0000001A, 0px 4px 6px -4px #0000001A' }} className="flex items-center justify-center mb-4 overflow-hidden flex-shrink-0">
            <img src={OtpContainer} alt="OTP" className="w-full h-full object-contain" />
          </div>

          {/* TITLE */}
          <h2 style={{ lineHeight: '54px', fontSize: '36px', fontWeight: 700, letterSpacing: '0px', color: '#140000' }}>
            Verify OTP
          </h2>

          {/* SUBTITLE */}
          <p className="mt-1 text-[#575757] text-sm">We've sent a 6-digit code to</p>
          <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: '21px', color: '#D92B3A' }} className="mt-1">
            {phone || '1234567890'}
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm w-full">
              {error}
            </div>
          )}

          {/* OTP INPUTS */}
          <form onSubmit={handleVerify} className="flex flex-col items-center mt-6 w-full max-w-[500px]">
            <div className="flex justify-between gap-2 sm:gap-4 w-full">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="bg-white outline-none focus:bg-[#D92B3A]/5 flex-1 min-w-0"
                  style={{ height: '56px', maxWidth: '64px', borderRadius: '16px', borderWidth: '2px', fontSize: '20px', fontWeight: 700, color: '#D92B3A', borderColor: '#D92B3A', textAlign: 'center' }}
                />
              ))}
            </div>

            {/* RESEND */}
            <div className="flex flex-wrap items-center justify-center gap-1 w-full mt-4">
              <span style={{ fontSize: '14px', fontWeight: 400, lineHeight: '21px', color: '#575757' }}>
                Didn't receive the code?
              </span>
              {timer > 0 ? (
                <span style={{ fontSize: '14px', fontWeight: 700, lineHeight: '21px', color: '#D92B3A' }}>
                  Resend in {timer}s
                </span>
              ) : (
                <button type="button" onClick={() => setTimer(52)} style={{ fontSize: '14px', fontWeight: 700, lineHeight: '21px', color: '#D92B3A' }}>
                  Resend
                </button>
              )}
            </div>

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              style={{ height: '56px', borderRadius: '16px', fontSize: '16px', fontWeight: 700, lineHeight: '24px', marginTop: '16px', boxShadow: '0px 10px 15px -3px #0000001A, 0px 4px 6px -4px #0000001A', opacity: loading || otp.join('').length !== 6 ? 0.6 : 1 }}
              className="bg-[#D92B3A] text-white w-full disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            {/* CHANGE PHONE NUMBER */}
            <button
              type="button"
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="flex items-center justify-center gap-2 mt-4"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '2.5px' }}>
                <path d="M10 2L4 8L10 14" stroke="#D92B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ width: '174px', height: '21px', fontSize: '14px', fontWeight: 600, lineHeight: '21px', letterSpacing: '0px', color: '#D92B3A', textAlign: 'center' }}>
                Change Phone Number
              </span>
            </button>

          </form>
        </div>
      </div>

    </div>
  );
};

export default OTP;
