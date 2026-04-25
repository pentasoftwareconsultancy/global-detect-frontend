import React from 'react';

const StepIndicator = ({ steps, active }) => {
  return (
    <div className="bg-[#0f2629] rounded-lg p-4 mb-6">
      <div className="flex items-center gap-6 justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 text-center">
            <div
              className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center ${
                i < active
                  ? 'bg-green-500'
                  : i === active
                  ? 'bg-pink-500'
                  : 'bg-gray-700'
              }`}
            >
              <span className="text-white font-semibold">
                {i + 1}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-300">
              {s}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;