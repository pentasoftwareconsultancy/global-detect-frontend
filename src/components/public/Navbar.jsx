import React from "react";
import logo from "../../assets/Global.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState("home");

  return (
<nav className="sticky top-0 z-[999] w-full bg-gradient-to-r from-[#0b1120] via-[#0b1a24] to-[#7a1d2a] px-4 sm:px-6 md:px-10 py-3 backdrop-blur-xl border-b border-white/10">
  <div className="flex items-center justify-between">

    {/* LEFT - LOGO */}
    <div className="flex items-center gap-3">
      <img src={logo} alt="logo" className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover" />
      <div className="text-[#FFA6AD] leading-tight">
        <h1 className="text-sm md:text-base font-semibold tracking-wide ">
          Universal Detsective
        </h1>
        <p className="text-[10px] md:text-xs text-[#FFA6AD] tracking-widest">
          PVT LTD
        </p>
      </div>
    </div>

    {/* DESKTOP MENU */}
    <div className="hidden md:flex items-center bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-2 space-x-6 border border-white/10 shadow-lg">

      <button
  onClick={() => {
    setActive("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  className={`px-5 py-1.5 rounded-xl font-medium transition ${
    active === "home"
      ? "bg-[#e7dfd7] text-black shadow-sm"
      : "text-white/80 hover:text-white"
  }`}
>
  Home
</button>

      <button
        onClick={() => {
          setActive("about");
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        className={`px-5 py-1.5 rounded-xl font-medium transition ${
          active === "about"
            ? "bg-[#e7dfd7] text-black shadow-sm"
            : "text-white/80 hover:text-white"
        }`}
      >
        About us
      </button>

      <button
        onClick={() => {
          setActive("services");
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        }}
        className={`px-5 py-1.5 rounded-xl font-medium transition ${
          active === "services"
            ? "bg-[#e7dfd7] text-black shadow-sm"
            : "text-white/80 hover:text-white"
        }`}
      >
        Services
      </button>

      <button
        onClick={() => {
          setActive("blog");
          document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
        }}
        className={`px-5 py-1.5 rounded-xl font-medium transition ${
          active === "blog"
            ? "bg-[#e7dfd7] text-black shadow-sm"
            : "text-white/80 hover:text-white"
        }`}
      >
        Blog
      </button>

      <button
        onClick={() => {
          setActive("contact");
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        className={`px-5 py-1.5 rounded-xl font-medium transition ${
          active === "contact"
            ? "bg-[#e7dfd7] text-black shadow-sm"
            : "text-white/80 hover:text-white"
        }`}
      >
        Contact
      </button>
    </div>

    {/* RIGHT BUTTON - DESKTOP */}
    <div className="hidden md:block">
      <button
        onClick={() => navigate('/login')}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium shadow-md transition"
      >
        Login/ Register
      </button>
    </div>

    {/* MOBILE MENU ICON */}
    <div className="md:hidden text-white">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>

  {/* MOBILE MENU */}
  {isOpen && (
    <div className="md:hidden mt-4 bg-white/5 backdrop-blur-xl rounded-2xl p-5 space-y-4 border border-white/10 shadow-lg transition-all duration-300">

      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setIsOpen(false);
        }}
        className="block w-full text-left bg-[#e7dfd7] text-black px-4 py-2 rounded-xl font-medium"
      >
        Home
      </button>

      <button
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }}
        className="block w-full text-left text-white/80 hover:text-white"
      >
        About us
      </button>

      <button
        onClick={() => {
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }}
        className="block w-full text-left text-white/80 hover:text-white"
      >
        Services
      </button>

      <button
        onClick={() => {
          document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }}
        className="block w-full text-left text-white/80 hover:text-white"
      >
        Blog
      </button>

      <button
        onClick={() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }}
        className="block w-full text-left text-white/80 hover:text-white"
      >
        Contact
      </button>

      <button
        onClick={() => navigate('/login')}
        className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium shadow-md transition"
      >
        Login/ Register
      </button>
    </div>
  )}
</nav>
  );
};

export default Navbar;