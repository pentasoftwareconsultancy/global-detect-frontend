import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Users, ClipboardCheck } from 'lucide-react';

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
    <section id="about" className="bg-[#0b1120] text-white py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24">

      <div className="flex flex-col lg:flex-row gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="lg:w-1/2">
          <h2 className="text-gray-400 text-lg sm:text-xl font-medium mb-2 uppercase tracking-wider">
            About
          </h2>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Universal Detective
          </h1>

          <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            <p>
              Founded in 2015, Global Detection System has grown to become a leading provider of professional investigation and detection services worldwide.
            </p>
            <p>
              With a team of over 500 certified detectives operating across 50 countries, we handle everything from background checks to corporate investigations.
            </p>
            <p>
              We believe in transparency, integrity, and professionalism with full confidentiality.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="bg-red-600 px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition">
              Contact us
            </button>

            <button className="border border-white/30 px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition">
              View Services
            </button>
          </div>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="lg:w-1/2 w-full overflow-hidden h-[320px] relative">

  <div className="flex flex-col gap-6 animate-verticalScroll">

    {/* CARD 1 */}
    <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] p-6 rounded-2xl flex items-center gap-5 shadow-lg">
      <div className="bg-white/20 p-4 rounded-lg">
        <ShieldCheck size={28} />
      </div>
      <div>
        <h3 className="text-lg font-bold">Secure & Confidential</h3>
        <p className="text-white/80 text-sm">
          Enterprise-grade encryption protects your sensitive information.
        </p>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] p-6 rounded-2xl flex items-center gap-5 shadow-lg">
      <div className="bg-white/20 p-4 rounded-lg">
        <Users size={28} />
      </div>
      <div>
        <h3 className="text-lg font-bold">Verified Professionals</h3>
        <p className="text-white/80 text-sm">
          Certified detectives with rigorous background checks.
        </p>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] p-6 rounded-2xl flex items-center gap-5 shadow-lg">
      <div className="bg-white/20 p-4 rounded-lg">
        <ClipboardCheck size={28} />
      </div>
      <div>
        <h3 className="text-lg font-bold">Multi-Level Approval</h3>
        <p className="text-white/80 text-sm">
          Multi-stage review ensures maximum accuracy.
        </p>
      </div>
    </div>

    {/* DUPLICATE FOR LOOP */}
    <div className="bg-gradient-to-r from-[#b0222f] to-[#d32f2f] p-6 rounded-2xl flex items-center gap-5 shadow-lg">
      <div className="bg-white/20 p-4 rounded-lg">
        <ShieldCheck size={28} />
      </div>
      <div>
        <h3 className="text-lg font-bold">Secure & Confidential</h3>
        <p className="text-white/80 text-sm">
          Enterprise-grade encryption protects your sensitive information.
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