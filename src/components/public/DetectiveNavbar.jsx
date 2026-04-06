import React from "react";
import { Search, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

const DetectiveNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-[#0b1120] text-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-white/10">

      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <User size={18} className="text-white sm:size-[20px]" />
        </div>
        <span className="text-xs sm:text-sm md:text-base font-medium truncate max-w-[100px] sm:max-w-none">
          Profile name
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

        {/* SEARCH */}
        <div className="relative hidden xs:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            className="bg-[#3a4651] border-0 rounded-lg py-1.5 sm:py-2 pl-9 pr-3 sm:pr-4 text-xs sm:text-sm w-28 sm:w-44 md:w-56 lg:w-64 focus:outline-none text-white placeholder:text-gray-400"
          />
        </div>

        {/* MOBILE SEARCH ICON */}
        <div className="xs:hidden">
          <Search size={18} className="text-gray-300" />
        </div>

        {/* NOTIFICATION */}
        <div
          onClick={() => navigate(ROUTES.DETECTIVE_NOTIFICATION)}
          className="relative cursor-pointer"
        >
          <Bell size={18} className="sm:size-[20px] text-white hover:opacity-80 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
            3
          </span>
        </div>

      </div>
    </nav>
  );
};

export default DetectiveNavbar;