import React from 'react';

const ContactInfo = () => {
  return (
    <section id="contact" className="bg-[#0b1120] text-white py-20 px-6 md:px-12 lg:px-24 border-t border-white/5">
    <section className="bg-[#0b1120] text-white py-20 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex-1">
          <p className="text-gray-500 mb-4 font-medium uppercase tracking-widest text-sm">Contact Info</p>
          <h2 className="text-4xl md:text-5xl font-bold max-w-md">
            We are always happy to assist you
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div>
            <p className="font-bold mb-4 border-b border-red pb-2 inline-block">Email Address</p>
            <div className="mt-4">
              <a href="mailto:help@info.com" className="text-xl font-bold hover:red transition-colors">help@info.com</a>
              <div className="mt-4 text-gray-400 text-sm">
                <p>Assistance hours:</p>
                <p>Monday - Friday 6 am to</p>
                <p>8 pm EST</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold mb-4 border-b border-red pb-2 inline-block">Number</p>
            <div className="mt-4">
              <a href="tel:80899834256" className="text-xl font-bold hover:red transition-colors">(808) 998-34256</a>
              <div className="mt-4 text-gray-400 text-sm">
                <p>Assistance hours:</p>
                <p>Monday - Friday 6 am to</p>
                <p>8 pm EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
        <p>&copy; 2024 Global Detection System. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </section>
    </section>
  );
};

export default ContactInfo;