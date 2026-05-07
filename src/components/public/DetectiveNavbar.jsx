import React, { useEffect, useState } from "react";
import { Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import { RiNotificationFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
 
const DetectiveNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  return (
    <nav
      className="sticky top-0 z-50 text-white flex items-center justify-between transition-all duration-300"
      style={{
        paddingLeft: '63px',
        paddingRight: '24px',
        paddingTop: '12px',
        paddingBottom: '12px',
        background: scrolled ? "rgba(18, 31, 39, 0.55)" : "#121F27",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      {/* LEFT: hamburger (mobile) + profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-white p-1"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <Menu size={22} />
        </button>
        <CgProfile size={32} className="text-white hidden sm:block" />
        <CgProfile size={26} className="text-white sm:hidden" />
        <span className="text-base sm:text-xl font-semibold">Profile name</span>
      </div>

      {/* RIGHT: search + notification */}
      <div className="flex items-center gap-3">
        {/* Search — hidden on small screens */}
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Search"
            className="bg-[#232E34] rounded-full py-2 pl-10 pr-6 text-sm w-48 lg:w-82 h-10 focus:outline-none text-white placeholder:text-gray-400"
          />
        </div>

        {/* Search icon only on mobile */}
        <button className="md:hidden text-white p-1" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <Search size={20} />
        </button>

        <div
          onClick={() => navigate(ROUTES.DETECTIVE_NOTIFICATION)}
          className="relative cursor-pointer"
          style={{ background: "#232E34", borderRadius: "50%", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <RiNotificationFill size={20} className="text-white hover:opacity-80 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </div>
      </div>
    </nav>
  );
};

export default DetectiveNavbar;
