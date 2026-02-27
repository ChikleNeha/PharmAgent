// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function SideNavbar() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const location = useLocation();

//   const adminNavItems = [
//     { 
//       path: "/admin/dashboard", 
//       icon: "📊", 
//       label: "Dashboard",
//       fullLabel: "Dashboard Overview"
//     },
//     { 
//       path: "/admin/analytics", 
//       icon: "📈", 
//       label: "Analytics",
//       fullLabel: "Analytics & Reports"
//     },
//     { 
//       path: "/admin/inventory", 
//       icon: "📦", 
//       label: "Inventory", 
//       fullLabel: "Medicine Inventory"
//     },
//     { 
//       path: "/admin/customers", 
//       icon: "👥", 
//       label: "Customers",
//       fullLabel: "Customer Management"
//     },
//     { 
//       path: "/admin/profile", 
//       icon: "👤", 
//       label: "Profile",
//       fullLabel: "Admin Profile"
//     }
//   ];

//   return (
//     <div className={`bg--to-b from-emerald-700 to-emerald-900 text-white shadow-2xl transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
//       {/* Header */}
//       <div className="p-6 border-b border-emerald-600">
//         <div className="flex items-center justify-between">
//           {!isCollapsed ? (
//             <>
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                   <span className="text-2xl">⚕️</span>
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-xl">PharmAgent</h2>
//                   <p className="text-emerald-200 text-sm">Admin Panel</p>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//               <span className="text-2xl">⚕️</span>
//             </div>
//           )}
          
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="p-2 hover:bg-emerald-600 rounded-xl transition-all hover:scale-110"
//           >
//             {isCollapsed ? (
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             ) : (
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Navigation Items */}
//       <nav className="p-4 space-y-2 mt-6">
//         {adminNavItems.map((item) => {
//           const isActive = location.pathname === item.path;
          
//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`group flex items-center p-4 rounded-2xl transition-all duration-200 hover:bg-emerald-600/80 hover:shadow-lg hover:translate-x-1 ${
//                 isActive 
//                   ? 'bg-emerald-600 shadow-emerald-500/50 shadow-lg translate-x-1 border-r-4 border-emerald-400' 
//                   : 'hover:bg-white/10'
//               }`}
//             >
//               <span className="text-2xl mr-4 shrink-0">{item.icon}</span>
//               {!isCollapsed && (
//                 <div className="flex-1 min-w-0">
//                   <span className="font-semibold text-sm block">{item.label}</span>
//                   {!isActive && (
//                     <span className="text-xs text-emerald-200 opacity-75">{item.fullLabel}</span>
//                   )}
//                 </div>
//               )}
//               {isActive && !isCollapsed && (
//                 <div className="ml-auto w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Logout Section */}
//       <div className="absolute bottom-6 left-0 right-0 px-4">
//         <div className="h-px bg--to-r from-transparent via-emerald-400 to-transparent mb-6"></div>
//         <Link
//           to="/signup"
//           className="group flex items-center p-4 rounded-2xl transition-all duration-200 hover:bg-red-600/80 hover:shadow-lg hover:translate-x-1"
//         >
//           <span className="text-2xl mr-4 shrink-0">🚪</span>
//           {!isCollapsed && (
//             <div>
//               <span className="font-semibold text-sm block">Logout</span>
//               <span className="text-xs text-red-200 opacity-75">Sign out of Admin</span>
//             </div>
//           )}
//         </Link>
//       </div>
//     </div>
//   );
// }









// import { Link, useLocation } from "react-router-dom";

// export default function SideNavbar() {
//   const location = useLocation();

//   const navItems = [
//     { path: "/admin/dashboard", icon: "📊", label: "Dashboard" },
//     { path: "/admin/analytics", icon: "📈", label: "Analytics" },
//     { path: "/admin/inventory", icon: "📦", label: "Inventory" },
//     { path: "/admin/customers", icon: "👥", label: "Customers" },
//     { path: "/admin/profile", icon: "👤", label: "Profile" }
//   ];

//   return (
//     <div className="w-64 bg-emerald-700 text-white p-6 min-h-screen shadow-2xl">
//       {/* Logo */}
//       <div className="mb-10 pb-6 border-b border-emerald-600">
//         <h2 className="text-2xl font-bold">PharmAgent</h2>
//         <p className="text-emerald-200 text-sm">Admin</p>
//       </div>

//       {/* Menu */}
//       <nav className="space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`flex items-center p-3 rounded-xl transition-all ${
//               location.pathname === item.path
//                 ? 'bg-emerald-600 text-white shadow-lg'
//                 : 'hover:bg-emerald-600/50'
//             }`}
//           >
//             <span className="w-8 text-xl mr-3">{item.icon}</span>
//             <span className="font-semibold">{item.label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Logout */}
//       <div className="absolute bottom-6 w-full p-6">
//         <Link
//           to="/signup"
//           className="flex items-center p-3 rounded-xl bg-red-600/30 hover:bg-red-600 text-white transition-all"
//         >
//           <span className="w-8 text-xl mr-3">🚪</span>
//           <span className="font-semibold">Logout</span>
//         </Link>
//       </div>
//     </div>
//   );
// }







import { Link, useLocation } from "react-router-dom";

export default function SideNavbar() {
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/admin/analytics", icon: "📈", label: "Analytics" },
    { path: "/admin/inventory", icon: "📦", label: "Inventory" },
    { path: "/admin/customers", icon: "👥", label: "Customers" },
    { path: "/admin/profile", icon: "👤", label: "Profile" }
  ];

  return (
    <div className="w-64 bg-emerald-700 text-white p-6 min-h-screen shadow-2xl">
      {/* Logo */}
      <div className="mb-10 pb-6 border-b border-emerald-600">
        <h2 className="text-2xl font-bold">PharmAgent</h2>
        <p className="text-emerald-200 text-sm">Admin</p>
      </div>

      {/* Menu */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded-xl transition-all ${
              location.pathname === item.path
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'hover:bg-emerald-600/50'
            }`}
          >
            <span className="w-8 text-xl mr-3">{item.icon}</span>
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
