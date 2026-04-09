import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Users, ClipboardCheck } from 'lucide-react';
import { Link } from "react-router-dom";

const AboutUs = () => {
  const scrollRef = useRef(null);

  // AUTO SCROLL EFFECT
  useEffect(() => {
    const container = scrollRef.current;

    let scrollAmount = 0;

    const slide = () => {
      if (!container) return;

      scrollAmount += 1;
      container.scrollLeft = scrollAmount;

      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0; // loop
      }
    };

    const interval = setInterval(slide, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="bg-[#121F27] text-white py-8 md:py-10 px-6 md:px-12 lg:px-20">

      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="max-w-2xl">
          <h2 className="text-gray-400 text-lg sm:text-5xl font-medium mb-2 ">
            About
          </h2>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Universal Detective
          </h1>

          <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
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

          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <a href="#contact">
              <button className="bg-red-600 px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition">
                Contact us
              </button>
            </a>

            <a href="#services">
              <button className="border-[1.6px] border-white px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition">
                View Services
              </button>
            </a>

          </div>
        </div>


        {/* RIGHT SIDE CARDS */}
<div className="lg:w-1/2 w-full overflow-hidden h-auto lg:h-[320px] relative flex justify-center lg:justify-end">
          <div className="flex flex-col gap-6 animate-verticalScroll w-[80%] lg:w-[60%] absolute" ref={scrollRef}>

            {/* CARD 1 */}
            <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] px-5 py-4 rounded-[28px] flex items-center gap-4 shadow-md border border-white/10">
              <div className="bg-white/20 p-3 rounded-lg">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-base font-semibold">Secure & Confidential</h3>
                <p className="text-white/80 text-xs">
                  Enterprise-grade encryption protects your sensitive information.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] px-5 py-4 rounded-[28px] flex items-center gap-4 shadow-md border border-white/10">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-base font-semibold">Verified Professionals</h3>
                <p className="text-white/80 text-xs">
                  Certified detectives with rigorous background checks.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] px-5 py-4 rounded-[28px] flex items-center gap-4 shadow-md border border-white/10">
              <div className="bg-white/20 p-3 rounded-lg">
                <ClipboardCheck size={24} />
              </div>
              <div>
                <h3 className="text-base font-semibold">Multi-Level Approval</h3>
                <p className="text-white/80 text-xs">
                  Multi-stage review ensures maximum accuracy.
                </p>
              </div>
            </div>

            {/* CARD 1 */}
            <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] px-5 py-4 rounded-[28px] flex items-center gap-4 shadow-md border border-white/10">
              <div className="bg-white/20 p-3 rounded-lg">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-base font-semibold">Secure & Confidential</h3>
                <p className="text-white/80 text-xs">
                  Enterprise-grade encryption protects your sensitive information.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] px-5 py-4 rounded-[28px] flex items-center gap-4 shadow-md border border-white/10">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-base font-semibold">Verified Professionals</h3>
                <p className="text-white/80 text-xs">
                  Certified detectives with rigorous background checks.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] px-5 py-4 rounded-[28px] flex items-center gap-4 shadow-md border border-white/10">
              <div className="bg-white/20 p-3 rounded-lg">
                <ClipboardCheck size={24} />
              </div>
              <div>
                <h3 className="text-base font-semibold">Multi-Level Approval</h3>
                <p className="text-white/80 text-xs">
                  Multi-stage review ensures maximum accuracy.
                </p>
              </div>
            </div>


          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;