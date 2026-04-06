import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalLogo from '../../assets/Global.png';
import { ROUTES } from '../../core/constants/routes.constant';

const Login = () => {
  const [accountType, setAccountType] = useState('User');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roleMap = {
      User: 'user',
      Detective: 'detective',
      Admin: 'admin',
    };
    localStorage.setItem('accountType', roleMap[accountType]);
    navigate(ROUTES.OTP);
  };

  return (
    <div className="min-h-screen flex font-montserrat bg-[#D92B3A]">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/3 bg-[#D9D9D9] items-center justify-center relative overflow-hidden rounded-br-[200px]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <div className="z-10 text-center flex flex-col items-center">
          <div className="bg-[#40080C] p-4 rounded-full mb-6">
            <img src={GlobalLogo} alt="Logo" className="w-24 h-24 object-contain" />
          </div>
          <h1 className="text-[#D92B3A] text-2xl font-bold leading-tight uppercase text-center">
            Universal Detective <br /> pvt ltd
          </h1>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 relative">

        <div className="w-full max-w-md space-y-6 relative">

          {/* Select Language (FIXED POSITION) */}
          <button className="absolute -top-2 right-0 bg-white text-[#D92B3A] px-3 py-1 rounded-md text-xs font-medium shadow">
            Select Language
          </button>

          {/* Heading */}
          <div className="text-white text-center">
            <h2 className="text-3xl font-bold mb-1">Log In</h2>
            <p className="text-xs opacity-90">Choose your account type and login</p>
          </div>

          {/* Account Type */}
          <div className="flex gap-3">
            <button
              onClick={() => setAccountType('User')}
              className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                accountType === 'User'
                  ? 'bg-white/30 border-white'
                  : 'bg-transparent border-white/40'
              }`}
            >
              <div
                className={`p-2 rounded-lg mb-1 ${
                  accountType === 'User'
                    ? 'bg-white text-[#D92B3A]'
                    : 'bg-white/20 text-white'
                }`}
              >
                <User size={20} />
              </div>
              <span className="text-white text-sm">User</span>
            </button>

            <button
              onClick={() => setAccountType('Detective')}
              className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                accountType === 'Detective'
                  ? 'bg-white/30 border-white'
                  : 'bg-transparent border-white/40'
              }`}
            >
              <div
                className={`p-2 rounded-lg mb-1 ${
                  accountType === 'Detective'
                    ? 'bg-white text-[#D92B3A]'
                    : 'bg-white/20 text-white'
                }`}
              >
                <ShieldCheck size={20} />
              </div>
              <span className="text-white text-sm">Detective</span>
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-white text-xs">Email or Phone number</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80">
                  <Mail size={16} />
                </span>
                <input
                  type="text"
                  name="emailOrPhone"
                  placeholder="Enter your email/ phone number"
                  className="w-full bg-transparent border border-white/60 rounded-lg py-2 pl-9 pr-3 text-white text-sm placeholder:text-white/60 focus:outline-none focus:border-white"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="text-white text-xs">Password/ OTP</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent border border-white/60 rounded-lg py-2 pl-9 pr-9 text-white text-sm placeholder:text-white/60 focus:outline-none focus:border-white"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="w-3 h-3 accent-white"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                Remember me
              </label>

              <Link to="/forgot-password" className="text-white hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFF2EF] text-[#D92B3A] py-2 rounded-lg text-sm font-semibold hover:bg-white"
            >
              Log In as {accountType}
            </button>
          </form>

          {/* Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-white/40"></div>
              <span className="text-white text-[10px]">Or continue with</span>
              <div className="flex-1 border-t border-white/40"></div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex justify-center py-2 bg-white rounded-md">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" />
              </button>
              <button className="flex-1 flex justify-center py-2 bg-white rounded-md">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" />
              </button>
              <button className="flex-1 flex justify-center py-2 bg-white rounded-md">
                <img src="https://www.svgrepo.com/show/442911/apple-logo.svg" className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-center text-white text-xs">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGNUP} className="font-bold hover:underline">
              Sign Up
              
            </Link>
            <div>
            <Link to={ROUTES.ADMIN_DASHBOARD} className="font-bold hover:underline">
              Sign Up as admin
            </Link>
            </div>
          </p>
        </div>
      </div>

      {/* Right Decorative Strip */}
      <div className="hidden lg:block lg:w-12 bg-[#D9D9D9] rounded-bl-[200px]" />
    </div>
  );
};

export default Login;