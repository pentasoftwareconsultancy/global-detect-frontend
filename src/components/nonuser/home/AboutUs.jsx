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
      scrollAmount += 0.6;
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
      className="bg-[#121F27] text-white py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24"
    >
      <div className="flex flex-col lg:flex-row gap-12 items-start">

        {/* LEFT CONTENT */}
        <div className="w-full ">
          <h1 className="text-4xl sm:text-5xl font-light mb-1 leading-tight">About</h1>
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">Universal Detective</h1>

          <div className="space-y-5 text-gray-400 text-sm sm:text-[16px] leading-[1.8]">
            <p>
              Founded in 2015, Global Detection System has grown to become a leading provider of professional <br />investigation and detection
              services worldwide. Our mission is to deliver truth, justice, and peace of mind <br /> through meticulous investigation and
              unwavering commitment to our clients.
            </p>
            <p>
              With a team of over 500 certified detectives operating across 50 countries, we handle everything from <br /> background checks and
              fraud detection to missing persons and corporate investigations. Our multi-level <br /> verification system ensures that every report
              meets the highest standards of accuracy and reliability.
            </p>
            <p>
              We believe in transparency, integrity, and professionalism. Every case is treated with the utmost <br /> confidentiality,
              and our clients receive regular updates throughout the investigation process.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button className="bg-[#D92B3A] px-6 sm:px-8 py-3 rounded-md font-medium hover:bg-red-700 transition">
              Contact us
            </button>
            <button className="border-2 border-white/30 px-6 sm:px-8 py-3 rounded-md font-medium hover:bg-white/10 transition">
              View Services
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - INFINITE SCROLL CARDS */}
        <div className="lg:w-1/2 w-full h-[520px] overflow-hidden relative">
          <div ref={scrollRef} className="flex flex-col gap-5 overflow-hidden h-full">
            {[...cards, ...cards].map((card, i) => (
              <div
                key={i}
                className="flex items-start gap-5 bg-gradient-to-r from-[#8b1a22] to-[#b0222f] rounded-[20px] px-6 py-6 border border-white/10 shadow-lg flex-shrink-0"
              >
                {/* ICON BOX */}
                <div className="bg-black/30 p-3 rounded-xl flex-shrink-0">
                  {card.icon}
                </div>
                {/* TEXT */}
                <div>
                  <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{card.desc}</p>
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
