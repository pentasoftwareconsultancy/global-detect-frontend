import React from 'react';
import { FileEdit, ShieldCheck, UserPlus, Search, FileCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: '1. Submit Request',
      desc: 'Fill out our secure online form',
      icon: <FileEdit size={18} className="text-red-500" />,
      position: 'top'
    },
    {
      id: 2,
      title: '2. Admin Review',
      desc: 'Request reviewed within 24 hours',
      icon: <ShieldCheck size={18} className="text-red-500" />,
      position: 'bottom'
    },
    {
      id: 3,
      title: '3. Detective Assigned',
      desc: 'Expert detective assigned to your case',
      icon: <UserPlus size={18} className="text-red-500" />,
      position: 'top'
    },
    {
      id: 4,
      title: '4. Investigation',
      desc: 'Thorough investigation conducted',
      icon: <Search size={18} className="text-red-500" />,
      position: 'bottom'
    },
    {
      id: 5,
      title: '5. Report Delivered',
      desc: 'Detailed report with findings',
      icon: <FileCheck size={18} className="text-red-500" />,
      position: 'top'
    }
  ];

  return (
    <section className="bg-[#0b1120] text-white py-16 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto bg-[#0f172a] rounded-2xl p-6 sm:p-10 md:p-14">

        {/* TITLE */}
       <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-10 md:mb-14">
  {/* How it works */}
</h2>

        {/* DESKTOP TIMELINE */}
        <div className="hidden lg:block relative">

          {/* RED BAR */}
          <div className="absolute top-1/2 left-0 w-full h-14 bg-[#b0222f] rounded-full -translate-y-1/2"></div>

          <div className="relative flex justify-between items-center">

            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center w-[140px]">

                {/* TEXT */}
                <div
                  className={`absolute text-center ${
                    step.position === 'top'
                      ? '-top-28'
                      : 'top-24'
                  }`}
                >
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="text-gray-400 text-xs mt-1 leading-snug">
                    {step.desc}
                  </p>
                </div>

                {/* DOTTED LINE */}
                <div
                  className={`absolute border-l border-dashed border-gray-400 ${
                    step.position === 'top'
                      ? '-top-14 h-14'
                      : 'top-14 h-14'
                  }`}
                ></div>

                {/* ICON */}
                <div className="w-12 h-12 bg-[#f3d6c6] rounded-full flex items-center justify-center z-10 shadow-md">
                  {step.icon}
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* MOBILE / TABLET STACK */}
        <div className="lg:hidden space-y-8 mt-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-4">

              <div className="w-10 h-10 bg-[#f3d6c6] rounded-full flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>

              <div>
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="text-gray-400 text-xs mt-1">{step.desc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;