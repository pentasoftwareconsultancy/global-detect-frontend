import React from 'react';
import { ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

const EnquiryForm = () => {
  return (
    <section className="bg-[#121F27] text-white py-14 md:py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 max-w-2xl">
          Get in touch with us. <br />
          We are here to assist you
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="flex-1">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">

  {/* NAME */}
  <div className="flex flex-col gap-2">
    <label className="text-gray-400 text-sm">Your Name</label>
    <input
      type="text"
      className="bg-transparent border-b border-white/20 py-2 focus:border-red outline-none transition-colors"
      placeholder="Enter your name"
    />
  </div>

  {/* EMAIL */}
  <div className="flex flex-col gap-2">
    <label className="text-gray-400 text-sm">Email Address</label>
    <input
      type="email"
      className="bg-transparent border-b border-white/20 py-2 focus:border-red outline-none transition-colors"
      placeholder="Enter your email"
    />
  </div>

  {/* PHONE */}
  <div className="flex flex-col gap-2">
    <label className="text-gray-400 text-sm">Phone Number (optional)</label>
    <input
      type="tel"
      className="bg-transparent border-b border-white/20 py-2 focus:border-red outline-none transition-colors"
      placeholder="Enter your phone number"
    />
  </div>

  {/* MESSAGE */}
  <div className="flex flex-col gap-2 md:col-span-3">
    <label className="text-gray-400 text-sm">Message</label>
    <textarea
      rows="4"
      className="bg-transparent border-b border-white/20 py-2 focus:border-red outline-none transition-colors resize-none"
      placeholder="Write your message here..."
    ></textarea>
  </div>

</form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;