import React from "react";

const ContactInfo = () => {
  return (
    <section
      id="contact"
      className="bg-[#f5f5f5] text-black py-12 lg:py-20 px-4 lg:px-20 relative overflow-hidden"
    >
      {/* subtle pattern effect */}
      <div className="absolute inset-0 opacity-[0.04] bg-[/contact.png]"></div>

      <div className="relative max-w-6xl mx-auto">

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden">
          
          {/* HEADER */}
          <div className="mb-8">
            <p className="text-gray-500 mb-2 text-sm">
              Contact Info
            </p>
            <h2 className="text-2xl font-bold leading-tight">
              We are always happy<br />to assist you
            </h2>
          </div>

          {/* CONTACT DETAILS - 2 COLUMN GRID */}
          <div className="grid grid-cols-2 gap-6">
            
            {/* EMAIL */}
            <div>
              <p className="font-semibold text-sm mb-2">Email Address</p>
              <div className="w-6 h-[2px] bg-black mb-3"></div>
              <a
                href="mailto:help@info.com"
                className="text-base font-semibold hover:text-red-500 transition block mb-3"
              >
                help@info.com
              </a>
              <div className="text-gray-500 text-sm leading-relaxed">
                <p>Assistance hours:</p>
                <p>Monday - Friday 6 am to 8 pm EST</p>
              </div>
            </div>

            {/* PHONE */}
            <div>
              <p className="font-semibold text-sm mb-2">Number</p>
              <div className="w-6 h-[2px] bg-black mb-3"></div>
              <a
                href="tel:80899834256"
                className="text-base font-semibold hover:text-red-500 transition block mb-3"
              >
                (808) 998-34256
              </a>
              <div className="text-gray-500 text-sm leading-relaxed">
                <p>Assistance hours:</p>
                <p>Monday - Friday 6 am to 8 pm EST</p>
              </div>
            </div>

          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:flex justify-between gap-16">

          {/* LEFT */}
          <div className="flex-1">
            <p className="text-gray-500 mb-4 text-sm">
              Contact Info
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-md">
              We are always <br /> happy to assist you
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">

            {/* EMAIL */}
            <div>
              <p className="font-semibold text-sm mb-2">Email Address</p>
              <div className="w-6 h-[2px] bg-black mb-4"></div>
              <a
                href="mailto:help@info.com"
                className="text-lg font-semibold hover:text-red-500 transition"
              >
                help@info.com
              </a>
              <div className="mt-4 text-gray-500 text-sm leading-relaxed">
                <p>Assistance hours:</p>
                <p>Monday - Friday 6 am to</p>
                <p>8 pm EST</p>
              </div>
            </div>

            {/* PHONE */}
            <div>
              <p className="font-semibold text-sm mb-2">Number</p>
              <div className="w-6 h-[2px] bg-black mb-4"></div>
              <a
                href="tel:80899834256"
                className="text-lg font-semibold hover:text-red-500 transition"
              >
                (808) 998-34256
              </a>
              <div className="mt-4 text-gray-500 text-sm leading-relaxed">
                <p>Assistance hours:</p>
                <p>Monday - Friday 6 am to</p>
                <p>8 pm EST</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactInfo;