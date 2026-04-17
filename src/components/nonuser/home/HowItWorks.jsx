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
    <section className="bg-[#121F27] text-white py-8 lg:py-16 px-4 md:px-12 lg:px-20">
      <div className="w-full max-w-8xl mx-auto bg-[#2a343c]/80 backdrop-blur-xl border border-white/10 rounded-[20px] lg:rounded-[30px] px-6 lg:px-16 py-12 lg:py-24 shadow-[0_0_40px_rgba(0,0,0,0.4)] relative overflow-hidden">

        <h2 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-16">How it works</h2>

        {/* DESKTOP */}
        <div className="hidden lg:block relative z-10">
          <div className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-[#b0222f]" />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[length:6px_6px]" />
          </div>
          <div className="relative grid grid-cols-5" style={{ height: '320px' }}>
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-start relative z-10 pl-4">
                {step.position === 'top' && (
                  <div className="absolute top-0 w-55">
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-snug">{step.desc}</p>
                  </div>
                )}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-16 h-16 bg-[#f3d6c6] rounded-full flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                <div className={`absolute border-l border-dashed border-gray-400 left-1/2 ${
                  step.position === 'top' ? 'top-[72px] h-[calc(50%-72px)]' : 'top-1/2 h-[calc(50%-72px)]'
                }`} />
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
        <div className="lg:hidden relative z-10">
          {/* RED TIMELINE BAR */}
          <div className="absolute top-1/2 left-0 w-full h-9 -translate-y-1/2 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-[#b0222f]" />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[length:6px_6px]" />
          </div>

          {/* STEPS */}
          <div className="relative grid grid-cols-5" style={{ height: '220px' }}>
            {steps.map((step) => (
              <div key={step.id} className="relative z-10">

                {step.position === 'top' && (
                  <div className="absolute top-0 left-0 w-full ">
                    <h3 className="text-[10px] font-bold leading-tight">{step.title}</h3>
                    <p className="text-gray-400 text-[10px] leading-tight">{step.desc}</p>
                  </div>
                )}

                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#b0222f] rounded-full flex items-center justify-center shadow-lg z-20">
                  {React.cloneElement(step.icon, { size: 14, className: 'text-white' })}
                </div>

                <div className={`absolute border-l border-dashed border-gray-500 left-1/2 ${
                  step.position === 'top' ? 'top-[46px] h-[calc(50%-46px)]' : 'top-1/2 h-[calc(50%-46px)]'
                }`} />

                {step.position === 'bottom' && (
                  <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <h3 className="text-[8px] font-bold leading-tight">{step.title}</h3>
                    <p className="text-gray-400 text-[7px] leading-tight">{step.desc}</p>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
