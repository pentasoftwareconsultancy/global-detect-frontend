// // import React from 'react'
// // import { Menu, User, Bell, Search } from "lucide-react";
// // import { ROUTES } from "../../core/constants/routes.constant";
// // import GlobalLogo from "../../assets/Global-logo.png";

// // const UserNavbar = ({
// //   isRequestInvestigation,
// //   isLoggedIn,
// //   isUserDashboard,
// //   userName,
// //   sidebarOpen,
// //   setSidebarOpen,
// //   navigate
// // }) => {


// //   return (
// //     <div className="h-16 bg-[#111827] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">

// //       {/* ── REQUEST INVESTIGATION NAVBAR ── */}
// //       {isRequestInvestigation ? (
// //         <>
// //           {/* LEFT: Logo */}
// //           <div className="flex items-center gap-3">
// //             <img src={GlobalLogo} alt="Logo" className="w-10 h-10 rounded-full" />
// //             <div className="text-[#FFA6AD] leading-tight">
// //               <h1 className="text-sm font-semibold">Universal Detective</h1>
// //               <p className="text-[10px] tracking-widest">PVT LTD</p>
// //             </div>
// //           </div>

// //           {/* RIGHT: Login/Register only if not logged in */}
// //           {!isLoggedIn && (
// //             <button
// //               onClick={() => navigate(ROUTES.SIGNUP)}
// //               className="bg-red hover:bg-[#b0222f] px-5 py-2 text-sm font-semibold text-white rounded-md transition"
// //             >
// //               Login/ Register
// //             </button>
// //           )}
// //         </>

// //       ) : (
// //         /* ── DASHBOARD / OTHER PAGES NAVBAR ── */
// //         <>
// //           {/* LEFT: Hamburger + Profile name */}
// //           <div className="flex items-center gap-3">
// //             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg">
// //               <Menu size={22} />
// //             </button>
// //             {isUserDashboard && (
// //               <div className="flex items-center gap-2">
// //                 <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-white">
// //                   <User size={18} />
// //                 </div>
// //                 <span className="text-white font-semibold text-sm sm:text-base">{userName}</span>
// //               </div>
// //             )}
// //             {!isUserDashboard && (
// //               <h2 className="text-white font-semibold text-sm sm:text-lg">
// //                 Universal Detective
// //               </h2>
// //             )}
// //           </div>

// //           {/* RIGHT: Search + Bell (dashboard only) or just Bell */}
// //           <div className="flex items-center gap-4">

// //             {/* SEARCH */}
// //             {isUserDashboard && (
// //               <div className="flex items-center gap-2 
// //                bg-[#1e2a3a]/80 border border-white/10 
// //                  rounded-full px-4 py-2 w-50 sm:w-65">

// //                 <Search size={16} className="text-gray-400" />

// //                 <input
// //                   type="text"
// //                   placeholder="Search"
// //                   className="bg-transparent text-sm text-white 
// //                  placeholder-gray-400 outline-none w-full"
// //                 />
// //               </div>
// //             )}

// //             {/* BELL */}
// //             <button
// //               onClick={() => navigate(ROUTES.USER_NOTIFICATION)}
// //               className="relative p-2 rounded-full bg-[#1e2a3a] hover:bg-[#243743] transition"
// //             >
// //               <Bell size={18} className="text-gray-300" />

// //               <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 
// //                  rounded-full text-[9px] flex items-center justify-center text-white font-bold">
// //                 2
// //               </span>
// //             </button>

// //           </div>
// //         </>
// //       )}
// //     </div>)
// // }

// // export default UserNavbar


// import React from "react";
// import { Search, Bell, User } from "lucide-react";

// const Navbar = () => {
//   return (
//     <div className="w-full bg-linear-to-r from-[#0f1c24] to-[#0b141c] px-4 md:px-8 py-3 flex items-center justify-between">
      
//       {/* LEFT: Profile */}
//       <div className="flex items-center gap-2 text-white">
//         <div className="bg-white/10 p-2 rounded-full">
//           <User size={18} />
//         </div>
//         <span className="text-sm md:text-base font-medium">
//           Universal Detective
//         </span>
//       </div>

//       {/* CENTER: Search */}
//       <div className="hidden sm:flex items-center bg-white/10 rounded-full px-3 py-2 w-[40%] md:w-[35%] lg:w-[30%]">
//         <Search size={16} className="text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search"
//           className="bg-transparent outline-none text-sm text-white px-2 w-full placeholder-gray-400"
//         />
//       </div>

//       {/* RIGHT: Notification + Avatar */}
//       <div className="flex items-center gap-3">
        
//         {/* Notification */}
//         <div className="relative bg-white/10 p-2 rounded-full cursor-pointer">
//           <Bell size={18} className="text-white" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1.5 rounded-full">
//             2
//           </span>
//         </div>

        
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { Menu, Bell, Search, User } from "lucide-react";

const UserNavbar = ({ setSidebarOpen }) => {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-[#0f1c24] border-b border-white/10">

      {/* LEFT */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10"
        >
          <Menu size={28} />   {/* ⬅ increased */}
        </button>

        <div className="flex items-center gap-5">
          <div className="bg-white/10 p-2 rounded-full">
            <User size={20} />   {/* ⬅ increased */}
          </div>
          <span className="text-md md:text-base">Universal Detective</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-10">

        {/* Search */}
        <div className="hidden sm:flex items-center bg-white/10 rounded-full px-4 py-2.5 w-50 md:w-70">
          <Search size={20} />   {/* ⬅ increased */}
          <input
            placeholder="Search"
            className="bg-transparent px-2 w-full outline-none text-sm"
          />
        </div>

        {/* Bell */}
        <div className="relative bg-white/10 p-2.5 rounded-full cursor-pointer">
          <Bell size={20} />   {/* ⬅ increased */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1 rounded-full">
            2
          </span>
        </div>

      </div>

    </div>
  );
};

export default UserNavbar;