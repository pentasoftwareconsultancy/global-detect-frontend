import React from 'react';
import { ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

const EnquiryForm = () => {
  return (
    <section className="bg-[#121F27] text-white py-8 lg:py-16 px-4 lg:px-20">
      <div className="max-w-8xl mx-auto">
        
        {/* MOBILE LAYOUT */}
        <div className="lg:hidden">
          <h2 className="text-2xl font-bold mb-8 leading-tight">
            Get in touch with us.<br />
            We are here to assist you
          </h2>

          <form className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-white text-sm">Your Name</label>
              <input
                type="text"
                className="bg-transparent border-b border-white/30 py-3 focus:border-white outline-none transition-colors text-white"
                placeholder=""
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-white text-sm">Email address</label>
              <input
                type="email"
                className="bg-transparent border-b border-white/30 py-3 focus:border-white outline-none transition-colors text-white"
                placeholder=""
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-white text-sm">Email address</label>
              <input
                type="tel"
                className="bg-transparent border-b border-white/30 py-3 focus:border-white outline-none transition-colors text-white"
                placeholder=""
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-white text-sm">Messages</label>
              <textarea
                rows="1"
                className="bg-transparent border-b border-white/30 py-3 focus:border-white outline-none transition-colors resize-none text-white"
                placeholder=""
              ></textarea>
            </div>
          </form>

          {/* CTA + SOCIALS */}
          <div className="flex justify-between items-center mt-6">
            {/* BUTTON */}
            <button className="flex items-center gap-2 bg-[#D92B3A] hover:bg-[#c62828] px-4 py-2 rounded-md text-sm font-medium transition">
              Leave a message to us
              <ArrowRight size={16} />
            </button>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                <Instagram size={16} />
              </div>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                <Facebook size={16} />
              </div>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                <Twitter size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:block pt-16">
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

              {/* CTA + SOCIALS */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-10 gap-6">

                {/* BUTTON */}
                <button className="flex items-center gap-2 bg-[#D92B3A] hover:bg-[#c62828] px-6 py-3 rounded-md text-sm font-medium transition">
                  Leave a message to us
                  <ArrowRight size={16} />
                </button>

                {/* SOCIAL ICONS */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                    <Instagram size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                    <Facebook size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
                    <Twitter size={18} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;