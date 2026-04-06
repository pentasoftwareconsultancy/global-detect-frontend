import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalLogo from '../../assets/Global.png';
import { ROUTES } from '../../core/constants/routes.constant';

const Signup = () => {
  const [accountType, setAccountType] = useState('User');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAdhar, setShowAdhar] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: '',
    adharNumber: '',
    agreeToTerms: false,
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
      'User': 'user',
      'Detective': 'detective',
      'Admin': 'admin'
    };
    localStorage.setItem('accountType', roleMap[accountType]);
    localStorage.setItem('isFromSignup', 'true'); // Mark as signup flow
    
    if (accountType === 'Detective') {
      navigate(ROUTES.DETECTIVE_FORM);
    } else {
      navigate(ROUTES.OTP);
    }
  };

  return (
    <div className="min-h-screen flex font-montserrat bg-[#D92B3A]">
      {/* Left Side - Logo Section */}
        <div className="hidden lg:flex lg:w-1/3 bg-[#D9D9D9] items-center justify-center relative overflow-hidden rounded-br-[200px]">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="z-10 text-center flex flex-col items-center">
              <div className="bg-[#40080C] p-4 rounded-full mb-6">
                <img src={GlobalLogo} alt="Logo" className="w-24 h-24 object-contain" />
              </div>
              <h1 className="text-[#D92B3A] text-3xl font-bold leading-tight uppercase">
                Universal Detective <br /> pvt ltd
              </h1>
            </div>
            {/* <div className="absolute bottom-0 left-110 w-32 h-32 bg-[#D92B3A] rounded-br-full"></div> */}
          </div>
    

      {/* Right Side - Form Section */}
      <div className="flex-1 bg-[#D92B3A] flex flex-col items-center py-12 px-6 sm:px-12 relative overflow-y-auto">
        {/* Language Selector */}
        <button className="absolute top-8 right-8 bg-white text-[#D92B3A] px-4 py-2 rounded-lg font-medium shadow-md">
          Select Language
        </button>

        <div className="w-full max-w-md space-y-8 my-auto">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-2">Sign Up</h2>
            <p className="text-sm opacity-90">Choose your account type and create an account</p>
          </div>

          {/* Account Type Selection */}
          <div className="flex gap-4">
            <button
              onClick={() => setAccountType('User')}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                accountType === 'User'
                  ? 'bg-white/30 border-white'
                  : 'bg-transparent border-white/40'
              }`}
            >
              <div className={`p-2 rounded-lg mb-2 ${accountType === 'User' ? 'bg-white text-[#D92B3A]' : 'bg-white/20 text-white'}`}>
                <User size={24} />
              </div>
              <span className="text-white font-medium">User</span>
            </button>
            <button
              onClick={() => setAccountType('Detective')}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                accountType === 'Detective'
                  ? 'bg-white/30 border-white'
                  : 'bg-transparent border-white/40'
              }`}
            >
              <div className={`p-2 rounded-lg mb-2 ${accountType === 'Detective' ? 'bg-white text-[#D92B3A]' : 'bg-white/20 text-white'}`}>
                <ShieldCheck size={24} />
              </div>
              <span className="text-white font-medium">Detective</span>
            </button>
          </div>

          {/* Signup Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Name (As per Adhar card)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="w-full bg-transparent border-2 border-white/60 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors text-sm"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Phone Number (linked to adhar card)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full bg-transparent border-2 border-white/60 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors text-sm"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-2 border-white/60 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors text-sm"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">City</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                  <MapPin size={18} />
                </span>
                <select
                  name="city"
                  className="w-full bg-transparent border-2 border-white/60 rounded-xl py-2.5 pl-12 pr-10 text-white focus:outline-none focus:border-white transition-colors text-sm appearance-none"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value="" disabled className="text-gray-800">Select City</option>
                  <option value="delhi" className="text-gray-800">Delhi</option>
                  <option value="mumbai" className="text-gray-800">Mumbai</option>
                  <option value="bangalore" className="text-gray-800">Bangalore</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/80">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Create Password */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Create Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  className="w-full bg-transparent border-2 border-white/60 rounded-xl py-2.5 pl-12 pr-12 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors text-sm"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                  <Lock size={18} />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full bg-transparent border-2 border-white/60 rounded-xl py-2.5 pl-12 pr-12 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors text-sm"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Adhar card number */}
            <div className="space-y-1">
              <label className="text-white text-xs font-medium">Adhar card number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                  <CreditCard size={18} />
                </span>
                <input
                  type={showAdhar ? 'text' : 'password'}
                  name="adharNumber"
                  placeholder="Enter number"
                  className="w-full bg-transparent border-2 border-white/60 rounded-xl py-2.5 pl-12 pr-12 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors text-sm"
                  value={formData.adharNumber}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowAdhar(!showAdhar)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                >
                  {showAdhar ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="terms"
                className="w-4 h-4 rounded accent-white shrink-0"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              />
              <label htmlFor="terms" className="text-white text-[10px] sm:text-xs">
                I agree to the <Link to="/terms" className="underline font-semibold">Terms & Conditions</Link> and <Link to="/privacy" className="underline font-semibold">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFF2EF] text-[#D92B3A] py-3 rounded-xl font-bold text-lg hover:bg-white transition-colors shadow-lg"
            >
              Create Account
            </button>
          </form>

          {/* Social Signup */}
          <div className="space-y-4 pt-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/40"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                <span className="px-4 bg-[#D92B3A] text-white">Or sign up with</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex justify-center py-2.5 bg-white rounded-xl shadow-md hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              </button>
              <button className="flex-1 flex justify-center py-2.5 bg-white rounded-xl shadow-md hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
              </button>
              <button className="flex-1 flex justify-center py-2.5 bg-white rounded-xl shadow-md hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/442911/apple-logo.svg" alt="Apple" className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-center text-white text-sm pb-8">
            Already have an account? <Link to={ROUTES.LOGIN} className="font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </div>
          {/* Left Side - Logo Section */}
      <div className="hidden lg:flex lg:w-1/18 bg-[#D9D9D9] items-center justify-center relative overflow-hidden rounded-bl-[200px]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
        {/* <div className="absolute bottom-0 left-110 w-32 h-32 bg-[#D92B3A] rounded-br-full"></div> */}
      </div>
    </div>
  );
};

export default Signup;
