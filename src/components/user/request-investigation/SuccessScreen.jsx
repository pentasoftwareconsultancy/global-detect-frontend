import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/constants/routes.constant';
import successGif from '../../../assets/success_screen.gif';

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
      <div className="w-[900px] h-[620px] bg-[#FFF2EF] rounded-[24px] border-2 border-black/5 shadow-xl flex flex-col items-center justify-center text-center px-10">
        {/* Background detective silhouette placeholder */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {/* <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div> */}
        </div>

        <div className="z-10 flex flex-col items-center text-center">

          {/* SUCCESS GIF */}
          <img
            src={successGif}
            alt="success"
            className="w-[200px] h-[200px] object-contain mb-4"
          />

          {/* TITLE */}
          <h2 className="w-[693px] text-[36px] leading-[54px] font-bold text-[#0b1120] font-[Montserrat]">
            Investigation submitted successfully
          </h2>

          {/* SUBTEXT */}
          <p className="w-[481px] text-[15px] leading-[22.5px] font-normal text-[#0b1120]/70 font-[Montserrat] mt-1">
            Case has been submitted to admin
          </p>

          {/* CASE ID */}
          <p className="w-[250px] text-[15px] leading-[22.5px] font-semibold text-[#0b1120] font-[Montserrat] mt-6">
            Your Case ID - <span className="font-bold">{caseId}</span>
          </p>

          {/* BUTTON */}
          <button
            onClick={() => navigate(ROUTES.USER_DASHBOARD)}
            className="w-[500px] h-[56px] bg-red text-white rounded-[16px] font-semibold text-[18px] font-[Montserrat] shadow-md hover:bg-[#b0222f] transition-all active:scale-95 mt-6"
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
