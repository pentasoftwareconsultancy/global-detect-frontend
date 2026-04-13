import React from 'react';
import { FileEdit, ShieldCheck, UserPlus, Search, FileCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: '1. Submit Request',
      desc: 'Fill out our secure online form',
      icon: <FileEdit size={26} className="text-red-700" />,
      position: 'top'
    },
    {
      id: 2,
      title: '2. Admin Review',
      desc: 'Request reviewed within 24 hours',
      icon: <ShieldCheck size={26} className="text-red-700" />,
      position: 'bottom'
    },
    {
      id: 3,
      title: '3. Detective Assigned',
      desc: 'Expert detective assigned to your case',
      icon: <UserPlus size={26} className="text-red-700" />,
      position: 'top'
    },
    {
      id: 4,
      title: '4. Investigation',
      desc: 'Thorough investigation conducted',
      icon: <Search size={26} className="text-red-700" />,
      position: 'bottom'
    },
    {
      id: 5,
      title: '5. Report Delivered',
      desc: 'Detailed report with findings',
      icon: <FileCheck size={26} className="text-red-700" />,
      position: 'top'
    }
  ];

  return (
    <section className="bg-[#121F27] text-white py-14 md:py-16 px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-8xl mx-auto bg-[#2a343c]/80 backdrop-blur-xl border border-white/10 rounded-[30px] px-10 md:px-16 py-12 shadow-[0_0_40px_rgba(0,0,0,0.4)] relative overflow-hidden">

        <h2 className="text-3xl font-bold mb-16">How it works</h2>

        {/* DESKTOP */}
        <div className="hidden lg:block relative z-10">

          {/* RED TIMELINE BAR */}
          <div className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 rounded-full overflow-hidden ">
            <div className="absolute inset-0 bg-[#b0222f]" />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay
              bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_1px,_transparent_1px)]
              bg-[length:6px_6px]" />
          </div>

          {/* STEPS */}
          <div className="relative grid grid-cols-5" style={{ height: '320px' }}>
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-start relative z-10 pl-4">

                {/* TEXT TOP */}
                {step.position === 'top' && (
                  <div className="absolute top-0 w-55">
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-snug">{step.desc}</p>
                  </div>
                )}

                {/* ICON centered on bar */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-16 h-16 bg-[#f3d6c6] rounded-full flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>

                {/* DOTTED LINE */}
                <div
                  className={`absolute border-l border-dashed border-gray-400 left-1/2 ${
                    step.position === 'top'
                      ? 'top-[72px] h-[calc(50%-72px)]'
                      : 'top-1/2 h-[calc(50%-72px)]'
                  }`}
                />

                {/* TEXT BOTTOM */}
                {step.position === 'bottom' && (
                  <div className="absolute bottom-0 w-48">
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-snug">{step.desc}</p>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#f3d6c6] rounded-full flex items-center justify-center shadow-md flex-shrink-0">
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