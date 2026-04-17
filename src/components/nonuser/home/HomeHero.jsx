import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/constants/routes.constant';
import { RiWhatsappFill } from "react-icons/ri";
import { BiSolidMessageAlt } from "react-icons/bi";
import se from "../../../assets/image 4.png";
import rect from "../../../assets/Rectangle.png";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative lg:min-h-[87vh] bg-[#121F27] text-white overflow-hidden">
      
      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex items-center px-20 h-full pt-2">
        
        {/* RIGHT SIDE (DESKTOP) */}
        <div className="absolute top-0 right-[90px] h-full w-[22%] overflow-hidden">
          <img src={rect} className="absolute top-0 right-0 w-full h-full object-cover saturate-170" />
          <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[160%] h-[360px] bg-[#121F27] rounded-full z-10"></div>
          <img src={se} className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 h-[80%] w object-contain z-20" />
        </div>

        {/* LEFT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121F27] via-[#121F27]/95 to-transparent z-0"></div>

        {/* CONTENT */}
        <div className="relative z-30 pb-10">
          <h1 className="text-[64px] leading-[1.2] font-light mb-6">
            <span className="font-semibold">"Professional</span> Private <br />
            <span className="whitespace-nowrap">
              Investigation & <span className="font-semibold">Security</span>
            </span> <br />
            Platform"
          </h1>

          <p className="text-gray-400 text-[15px] leading-[1.7] mb-10 max-w-[700px]">
            Delivering confidential private investigations powered by verified professionals,
            ethical practices, and advanced digital technology—ensuring accuracy, accountability,
            and complete discretion at every stage. From background verification to litigation support,
            our platform ensures secure case handling, verified professionals,
            and structured workflows that meet corporate and legal standards.
          </p>

          <div className="flex gap-4 mb-12">
            <button
              onClick={() => navigate(ROUTES.REQUEST_INVESTIGATION)}
              className="bg-[#D92B3A] hover:bg-[#c62828] px-7 py-3 rounded-md font-medium"
            >
              Request Investigation
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-[1.6px] border-white px-7 py-3 rounded-md font-medium hover:bg-white/10"
            >
              Join as Detective
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-[520px] pt-5 pl-4">
            {[
              { id: "01", text: "Encrypted Reports" },
              { id: "02", text: "Verified Detectives" },
              { id: "03", text: "Icons + short labels" },
              { id: "04", text: "Legal & Ethical Compliance" },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -top-3 -left-3 z-20 bg-[#c8a882] text-black text-[11px] px-2 py-[2px] font-bold shadow-md">
                  {item.id}
                </div>
                <div className="border border-white/15 bg-[#1a2535] px-5 py-4 shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
                  <span className="text-[13px] text-gray-200">"{item.text}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden px-4 pt-6 pb-4 flex flex-col">

        {/* TOP ROW - Text left, Detective right */}
        <div className="flex items-start gap-3 mb-5">

          {/* LEFT - Heading + Paragraph */}
          <div className="flex-1">
            <h1 className="text-[20px] leading-[1.3] font-light mb-3">
              <span className="font-bold">"Professional</span> Private<br />
              Investigation & <span className="font-bold">Security</span> Platform"
            </h1>
            <p className="text-gray-400 text-[10px] leading-[1.6]">
              Delivering confidential private investigations powered by verified professionals, ethical practices, and advanced digital technology—ensuring accuracy, accountability, and complete discretion at every stage. From background verification to litigation support, our platform ensures secure case handling, verified professionals, and structured workflows that meet corporate and legal standards.
            </p>
          </div>

          {/* RIGHT - Red rect + Detective */}
          <div className="relative w-[120px] flex-shrink-0" style={{height: '220px'}}>
            <img src={rect} className="absolute top-0 right-0 w-full h-[55%] object-cover saturate-170" />
            <img src={se} className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[85%] object-contain z-10" />
          </div>
        </div>

        {/* BUTTONS - side by side */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => navigate(ROUTES.REQUEST_INVESTIGATION)}
            className="bg-[#D92B3A] hover:bg-[#c62828] px-4 py-2.5 rounded-md font-medium text-sm flex-1"
          >
            Request Investigation
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border-[1.6px] border-white px-4 py-2.5 rounded-md font-medium text-sm flex-1 hover:bg-white/10"
          >
            Join as Detective
          </button>
        </div>

        {/* FEATURE CARDS 2x2 */}
        <div className="grid grid-cols-2 gap-4 pt-3 pl-3">
          {[
            { id: "01", text: "Encrypted Reports" },
            { id: "02", text: "Verified Detectives" },
            { id: "03", text: "Icons + short labels" },
            { id: "04", text: "Legal Compliance" },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -top-3 -left-3 z-20 bg-[#c8a882] text-black text-[11px] px-2 py-[2px] font-bold shadow-md">
                {item.id}
              </div>
              <div className="border border-white/15 bg-[#1a2535] px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
                <span className="text-[12px] text-gray-200">"{item.text}"</span>
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
          <BiSolidMessageAlt className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};

export default HomeHero;