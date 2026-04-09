import React from 'react';
import { Shield, CheckCircle, Lock, Gavel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/constants/routes.constant';
import { RiWhatsappFill } from "react-icons/ri";
import { BiSolidMessageAlt } from "react-icons/bi";
import se from "../../../assets/image 4.png";
import rect from "../../../assets/Rectangle.png";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] lg:min-h-screen bg-[#121F27] text-white overflow-hidden flex items-center px-4 sm:px-6 md:px-12 lg:px-20">
      {/* RIGHT SIDE (DESKTOP) */}

      <div className="absolute top-0 right-[90px] h-full w-[22%] hidden lg:block overflow-hidden">

        {/* RED BACKGROUND */}
        <img
          src={rect}
          className="absolute top-0 right-0 w-full h-full object-cover saturate-170"
        />

        {/* CURVED BOTTOM SHAPE */}
        <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[160%] h-[360px] bg-[#121F27] rounded-full z-10"></div>

        {/* DETECTIVE IMAGE */}
        <img
          src={se}
          className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 h-[80%] object-contain z-20"
        />
      </div>

      {/* MOBILE BACKGROUND IMAGE */}
      <div className="absolute inset-0 lg:hidden opacity-20">
        <img src={se} className="w-full h-full object-cover object-right" />
      </div>

      {/* LEFT GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#121F27] via-[#121F27]/95 to-transparent z-0"></div>

      {/* CONTENT */}
      <div className="relative z-30  pb-16 lg:pb-20">

        {/* HEADING */}
        <h1 className="text-[26px] sm:text-[34px] md:text-[54px] lg:text-[64px] leading-[1.2] font-light mb-6">
          <span className="font-semibold">“Professional</span> Private <br />
          <span className="whitespace-nowrap">
            Investigation & <span className="font-semibold">Security</span>
          </span> <br />
          Platform”
        </h1>

        {/* TEXT */}
        <p className="text-gray-400 text-sm sm:text-[15px] leading-[1.7] mb-8 sm:mb-10 max-w-[700px]">
          Delivering confidential private investigations powered by verified professionals,
          ethical practices, and advanced digital technology—ensuring accuracy, accountability,
          and complete discretion at every stage. From background verification to litigation support,
          our platform ensures secure case handling, verified professionals,
          and structured workflows that meet corporate and legal standards.
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
            className="border-[1.6px] border-white px-6 sm:px-7 py-3 rounded-md font-medium hover:bg-white/10 w-full sm:w-auto"
          >
            Join as Detective
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-[520px]">
          {[
            { id: "01", icon: <Lock size={14} className="text-red-500" />, text: "Encrypted Reports" },
            { id: "02", icon: <CheckCircle size={14} className="text-red-500" />, text: "Verified Detectives" },
            { id: "03", icon: <Shield size={14} className="text-red-500" />, text: "Icons + short labels" },
            { id: "04", icon: <Gavel size={14} className="text-red-500" />, text: "Legal & Ethical Compliance" },
          ].map((item, index) => (

            <div key={index} className="relative">

              {/* NUMBER (BEHIND) */}
              <div className="absolute top-0 left-0 translate-x-[-40%] translate-y-[-60%] z-2">
                <div className="bg-[#F2D1B3] text-black text-[10px] px-3 py-1 rounded-sm shadow-md font-bold">
                  {item.id}
                </div>
              </div>

              {/* CARD */}
              <div className="relative z-10">



                <div className="border border-white/10 
          bg-white/[0.06] backdrop-blur-md 
          px-5 py-3 flex items-center gap-3 
          shadow-[0_8px_20px_rgba(0,0,0,0.25)]">

                  {item.icon}

                  <span className="text-[13px] text-gray-200">
                    “{item.text}”
                  </span>
                </div>

              </div>

            </div>

          ))}

        </div>
      </div>

      {/* FLOATING BUTTONS */}
      <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 flex flex-col gap-3 z-50">

        <button className="bg-[#D92B3A] p-3 rounded-full shadow-lg">
          <RiWhatsappFill className="w-6 h-6" />
        </button>

        <button className="bg-[#D92B3A] p-3 rounded-full shadow-lg">
          <BiSolidMessageAlt className="w-6 h-6 " />
        </button>

      </div>

    </div>
  );
};

export default HomeHero;