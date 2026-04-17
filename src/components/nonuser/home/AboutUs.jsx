import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Users, ClipboardCheck, HeadphonesIcon } from 'lucide-react';

const cards = [
  {
    icon: <ShieldCheck size={22} />,
    title: 'Secure & Confidential',
    desc: 'Enterprise-grade encryption and strict confidentiality protocols protect your sensitive information.',
  },
  {
    icon: <Users size={22} />,
    title: 'Verified Professionals',
    desc: 'All detectives undergo rigorous background checks, certification, and continuous training.',
  },
  {
    icon: <ClipboardCheck size={22} />,
    title: 'Multi-Level Approval',
    desc: 'Every report passes through admin and super admin verification for maximum accuracy.',
  },
  {
    icon: <HeadphonesIcon size={22} />,
    title: '24/7 Support',
    desc: 'Round-the-clock customer support to assist you at every stage of your case.',
  },
];

const AboutUs = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;

    const slide = () => {
      if (!container) return;
      scrollAmount += 1.2;
      container.scrollTop = scrollAmount;
      if (scrollAmount >= container.scrollHeight / 2) {
        scrollAmount = 0;
      }
    };

    const interval = setInterval(slide, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="bg-[#121F27] text-white py-8 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-24"
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-light mb-1 leading-tight">About</h1>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 lg:mb-8 leading-tight">Universal Detective</h1>

          <div className="space-y-3 lg:space-y-5 text-gray-400 text-xs sm:text-sm lg:text-[15px] leading-[1.6] lg:leading-[1.8]">
            <p>
              Founded in 2015, Global Detection System has grown to become a leading provider of professional investigation and detection
              services worldwide. Our mission is to deliver truth, justice, and peace of mind through meticulous investigation and
              unwavering commitment to our clients.
            </p>
            <p>
              With a team of over 500 certified detectives operating across 50 countries, we handle everything from background checks and
              fraud detection to missing persons and corporate investigations. Our multi-level verification system ensures that every report
              meets the highest standards of accuracy and reliability.
            </p>
            <p>
              We believe in transparency, integrity, and professionalism. Every case is treated with the utmost confidentiality,
              and our clients receive regular updates throughout the investigation process.
            </p>
          </div>

          <div className="flex flex-row gap-3 lg:gap-4 mt-6 lg:mt-10">
            <button className="bg-[#D92B3A] px-5 lg:px-8 py-2.5 lg:py-3 rounded-md text-sm lg:text-base font-medium hover:bg-red-700 transition">
              Contact us
            </button>
            <button className="border-2 border-white/30 px-5 lg:px-8 py-2.5 lg:py-3 rounded-md text-sm lg:text-base font-medium hover:bg-white/10 transition">
              View Services
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - INFINITE SCROLL CARDS */}
        <div className="w-full lg:w-1/2 h-[280px] lg:h-[530px] overflow-hidden relative">
          <div ref={scrollRef} className="flex flex-col gap-3 lg:gap-5 overflow-hidden h-full">
            {[...cards, ...cards].map((card, i) => (
              <div
                key={i}
                className="flex items-start gap-3 lg:gap-5 bg-gradient-to-r from-[#8b1a22] to-[#b0222f] rounded-[16px] lg:rounded-[20px] px-4 lg:px-6 py-4 lg:py-6 border border-white/10 shadow-lg flex-shrink-0"
              >
                {/* ICON BOX */}
                <div className="bg-black/30 p-2 lg:p-3 rounded-lg lg:rounded-xl flex-shrink-0">
                  {React.cloneElement(card.icon, { size: window.innerWidth >= 1024 ? 22 : 18 })}
                </div>
                {/* TEXT */}
                <div>
                  <h3 className="text-base lg:text-xl font-bold mb-1">{card.title}</h3>
                  <p className="text-white/75 text-xs lg:text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;