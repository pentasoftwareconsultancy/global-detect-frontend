import React, { useState, useEffect } from "react";
import logo from "../../assets/Global-logo.png";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  
  const isBlogDetails = location.pathname.startsWith("/blogs/");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[999] w-full px-4 sm:px-6 md:px-12 lg:px-20 py-3 transition-all duration-300 ${
        scrolled ? "bg-[#121F27]/60 backdrop-blur-md" : ""
      }`}
    >
      <div className="flex items-center justify-between">

        {/* LEFT - LOGO (ALWAYS SAME) */}
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 md:w-11 md:h-11 rounded-full" />
          <div className="text-[#FFA6AD] leading-tight">
            <h1 className="text-sm md:text-base font-semibold">
              Universal Detective
            </h1>
            <p className="text-[10px] md:text-xs tracking-widest">
              PVT LTD
            </p>
          </div>
        </div>

        {/* 🔥 IF BLOG DETAILS → SHOW ONLY BACK BUTTON */}
        {isBlogDetails ? (

          <div
            onClick={() => navigate("/")}
            className="text-sm text-gray-300 cursor-pointer hover:text-white flex items-center gap-1"
          >
            ← Back to Home
          </div>

        ) : (

          <>
            {/* CENTER NAV */}
            <div className="hidden md:flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-xl bg-[#0f1c24]/80 backdrop-blur-md border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.35)]">
                {["home", "about", "services", "blog", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActive(item);
                      if (item === "home") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        document
                          .getElementById(item)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      active === item
                        ? "bg-[#e7dfd7] text-black shadow-md"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item === "home"
                      ? "Home"
                      : item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden md:block">
              <button
                onClick={() => navigate("/login")}
                className="bg-[#D92B3A] hover:bg-red-600 px-6 py-2 text-sm font-medium shadow-md transition text-white rounded-md"
              >
                Login/ Register
              </button>
            </div>

            {/* MOBILE ICON */}
            <div className="md:hidden text-white">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* 🔥 MOBILE MENU (ONLY IF NOT BLOG DETAILS) */}
      {!isBlogDetails && isOpen && (
        <div className="md:hidden mt-4 bg-black/40 backdrop-blur-xl rounded-2xl p-5 space-y-4 border border-white/10 shadow-lg">

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsOpen(false);
            }}
            className="block w-full text-left bg-[#e7dfd7] text-black px-4 py-2 rounded-xl"
          >
            Home
          </button>

          {["about", "services", "blog", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => {
                document
                  .getElementById(item)
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className="block w-full text-left text-white/80 hover:text-white"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
          >
            Login/ Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;