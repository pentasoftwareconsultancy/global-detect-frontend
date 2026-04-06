import React from 'react';
import { Shield, CheckCircle, Lock, Gavel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/constants/routes.constant';

import se from "../../../assets/image 4.png";
import rect from "../../../assets/Rectangle.png";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#07121a] text-white overflow-hidden flex items-center px-4 sm:px-6 md:px-12 lg:px-20">

      {/* RIGHT SIDE (DESKTOP) */}
      <div className="absolute right-0 top-0 h-full w-[30%] hidden lg:block overflow-hidden">

        <img src={rect} className="absolute top-0 right-0 w-full h-full object-cover" />

        <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[140%] h-[320px] bg-[#07121a] rounded-full z-10"></div>

        <img
          src={se}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[92%] object-contain z-20"
        />
      </div>

      {/* MOBILE BACKGROUND IMAGE */}
      <div className="absolute inset-0 lg:hidden opacity-20">
        <img src={se} className="w-full h-full object-cover object-right" />
      </div>

      {/* LEFT GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07121a] via-[#07121a]/95 to-transparent z-0"></div>

      {/* CONTENT */}
      <div className="relative z-30 max-w-[620px] pt-16 sm:pt-20">

        {/* HEADING */}
        <h1 className="text-[32px] sm:text-[40px] md:text-[54px] lg:text-[64px] leading-[1.1] font-light mb-6">
          <span className="font-semibold">“Professional</span> Private <br />
          <span className="whitespace-nowrap">
            Investigation & <span className="font-semibold">Security</span>
          </span> <br />
          Platform”
        </h1>

        {/* TEXT */}
        <p className="text-gray-400 text-sm sm:text-[15px] leading-[1.7] mb-8 sm:mb-10">
          Delivering confidential private investigations powered by verified professionals,
          ethical practices, and advanced digital technology—ensuring accuracy, accountability,
          and complete discretion at every stage.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12">

          <button
            onClick={() => navigate(ROUTES.REQUEST_INVESTIGATION)}
            className="bg-[#e53935] hover:bg-[#c62828] px-6 sm:px-7 py-3 rounded-md font-medium w-full sm:w-auto"
          >
            Request Investigation
          </button>

          <button
            onClick={() => navigate('/login')}
            className="border border-white/30 px-6 sm:px-7 py-3 rounded-md font-medium hover:bg-white/10 w-full sm:w-auto"
          >
            Join as Detective
          </button>

        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-10 sm:gap-y-6 max-w-[520px]">

          <div className="relative border border-white/10 bg-white/5 px-4 py-2 flex items-center gap-3 backdrop-blur-sm">
            <span className="absolute -top-2 -left-2 bg-[#e7dfd7] text-black text-[9px] px-2 py-[1px]">01</span>
            <Lock size={14} className="text-red-500" />
            <span className="text-[13px] text-gray-200">“Encrypted Reports”</span>
          </div>

          <div className="relative border border-white/10 bg-white/5 px-4 py-2 flex items-center gap-3 backdrop-blur-sm">
            <span className="absolute -top-2 -left-2 bg-[#e7dfd7] text-black text-[9px] px-2 py-[1px]">02</span>
            <CheckCircle size={14} className="text-red-500" />
            <span className="text-[13px] text-gray-200">“Verified Detectives”</span>
          </div>

          <div className="relative border border-white/10 bg-white/5 px-4 py-2 flex items-center gap-3 backdrop-blur-sm">
            <span className="absolute -top-2 -left-2 bg-[#e7dfd7] text-black text-[9px] px-2 py-[1px]">03</span>
            <Shield size={14} className="text-red-500" />
            <span className="text-[13px] text-gray-200">“Icons + short labels”</span>
          </div>

          <div className="relative border border-white/10 bg-white/5 px-4 py-2 flex items-center gap-3 backdrop-blur-sm">
            <span className="absolute -top-2 -left-2 bg-[#e7dfd7] text-black text-[9px] px-2 py-[1px]">04</span>
            <Gavel size={14} className="text-red-500" />
            <span className="text-[13px] text-gray-200">“Legal & Ethical Compliance”</span>
          </div>

        </div>
      </div>

      {/* FLOATING BUTTONS */}
      <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 flex flex-col gap-3 z-50">
        <button className="bg-[#25D366] p-3 rounded-full shadow-lg">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5" />
        </button>

        <button className="bg-[#e53935] p-3 rounded-full shadow-lg">
          <img src="https://www.svgrepo.com/show/521104/chat-bubble.svg" className="w-5 h-5 invert" />
        </button>
      </div>

    </div>
  );
};

export default HomeHero;