import React from "react";

const ContactInfo = () => {
  return (
    <section
      id="contact"
      className="bg-[#f5f5f5] text-black py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* subtle pattern effect */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/topography.png')]"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16">

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

            {/* small dash */}
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

            {/* small dash */}
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
    </section>
  );
};

export default ContactInfo;