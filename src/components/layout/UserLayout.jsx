// import UserSidebar from "../public/UserSidebar";
// import UserNavbar from "../public/UserNavbar";
// import { Outlet } from "react-router-dom";
// import { useState } from "react";

// const UserLayout = () => {

//     const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ ADD THIS

//   return (
//     <div className="h-screen flex flex-col">

//       {/* 🔝 Navbar (FULL WIDTH) */}
//       <UserNavbar 
//         sidebarOpen={sidebarOpen} 
//         setSidebarOpen={setSidebarOpen} 
//       />

//       {/* 🔽 Sidebar + Content */}
//       <div className="flex flex-1 overflow-hidden">

//   {/* Overlay */}
//   {sidebarOpen && (
//     <div
//       className="fixed inset-0 bg-black/50 z-40 md:hidden"
//       onClick={() => setSidebarOpen(false)}
//     />
//   )}

//   {/* Sidebar */}
//   <div
//     className={`fixed md:static top-0 left-0 h-screen w-64 bg-[#1c2b33] z-50
//     transform transition-transform duration-300
//     ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//   >
//     <UserSidebar />
//   </div>

//   {/* Content */}
//   <div className="flex-1 md:ml-64 p-6">
//   <Outlet />
// </div>

// </div>

//     </div>
//   );
// };

// export default UserLayout;


import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../public/UserNavbar";
import UserSidebar from "../public/UserSidebar";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#0b141c] text-white">

      {/* Navbar */}
      <UserNavbar setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">

        {/* Overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <UserSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default UserLayout;