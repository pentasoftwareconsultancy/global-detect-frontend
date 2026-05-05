import React, { useState } from 'react';
import { FiUser, FiSearch, FiBell, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../core/constants/routes.constant';

// API-ready: replace this with fetched profile name
const PROFILE_NAME = 'Profile name';

const AdminNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <header
      className="w-full flex items-center justify-between flex-shrink-0"
      style={{ height: '72px', backgroundColor: '#121F2733', backdropFilter: 'blur(8px)', paddingRight: '32px' }}
    >

      {/* ── LEFT: Hamburger (mobile) + Profile ── */}
      <div className="flex items-center gap-4 pl-4 sm:pl-10 lg:pl-[73px]">

        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
        >
          <FiMenu size={20} />
        </button>

        {/* Profile icon + name */}
        <div className="flex items-center gap-4">
          <div
            className="rounded-full border border-white/20 bg-white/10 flex items-center justify-center flex-shrink-0"
            style={{ width: '43px', height: '43px' }}
          >
            <FiUser size={20} className="text-[#FFF3EA]" />
          </div>
          <span
            className="font-['Montserrat'] font-medium text-[#FFF3EA] hidden sm:block"
            style={{ fontSize: '24px', lineHeight: '21px', verticalAlign: 'middle' }}
          >
            {PROFILE_NAME}
          </span>
        </div>
      </div>

      {/* ── RIGHT: Search + Notification ── */}
      <div className="flex items-center gap-4">

        {/* Search bar — hidden on mobile */}
        <div
          className="hidden md:flex items-center gap-3 px-4"
          style={{ height: '44px', borderRadius: '32px', backgroundColor: '#FFF3EA1A', width: '360px', maxWidth: '35vw' }}
        >
          <FiSearch size={23} className="text-[#A4A4A4] flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-transparent outline-none w-full font-['Montserrat'] font-normal text-base leading-[21px] text-[#A4A4A4] placeholder-[#A4A4A4]"
          />
        </div>

        {/* Search icon — mobile only */}
        <button className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-[#FFF3EA]">
          <FiSearch size={18} />
        </button>

        {/* Notification */}
        <button
          onClick={() => navigate(ROUTES.ADMIN_NOTIFICATION)}
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0 cursor-pointer"
        >
          <FiBell size={18} className="text-[#FFF3EA]" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#D92B3A] rounded-full text-[9px] text-white flex items-center justify-center font-bold">
            2
          </span>
        </button>

      </div>
    </header>
  );
};

export default AdminNavbar;
