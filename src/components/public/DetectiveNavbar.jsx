import React from "react";
import { Search, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import { RiNotificationFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const DetectiveNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-[#121F27] text-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-white/10">

      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3">
        <CgProfile size={18} className="text-white sm:size-[20px]" />
        <span className="text-xs sm:text-sm md:text-base font-medium truncate max-w-[100px] sm:max-w-none">
          Profile name
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

        {/* SEARCH */}
        <div className="relative w-full sm:w-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#3a4651] border-0 rounded-lg py-2 pl-9 pr-3 text-xs sm:text-sm w-full sm:w-60 md:w-72 focus:outline-none text-white placeholder:text-gray-400"
          />
        </div>

        {/* NOTIFICATION */}
        <div
          onClick={() => navigate(ROUTES.DETECTIVE_NOTIFICATION)}
          className="relative cursor-pointer"
        >
          <RiNotificationFill size={22} className="text-white hover:opacity-80 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
            3
          </span>
        </div>

      </div>
    </nav>
  );
};

export default DetectiveNavbar;