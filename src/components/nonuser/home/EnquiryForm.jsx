import React from 'react';
import { ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

const EnquiryForm = () => {
  return (
    <section className="bg-[#0b1120] text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl">
          Get in touch with us. <br />
          We are here to assist you
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="flex-1">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-sm">Your Name</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-white/20 py-2 focus:border-red outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-sm">Email Address</label>
                <input 
                  type="email" 
                  className="bg-transparent border-b border-white/20 py-2 focus:border-red outline-none transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-gray-400 text-sm">Phone Number (optional)</label>
                <input 
                  type="tel" 
                  className="bg-transparent border-b border-white/20 py-2 focus:border-red outline-none transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-gray-400 text-sm">Message</label>
                <textarea 
                  rows="4"
                  className="bg-transparent border-b border-white/20 py-2 focus:border-red outline-none transition-colors resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              
              <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-8 mt-8">
                <button className="w-full md:w-auto bg-red px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-[#b0222f] transition-colors group">
                  Leave a message to us
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Social Icons */}
                <div className="flex gap-6">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-red hover:text-red transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-red hover:text-red transition-all">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-red hover:text-red transition-all">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;