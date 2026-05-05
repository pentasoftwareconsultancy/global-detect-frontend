import React, { useState } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../core/constants/routes.constant';

const AdminNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <header
      className="w-full flex items-center justify-between px-6 md:px-10 flex-shrink-0"
      style={{ height: '115px', backgroundColor: '#121F2733', backdropFilter: 'blur(8px)' }}
    >

      {/* ── LEFT: Hamburger (mobile) + Profile ── */}
      <div className="flex items-center gap-4">

        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
        >
          <Menu size={22} />
        </button>

        {/* Profile icon + name */}
        <div className="flex items-center gap-4">
          <div
            className="rounded-full border border-white/20 bg-white/10 flex items-center justify-center flex-shrink-0"
            style={{ width: '43px', height: '43px' }}
          >
            <User size={20} className="text-[#FFF3EA]" />
          </div>
          <span
            className="font-['Montserrat'] font-medium text-[#FFF3EA] hidden sm:block"
            style={{ fontSize: '32px', lineHeight: '21px' }}
          >
            Admin Director
          </span>
        </div>
      </div>

      {/* ── RIGHT: Search + Notification ── */}
      <div className="flex items-center gap-4">

        {/* Search bar — hidden on mobile */}
        <div
          className="hidden md:flex items-center gap-3 px-5"
          style={{
            width: '536px',
            height: '64px',
            borderRadius: '32px',
            backgroundColor: '#FFF3EA1A',
            maxWidth: '40vw',
          }}
        >
          <Search size={18} className="text-[#A4A4A4] flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-transparent outline-none w-full font-['Montserrat'] font-normal text-base leading-[21px] text-[#A4A4A4] placeholder-[#A4A4A4]"
          />
        </div>

        {/* Notification */}
        <button
          onClick={() => navigate(ROUTES.ADMIN_NOTIFICATION)}
          className="relative flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0 cursor-pointer"
          style={{ width: '64px', height: '64px' }}
        >
          <Bell size={22} className="text-[#FFF3EA]" />
          <span className="absolute top-2 right-2 w-4 h-4 bg-[#D92B3A] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
            2
          </span>
        </button>

      </div>
    </header>
  );
};

export default AdminNavbar;
