import React, { useState, useEffect } from 'react';
import { Smartphone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlobalLogo from '../../assets/Global.png';
import { ROUTES } from '../../core/constants/routes.constant';
import { useAuth } from '../../core/contexts/AuthContext';

const OTP = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(52);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    let interval;
    if (timer > 0 && !isSuccess) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer, isSuccess]);

  const handleOtpChange = (index, value) => {
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

  const handleVerify = (e) => {
    e.preventDefault();
    const accountType = localStorage.getItem('accountType');
    const isFromSignup = localStorage.getItem('isFromSignup') === 'true';

    login({
      token: 'temp-token-' + Date.now(),
      user: {
        role: accountType,
        kycComplete: isFromSignup ? (accountType === 'detective' ? false : true) : true,
      },
    });

    localStorage.removeItem('isFromSignup');
    setIsSuccess(true);
  };

  const getRedirectRoute = () => {
    const stored = JSON.parse(localStorage.getItem('user') || '{}');
    const accountType = stored?.role || localStorage.getItem('accountType');
    const kyc = stored?.kycComplete ?? true;
    const isFromSignup = localStorage.getItem('isFromSignup') === 'true';

    if (isFromSignup && accountType === 'detective' && !kyc) {
      return ROUTES.DETECTIVE_FORM;
    }

    const routeMap = {
      user: ROUTES.USER_DASHBOARD,
      detective: ROUTES.DETECTIVE_DASHBOARD,
      admin: ROUTES.ADMIN_DASHBOARD,
    };

    return routeMap[accountType] || ROUTES.USER_DASHBOARD;
  };

  /* ================= SUCCESS SCREEN ================= */
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#D92B3A] flex flex-col font-montserrat px-4 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <img src={GlobalLogo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <h1 className="text-white text-sm sm:text-lg font-bold uppercase leading-tight">
            Universal Detective <br /> pvt ltd
          </h1>
        </div>

        {/* Center Card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[#FFF2EF] w-full max-w-xl rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 md:p-16 flex flex-col items-center text-center shadow-2xl">

            <CheckCircle2 size={70} className="text-[#D92B3A] mb-6" />

            <h2 className="text-[#140000] text-2xl sm:text-4xl font-black mb-3">
              OTP Successful!
            </h2>

            <p className="text-[#575757] text-sm sm:text-lg mb-8">
              OTP Verification has been completed
            </p>

            <button
              onClick={() => navigate(getRedirectRoute())}
              className="w-full max-w-xs bg-[#D92B3A] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:bg-[#b0232f]"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= OTP SCREEN ================= */
  return (
    <div className="min-h-screen bg-[#D92B3A] flex flex-col font-montserrat px-4 py-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8 sm:mb-12">
        <img src={GlobalLogo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
        <h1 className="text-white text-sm sm:text-lg font-bold uppercase leading-tight">
          Universal Detective <br /> pvt ltd
        </h1>
      </div>

      {/* Center Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-[#FFF2EF] w-full max-w-lg rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 md:p-14 flex flex-col items-center text-center shadow-2xl">

          {/* Icon */}
          <div className="bg-[#00C853] p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-6">
            <Smartphone size={36} className="text-white" />
          </div>

          <h2 className="text-[#140000] text-2xl sm:text-3xl md:text-4xl font-black mb-2">
            Verify OTP
          </h2>

          <p className="text-[#575757] text-sm">We've sent a 6-digit code to</p>
          <p className="text-[#D92B3A] font-bold text-lg sm:text-xl mb-6">
            1234567890
          </p>

          {/* OTP Inputs */}
          <form onSubmit={handleVerify} className="w-full max-w-sm">
            <div className="flex justify-between gap-2 sm:gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 border-2 border-[#D92B3A] rounded-lg sm:rounded-xl text-center text-lg sm:text-xl font-bold text-[#D92B3A] focus:outline-none focus:bg-[#D92B3A]/5"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 mb-6 text-xs sm:text-sm text-[#575757]">
              <span>Resend code in</span>
              <span className="text-[#D92B3A] font-bold">{timer}s</span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#D92B3A] text-white py-3 rounded-xl font-bold text-sm sm:text-lg hover:bg-[#b0232f] mb-6"
            >
              Verify Code
            </button>

            {/* Change Number */}
            <button
              type="button"
              className="flex items-center gap-2 text-xs sm:text-sm text-[#575757] hover:text-[#140000] mx-auto"
            >
              <ArrowLeft size={16} />
              Change Phone number
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;