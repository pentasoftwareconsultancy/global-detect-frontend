import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/constants/routes.constant';

const SuccessScreen = () => {
  const navigate = useNavigate();
  const caseId = "#BR-9902"; // This would normally come from the API response

  useEffect(() => {
    console.log('Success screen mounted, redirecting in 3 seconds...');
    const timer = setTimeout(() => {
      console.log('Redirecting to:', ROUTES.USER_DASHBOARD);
      navigate(ROUTES.USER_DASHBOARD);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-red flex items-center justify-center p-6 z-[100]">
      <div className="w-full max-w-4xl bg-[#FFF2EF] rounded-[40px] p-16 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
        {/* Background detective silhouette placeholder */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="z-10 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-[#0b1120] text-4xl font-bold tracking-tight">
              Investigation submitted successfully
            </h2>
            <p className="text-[#0b1120]/70 text-lg">
              Case has been submitted to admin
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[#0b1120] font-bold text-xl uppercase tracking-widest">
              Your Case ID- <span className="font-bold">{caseId}</span>
            </p>
          </div>

          <button
            onClick={() => {
              console.log('Button clicked, navigating to:', ROUTES.USER_DASHBOARD);
              navigate(ROUTES.USER_DASHBOARD);
            }}
            className="w-full max-w-sm bg-red text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#b0222f] transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
