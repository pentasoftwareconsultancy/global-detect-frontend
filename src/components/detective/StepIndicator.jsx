import React from 'react';
import {
  User,
  MapPin,
  Briefcase,
  FileText,
  CreditCard,
  Users,
  Shield,
  CheckCircle
} from 'lucide-react';

const stepIcons = [
  User,
  MapPin,
  Briefcase,
  FileText,
  CreditCard,
  Users,
  Shield
];

const StepIndicator = ({ steps, active }) => {

  return (

    <div className="bg-[#1A2832] border border-white/10 rounded-xl p-4 md:p-6 mb-6">

      <div className="flex items-center justify-between">

        {steps.map((step, i) => {

          const Icon = stepIcons[i] || User;

          const done = i < active;

          const current = i === active;

          return (

            <React.Fragment key={i}>

              {/* Step Circle */}
              <div className="flex flex-col items-center gap-1 md:gap-2 min-w-0">

                <div
                  className={`w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0
                  ${
                    done
                      ? 'bg-green-500 border-green-500'
                      : current
                      ? 'bg-[#D92B3A] border-[#D92B3A]'
                      : 'bg-[#2D3E4D] border-white/20'
                  }`}
                >

                  {done ? (

                    <CheckCircle
                      size={14}
                      className="text-white"
                    />

                  ) : (

                    <Icon
                      size={14}
                      className={
                        current
                          ? 'text-white'
                          : 'text-gray-500'
                      }
                    />

                  )}

                </div>

                {/* Step Label */}
                <span
                  className={`text-[9px] md:text-[11px] text-center leading-tight hidden sm:block
                  ${
                    current
                      ? 'text-[#D92B3A] font-semibold'
                      : done
                      ? 'text-gray-300'
                      : 'text-gray-500'
                  }`}
                >

                  {step}

                </span>

              </div>

              {/* Connector Line */}
              {i < steps.length - 1 && (

                <div
                  className={`flex-1 h-[2px] mx-1 mb-0 sm:mb-5
                  ${
                    i < active
                      ? 'bg-green-500'
                      : 'bg-white/10'
                  }`}
                />

              )}

            </React.Fragment>

          );

        })}

      </div>

    </div>

  );

};

export default StepIndicator;